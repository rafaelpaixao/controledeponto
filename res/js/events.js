view.botaoConfirmar.select.click(function(){
	app.addEntrada();
});

//Pega alterações nas inputs
view.inputNome.select.change(function(){
	view.inputNome.valida();
	app.atualizaDados();
});

view.inputNome.select.keyup(function(){
	view.inputNome.valida();
	app.atualizaDados();
});

view.inputTolerancia.select.change(function(){
	view.inputTolerancia.valida();
	app.atualizaDados();
});

view.inputTolerancia.select.keyup(function(){
	view.inputTolerancia.valida();
	app.atualizaDados();
});

view.inputHorario.selectComponent.on("dp.change", function (e) {
    app.atualizaDados();
});

view.inputData.selectComponent.on("dp.change", function (e) {
    app.atualizaDados();
});

