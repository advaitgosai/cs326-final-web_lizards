import express from 'express';
import { RideShareDb } from './database.js';

// let users = {};
// let rides = {};
// let reviews = {};
// const UsersFile = 'users.json';
// const RideFile = 'rides.json'
// const ReviewFile = 'reviews.json'
// let totalRides = 0;

class RideShareServer{
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use('/', express.static('client'));
    this.app.use('/assets', express.static('assets'));
  }
  async initRoutes() {
    const self = this;
    // all of the api routes here 


    this.app.post('/user/create', async (req, res) => {
      const { firstname, lastname, email, password, aboutMe} = req.query;
      const user = await self.db.createUser(firstname,lastname,email,password,aboutMe);
      res.send(JSON.stringify(user));
    });

    this.app.post('/login', async (req, res) =>{
      const { email, password} = req.query;
      const result = await self.db.readUser(email,password);
      res.send(JSON.stringify(result));
    });

    this.app.get('/getRide', async (req, res) => {
      try {
        const { id } = req.query;
        const ride = await self.db.readRide(id);
        res.send(JSON.stringify(ride));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/getAllRides', async (req, res) => {
      try {
        const rides = await self.db.readAllRides();
        res.send(JSON.stringify(rides));
      } catch (err) {
        res.status(500).send(err);
      }
    });

  }
  async initDb() {
    this.db = new RideShareDb(this.dburl);
    await this.db.connect();
  }
  
  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`RideShareServer listening on port ${port}!`);
    });
  }
}
const server = new RideShareServer(process.env.DATABASE_URL);
server.start();

/*
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
async function reloadReviews(filename) {
  try {
    const data = await readFile(filename, { encoding: 'utf8' });
    reviews = JSON.parse(data);
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

async function saveAddRide() {
  try {
    const data = JSON.stringify(rides);
    await writeFile(RideFile, data, { encoding: 'utf8' });
  } catch (err) {
    console.log(err);
  }
}

async function createUser(response,firstname,lastname,email,password,aboutMe) {
    if ( firstname === undefined || lastname=== undefined || email===undefined|| password===undefined || aboutMe===undefined ) {
      // 400 - Bad Request
      response.status(400).json({ error: 'missing info' });
    } else {
      await reloadUsers(UsersFile);
      users[email] = {"firstname":firstname,"lastname": lastname,"password": password, "aboutMe": aboutMe};
      await saveUsers();
      response.json({firstname:firstname,lastname: lastname,email: email,password: password, aboutMe: aboutMe});
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

async function readReviews(response) {
  await reloadReviews(ReviewFile);
  if (reviews != {}) {
    response.json(reviews);
  } else {
    // 404 - Not Found
    response.json({ error: `Reviews Not Found` });
  } 
}

async function readUsers(response) {
  await reloadUsers(UsersFile);
  if (users != {}) {
    response.json(users);
  } else {
    // 404 - Not Found
    response.json({ error: `No User Found` });
  } 
}

async function readAllRides(response) {
  await reloadRides(RideFile);
  if (rides != {}) {
    response.json(rides);
  } else {
    // 404 - Not Found
    response.json({ error: `No Rides Found` });
  } 
} 

async function deleteRide(response, id) {
  if(id === undefined) {
    response.status(400).json({ error: 'Invalid ID' });
  } else {
    await reloadRides(RideFile);
    delete rides[id];
  }
  await saveAddRide();
    response.json({id: id});
}

async function addRides(response, driver, destination, date, time, cost, carModel, carColor, seats) {
  if (destination === undefined || date=== undefined || time===undefined|| cost===undefined || carModel===undefined || carColor===undefined || seats===undefined) {
    // 400 - Bad Request
    response.status(400).json({ error: 'missing info for adding ride' });
  } else {
    await reloadRides(RideFile);
    let personal = "no";
    if((totalRides % 3) === 0) {
      personal = "yes";
    }
    rides[totalRides] = {"driver":driver, "destination":destination,"date":date,"time": time,"cost": cost,"carModel": carModel,"carColor": carColor,"seats": seats,"personal": personal};
    totalRides = totalRides + 1;
    await saveAddRide();
    response.json({driver: driver, destination:destination,date:date,time:time,cost:cost,carModel:carModel,carColor,carColor,seats:seats});
  }
}

async function readUser(response,email,password) {
  await reloadUsers(UsersFile);
  if(email in users){
    if(users[email]["password"] === password){
      response.json({username: email, passsword: password});
    }
    else{
      response.json({ error: `Password Incorrect` });
    }
  }
  else{
    response.json({ error: `Username '${email}' Not Found` });
  } 
}
  
async function updateRide(response, id, destination, date, time, cost, carModel, carColor, seats) {
  if (destination === undefined && date=== undefined && time===undefined && cost===undefined && carModel===undefined && carColor===undefined && seats===undefined) {
    // 400 - Bad Request
    response.status(400).json({ error: 'missing info for updating ride' });
  } 
  else {
    await reloadRides(RideFile);
    if (destination !== "") { 
      rides[id].destination = destination;
    }
    if (date !== "") { 
      rides[id].date = date;
    }
    if (time !== "") { 
      rides[id].time = time;
    }
    if (cost !== "") { 
      rides[id].cost = cost;
    }
    if (carModel !== "") { 
      rides[id].carModel = carModel;
    }
    if (carColor !== "") { 
      rides[id].carColor = carColor;
    }
    if (seats !== "") { 
      rides[id].seats = seats;
    }
    await saveAddRide();
    response.json({id: id, destination:destination,date:date,time:time,cost:cost,carModel:carModel,carColor,carColor,seats:seats});
  }
}

const app = express();
const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/client', express.static('client'));
app.use('/assets', express.static('assets'));

// api for register
app.post('/user/create', async (request, response) => {
  const options = request.body;
  createUser(response,options.firstname,options.lastname,options.email,options.password,options.aboutMe);
});

app.get('/getReviews', async (request, response) => {
  readReviews(response);
});

app.get('/getUsers', async (request, response) => {
  readUsers(response);
});

app.get('/getAllRides', async (request, response) => {
  readAllRides(response);
});

app.get('/getRide', async (request, response) => {
  const options = request.query;
  readRide(response, options.date);
});
  
app.post('/rides/addRides', async (request, response) => {
  const options = request.body;
  console.log(options.destination);
  addRides(response,options.driver, options.destination,options.date,options.time,options.cost,options.carModel,options.carColor,options.seats);
});

// api for login
app.post('/login', async (request, response) =>{
  const options = request.body;
  readUser(response,options.email,options.password)
});


app.put('/rides/updateRide', async (request, response) => {
  const options = request.body;
  updateRide(response, options.id, options.destination,options.date,options.time,options.cost,options.carModel,options.carColor,options.seats);
});

app.delete('/rides/deleteRide', async (request, response) => {
  const options = request.body;
  deleteRide(response, options.id);
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

*/

