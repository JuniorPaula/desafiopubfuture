import Sequelize, { Model } from 'sequelize';

export default class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        balance: {
          type: Sequelize.FLOAT,
          defaultValue: '',
          validate: {
            isFloat: {
              msg: 'Insira um valor válido.',
            },
          },
        },
        type_account: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'O nome da instituição financeira não pode estar vazio.',
            },
          },
        },
        financial_institution: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'O nome da instituição financeira não pode estar vazio.',
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
    return this.hasMany(models.Income, {
      foreignKey: 'account_id',
      as: 'incomes',
    });
  }
}
