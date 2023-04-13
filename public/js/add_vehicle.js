/*
{{!--  
Sources:
    This code was written by referencing various resources:
    - Exploration - Developing in Node.JS, https://canvas.oregonstate.edu/courses/1901738/pages/exploration-developing-in-node-dot-js?module_item_id=22733737
    - Activity 2 - Connect webapp to database (Individual), https://canvas.oregonstate.edu/courses/1901738/assignments/9070964?module_item_id=22733669
    
    Kestt van Zyl and Seongki Lee Group 154
 --}}
*/

let addPersonForm = document.getElementById('add-vehicle-form-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputVehicleId = document.getElementById("input-vehicle_id");
    let inputSegment = document.getElementById("input-segment");
    let inputBrand = document.getElementById("input-brand");
    let inputName = document.getElementById("input-name");
    let inputPlate = document.getElementById("input-plate");
    let inputActive = document.getElementById("input-active");

    // Get the values from the form fields
    let vehicleIdValue = inputVehicleId.value;
    let segmentValue = inputSegment.value;
    let brandValue = inputBrand.value;
    let nameValue = inputName.value;
    let plateValue = inputPlate.value;
    let activeValue = inputActive.value;

    // Put our data we want to send in a javascript object
    let data = {
        vehicle_id: vehicleIdValue,
        segment: segmentValue,
        brand: brandValue,
        name: nameValue,
        plate: plateValue,
        active: activeValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/vehicles/add-vehicle-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputVehicleId.value = '';
            inputSegment.value = '';
            inputBrand.value = '';
            inputName.value = '';
            inputPlate.value = '';
            inputActive.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
            console.log(inputVehicleId.value,inputSegment.value,inputBrand.value,inputName.value,inputPlate.value,inputActive.value)
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("vehicle-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    //let idCell = document.createElement("TD");
    let vehicleIdCell = document.createElement("TD");
    let segmentCell = document.createElement("TD");
    let brandCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let plateCell = document.createElement("TD");
    let activeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    //idCell.innerText = newRow.id;
    vehicleIdCell.innerText = newRow.vehicle_id;
    segmentCell.innerText = newRow.segment;
    brandCell.innerText = newRow.brand;
    nameCell.innerText = newRow.name;
    plateCell.innerText = newRow.plate;
    activeCell.innerText = newRow.active;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteVehicle(newRow.vehicle_id);
    };

    // Add the cells to the row 
    //row.appendChild(idCell);
    row.appendChild(vehicleIdCell);
    row.appendChild(segmentCell);
    row.appendChild(brandCell);
    row.appendChild(nameCell);
    row.appendChild(plateCell);
    row.appendChild(activeCell);

    row.setAttribute('data-value', newRow.vehicle_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}