var view={
	botaoConfirmar:{
		select: $('#input_botao_confirmar'),
		setEntrada: function(){
			this.select.removeClass( "btn-danger btn-default disabled" ).addClass( "btn-success" ).html("Entrada");
		},
		setSaida: function(){
			this.select.removeClass( "btn-success btn-default disabled" ).addClass( "btn-danger" ).html("Saída");
		},
		setDesabilitado: function(){
			this.select.removeClass( "btn-success btn-danger" ).addClass( "btn-default disabled").html("Ação indisponível");
		},
		setDiaCompleto: function(){
			this.select.removeClass( "btn-success btn-danger" ).addClass( "btn-default disabled").html("Dia completo");
		},
		setHorarioInvalido: function(){
			this.select.removeClass( "btn-success btn-danger" ).addClass( "btn-default disabled").html("Horário inválido");
		},
		getString: function(){
			return this.select.html();
		}
	},
	turnoAtual:{
		select: $('#span_turno_atual'),
		setMatutino: function(){
			this.select.text('Matutino');
		},
		setVespertino: function(){
			this.select.text('Vespertino');
		},
		setNenhum: function(){
			this.select.text('Nenhum');
		},
		getString: function(){
			return this.select.text();
		}
	},
	inputNome:{
		select: $("#input_nome"),
		getString: function(){
			return this.select.val();
		},
		setValor: function(valor){
			this.select.val(valor);
		},
		valida: function(){
			var valor = this.getString().replace(/[^a-zA-Z]+/g, '');
			this.setValor(valor);
		}

	},
	inputTolerancia:{
		select: $("#input_tolerancia"),
		getString: function(){
			return this.select.val();
		},
		setValor: function(valor){
			this.select.val(valor);
		},
		valida: function(){
			var valor = parseInt(this.getString());
			if(valor<0){
				this.setValor(0);
			}else if(valor>60){
				this.setValor(60)
			}
		}
	},
	inputData:{
		select: $("#input_data"),
		selectComponent: $("#datepicker"),
		getString: function(){
			return this.select.val();
		}
	},
	inputHorario:{
		select: $("#input_horario"),
		selectComponent: $("#timepicker"),
		getString: function(){
			return this.select.val();
		}
	},
	tituloHistorico:{
		select: $("#titulo_historico"),
		setPadrao: function(){
			this.select.text("Histórico");
		},
		setFiltro: function(nome){
			this.select.text("Histórico (exibindo: "+nome+")");
		}
	},
	tabelaHistorico:{
		select: $("#tabela_historico tbody"),
		selectComponent: $("#tabela_historico"),
		numCol: 5,
		esvaziar: function(){
			this.select.empty();
		},
		setCarregando: function(){
			this.select.empty().append($('<tr><td colspan='+this.numCol+' class="text-center"><i class="fa fa-spinner fa-pulse fa-fw fa-3x"></i><span class="sr-only"></span></td></tr>')).fadeIn('slow');
		},
		setNenhumaEntrada: function(){
			this.select.empty().append($('<tr><td colspan='+this.numCol+'>Nenhuma entrada.</td></tr>'));
		},
		addLinha: function(valores){
			var linha="<tr>";
			for (var i = 0; i < valores.length; i++){
				linha +="<td>"+valores[i]+"</td>";
			}
			linha += "</tr>";
			this.select.append($(linha));
		},
		addHistorico: function(historico){
			this.esvaziar();
			for (var i = 0; i < historico.length; i++){
				var valores=[];
				valores.push(historico[i].nome);
				valores.push(historico[i].data);
				valores.push(historico[i].turno);
				valores.push(historico[i].acao);
				valores.push(historico[i].horario);
				this.addLinha(valores);
			}
		}
	},
	alerta:{
		anexaEm: '#box_alertas',
		erro: function(msg){
			var html = '<div class="alert alert-danger"><strong>ERRO!</strong> '+msg+'</div>';
			$(html).appendTo(this.anexaEm).fadeIn( 400 ).delay( 4000 ).fadeOut( 400 );
		},
		sucesso: function(msg){
			var html = '<div class="alert alert-success"><strong>SUCESSO!</strong> '+msg+'</div>';
			$(html).appendTo(this.anexaEm).fadeIn( 400 ).delay( 4000 ).fadeOut( 400 );
		}
	}
}