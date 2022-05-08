# Web Lizards
## URide, a ridesharing web application for UMass students, staff and faculty

Team Overview:
| Member | GitHub |
| ------ | ------ |
| Sachetan Sengupta | [sachetans](https://github.com/sachetans) |
| Corinne Greene | [cegreene](https://github.com/cegreene) |
| Tarang Mittal | [tarangMittal](https://github.com/tarangMittal) |
| Advait Gosai | [advaitgosai](https://github.com/advaitgosai) |

## Database
### MongoDB Collections

users document
```
{
  _id: <ObjectId>,
  firstname: <String>, //first name of user
  lastname: <String>, //last name of user
  email: <String>, //user's email
  password: <String> //user's password
}
```

  
rides document
```
{
  _id: <ObjectId>,
  driver: <String> //email of driver of specific ride
  destination: <String> //town of destination
  date: <String> //day the ride takes place
  time: <String> //time the ride takes place
  cost: <String> //cost per passenger in dollars
  carModel: <String> //make and model of the driver's car
  carColor: <String> //color of driver's car
  seats: <integer> //number of seats available in the ride
}
```
  
 reviews document
 ```
{
  _id: <ObjectId>,
  driver: <String> //email of driver of specific ride
  review: <String> //review text 
}
```


## Division of Labor
* Corinne - Home Page APIs, Ride Page Passenger APIs, updating both pages with data from rides database
* Sachetan - Add Ride APIs, Creating rides database structure
* Tarang - Login APIs, Register APIs, Heroku Deployment
* Advait - Ride Page Driver APIs + Frontend, Ride Page Passenger APIs, Documentation
