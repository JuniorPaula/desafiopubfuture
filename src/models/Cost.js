import Sequelize, { Model } from 'sequelize';

export default class Cost extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: {
          type: Sequelize.FLOAT,
          defaultValue: '',
          validate: {
            isFloat: {
              msg: 'Insira um valor válido.',
            },
          },
        },
        receipt_date: {
          type: Sequelize.DATEONLY,
          defaultValue: '',
          validate: {
            isDate: {
              msg: 'Insira uma data válida.',
            },
          },
        },
        expected_receipt_date: {
          type: Sequelize.DATEONLY,
          defaultValue: '',
          validate: {
            isDate: {
              msg: 'Insira uma data válida.',
            },
          },
        },
        account_id: {
          type: Sequelize.INTEGER,
        },
        type_income: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo tipo de entrada não pode está vazio.',
            },
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    return this.belongsTo(models.Account, {
      foreignKey: 'account_id',
      as: 'accounts_costs',
    });
  }
}
