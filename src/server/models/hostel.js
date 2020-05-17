module.exports = (sequelize, DataTypes) => {
  /* Define Hostel table with primary key ID, and other fields */
  const Hostel = sequelize.define(
    'hostel',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false
      },
      affiliation: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );

  /* Define one-to-many relationship between Hostel and Student tables */
  Hostel.associate = models => {
    Hostel.hasMany(models.user);
  };

  return Hostel;
};
