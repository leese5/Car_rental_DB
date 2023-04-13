/*
{{!--  
Sources:
    This code was written by referencing various resources:
    - Exploration - Developing in Node.JS, https://canvas.oregonstate.edu/courses/1901738/pages/exploration-developing-in-node-dot-js?module_item_id=22733737
    - Activity 2 - Connect webapp to database (Individual), https://canvas.oregonstate.edu/courses/1901738/assignments/9070964?module_item_id=22733669
    
    Kestt van Zyl and Seongki Lee Group 154
 --}}
*/

// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-branch-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputBranchId = document.getElementById("branchIdSelect");
    let inputBranchAddress = document.getElementById("input-branch_address-update");

    // Get the values from the form fields
    let branchIdValue = inputBranchId.value;
    let branchAddressValue = inputBranchAddress.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    


    // Put our data we want to send in a javascript object
    let data = {
        branch_id: branchIdValue,
        branch_address: branchAddressValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/branches/put-branch-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            console.log(data.branch_address)
            updateRow(xhttp.response, branchIdValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, branchID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("branch-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == branchID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[1];
            
            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].branch_address; 
       }
    }
}