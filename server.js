import express from 'express';
import { RideShareDb } from './database.js';

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

    this.app.post('/rides/addRides', async (req, res) => {
      const { driver, destination, date, time, cost, carModel, carColor, seats} = req.query;
      const result = await self.db.addARide(driver, destination, date, time, cost, carModel, carColor, seats);
      res.send(JSON.stringify(result))
    });

    this.app.get('/getReviews', async (req, res) => {
      const result = await self.db.readReviews();
      res.send(JSON.stringify(result));
    });

    this.app.get('/getUsers', async (req, res) => {
      const result = await self.db.readUsers();
      res.send(JSON.stringify(result));
    });

    this.app.get('/getAllRides', async (req, res) => {
      const result = await self.db.readAllRides();
      res.send(JSON.stringify(result));
    });    

    this.app.get('/getRide', async (req, res) => {
      const {date} = req.query;
      console.log(date);
      const result = await self.db.getRide(date);
      res.send(JSON.stringify(result));
    });     

    this.app.put('/rides/updateRide', async (req, res) => {
      const {id, destination, time, cost, carModel, carColor, seats} = req.query;
      const result = await self.db.updateRide(id, destination, time, cost, carModel, carColor, seats);
      res.send(JSON.stringify(result));
    });

    this.app.delete('/rides/deleteRide', async (req, res) => {
      const {id} = req.query;
      const result = await self.db.deleteRide(id);
      res.send(JSON.stringify(result));
    });

    this.app.post('/createReview', async (req, res) => {
      const {email, review} = req.query;
      const result = await self.db.createReview(email, review);
      res.send(JSON.stringify(result));
    })

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
