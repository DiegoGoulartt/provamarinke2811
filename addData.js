const { Contract, Job, Profile } = require('./models'); 


(async () => {
  try {
    
    const profile = await Profile.create({
      firstName: 'John',
      lastName: 'Doe',
      balance: 1000, 
    });

    console.log('Perfil criado:', profile.id);

    const contract1 = await Contract.create({
      clientId: profile.id, 
      contractorId: profile.id, 
      contractValue: 5000, 
      startDate: new Date(),
      endDate: new Date(), 
    });

    console.log('Primeiro contrato criado:', contract1.id);

    const job1 = await Job.create({
      contractId: contract1.id, 
      description: 'Job 1 - Não pago', 
      paid: false, 
    });

    const job2 = await Job.create({
      contractId: contract1.id,
      description: 'Job 2 - Não pago',
      paid: false,
    });

    console.log('Jobs criados para o primeiro contrato:', job1.id, job2.id);

    const contract2 = await Contract.create({
      clientId: profile.id, 
      contractorId: profile.id, 
      contractValue: 8000, 
      startDate: new Date(),
      endDate: new Date(), 
    });

    console.log('Segundo contrato criado:', contract2.id);


    const job3 = await Job.create({
      contractId: contract2.id, 
      description: 'Job 3 - Não pago', 
      paid: false, 
    });

    const job4 = await Job.create({
      contractId: contract2.id,
      description: 'Job 4 - Pago',
      paid: true, 
      paymentDate: new Date(), 
    });

    console.log('Jobs criados para o segundo contrato:', job3.id, job4.id);

    console.log('Dados inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar dados:', error);
  }
})();
