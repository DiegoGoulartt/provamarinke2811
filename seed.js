const { Profile, Contract, Job, sequelize } = require('./models/index');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); 

    const profile1 = await Profile.create({
      firstName: "João",
      lastName: "Silva",
      profession: "Desenvolvedor",
      balance: 500,
      type: "client",
    });

    const profile2 = await Profile.create({
      firstName: "Maria",
      lastName: "Oliveira",
      profession: "Engenheira",
      balance: 1000,
      type: "contractor",
    });


    const contract1 = await Contract.create({
      terms: "Contrato de serviço de desenvolvimento",
      clientId: profile1.id,
      contractorId: profile2.id,
      operationDate: new Date(),
      status: "ativo",
    });


    const contract2 = await Contract.create({
      terms: "Contrato de consultoria em engenharia",
      clientId: profile1.id,
      contractorId: profile2.id,
      operationDate: new Date(),
      status: "ativo",
    });

  
    const job1 = await Job.create({
      contractId: contract1.id,
      description: "Criação de site",
      operationDate: new Date(),
      paymentDate: null,
      price: 200,
      paid: false,
    });

    const job2 = await Job.create({
      contractId: contract1.id,
      description: "Manutenção de sistema",
      operationDate: new Date(),
      paymentDate: null,
      price: 300,
      paid: false,
    });

  
    const job3 = await Job.create({
      contractId: contract2.id,
      description: "Consultoria técnica",
      operationDate: new Date(),
      paymentDate: null,
      price: 400,
      paid: false,
    });

    const job4 = await Job.create({
      contractId: contract2.id,
      description: "Elaboração de relatório técnico",
      operationDate: new Date(),
      paymentDate: null,
      price: 250,
      paid: false,
    });

    console.log("Dados de exemplo criados com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao criar dados de exemplo:", error);
    process.exit(1);
  }
};

seedDatabase();
