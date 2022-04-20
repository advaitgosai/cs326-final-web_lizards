const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('emailID');
const password = document.getElementById("password");
const aboutMe = document.getElementById("about-me");
const output = document.getElementById('output');
const registerButton = document.getElementById("register");



registerButton.addEventListener('click', async(e)=>{
    const data = await createUser(firstname.value,lastname.value,email.value,password.value,aboutMe.value);
    output.innerHTML = "New User has been successfully registered! " + JSON.stringify(data);
});


async function createUser(firstname,lastname,email,password,aboutMe) {
    const response = await fetch(`/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({firstname:firstname,lastname: lastname,email: email,password: password,aboutMe: aboutMe}),
    });
    const data = await response.json();
    return data;
}