function calculadoraDeIdade(event) {
	event.preventDefault()
	let dadosUsuario = pegarValores();
	let idade = calcularIdade(dadosUsuario);
	console.log(idade);
}

function pegarValores() {
	let nomeRecebido = document.getElementById("nome").value.trim();
	let diaRecebido = parseInt(document.getElementById("dia-nascimento").value.trim());
	if (isNaN(diaRecebido))
		console.log("O dia não foi imformado corretamente.");
	let mesRecebido = parseInt(document.getElementById("mes-nascimento").value.trim());
	if (isNaN(mesRecebido))
		console.log("O mês não foi imformado corretamente.");
	let anoRecebido = parseInt(document.getElementById("ano-nascimento").value.trim());
	if (isNaN(anoRecebido))
		console.log("O ano não foi imformado corretamente.");
	
	let dadosUsuario = {
		nome: nomeRecebido,
		dia: diaRecebido,
		mes: mesRecebido,
		ano: anoRecebido
	}

	return (dadosUsuario)
}

function calcularIdade(dadosUsuario) {
	let dataHoraAtual = Intl.DateTimeFormat('pt-BR', 
	{dateStyle: "short"}).format(Date.now())

	// let anoAtual = dataHoraAtual.substring(6, 10);
	let mesAtual = parseInt(dataHoraAtual.substring(3, 5));
	// let diaAtual = dataHoraAtual.substring(0, 2)

	// console.log(anoAtual, mesAtual, diaAtual);

	let anoAtual = new Date().getFullYear();
	// let mesAtual = new Date().getMonth();
	let diaAtual = new Date().getDay();

	let idade = anoAtual - dadosUsuario.ano;
	if (mesAtual == dadosUsuario.mes) {
		if (diaAtual >= dadosUsuario.dia)
			idade += 1;
	}
	console.log(mesAtual, dadosUsuario.mes);
	if (mesAtual > dadosUsuario.mes)
		idade += 1;

	return idade
}
