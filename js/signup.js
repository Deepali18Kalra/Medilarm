document.getElementById("rarrow").addEventListener("click", nextFunc);

function nextFunc() {
  document.getElementById("signup_form1").style.display = "none";
  document.getElementById("signup_form2").style.display = "grid";
  document.getElementById("circle1").style.color = "#5e606b84";
  document.getElementById("circle2").style.color = "#38385c";
  document.getElementById("rarrow").style.display = "none";
  document.getElementById("submit_button").style.display = "initial";
  document.getElementById("larrow").style.display = "initial";
}

document.getElementById("larrow").addEventListener("click", backFunc);

function backFunc() {
  document.getElementById("signup_form2").style.display = "none";
  document.getElementById("signup_form1").style.display = "grid";
  document.getElementById("circle2").style.color = "#5e606b84";
  document.getElementById("circle1").style.color = "#38385c";
  document.getElementById("larrow").style.display = "none";
  document.getElementById("submit_button").style.display = "none";
  document.getElementById("rarrow").style.display = "initial";
}

let titles = [
  "Feeling well does not mean your medical condition is cured." +
    " Conditions like high blood pressure, high cholesterol and diabetes can damage your body," +
    " even if you do not have symptoms and feel fine.",
  " Do not stop or take less of your medicine without talking to your doctor first.",
  "It is sometimes dangerous to mix prescription medicine with over-the-counter medicines," +
    " herbal medicines and supplements. Tell your doctor or pharmacist about everything you are taking.",
  "Antibiotics are only helpful in illnesses caused by bacteria, such as Strep throat." +
    " If you do have a virus-based illness you might be prescribed a different medicine other than an antibacterial treatment.",
  "Unless you’re told otherwise, you should always store medications in a dry area," +
    " away from heat and direct light — which generally means putting them away and out of sig​ht.",
];
let currentIndex = 0;
let span = document.getElementById("quote");

setInterval(() => {
  span.innerHTML = titles[currentIndex];
  currentIndex++;

  if (currentIndex === 5) currentIndex = 0;
}, 7000);

const submitter = async () => {
  const email = document.getElementById("email").value;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const phoneno = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const cpassword = document.getElementById("cpassword").value;
  const data = {
    name: fname + " " + lname,
    email: email,
    phoneNo: phoneno,
    password: password,
  };
  url = "http://localhost:3001/user/register";

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  if (response.status === 200) {
    console.log(await response.json());
    window.location = "index.html";
  }
};
