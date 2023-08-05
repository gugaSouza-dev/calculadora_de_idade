function gerarDadaAtual() {
	dataAtual = {
		dia: 0,
		mes: 0,
		ano: 0
	}
	let dataHoraAtual = Intl.DateTimeFormat('pt-BR', 
	{dateStyle: "short"}).format(Date.now())

	dataAtual.dia = parseInt(dataHoraAtual.substring(0, 2));
	dataAtual.mes = parseInt(dataHoraAtual.substring(3, 5));
	dataAtual.ano = parseInt(dataHoraAtual.substring(6, 10));
	return (dataAtual)
}

//TRATAMENTO DE INPUTS
function inputMinMax(dataAtual) {
	let input = ''

	input = document.getElementById("ano-nascimento");
	input.setAttribute("max", dataAtual.ano)

	input = document.getElementById("mes-nascimento");
	input.setAttribute("max", 12)
	input.setAttribute("min", 1)

	input = document.getElementById("dia-nascimento");
	input.setAttribute("max", 31)
	input.setAttribute("min", 1)
}

function validacaoData(usuario, dataAtual) {
	let p = ''

	if (usuario.dia && usuario.mes && usuario.ano) {
		p = document.getElementById("p-erro");
		console.log(usuario.ano, dataAtual.ano);
		if (usuario.ano == dataAtual.ano) {
			if (usuario.mes == dataAtual.mes) {
				if (usuario.dia > dataAtual.dia) {
					p.style = "color: #FD3B3B; font-size: 15px";
					console.log("A data informada não pode estar no futuro.");
					return (false);
				}
			}
			if (usuario.mes > dataAtual.mes) {
				p.style = "color: #FD3B3B; font-size: 15px";
				console.log("A data informada não pode estar no futuro.");
				return (false);	
			}
		}
		p.style = "display: none";
		return (true)
	}
	else
		return (false)
}

function pegarValores(dadosUsuario, dataAtual) {
	inputMinMax(dataAtual)
	dadosUsuario.nome = document.getElementById("nome").value.trim();
	dadosUsuario.dia = parseInt(document.getElementById("dia-nascimento").value.trim());
	if (isNaN(dadosUsuario.dia))
		console.log("O dia não foi informado corretamente.");
	dadosUsuario.mes = parseInt(document.getElementById("mes-nascimento").value.trim());
	if (isNaN(dadosUsuario.mes))
		console.log("O mês não foi informado corretamente.");
	dadosUsuario.ano = parseInt(document.getElementById("ano-nascimento").value.trim());
	if (isNaN(dadosUsuario.ano))
		console.log("O ano não foi informado corretamente.");
}

//MAIN
function calculadoraDeIdade(event) {
	let dadosUsuario = {
		nome: '',
		dia: 0,
		mes: 0,
		ano: 0,
		idade: 0,
		faixaEtaria: ''
	}
	event.preventDefault();
	let dataAtual = gerarDadaAtual();
	pegarValores(dadosUsuario, dataAtual);
	if (!validacaoData(dadosUsuario, dataAtual))
		return (-1)
	if (isNaN(dadosUsuario.dia) || isNaN(dadosUsuario.mes) || isNaN(dadosUsuario.ano))
		return (-1)
	dadosUsuario.idade = calcularIdade(dadosUsuario);
	dadosUsuario.faixaEtaria = classificarFaixaEtaria(dadosUsuario.idade);
	cadastrarUsuario(dadosUsuario)
	window.location.reload();
}

function calcularIdade(dadosUsuario) {
	let dataAtual = gerarDadaAtual();
	let idade = 0;
	// console.log(anoAtual, mesAtual, diaAtual);
	// const anoAtual = new Date().getFullYear();
	// const mesAtual = new Date().getMonth();
	// const diaAtual = new Date().getDay();

	if (dadosUsuario.ano < 0)
		idade += (dadosUsuario.ano * -1)
	idade += dataAtual.ano - dadosUsuario.ano;
	if (dataAtual.mes < dadosUsuario.mes)
		idade -= 1;
	else if (dataAtual.mes == dadosUsuario.mes){
		if (dataAtual.dia < dadosUsuario.dia)
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
		return ("Nosferatu.")
}

function cadastrarUsuario(dadosUsuario) {
	let listaUsuarios = []

	if (localStorage.getItem("usuariosCadastrados"))
		listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
	
	listaUsuarios.push(dadosUsuario);

	localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}

//RENDERIZAÇÃO NA TELA
function mostrarTabela(usuariosCadastrados) {
	let tabela = document.getElementById("corpo-tabela");
	let template = '';

	usuariosCadastrados.forEach(item => {
		//data cell: usado no responsivo quando a tabela encolhe
		if (item.ano > -1) {
			template += `<tr>
							<td data-cell="nome">${item.nome}</td>
							<td data-cell="data de nascimento">${item.dia + '/' + item.mes + '/' + 
																item.ano}</td>
							<td data-cell="idade">${item.idade}</td>
							<td data-cell="faixa etária">${item.faixaEtaria}</td>
						</tr>`
		}
		else{
			template += `<tr>
							<td data-cell="nome">${item.nome}</td>
							<td data-cell="data de nascimento">${item.dia + '/' + item.mes + '/' + 
																(item.ano * -1) + " B.C."}</td>
							<td data-cell="idade">${item.idade}</td>
							<td data-cell="faixa etária">${item.faixaEtaria}</td>
						</tr>`
		}
	});
	tabela.innerHTML = template;
}

function carregarUsuarios() {
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
	else
		mostrarTabela(listaUsuarios);
}

window.addEventListener('DOMContentLoaded', () => carregarUsuarios());

function deletarRegistros() {
	localStorage.removeItem("usuariosCadastrados");
	window.location.reload();
}
