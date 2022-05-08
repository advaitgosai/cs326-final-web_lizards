const email = document.getElementById('driver');
const review = document.getElementById("review");

const addButton = document.getElementById("create");

addButton.addEventListener('click', async(e)=>{
    const data = await createReview(email.value, review.value);
    if("error" in data){
      output.innerHTML = "Invalid email"
    }else{
      output.innerHTML = "Success";
    }
});

async function createReview(email, review) {
    const response = await fetch(`/createReview?email=${email}&review=${review}`, {
      method: 'POST'
    });
    const data = await response.json();
    return data;
}