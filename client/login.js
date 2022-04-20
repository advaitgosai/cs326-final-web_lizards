const email = document.getElementById('emailID');
const password = document.getElementById("password");
const output = document.getElementById('output');
const loginButton = document.getElementById("login");

loginButton.addEventListener('click', async(e)=>{
    const data = await checkLogin(email.value, password.value);
    if("error" in data){
        output.innerHTML = JSON.stringify(data);
    }
    else{
        output.innerHTML = "You " + email.value + " have successfully logged in!";
    }
});


async function checkLogin(email,password) {
    const response = await fetch(`/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email,password: password}),
      });
      const data = await response.json();
      return data;
}
  