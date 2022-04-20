const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('emailID');
const password = document.getElementById("password");



const registerButton = document.getElementById("register");

registerButton.addEventListener('click', async(e)=>{
    console.log("values: ", firstname.value,lastname.value,email.value,password.value);
    const data = await createUser(firstname.value,lastname.value,email.value,password.value);
    console.log("user registered: ",data);
});


async function createUser(firstname,lastname,email,password) {
    const response = await fetch(`/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({firstname:firstname,lastname: lastname,email: email,password: password}),
    });
    const data = await response.json();
    console.log("data: ",data);
    return data;
}