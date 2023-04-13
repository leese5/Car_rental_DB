/*
{{!--  
Sources:
    This code was written by referencing various resources:
    - Exploration - Developing in Node.JS, https://canvas.oregonstate.edu/courses/1901738/pages/exploration-developing-in-node-dot-js?module_item_id=22733737
    - Activity 2 - Connect webapp to database (Individual), https://canvas.oregonstate.edu/courses/1901738/assignments/9070964?module_item_id=22733669
    
    Kestt van Zyl and Seongki Lee Group 154
 --}}
*/

function deleteUser(userID) {
    let link = '/users/delete-user-ajax/';
    let data = {
      user_id: userID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8", 
      success: function(result) {
        deleteRow(userID);
      }
    });
}

/* function deleteUser(userID) {
    // Put our data we want to send in a javascript object
    let data = {
        user_id: userID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/users/delete-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(userID);
            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
            console.log(xhttp.readyState, xhttp.status)
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}
 */

function deleteRow(userID){

    let table = document.getElementById("user-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == userID) {
            table.deleteRow(i);
            break;
       }
    }
}