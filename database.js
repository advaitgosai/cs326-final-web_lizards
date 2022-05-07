import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';


export class RideShareDb {
    constructor(dburl) {
      this.dburl = dburl;
    }
    async connect() {
        this.client = await MongoClient.connect(this.dburl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverApi: ServerApiVersion.v1,
        });
    
        // Get the database.
        this.db = this.client.db('ride-share');
    
        // Init the database.
        await this.init();
    }

    async init() {
        this.usersCollection = this.db.collection('users');
        this.ridesCollection = this.db.collection('rides');
        this.reviewsCollection = this.db.collection('reviews');
    }

        // Close the pool.
    async close() {
        this.client.close();
    }

    // add all api functions

    async createUser(firstname,lastname,email,password,aboutMe){
        email = email.replace(/\s+/g, '');
        const user = await this.usersCollection.find({"email": email}).toArray();
        if(user.length === 0){
            const res = await this.usersCollection.insertOne({firstname:firstname,lastname: lastname,email: email,password: password, aboutMe: aboutMe});
            return res;
        }
        else{
            return {"error": "Username already exists!"};
        }
    }

    async readUser(email,password) {
        const user = await this.usersCollection.find({"email": email}).toArray();
        if(user.length === 1){
            if(user[0].password === password){
                return {"success": 'yes'};
            }
            else{
                return { 'error':`Password Incorrect!`};
            }
        }
        else{
            return { "error" : "Username "+ email + " Not Found!" };
        }
    }
    
    async addARide(driver, destination, date, time, cost, carModel, carColor, seats) {
        const res = this.ridesCollection.insertOne({driver: driver, destination: destination, date: date, time: time, cost:cost, carModel:carModel, carColor:carColor, seats:seats});
        return res;
    }

    async readUsers() {
        const res = this.usersCollection.find({}).toArray();
        return res;
    }
   
    async readReviews() {
        const res = this.reviewsCollection.find({}).toArray();
        return res;
    }
       
    async readAllRides() {
        const res = this.ridesCollection.find({}).toArray();
        return res;
    }

    async getRide(date) {
        let result = this.ridesCollection.find({"date": date}).toArray();
        console.log(result);
        if (result != {}) {
            return result;
          } else {
            return { "error" : "Rides Not Found" };
        } 
    }

    async deleteRide(id) {}

    async updateRide(id, destination, date, time, cost, carModel, carColor, seats) {
        if (destination === undefined && date=== undefined && time===undefined && cost===undefined && carModel===undefined && carColor===undefined && seats===undefined) {
            return { "error" : 'missing info for updating ride' };
        } 
        /*else {
            let rides = this.ridesCollection.find({});
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
        }*/
    }
}