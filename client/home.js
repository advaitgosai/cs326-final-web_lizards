const dateValue = document.getElementById("start");
const testDate = "120421";
let rawDate = dateValue.value;
const formattedDate = rawDate.substring(5, 7) + rawDate.substring(8, 10) + rawDate.substring(2, 4);


async function readRides(date) {
    try {
      const response = await fetch(`/getRide?date=${date}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

const json = await readRides(formattedDate);

const keys = Object.keys(json);

let personalRideKeys = [];
let otherRideKeys = [];
keys.forEach((element) =>  { 
    if(json[element].personal === "yes") {
        personalRideKeys.push(element);
    } else {
        otherRideKeys.push(element);
    }

});

personalRideKeys.forEach((element) =>  {
    const rows = document.getElementById("personal-table-body");

        const item = document.createElement("tr");
        const dest = document.createElement("td");
        const destText = document.createTextNode(json[element].destination);
        const cost = document.createElement("td");
        const costText = document.createTextNode(json[element].cost);
        const model= document.createElement("td");
        const modelText = document.createTextNode(json[element].model);
        const seats = document.createElement("td");
        const seatsText = document.createTextNode(json[element].seats);

        dest.appendChild(destText);
        item.appendChild(dest);
        cost.appendChild(costText);
        item.appendChild(cost);
        model.appendChild(modelText);
        item.appendChild(model);
        seats.appendChild(seatsText);
        item.appendChild(seats);
        rows.appendChild(item);
});

otherRideKeys.forEach((element) =>  {
    const rows = document.getElementById("table-body");

        const item = document.createElement("tr");
        const dest = document.createElement("td");
        const destText = document.createTextNode(json[element].destination);
        const cost = document.createElement("td");
        const costText = document.createTextNode(json[element].cost);
        const model= document.createElement("td");
        const modelText = document.createTextNode(json[element].model);
        const seats = document.createElement("td");
        const seatsText = document.createTextNode(json[element].seats);

        dest.appendChild(destText);
        item.appendChild(dest);
        cost.appendChild(costText);
        item.appendChild(cost);
        model.appendChild(modelText);
        item.appendChild(model);
        seats.appendChild(seatsText);
        item.appendChild(seats);
        rows.appendChild(item);
});



