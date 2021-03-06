import { Op } from 'sequelize';
import Account from '../models/Account';
import Income from '../models/Income';

class IncomesController {
  /** método responsável por criar um 'entrada' */
  async create(req, res) {
    try {
      const {
        amount,
        receipt_date,
        expected_receipt_date,
        description,
        account_id,
        type_income,
      } = req.body;

      /** tipos de dados válidos */
      const typeOfIncomes = [
        { name: 'Salário' },
        { name: 'Presente' },
        { name: 'Prêmio' },
        { name: 'Outros' },
      ];

      const typeIncomesExists = typeOfIncomes.map((account) => account.name);

      if (!typeIncomesExists.includes(type_income)) {
        return res.status(400).json({
          errors: ['Invalid type income.'],
        });
      }

      /** validar o valor de entrada */
      if (amount < 0) {
        return res.status(400).json({
          errors: ['Invalid parameter.'],
        });
      }

      /** atualizar a conta recebedora */
      const account = await Account.findByPk(account_id);
      const balance = account.balance;

      const newBalance = balance + Number(amount);
      await account.update({ balance: newBalance });

      const income = await Income.create({
        amount,
        receipt_date,
        expected_receipt_date,
        description,
        account_id,
        type_income,
      });

      return res.status(200).json(income);
    } catch (err) {
      return res.status(400).json({
        errors: `Error: ${err}`,
      });
    }
  }

  /** método resposnsável por atualizar um entrada */
  async update(req, res) {
    try {
      const { expected_receipt_date, description, type_income } = req.body;
      const { id } = req.params;
      /** tipos de dados válidos */
      const typeOfIncomes = [
        { name: 'Salário' },
        { name: 'Presente' },
        { name: 'Prêmio' },
        { name: 'Outros' },
      ];

      const typeIncomesExists = typeOfIncomes.map((account) => account.name);

      if (!typeIncomesExists.includes(type_income)) {
        return res.status(400).json({
          errors: ['Invalid type income.'],
        });
      }

      const newIncome = await Income.findByPk(id);
      if (!newIncome) {
        return res.status(400).json({
          errors: ['Income not found.'],
        });
      }

      const income = await newIncome.update({
        expected_receipt_date,
        description,
        type_income,
      });

      return res.status(200).json(income);
    } catch (err) {
      return res.status(400).json({
        errors: `Error: ${err}`,
      });
    }
  }

  /** método responsável por deletar uma entrada */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const income = await Income.findByPk(id);

      if (!income) {
        return res.status(400).json({
          errors: ['Income not found.'],
        });
      }

      await income.destroy(id);

      return res.status(200).json([]);
    } catch (err) {
      return res.status(400).json({
        errors: `Error: ${err}`,
      });
    }
  }

  /** método responsável por listar as entradas pelo tipo */
  async showIncomeOfType(req, res) {
    try {
      const { name } = req.query;

      const incomes = await Income.findAll({ where: { type_income: name } });
      if (!incomes) {
        return res.status(400).json({
          errors: ['Income not found.'],
        });
      }

      return res.status(200).json(incomes);
    } catch (err) {
      return res.status(400).json({
        errors: `Error: ${err}`,
      });
    }
  }

  /** método responsável por filtar entradas por datas */
  async getIncomesToDate(req, res) {
    try {
      const { start_date, end_date } = req.query;

      /** converter a data pro formato do SQL */
      const startDateFormated = start_date.split('/').reverse().join('-');
      const endDateFormated = end_date.split('/').reverse().join('-');

      const incomes = await Income.findAll({
        where: {
          receipt_date: {
            [Op.between]: [startDateFormated, endDateFormated],
          },
        },
      });

      return res.status(200).json(incomes);
    } catch (err) {
      return res.status(400).json({
        errors: `Error: ${err}`,
      });
    }
  }

  /** método responsável por listar o total de receitas */
  async getTotalAmountIncomes(req, res) {
    try {
      const incomes = await Income.findAll();
      if (!incomes) {
        return res.status(400).json({
          errors: ['Income not found.'],
        });
      }

      const amounts = incomes.map((valeu) => valeu.amount);
      const totalAmounts = amounts.reduce((ac, el) => ac + el, 0);

      return res.status(200).json({
        saldo_total: totalAmounts,
      });
    } catch (err) {
      return res.status(400).json({
        errors: `Error: ${err}`,
      });
    }
  }
}

export default new IncomesController();
