import Account from '../models/Account';

class AccountsController {
  /** método responsável por listar todas as contas */
  async index(req, res) {
    const accounts = await Account.findAll();
    return res.json(accounts);
  }

  /** método responsável por criar conta */
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

  /** método responsável por editar uma conta */
  async update(req, res) {
    try {
      const { type_account, financial_institution } = req.body;

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

      const newAccount = await Account.findByPk(req.params.id);

      if (!newAccount) {
        return res.status(400).json({
          errors: ['Account not found.'],
        });
      }

      const account = await newAccount.update({
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

  /** método responsável por deletar uma conta */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const account = await Account.findByPk(id);

      if (!account) {
        return res.status(400).json({
          errors: ['Account not found.'],
        });
      }

      await account.destroy(id);

      return res.status(200).json([]);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  /** método responsável por listar saldo total */
  async getTotalBalance(req, res) {
    try {
      const accounts = await Account.findAll();
      const balances = accounts.map((value) => value.balance);
      const total = balances.reduce((ac, el) => ac + el, 0);

      return res.status(200).json({
        saldo_total: total,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  /** método responsável por realizar transferências entre contas */
  async transferBetweenAccounts(req, res) {
    try {
      /** recuperar o id da conta que var fazer a transferência por parâmetro,
       *  recuperar o nome da conta que vai receber a transfêrencia e o valor
       *  a ser transferido pelo body da requisição.
       */
      const { id } = req.params;
      const { value, account_id, account_name } = req.body;

      /** recuperar a conta pagadora e a conta recebedora pelo id */
      const accountToTransfer = await Account.findByPk(id);
      const accountToReciver = await Account.findByPk(account_id);

      /** recuperar o nome da contar que vai recerber o valor */
      const accountNameToReciver = accountToReciver.type_account;
      const balanceToAccountReciver = accountToReciver.balance;

      /** lógica para validar conta */
      if (account_name !== accountNameToReciver) {
        return res.status(400).json({
          errors: ['Account not found.'],
        });
      }

      /** lógica para validar o valor enviado */
      const balanceToAccountTransfer = accountToTransfer.balance;

      if (value > balanceToAccountTransfer || value <= 0) {
        return res.status(400).json({
          errors: ['insufficient funds.'],
        });
      }

      /** lógica de transferência */
      const oldBalance = balanceToAccountTransfer - Number(value);
      const newBalance = balanceToAccountReciver + Number(value);

      await accountToTransfer.update({ balance: oldBalance });
      await accountToReciver.update({ balance: newBalance });

      res.status(201).json({
        message: `Transferência de ${value} realizada com succeso.`,
      });
    } catch (err) {
      return res.status(400).json({
        errors: `Error: ${err}`,
      });
    }
  }
}

export default new AccountsController();
