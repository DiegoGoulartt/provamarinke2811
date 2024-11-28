const express = require('express');
const cors = require('cors');
const profileRoutes = require('./routes/profileRoutes'); 
const contractRoutes = require('./routes/contractRoutes'); 
const jobRoutes = require('./routes/jobRoutes'); 
const { sequelize } = require('./models'); 

const app = express();
app.use(express.json()); 
app.use(cors()); 
app.use('/profiles', profileRoutes); 
app.use('/contracts', contractRoutes); 
app.use('/jobs', jobRoutes); 

const start = async () => {
  try {
    await sequelize.sync({ force: false }); 
    console.log('Database synced!');
    const PORT = process.env.PORT || 3000; 
    app.listen(PORT, () => {
      console.log(`Application running on http://localhost:${PORT}...`);
    });
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
};

start(); 