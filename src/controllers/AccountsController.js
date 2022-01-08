import Account from '../models/Account';

class AccountsController {
  index(req, res) {
    res.json({
      ok: true,
    });
  }

  async create(req, res) {
    try {
      const { balance, type_account, financial_institution } = req.body;

      const typeOfAccount = [
        { name: 'Conta Corrente' },
        { name: 'Conta Poupança' },
        { name: 'Carteira' },
      ];

      const typeAccountExists = typeOfAccount.map((account) => account.name);

      if (!typeAccountExists.includes(type_account)) {
        return res.status(400).json({
          errors: ['Invalid account.'],
        });
      }

      const account = await Account.create({
        balance,
        type_account,
        financial_institution,
      });

      return res.status(200).json(account);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }
}

export default new AccountsController();
