import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';

let users = {};

const UsersFile = 'users.json';

async function reloadUsers(filename) {
    try {
      const data = await readFile(filename, { encoding: 'utf8' });
      users = JSON.parse(data);
    } catch (err) {
      users = {};
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
  createUser(response,options.firstname,options.lastname,options.email,options.password,options.aboutMe);
});

// api for login
app.post('/login', async (request, response) =>{
  const options = request.body;
  readUser(response,options.email,options.password)
});



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});