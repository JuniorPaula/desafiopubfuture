import { Op } from 'sequelize';
import Account from '../models/Account';
import Cost from '../models/Cost';

class CostsController {
  /** método responsável por cadastrar um 'despesa' */
  async create(req, res) {
    try {
      const {
        amount,
        receipt_date,
        expected_receipt_date,
        account_id,
        type_cost,
      } = req.body;

      /** converter data pro formato SQL */
      const receiptDateFormated = receipt_date.split('/').reverse().join('-');
      const expectedReceiptDateFormated = expected_receipt_date
        .split('/')
        .reverse()
        .join('-');

      /** tipos de dados válidos */
      const typeOfCosts = [
        { name: 'Alimentação' },
        { name: 'Educação' },
        { name: 'Lazer' },
        { name: 'Moradia' },
        { name: 'Roupa' },
        { name: 'Saúde' },
        { name: 'Transporte' },
        { name: 'Outros' },
      ];

      const typeCostsExists = typeOfCosts.map((account) => account.name);

      if (!typeCostsExists.includes(type_cost)) {
        return res.status(400).json({
          errors: ['Invalid type cost.'],
        });
      }

      /** validar o valor da despesa */
      if (amount < 0) {
        return res.status(400).json({
          errors: ['Invalid parameter.'],
        });
      }

      /** atualizar a conta recebedora */
      const account = await Account.findByPk(account_id);
      const balance = account.balance;

      const newBalance = balance - Number(amount);
      await account.update({ balance: newBalance });

      const cost = await Cost.create({
        amount,
        receipt_date: receiptDateFormated,
        expected_receipt_date: expectedReceiptDateFormated,
        account_id,
        type_cost,
      });

      return res.status(200).json(cost);
    } catch (err) {
      return res.status(400).json({
        errors: `Error: ${err}`,
      });
    }
  }

  /** método resposnsável por atualizar uma despesa */
  async update(req, res) {
    try {
      const { expected_receipt_date, type_cost } = req.body;
      const { id } = req.params;

      /** converter data pro formato SQL */
      const expectedReceiptDateFormated = expected_receipt_date
        .split('/')
        .reverse()
        .join('-');

      /** tipos de dados válidos */
      const typeOfCosts = [
        { name: 'Alimentação' },
        { name: 'Educação' },
        { name: 'Lazer' },
        { name: 'Moradia' },
        { name: 'Roupa' },
        { name: 'Saúde' },
        { name: 'Transporte' },
        { name: 'Outros' },
      ];

      const typeCostsExists = typeOfCosts.map((account) => account.name);

      if (!typeCostsExists.includes(type_cost)) {
        return res.status(400).json({
          errors: ['Invalid type cost.'],
        });
      }

      const newCost = await Cost.findByPk(id);
      if (!newCost) {
        return res.status(400).json({
          errors: ['Cost not found.'],
        });
      }

      const cost = await newCost.update({
        expected_receipt_date: expectedReceiptDateFormated,
        type_cost,
      });

      return res.status(200).json(cost);
    } catch (err) {
      return res.status(400).json({
        errors: `Error: ${err}`,
      });
    }
  }

  /** método responsável por deletar uma despesa */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const cost = await Cost.findByPk(id);

      if (!cost) {
        return res.status(400).json({
          errors: ['Cost not found.'],
        });
      }

      await cost.destroy(id);

      return res.status(200).json([]);
    } catch (err) {
      return res.status(400).json({
        errors: `Error: ${err}`,
      });
    }
  }

  /** método responsável por listar as despesas pelo tipo */
  async showCostOfType(req, res) {
    try {
      const { name } = req.query;

      const cost = await Cost.findAll({ where: { type_cost: name } });
      if (!cost) {
        return res.status(400).json({
          errors: ['Cost not found.'],
        });
      }

      return res.status(200).json(cost);
    } catch (err) {
      return res.status(400).json({
        errors: `Error: ${err}`,
      });
    }
  }

  /** método responsável por filtar despesas por datas */
  async getCostsToDate(req, res) {
    try {
      const { start_date, end_date } = req.query;

      /** converter a data pro formato do SQL */
      const startDateFormated = start_date.split('/').reverse().join('-');
      const endDateFormated = end_date.split('/').reverse().join('-');

      const costs = await Cost.findAll({
        where: {
          receipt_date: {
            [Op.between]: [startDateFormated, endDateFormated],
          },
        },
      });

      return res.status(200).json(costs);
    } catch (err) {
      return res.status(400).json({
        errors: `Error: ${err}`,
      });
    }
  }
}

export default new CostsController();
