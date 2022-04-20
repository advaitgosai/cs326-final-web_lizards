const destination = document.getElementById('destination');
const date = document.getElementById('date');
// In Military time
const time = document.getElementById('time');
const cost = document.getElementById('cost');
const carModel = document.getElementById("car-model");
const carColor = document.getElementById("car-color");
const seats = document.getElementById("seats");


const createButton = document.getElementById("create");

createButton.addEventListener('click', async(e)=>{
    console.log("clicked");
    console.log("Destination value " + destination.value);
    console.log("Date value " + date.value);
    console.log("Time value " + time.value);
    console.log("cost value " + cost.value);
    console.log("car model value " + carModel.value);
    console.log("car color value " + carColor.value);
    console.log("seat value " + seats.value);
});