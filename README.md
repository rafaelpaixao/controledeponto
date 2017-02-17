# Controle de Ponto
Sistema para controle de ponto em Javascript

## Como utilizar
Faça o download, e abra o arquivo index.html (testado apenas no Google Chrome).

Defina a data, horário, tolerância e informe o nome do funcionário.

Se o horário informado estiver dentro da tolerância para entrada (7:50~8:10 e 13:50~14:10), será possível realizar uma entrada.
Caso já exista uma entrada, é possível realizar uma saída, se a data e o horário de saída forem posteriores a data e o horário de entrada.
Caso o funcionário tenha entrado no turno vespertino, não será possível entrar no turno matutino na mesma data.

O campo "nome" também funciona como filtro. Caso o nome já exista, serão exibidos apenas os dados referentes aquele funcionário.

O objeto que armazena os dados pode ser acessado pelo console através da variável:
```
app.historico.array
```

##[Demo](http://rafaelpaixao.esy.es/controledeponto/).
