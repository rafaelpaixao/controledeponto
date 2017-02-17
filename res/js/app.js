var app={
	historico:{
		array: [],
		getHistoricoPorNome: function(nome){
			var f = [];
			for(var i=0; i<this.array.length; i++){
				if(this.array[i].nome==nome){
					f.push(this.array[i]);
				}
			}
			return f;
		},
		getHistoricoPorNomeETurno: function(nome,turno){
			var f = [];
			for(var i=0; i<this.array.length; i++){
				if(this.array[i].nome==nome && this.array[i].turno==turno){
					f.push(this.array[i]);
				}
			}
			return f;
		},
		adicionar: function(_nome,_data,_turno,_acao,_horario){
			this.array.push({nome: _nome,data: _data,turno: _turno,acao: _acao,horario: _horario});
			view.alerta.sucesso("Entrada adicionada.");
		}
	},
	inicializar: function(){
		//Ativa o datepicker
		$('#datepicker').datetimepicker({
			locale:'pt-br',
			format: 'DD/MM/YYYY',
			defaultDate: new Date()
		});
		//Ativa o timepicker
		$('#timepicker').datetimepicker({
			locale:'pt-br',
			format: 'LT',
			defaultDate: new Date()
		});
		this.atualizaDados();
	},
	atualizaDados: function(){
		var inputNome = view.inputNome.getString();
		var historico = app.historico.getHistoricoPorNome(inputNome);
		if(historico.length>0){
			if(this.isDiaCompleto(historico)){
				view.turnoAtual.setNenhum();
				view.botaoConfirmar.setDiaCompleto();
			}else if(!this.temDataNoHistorico(historico,view.inputData.getString())){
				this.setTurnoPorString("Matutino");
				if(this.isHorarioDentroDaTolerancia()){
					view.botaoConfirmar.setEntrada();
				}else{
					view.botaoConfirmar.setHorarioInvalido();
				}
			}else if(this.isTurnoAberto(historico,"Matutino")){
				this.setTurnoPorString("Matutino");
				view.botaoConfirmar.setSaida();
			}else{
				this.setTurnoPorString("Vespertino");
				if(this.isTurnoAberto(historico,"Vespertino")){
					view.botaoConfirmar.setSaida();
				}else if(this.isHorarioDentroDaTolerancia()){
					view.botaoConfirmar.setEntrada();
				}else{
					view.botaoConfirmar.setHorarioInvalido();
				}
			}
			view.tabelaHistorico.addHistorico(historico);
			view.tituloHistorico.setFiltro(inputNome);
		}else{
			this.setDadosPeloHorario();
			view.tituloHistorico.setPadrao();
			if(app.historico.array.length>0){
				view.tabelaHistorico.addHistorico(app.historico.array);
			}else{
				view.tabelaHistorico.setNenhumaEntrada();
			}
		}
	},
	getTurnoAberto: function(historico){
		if(this.isTurnoAberto(historico,"Matutino")){
			return "Matutino";
		}else if(this.isTurnoAberto(historico,"Vespertino")){
			return "Vespertino";
		}else{
			return "";
		}
	},
	setTurnoPorString: function(turno){
		if(turno=="Matutino"){
			view.turnoAtual.setMatutino();
		}else if(turno=="Vespertino"){
			view.turnoAtual.setVespertino();
		}else{
			view.turnoAtual.setNenhum();
		}
	},
	isTurnoAberto: function(historico,turno){
		var inputData = view.inputData.getString();
		var temEntrada = false;
		for(var i=0; i<historico.length; i++){
			if(historico[i].data==inputData && historico[i].turno==turno){
				if(historico[i].acao=="Saída"){
					return false;
				}else if(historico[i].acao=="Entrada"){
					temEntrada = true;
				}
			}
		}
		return temEntrada;
	},
	isDiaCompleto: function(historico){
		var inputData = view.inputData.getString();
		for(var i=0; i<historico.length; i++){
			if(historico[i].data==inputData && historico[i].acao=="Saída" && historico[i].turno=="Vespertino"){
				return true;
			}
		}
		return false;
	},
	addEntrada: function(){
		var acao = view.botaoConfirmar.getString();
		if(!this.isNomeValido()){
			view.alerta.erro("É necessário informar o nome.");
		}else if(acao=="Horário inválido" || (acao=="Entrada" && !app.isHorarioDentroDaTolerancia())){
			view.alerta.erro("O horário está fora da tolerância para entrada.");
		}else if(acao=="Saída" && !app.isSaidaDepoisDaEntrada()){
			view.alerta.erro("O horário de saída é anterior ao horário de entrada.");
		}else{
			var nome = view.inputNome.getString();
			var data = view.inputData.getString();
			var horario = view.inputHorario.getString();
			var turno = view.turnoAtual.getString();
			this.historico.adicionar(nome,data,turno,acao,horario);
			this.atualizaDados();
		}
	},
	isNomeValido: function(){
		var nome = view.inputNome.getString();
		return nome.length!=0;
	},
	isHorarioDentroDaTolerancia: function(){
		var entradaHorario = view.inputHorario.getString().split(":");
		var horario={
			horas:parseInt(entradaHorario[0]),
			minutos:parseInt(entradaHorario[1])
		}
		var entradaTolerancia = parseInt(view.inputTolerancia.getString());
		var tolerancia={
			min: 60-entradaTolerancia,
			max: 0+entradaTolerancia
		}

		var testeMin = (horario.horas==7 || horario.horas==13) && horario.minutos>=tolerancia.min;
		var testeMax = (horario.horas==8 || horario.horas==14) && horario.minutos<=tolerancia.max;

		return testeMin || testeMax;
	},
	isSaidaDepoisDaEntrada(){
		var historico = this.historico.getHistoricoPorNomeETurno(view.inputNome.getString(),view.turnoAtual.getString());
		var dateEntrada = this.formataDataParaDate(historico[0].data,historico[0].horario);
		var dateSaida = this.formataDataParaDate(view.inputData.getString(),view.inputHorario.getString());
		return dateSaida > dateEntrada;
	},
	setTurnoPeloHorario: function(){
	},
	setDadosPeloHorario: function(){
		//set turno
		var entradaHorario = view.inputHorario.getString().split(":");
		var horas = parseInt(entradaHorario[0]);
		if(horas<12){
			view.turnoAtual.setMatutino();
		}else{
			view.turnoAtual.setVespertino();
		}

		//set botão
		var inputNome = view.inputNome.getString();
		if(inputNome.length>0){
			if(this.isHorarioDentroDaTolerancia()){
				view.botaoConfirmar.setEntrada();
			}else{
				view.botaoConfirmar.setHorarioInvalido();
			}
		}else{
			view.botaoConfirmar.setDesabilitado();
		}
	},
	formataDataParaDate: function(data,horario){
		data = data.split("/");
		data = {
			dia: parseInt(data[0]),
			mes: parseInt(data[1]),
			ano: parseInt(data[2]),
		};
		horario = horario.split(":");
		horario = {
			hora: parseInt(horario[0]),
			minuto: parseInt(horario[1]),
			segundo: 0,
			milissegundo: 0
		};
		return new Date(data.ano,data.mes,data.dia,horario.hora,horario.minuto,horario.segundo,horario.milissegundo);
	},
	temDataNoHistorico: function(historico,data){
		for(var i=0; i<historico.length; i++){
			if(historico[i].data==data){
				return true;
			}
		}
		return false;
	}
}
