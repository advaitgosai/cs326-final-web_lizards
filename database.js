/*

Outline for database:

include a .env file with the database URL

insert(){
    For Register API:
    create table users initially 
    and then input user with all fields (firstname,lastname,email,password(encrypted),aboutme)

    For Add Ride API:
    create a table rides initially
    input ride with all necessary fields (destination, date,time,cost,carModel,carColor,seats,personal(yes or no))
}

find(){
    For Login API:
    reading from the users table and making sure username and password combination exists

    For get Rides API:
    reading from rides table and finding all rides for a certain date
}

find and update(){
    For update Ride API:
    Replace ride in rides table with the new data for each of tthee fields

    for delete Ride API:
    delete row from rides table with the specific ride ID passed in 
}


*/