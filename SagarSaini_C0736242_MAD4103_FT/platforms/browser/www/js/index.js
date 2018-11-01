document.addEventListener("deviceReady",createDatabase);
document.getElementById("insertHeroes").addEventListener("click",insertHeroes);
document.getElementById("showHeroes").addEventListener("click",showHeroes);
document.getElementById("rescueMe").addEventListener("click",rescueMe);



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

function showHeroes(){

  alert("show button pressed");
document.getElementById("rescueMe").innerHTML = "";
  db.transaction(
		function(tx){
			tx.executeSql( "SELECT * FROM heroes",
			[],
			displayResults,
			onError )
		},
		onError,
		onReadyTransaction
	)
}



function displayResults( tx, results ){

		if(results.rows.length == 0) {
			alert("No records found");
			return false;
		}

		var row = "";
		for(var i=0; i<results.rows.length; i++) {

			document.getElementById("showResults").innerHTML +=
       "<p>name: "
        +results.rows.item(i).name
        +"<br>"
        +"Available To Hire: "
        +results.rows.item(i).isAvailable;

if(results.rows.item(i).isAvailable == 1) {
  var a = "Yes";
  var b = "No";
} else {

}

		}
  	}




function rescueMe() {

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
