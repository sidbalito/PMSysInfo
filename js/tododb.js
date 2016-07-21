//
webdb.openTodo = function(){
	webdb.open("Todo", "1", "Todo manager");
};

//
webdb.createTodoTable = function() {
	webdb.createTable("todo(ID INTEGER PRIMARY KEY ASC, todo TEXT, added_on DATETIME)")
};

//
webdb.addTodo = function(todoText) {
    var addedOn = new Date();
	webdb.add("INSERT INTO todo(todo, added_on) VALUES (?,?)",
        [todoText, addedOn]);
};

//
webdb.getAllTodoItems = function(renderFunc) {
	webdb.getItems("SELECT * FROM todo", renderFunc)
};

//
webdb.deleteTodo = function(id){
	webdb.deleteItem("DELETE FROM todo WHERE ID=?", [id]);
};

//
webdb.loadTodoItems = function(tx, rs) {
	webdb.loadItems(rs, document.getElementById("todoItems"));
};

//Rendeniza tarefa
webdb.renderTodo = function(row) {
  return "<li>" + row.todo + 
         " [<a href='javascript:void(0);' onclick=\'webdb.deleteTodo(" + 
         row.ID +");\'>Deletar</a>]</li>";
};

webdb.openTodo();
webdb.createTodoTable();
webdb.getAllTodoItems(webdb.loadTodoItems);
