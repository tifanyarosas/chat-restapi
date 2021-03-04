module.exports = (sequelize, Sequelize) => {

  const Message = sequelize.define("messages", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true
      },
      recipientId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      content: {
        type: Sequelize.JSON,
        allowNull: false,
      }
    }, 
    {
      timestamps: true,
      createdAt: 'timestamp',
      updatedAt: false
    }
  );

return Message;
};