import { ObjectID } from 'bson';
import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';


export class RideShareDb {
    constructor(dburl) {
      this.dburl = dburl;
      this.rideID = 0;
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
        date = date.replace(/\s+/g, '');
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

    async deleteRide(id) {
        const res = this.ridesCollection.deleteOne({_id: ObjectID(id)});
        return res;
    }

    async updateRide(id, destination, time, cost, carModel, carColor, seats) {
        if (destination === "" && time==="" && cost==="" && carModel==="" && carColor==="" && seats==="") {
            return { "error" : 'missing info for updating ride' };
        } 
        else {
            let res;
            if (destination !== "") { 
                res = this.ridesCollection.updateOne({_id: ObjectID(id)}, {$set:{'destination':destination}});
            }
            if (time !== "") { 
                res = this.ridesCollection.updateOne({_id: ObjectID(id)}, {$set:{'time':time}});
            }
            if (cost !== "") { 
                res = this.ridesCollection.updateOne({_id: ObjectID(id)}, {$set:{'cost':cost}});
            }
            if (carModel !== "") { 
                res = this.ridesCollection.updateOne({_id: ObjectID(id)}, {$set:{'carModel':carModel}});
            }
            if (carColor !== "") { 
                res = this.ridesCollection.updateOne({_id: ObjectID(id)}, {$set:{'carColor':carColor}});
            }
            if (seats !== "") { 
                res = this.ridesCollection.updateOne({_id: ObjectID(id)}, {$set:{'seats':seats}});
            }
            return res;
        }
    }

    async createReview(email, review) {
        const res = this.reviewsCollection.insertOne({driver: email, review: review});
        return res;
    }
}