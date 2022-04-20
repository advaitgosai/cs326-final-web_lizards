import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';

let users = {};
let addRideData = {}

const UsersFile = 'users.json';
const addRideFile = 'addRideFile.json';

async function reloadUsers(filename) {
    try {
      const data = await readFile(filename, { encoding: 'utf8' });
      users = JSON.parse(data);
    } catch (err) {
      users = {};
    }
}

async function reloadAddRide(filename) {
  try {
    const data = await readFile(filename, { encoding: 'utf8' });
    addRideData = JSON.parse(data);
  } catch (err) {
    addRideData = {};
  }
}

async function saveUsers() {
    try {
      const data = JSON.stringify(users);
      await writeFile(UsersFile, data, { encoding: 'utf8' });
    } catch (err) {
      console.log(err);
    }
}

async function saveAddRide() {
  try {
    const data = JSON.stringify(addRideData);
    await writeFile(addRideFile, data, { encoding: 'utf8' });
  } catch (err) {
    console.log(err);
  }
}

async function createUser(response,firstname,lastname,email,password) {
    if ( firstname === undefined || lastname=== undefined || email===undefined|| password===undefined ) {
      // 400 - Bad Request
      response.status(400).json({ error: 'missing info' });
    } else {
      await reloadUsers(UsersFile);
      users[email] = {"firstname":firstname,"lastname": lastname,"password": password};
      await saveUsers();
      response.json({firstname:firstname,lastname: lastname,email: email,password: password});
    }
}

async function addRides(response, destination, date, time, cost, carModel, carColor, seats) {
  if ( destination === undefined || date=== undefined || time===undefined|| cost===undefined || carModel===undefined || carColor===undefined || seats===undefined) {
    // 400 - Bad Request
    response.status(400).json({ error: 'missing info for adding ride' });
  } else {
    await reloadUsers(UsersFile);
    addRideData[destination] = {"date":date,"time": time,"cost": cost, "carModel": carModel, "carColor": carColor, "seats":seats};
    await saveAddRide();
    response.json({destination:destination,date:date,time:time,cost:cost,carModel:carModel,carColor,carColor,seats:seats});
  }
}

const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/client', express.static('client'));
app.use('/assets', express.static('assets'));




// api for register
app.post('/user/create', async (request, response) => {
    const options = request.body;
    createUser(response,options.firstname,options.lastname,options.email,options.password);
});

app.post('/rides/addRides', async (request, response) => {
  const options = request.body;
  addRides(response,options.destination,options.date,options.time,options.cost,options.carModel,options.carColor,options.seats);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});