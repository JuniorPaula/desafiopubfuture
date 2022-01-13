module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('costs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      receipt_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      expected_receipt_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'accounts',
          key: 'id',
        },
      },
      type_cost: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('costs');
  },
};
