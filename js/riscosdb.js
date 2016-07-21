
webdb.renderFunc = webdb.loadRiscosItems;
//
webdb.openPMDB = function(){
	webdb.open("PMDB", "1", "Gestão de Projetos");
};


//
webdb.createRiscosTable = function() {
	webdb.createTable("riscos(ID INTEGER PRIMARY KEY ASC, risco TEXT, added_on DATETIME)");
};

//
webdb.addRisco = function(todoText) {
    var addedOn = new Date();
	webdb.add("INSERT INTO riscos(risco, added_on) VALUES (?,?)",
        [todoText, addedOn]);
};

//
webdb.getAllRiscosItems = function(renderFunc) {
	webdb.getItems("SELECT * FROM riscos", renderFunc);
};

//
webdb.deleteRisco = function(id){
	webdb.deleteItem("DELETE FROM riscos WHERE ID=?", [id]);
};

//
webdb.loadRiscosItems = function(tx, rs) {
	webdb.loadItems(rs, document.getElementById("riscosItems"));
};

//Rendeniza tarefa
webdb.renderFunc = function(row) {
  return "<li>" + row.risco + 
         " [<a href='javascript:void(0);' onclick=\'webdb.deleteRisco(" + 
         row.ID +");\'>Delete</a>]</li>";
};

webdb.openPMDB();
webdb.createRiscosTable();

webdb.getAllRiscosItems(webdb.loadRiscosItems);

