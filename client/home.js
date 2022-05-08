const dateValue = document.getElementById("start");
let rawDate = dateValue.value;
console.log(rawDate.value)
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

const json = await readRides(rawDate);


let keys = new Array();
if(json != undefined) {
  keys = Object.keys(json);
}
function handler(e){
  alert(e.target.value);
}



let personalRideKeys = [];
let otherRideKeys = [];
keys.forEach((element) =>  { 
    if(json[element].personal === "yes") {
        personalRideKeys.push(element);
    } else {
        otherRideKeys.push(element);
    }

});

otherRideKeys.forEach((element) =>  {
  const rows = document.getElementById("table-body");

      const item = document.createElement("tr");
      const dest = document.createElement("td");
      const destText = document.createTextNode(json[element].destination);
      const cost = document.createElement("td");
      const costText = document.createTextNode(json[element].cost);
      const model= document.createElement("td");
      const modelText = document.createTextNode(json[element].carModel);
      const seats = document.createElement("td");
      const seatsText = document.createTextNode(json[element].seats);
      const info = document.createElement("td");
      const infoBtn = document.createElement("a");
      const link = "ride-passenger.html?id=" + json[element]._id;
      infoBtn.href = link;
      infoBtn.className = "btn btn-primary btn-rounded"
      const infoText = document.createTextNode("More Info");
      
      dest.appendChild(destText);
      item.appendChild(dest);
      cost.appendChild(costText);
      item.appendChild(cost);
      model.appendChild(modelText);
      item.appendChild(model);
      seats.appendChild(seatsText);
      item.appendChild(seats);
      

      infoBtn.appendChild(infoText);
      info.appendChild(infoBtn);
      item.appendChild(info);

      rows.appendChild(item);
});

personalRideKeys.forEach((element) =>  {
    const rows = document.getElementById("personal-table-body");

        const item = document.createElement("tr");
        const dest = document.createElement("td");
        const destText = document.createTextNode(json[element].destination);
        const cost = document.createElement("td");
        const costText = document.createTextNode(json[element].cost);
        const model= document.createElement("td");
        const modelText = document.createTextNode(json[element].carModel);
        const seats = document.createElement("td");
        const infoBtn = document.createElement("a");
        const seatsText = document.createTextNode(json[element].seats);
        const info = document.createElement("td");
        const link = "ride-passenger.html?id=" + json[element]._id;
        infoBtn.href = link;
        infoBtn.className = "btn btn-primary btn-rounded"
        const infoText = document.createTextNode("More Info");

        dest.appendChild(destText);
        item.appendChild(dest);
        cost.appendChild(costText);
        item.appendChild(cost);
        model.appendChild(modelText);
        item.appendChild(model);
        seats.appendChild(seatsText);
        item.appendChild(seats);

        infoBtn.appendChild(infoText);
        info.appendChild(infoBtn);
        item.appendChild(info);

        rows.appendChild(item);
});





