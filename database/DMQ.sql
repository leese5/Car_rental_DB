
-- get all  IDs to display on Rentals page
SELECT rental_id, branch_id, user_id FROM Rental_History

-- get all information to display on Branches page
SELECT branch_id, branch_address, vehicle_id, active FROM Branches

-- get all information to display on Users page
SELECT user_id, user_name, rental_date, return_date FROM Users

-- get all information to display on Vehicles page
SELECT vehicle_id, segment, brand, name, plate, active FROM Vehicles

-- get a single Rental's data for the Update Rental form
SELECT rental_id, branch_id, user_id FROM Rental_History WHERE 
branch_id = :branch_ID_selected_from_rentals_page

-- get all branch_id data to populate a dropdown for selecting a branch id
SELECT branch_id FROM Branches

-- get all user_id data to populate a dropdown for selecting a user id
SELECT user_id FROM Users

-- get all branch_id data to populate a dropdown for selecting a vehicle id
SELECT vehicle_id FROM Vehicles

-- get all active data to populate a dropdown for selecting the active status
SELECT active FROM Branches

-- add a new Rental
INSERT INTO Rental_History (rental_id, branch_id, user_id) VALUES 
(:rental_id_input, :branch_id_from_dropdown_input, :user_id_input)

-- add a new Branch
INSERT INTO Branches (branch_id, branch_address, active) VALUES 
(:branch_id_input, :branch_address_input, :active_from_dropdown_input)

-- add a new User
INSERT INTO Users (user_id, user_name) VALUES 
(:user_id_input, :user_name_input)

-- add a new Vehicle
INSERT INTO Vehicles (vehicle_id, segment, brand, name, plate) VALUES 
(:vehicle_id_input, :segment_input, :brand_input, :name_input, :plate_input)

-- update a Vehicle data based on submission of the Update Vehicle form 
UPDATE Vehicles SET vehicle_id = :vehicle_id_input, segment = :segment_input, brand = :brand_input,
name = :name_input, plate = :plate_input WHERE 
vehicle_id = :vehicle_id_input

-- update a Branch data based on submission of the Update Branch form
UPDATE Branches SET branch_address = :update_branch_address_input, active = :update_branch_active_input WHERE 
branch_id = update_branch_branch_id_input 

-- delete a Vehicle
DELETE FROM Vehicles WHERE vehicle_id = :vehicle_id_selected_from_vehicle_id_dropdown

-- delete a Branch
DELETE FROM Branches WHERE branch_id = :delete_branch_selected_from_branch_id_dropdown

-- delete a User
DELETE FROM Users WHERE user_id = :user_id_selected_from_user_id_dropdown
