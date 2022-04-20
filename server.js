import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';

let users = {};
let rides = {};

const UsersFile = 'users.json';
const RideFile = 'rides.json'

async function reloadUsers(filename) {
    try {
      const data = await readFile(filename, { encoding: 'utf8' });
      users = JSON.parse(data);
    } catch (err) {
      users = {};
    }
}

async function reloadRides(filename) {
  try {
    const data = await readFile(filename, { encoding: 'utf8' });
    rides = JSON.parse(data);
  } catch (err) {
    rides = {};
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

async function getRidesByDate(date) {
  let result = [];
  let keys = Object.keys(rides);
  for(let i = 0; i < keys.length; i++) {
    if(rides[keys[i]]["date"] === date) {
      result.push(rides[keys[i]]);
    }
  }
  console.log(result)
  return result;
}

async function readRide(response, date) {
  await reloadRides(RideFile);
  let list = await getRidesByDate(date);
  console.log(list)
  let result = {};
  for(let i = 0; i < list.length; i++) {
    result[i] = list[i];
  }
  // console.log("rides: " + rides);
  console.log(result)
  if (result != {}) {
    response.json(result);
  } else {
    // 404 - Not Found
    response.json({ error: `Rides Not Found` });
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
    console.log("data in server: ", options.firstname,options.lastname,options.email,options.password);
    createUser(response,options.firstname,options.lastname,options.email,options.password);
});

app.get('/getRide', async (request, response) => {
  const options = request.query;
  readRide(response, options.date);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});