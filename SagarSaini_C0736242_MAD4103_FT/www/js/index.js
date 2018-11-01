document.addEventListener("deviceReady",createDatabase);
document.getElementById("insertHeroes").addEventListener("click",insertHeroes);
document.getElementById("showHeroes").addEventListener("click",showHeroes);


function insertHeroes() {
alert("insert heroes clicked");

db.transaction(
    function(tx){
      tx.executeSql( "INSERT INTO heroes(name,isAvailable) VALUES(?,?)",
      ["Spiderman",1],
      ["Thor",1],
      onSuccessExecuteSql,
      onError )
    },
    onError,
    onReadyTransaction
  )

}






function createDatabase() {
  db = window.openDatabase("superdb", "1.0", "My WebSQL test database", 5*1024*1024);
  	if(!db) {
  		// Test your DB was created
  		alert('Your DB was not created this time');
  		return false
  	}


    db.transaction(
    		function(tx){
    			// Execute the SQL via a usually anonymous function
    			// tx.executeSql( SQL string, arrary of arguments, success callback function, failure callback function)
    			// To keep it simple I've added to functions below called onSuccessExecuteSql() and onFailureExecuteSql()
    			// to be used in the callbacks
    			tx.executeSql(
    				"CREATE TABLE IF NOT EXISTS heroes (name TEXT, isAvailable INTEGER)",
    				[],
    				onSuccessExecuteSql,
    				onError
    			)
    		},
    		onError,
    		onReadyTransaction
    	)
}


function onReadyTransaction( ){
		console.log( 'Transaction completed' )
	}
	function onSuccessExecuteSql( tx, results ){
		console.log( 'Execute SQL completed' )
	}
	function onError( err ){
		console.log( err )
	}
