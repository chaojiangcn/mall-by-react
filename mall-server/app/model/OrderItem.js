"use strict";
module.exports = app => {
  const { INTEGER, STRING, UUID, UUIDV4 } = app.Sequelize;
  return app.model.define(
    "order_item",
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      orderId: {
        type: UUID,
        allowNull: false
      },
      goodId: {
        type: UUID,
        allowNull: false
      },
      price: {
        type: STRING,
        allowNull: false
      },
      number: {
        type: INTEGER,
        allowNull: false
      },
      
    },
    {
      freezeTableName: true
    }
  );
  
};
