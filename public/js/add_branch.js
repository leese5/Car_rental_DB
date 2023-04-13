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
let addPersonForm = document.getElementById('add-branch-form-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputBranchId = document.getElementById("input-branch_id");
    let inputBranchAddress = document.getElementById("input-branch_address");
    
    let inputActive = document.getElementById("input-active");

    // Get the values from the form fields
    let branchIdValue = inputBranchId.value;
    let branchAddressValue = inputBranchAddress.value;
    
    let activeValue = inputActive.value;

    // Put our data we want to send in a javascript object
    let data = {
        branch_id: branchIdValue,
        branch_address: branchAddressValue,
        
        active: activeValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/branches/add-branch-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputBranchId.value = '';
            inputBranchAddress.value = '';
            
            inputActive.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("branch-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    //let idCell = document.createElement("TD");
    let branchIdCell = document.createElement("TD");
    let branchAddressCell = document.createElement("TD");
    let activeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    //idCell.innerText = newRow.id;
    branchIdCell.innerText = newRow.branch_id;
    branchAddressCell.innerText = newRow.branch_address;
    activeCell.innerText = newRow.active;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteBranch(newRow.branch_id);
    };

    // Add the cells to the row 
    //row.appendChild(idCell);
    row.appendChild(branchIdCell);
    row.appendChild(branchAddressCell);
    row.appendChild(activeCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.branch_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("branchIdSelect");
    let option = document.createElement("option");
    option.text = newRow.branch_id;
    option.value = newRow.branch_id;
    selectMenu.add(option);
    // End of new step 8 code.
}