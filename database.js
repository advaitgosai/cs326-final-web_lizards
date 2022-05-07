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

    async readRide(date) {
        const res = await this.ridesCollection.findOne({ date:date });
        return res;
    }

    async readAllRides() {
        const res = await this.ridesCollection.find({}).toArray();
        return res;
    }

}