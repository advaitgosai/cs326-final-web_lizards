# Web Lizards
## URide, a ridesharing web application for UMass students, staff and faculty

Team Overview:
| Member | GitHub |
| ------ | ------ |
| Sachetan Sengupta | [sachetans](https://github.com/sachetans) |
| Corinne Greene | [cegreene](https://github.com/cegreene) |
| Tarang Mittal | [tarangMittal](https://github.com/tarangMittal) |
| Advait Gosai | [advaitgosai](https://github.com/advaitgosai) |

## API Description

* Login Page
  * /login : POST : checks if user in users database (READ)
* Register Page
  * /register : POST : adds new user to users database (CREATE)
* Add Ride Page
  * /rides/addRide : POST : adds new ride to rides database (CREATE)
* Home Page
  * /getRide : GET : gets a specific set of rides with a date range (READ)
* Ride Page - Passenger
* Ride Page - Driver
  * /updateRide : PUT : updates ride corresponding to the id in the rides database (UPDATE)
  * /deleteRide : DELETE : deletes ride corresponding to the id in the rides database (DELETE)

## Screenshots 
https://glacial-chamber-29044.herokuapp.com/client/register.html
![Image1](../assets/images/deploy_scs/registration.png)

https://glacial-chamber-29044.herokuapp.com/client/login.html
![Image1](../assets/images/deploy_scs/login.png)

https://glacial-chamber-29044.herokuapp.com/client/addRide.html
![Image1](../assets/images/deploy_scs/addRide.png)

https://glacial-chamber-29044.herokuapp.com/client/home.html
![Image1](../assets/images/deploy_scs/home.png)

https://glacial-chamber-29044.herokuapp.com/client/ride-passenger.html
![Image1](../assets/images/deploy_scs/ride-passenger.png)

https://glacial-chamber-29044.herokuapp.com/client/ride-driver.html
![Image1](../assets/images/deploy_scs/ride-update.png)
The ride page for the driver has an update button. The API takes the data inputted in the form above and creates a PUT request to update the specific ride in the rides database. All entries that are left blank are not updated.

https://glacial-chamber-29044.herokuapp.com/client/ride-driver.html
![Image1](../assets/images/deploy_scs/ride-delete.png)
The delete button removes the specific ride corresponding to the ID from the rides database using a DELETE request.


## Division of Labor
* Corinne - Home Page APIs, Ride Page Passenger APIs, updating both pages with data from rides database
* Sachetan - Add Ride APIs, Creating rides database structure
* Tarang - Login APIs, Register APIs, Heroku Deployment
* Advait - Ride Page Driver APIs + Frontend, Ride Page Passenger APIs, Documentation
