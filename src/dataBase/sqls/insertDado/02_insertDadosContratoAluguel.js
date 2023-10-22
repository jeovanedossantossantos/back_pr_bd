const db = require('../../connect')

db.connect(async function (err) {
    if (err) throw err;
    // para criar um contrato de aluguel preciso
    // funcionario
    // imovel
    // cliente usuario
    // dois indicador
    // fiador
    // forma de pagamento
    // const funcionario = 1
    // const imovel = 4//para alugar
    // const clienteUsuario = 1

    // Dados do primeiro indicador
    const indicador1 = {
        nome: 'Primeiro Indicador',
        cpf: '123.456.789-00', // Substitua pelo CPF correto
        profissao: 'Profissao Indicador 1',
    };

    // Dados do segundo indicador
    const indicador2 = {
        nome: 'Segundo Indicador',
        cpf: '987.654.321-00', // Substitua pelo CPF correto
        profissao: 'Profissao Indicador 2',
    };

    // Dados do fiador
    const fiador = {
        cpf: '111.222.333-44', // Substitua pelo CPF correto
        nome: 'Nome do Fiador',
        endereco_id: 1, // Substitua pelo ID de endereço correto
        telefone: '1122334455', // Substitua pelo telefone correto
        email: 'fiador@email.com', // Substitua pelo email correto
        sexo: 'Masculino', // Substitua pelo sexo correto
        estado_civil: 'Solteiro', // Substitua pelo estado civil correto
        profissao: 'Profissao do Fiador', // Substitua pela profissão correta
    };

    // Inserir o primeiro indicador
    db.query('INSERT INTO indicador SET ?', indicador1, (err, result) => {
        if (err) return console.log(err);
        console.log('Primeiro indicador inserido com sucesso.');
    });

    // Inserir o segundo indicador
    db.query('INSERT INTO indicador SET ?', indicador2, (err, result) => {
        if (err) throw err;
        console.log('Segundo indicador inserido com sucesso.');
    });

    // Inserir o fiador
    db.query('INSERT INTO fiador SET ?', fiador, (err, result) => {
        if (err) throw err;
        console.log('Fiador inserido com sucesso.');
    });
    const pix = { descricao: 'pix' }
    db.query('INSERT INTO formaPagamento SET ?', pix, (err, result) => {
        if (err) throw err;
        console.log(`Forma de pagamento  inserida com sucesso.`);
    });

    // const indicadorUm = 1
    // const indicadorDois = 2
    // const fiadorUm = 1
    // const formaPagamento = 1

    const contratoData = {
        id_funcionario: 1,
        id_imovel: 1, // Substitua pelo ID correto do imóvel que deseja alugar
        id_clienteu: 1,
        id_indic1: 1,
        id_indic2: 2,
        id_fiador: 1,
        id_formpag: 1,
        data_transacao: new Date(), // Use a data de transação real aqui
    };

    // Inserir contrato na tabela contratoAluguel
    db.query('INSERT INTO contratoAluguel SET ?', contratoData, (err, result) => {
        if (err) throw err;
        console.log('Contrato de aluguel criado com sucesso.');
    });

    const imovelId = 1; // ID do imóvel que você deseja atualizar

    const updateData = {
        locacao: false,
        disponivel: false,
    };

    // Atualizar o imóvel com os novos valores
    db.query('UPDATE imovel SET ? WHERE id = ?', [updateData, imovelId], (err, result) => {
        if (err) throw err;
        console.log(`Informações do imóvel ${imovelId} atualizadas com sucesso.`);
    });



})