const driver = document.getElementById('driver');
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
    console.log("Driver value " + driver.value);
    console.log("Destination value " + destination.value);
    console.log("Date value " + date.value);
    console.log("Time value " + time.value);
    console.log("cost value " + cost.value);
    console.log("car model value " + carModel.value);
    console.log("car color value " + carColor.value);
    console.log("seat value " + seats.value);
    const data = await addRides(driver.value,destination.value,date.value,time.value,cost.value,carModel.value,carColor.value,seats.value);
    console.log("user registered: ",data);
});

async function addRides(driver,destination, date, time, cost, carModel, carColor, seats) {
    const response = await fetch(`/rides/addRides?driver=${driver}?destination=${destination}?date=${date}
    ?time=${time}?cost=${cost}?carModel=${carModel}?carColor=${carColor}?seats=${seats}`, {
      method: 'POST',
    });
    const data = await response.json();
    console.log("data: ",data);
    window.alert("Ride Created!");
    location.reload();
    return data;
}