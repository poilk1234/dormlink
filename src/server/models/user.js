module.exports = (sequelize, DataTypes) => {
  /* Define user with primary key sid and other fields */
  const User = sequelize.define(
    'user',
    {
      sid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      schedule: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      studious: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      participation: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      cleanliness: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );

  /* Define one-to-one relationship between User and Hostel tables */
  User.associate = models => {
    User.belongsTo(models.hostel);
  };

  return User;
};
