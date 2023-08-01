
function calculadoraDeIdade(event) {
	let dadosUsuario = {
		nome: '',
		dia: 0,
		mes: 0,
		ano: 0,
		idade: 0,
		faixaEtaria: ''
	}
	event.preventDefault()
	pegarValores(dadosUsuario);
	dadosUsuario.idade = calcularIdade(dadosUsuario);
	dadosUsuario.faixaEtaria = classificarFaixaEtaria(dadosUsuario.idade);
	cadastrarUsuario(dadosUsuario)
	console.log(dadosUsuario);
}

function pegarValores(dadosUsuario) {
	dadosUsuario.nome = document.getElementById("nome").value.trim();
	dadosUsuario.dia = parseInt(document.getElementById("dia-nascimento").value.trim());
	if (isNaN(dadosUsuario.dia))
		console.log("O dia não foi imformado corretamente.");
	dadosUsuario.mes = parseInt(document.getElementById("mes-nascimento").value.trim());
	if (isNaN(dadosUsuario.mes))
		console.log("O mês não foi imformado corretamente.");
	dadosUsuario.ano = parseInt(document.getElementById("ano-nascimento").value.trim());
	if (isNaN(dadosUsuario.ano))
		console.log("O ano não foi imformado corretamente.");	
}

function calcularIdade(dadosUsuario) {
	let dataHoraAtual = Intl.DateTimeFormat('pt-BR', 
	{dateStyle: "short"}).format(Date.now())

	const anoAtual = parseInt(dataHoraAtual.substring(6, 10));
	const mesAtual = parseInt(dataHoraAtual.substring(3, 5));
	const diaAtual = parseInt(dataHoraAtual.substring(0, 2))

	// console.log(anoAtual, mesAtual, diaAtual);
	// const anoAtual = new Date().getFullYear();
	// const mesAtual = new Date().getMonth();
	// const diaAtual = new Date().getDay();

	let idade = anoAtual - dadosUsuario.ano;
	if (mesAtual < dadosUsuario.mes)
		idade -= 1;
	else if (mesAtual == dadosUsuario.mes){
		if (diaAtual < dadosUsuario.dia)
			idade -= 1;
	}
	return (idade)
}

function classificarFaixaEtaria(idade) {
	if (idade <= 12)
		return ("Criança.")
	if (idade <= 17)
		return ("Adolescente.")
	if (idade <= 65)
		return ("Adulto.")
	if (idade <= 99)
		return ("Idoso.")
	if (idade > 100)
		return ("Tá fazendo hora extra.")
}

function cadastrarUsuario(dadosUsuario) {
	let listaUsuarios = []

	if (localStorage.getItem("usuariosCadastrados"))
		listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
	
	listaUsuarios.push(dadosUsuario);

	localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}

function mostrarTabela(usuariosCadastrados) {
	let tabela = document.getElementById("corpo-tabela");
	let template = '';

	usuariosCadastrados.forEach(item => {
		//espaços no data-cell??????
		template += `<tr>
						<td data-cell="nome">${item.nome}</td>
						<td data-cell="data de nascimento">${item.dia + '/' + item.mes + '/' + 
															item.ano}</td>
						<td data-cell="idade">${item.idade}</td>
						<td data-cell="faixa etária">${item.faixaEtaria}</td>
					</tr>`
	});
	tabela.innerHTML = template;
}

function carregarUsuarios(params) {
	let listaUsuarios = [];
	let tabela = ''

    if (localStorage.getItem("usuariosCadastrados")) 
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
		if (listaUsuarios.length == 0) {
			tabela = document.getElementById("corpo-tabela")
			tabela.innerHTML = `<tr class="linha-mensagem">
			<td colspan="6">Nenhum usuario cadastrado!</td>
			</tr>`
		}
		else {
		mostrarTabela(listaUsuarios);
	}
}

window.addEventListener('DOMContentLoaded', () => carregarUsuarios());

function deletarRegistros() {
	localStorage.removeItem("usuariosCadastrados");
	window.location.reload();
}
