const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define('Profile', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  profession: DataTypes.STRING,
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  type: DataTypes.STRING,
});

const Contract = sequelize.define('Contract', {
  terms: DataTypes.STRING,
  clientId: DataTypes.INTEGER,
  contractorId: DataTypes.INTEGER,
  operationDate: DataTypes.DATE,
  status: DataTypes.STRING,
});

const Job = sequelize.define('Job', {
  contractId: DataTypes.INTEGER,
  description: DataTypes.STRING,
  operationDate: DataTypes.DATE,
  paymentDate: DataTypes.DATE,
  price: DataTypes.FLOAT,
  paid: DataTypes.BOOLEAN,
});

const Deposit = sequelize.define('Deposit', {
  clientId: DataTypes.INTEGER,
  operationDate: DataTypes.DATE,
  depositValue: DataTypes.FLOAT,
});

const Payment = sequelize.define('Payment', {
  jobId: DataTypes.INTEGER,
  operationDate: DataTypes.DATE,
  paymentValue: DataTypes.FLOAT,
});

// Relacionamentos
Profile.hasMany(Contract, { foreignKey: 'clientId' });
Profile.hasMany(Contract, { foreignKey: 'contractorId' });
Contract.belongsTo(Profile, { as: 'client', foreignKey: 'clientId' });
Contract.belongsTo(Profile, { as: 'contractor', foreignKey: 'contractorId' });
Contract.hasMany(Job, { foreignKey: 'contractId' });
Job.belongsTo(Contract, { foreignKey: 'contractId' });
Job.hasMany(Payment, { foreignKey: 'jobId' });
Payment.belongsTo(Job, { foreignKey: 'jobId' });

module.exports = { Profile, Contract, Job, Deposit, Payment, sequelize };
