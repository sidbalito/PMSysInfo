
var webdb = {};


// Abrir banco de dados
webdb.open = function(name, version, displayName) {
  var dbSize = 5 * 1024 * 1024; // 5MB
  webdb.db = null;
  webdb.db = openDatabase(name, version, displayName, dbSize);
};

//Em caso de erro
webdb.onError = function(tx, e) {
  alert("There has been an error: " + e.message);
};

//Em caso de sucesso
webdb.onSuccess = function(tx, r) {
  // re-render the data.
  // loadTodoItems is defined in Step 4a
  webdb.getAllRiscosItems(webdb.loadRiscosItems);
};

//Cria a tabela
webdb.createTable = function(tableStruct) {
  var db = webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                  tableStruct, []);
  });
};

//Adiciona um tarefa
webdb.add = function(statement, values) {
  var db = webdb.db;
  db.transaction(function(tx){
    tx.executeSql(statement,
        values,
        webdb.onSuccess,
        webdb.onError);
   });
};

//Obtem todas as tarefas
webdb.getItems = function(statement, renderFunc) {
  var db = webdb.db;
  db.transaction(function(tx) {
    tx.executeSql(statement, [], renderFunc,
        webdb.onError);
  });
};

//Apaga tarefa
webdb.deleteItem = function(statement, values) {
  var db = webdb.db;
  db.transaction(function(tx){
    tx.executeSql(statement, values,
        webdb.onSuccess,
        webdb.onError);
    });
}

//Carrega tarefas
webdb.loadItems = function(rs, todoItems) {
  var rowOutput = "";
  for (var i=0; i < rs.rows.length; i++) {
    rowOutput += webdb.renderFunc(rs.rows.item(i));
  }

  todoItems.innerHTML = rowOutput;
};
