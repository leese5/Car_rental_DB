// Get the objects we need to modify
let addPersonForm = document.getElementById('add-rental-form-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputBranchId = document.getElementById("input-branch_id");
    let inputBranchAddress = document.getElementById("input-branch_address");
    let inputVehicleId = document.getElementById("input-vehicle_id");
    let inputUserId = document.getElementById("input-user_id");
    let inputUserName = document.getElementById("input-user_name");
    let inputRentalDate = document.getElementById("input-rental_date");
    let inputReturnDate = document.getElementById("input-return_date");
    // Get the values from the form fields
    
    let branchIdValue = inputBranchId.value;
    let branchAddressValue = inputBranchAddress.value;
    let vehicleIdValue = inputVehicleId.value;
    let userIdValue = inputUserId.value;
    let userNameValue = inputUserName.value;
    let rentalDateValue = inputRentalDate.value;
    let returnDateValue = inputReturnDate.value;

    // Put our data we want to send in a javascript object
    let data = {
        
        branch_id: branchIdValue,
        branch_address: branchAddressValue,
        vehicle_id: vehicleIdValue,
        user_id: userIdValue,
        user_name: userNameValue,
        rental_date: rentalDateValue,
        return_date: returnDateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-rental-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputUserId.value = '';
            inputBranchId.value = '';
            inputVehicleId.value = '';
            inputBranchAddress.value = '';
            inputUserName.value = '';
            inputRentalDate.value = '';
            inputReturnDate.value = '';
            
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
    let currentTable = document.getElementById("rental-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    //let idCell = document.createElement("TD");
    let rentalIdCell = document.createElement("TD");
    let branchIdCell = document.createElement("TD");
    let branchAddressCell = document.createElement("TD")
    let vehicleIdCell = document.createElement("TD");
    let userIdCell = document.createElement("TD");
    let userNameCell = document.createElement("TD");
    let rentalDateCell = document.createElement("TD");
    let returnDateCell = document.createElement("TD");

    //delete
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    //idCell.innerText = newRow.id;
    rentalIdCell.innerText = newRow.rental_id;
    branchIdCell.innerText = newRow.branch_id;
    branchAddressCell.innerText = newRow.branch_address;
    vehicleIdCell.innerText = newRow.vehicle_id;
    userIdCell.innerText = newRow.user_id;
    userNameCell.innerText = newRow.user_name;
    rentalDateCell.innerText = newRow.rental_date;
    returnDateCell.innerText = newRow.return_date;

    //delete
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteRental(newRow.rental_id);
    };

    // Add the cells to the row 
    //row.appendChild(idCell);
    row.appendChild(rentalIdCell);
    row.appendChild(branchIdCell);
    row.appendChild(branchAddressCell);
    row.appendChild(vehicleIdCell);
    row.appendChild(userIdCell);
    row.appendChild(userNameCell);
    row.appendChild(rentalDateCell);
    row.appendChild(returnDateCell);
    //delete
    row.appendChild(deleteCell);

    //delete
    row.setAttribute('data-value', newRow.rental_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    
}