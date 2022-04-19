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

async function createUser(response, id,firstname,lastname,password) {
    if (id=== undefined || firstname === undefined || lastname=== undefined || password===undefined ) {
      // 400 - Bad Request
      response.status(400).json({ error: 'missing info' });
    } else {
      await reloadUsers(UsersFile);
      users[id] = {"firstname":firstname,"lastname": lastname,"password": password};
      await saveUsers();
      response.json({id: id,firstname:firstname,lastname: lastname,password: password});
    }
}

const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/client', express.static('client'));




// api for register
app.post('/user/create', async (request, response) => {
    const options = request.query;
    createUser(response, options.id,options.firstname,options.lastname,options.password);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });