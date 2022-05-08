async function readReviews() {
    try {
      const response = await fetch(`/getReviews`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function readRides() {
    try {
      const response = await fetch(`/getAllRides`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function readUsers() {
    try {
      const response = await fetch(`/getUsers`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

const reviewJson = await readReviews();

const rideJson = await readRides();

const userJson = await readUsers();

var today = new Date();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const reviewKeys = Object.keys(reviewJson);

const rideKeys = Object.keys(rideJson);

console.log(reviewJson);

let count = 0;

reviewKeys.forEach((element) =>  {
    const rows = document.getElementById("review-table"); 
    const item = document.createElement("tr");
    const comment = document.createElement("td");

    let driverName;

    rideKeys.forEach((element) =>  {
      console.log(element);
      if(rideJson[element]._id === id) {
        userJson.forEach(x => {
          if (x["email"] === rideJson[element].driver) {
            driverName = x["email"];
            console.log(driverName);
          }
        })
      }
    });
    
    if(reviewJson[element].driver === driverName) {
      const commentText = document.createTextNode(reviewJson[element].review);
      comment.appendChild(commentText);
      item.appendChild(comment);
      rows.appendChild(item);
      count++;
    }
});

if(count === 0) {
  const rows = document.getElementById("review-table"); 
  const item = document.createElement("tr");
  const comment = document.createElement("td");
  const commentText = document.createTextNode("Driver has no reviews!");
  comment.appendChild(commentText);
  item.appendChild(comment);
  rows.appendChild(item);
}

rideKeys.forEach((element) =>  {
  console.log(element);
  if(rideJson[element]._id === id) {
    let driverName;
    let driverAbout;
    userJson.forEach(x => {
      if (x["email"] == rideJson[element].driver) {
        driverName = x["firstname"];
        driverAbout = x["aboutMe"];
      }
    })

    const cardDate = document.getElementById("card-date");
    const dateText = document.createTextNode("Date: " + rideJson[element].date);

    const carModel = document.getElementById("car-model");
    const carModelText = document.createTextNode("Car Model: " + rideJson[element].carModel);
    const carColor = document.getElementById("car-color");
    const carColorText = document.createTextNode("Car Color: " + rideJson[element].carColor);
    const carSeats = document.getElementById("car-seats");
    const carSeatsText = document.createTextNode("# of Seats: " + rideJson[element].seats);
    const cost = document.getElementById("cost");
    const costText = document.createTextNode("Cost: $" + rideJson[element].cost);
    const contact = document.getElementById("contact");
    const contactText = document.createTextNode("Contact Driver: " + rideJson[element].driver + " to book your spot and discuss payment");
    const cardTime = document.getElementById("card-time");
    const timeText = document.createTextNode("Ride to " + rideJson[element].destination + " at " + rideJson[element].time);

    const card = document.getElementById("card-info"); 
    const title = document.createElement("h5");
    //console.log(userJson[rideJson[element].driver].firstname)

    const titleText = document.createTextNode("Driver: " + driverName);
    const bio = document.createElement("p");
    //console.log(userJson[rideJson[element].driver].aboutMe)
    const bioText = document.createTextNode(driverAbout);

    carModel.appendChild(carModelText);
    carColor.appendChild(carColorText);
    carSeats.appendChild(carSeatsText);
    cost.appendChild(costText);
    contact.appendChild(contactText);
    cardDate.appendChild(dateText);

    cardTime.appendChild(timeText);

    title.appendChild(titleText);
    bio.appendChild(bioText);
    card.appendChild(title);
    card.appendChild(bio);
  }
});