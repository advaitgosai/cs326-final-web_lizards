const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('emailID');
const password = document.getElementById("password");
const aboutMe = document.getElementById("about-me");
const output = document.getElementById('output');
const registerButton = document.getElementById("register");



registerButton.addEventListener('click', async(e)=>{
    const data = await createUser(firstname.value,lastname.value,email.value,password.value,aboutMe.value);
    if("error" in data){
      output.innerHTML = "Email already exists!"
    }else{
      location.href = "login.html";
    }
});


async function createUser(firstname,lastname,email,password,aboutMe) {
    const response = await fetch(`/user/create?firstname=${firstname}&lastname=${lastname}&email=${email}
    &password=${password}&aboutMe=${aboutMe}`, {
      method: 'POST'
    });
    const data = await response.json();
    return data;
}