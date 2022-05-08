const destination = document.getElementById('destination');
// In Military time
const time = document.getElementById('time');
const cost = document.getElementById('cost');
const carModel = document.getElementById("car-model");
const carColor = document.getElementById("car-color");
const seats = document.getElementById("seats");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id);

const updateButton = document.getElementById("update");
const deleteButton = document.getElementById("delete");

updateButton.addEventListener('click', async(e)=>{
    console.log("Destination value " + destination.value);
    console.log("Time value " + time.value);
    console.log("cost value " + cost.value);
    console.log("car model value " + carModel.value);
    console.log("car color value " + carColor.value);
    console.log("seat value " + seats.value);
    const data = await updateRide(id, destination.value,time.value,cost.value,carModel.value,carColor.value,seats.value);
});

deleteButton.addEventListener('click', async(e)=> {
    const data = await deleteRide(id);
})

async function updateRide(id, destination, time, cost, carModel, carColor, seats) {
    const response = await fetch(`/rides/updateRide?id=${id}&destination=${destination}&time=${time}&cost=${cost}&carModel=${carModel}&carColor=${carColor}&seats=${seats}`, {
      method: 'PUT'
    });
    const data = await response.json();
    console.log("data: ",data);
    window.alert("Ride Updated!");
    location.reload();
    return data;
}

async function deleteRide(id){
    const response = await fetch(`/rides/deleteRide?id=${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    console.log("data: ",data);
    window.alert("Ride Deleted!");
    location.reload();
    return data;
}