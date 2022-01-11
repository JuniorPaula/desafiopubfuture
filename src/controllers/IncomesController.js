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
}

export default new IncomesController();
