

window.onload = () => {
  const token = sessionStorage.getItem("token");
  if (token !== null) {
    window.location = "dreminder.html";
  }
};

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
  const password = document.getElementById("password").value;
  let atposition=email.indexOf("@");
let dotposition=email.lastIndexOf("."); 
  if(email==null || email==''){
toaster("Email cannot be empty")
  }else if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length){
    toaster('please enter a valid email address')
  }else if(password==null || password==''){
  toaster('Password cannot be empty')
  }else{
    const data = {
      email: email,
      password: password,
    };
    url = "https://medilarm.herokuapp.com/user/login";
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
            const res = await response.json();
            sessionStorage.setItem("token", res.token);
            toastr.options = {
                closeButton: true,
                debug: false,
                newestOnTop: false,
                progressBar: true,
                positionClass: "toast-bottom-right",
                preventDuplicates: false,
                onclick: null,
                showDuration: "200",
                hideDuration: "1000",
                timeOut: "3000",
                extendedTimeOut: "1000",
                showEasing: "swing",
                hideEasing: "linear",
                showMethod: "fadeIn",
                hideMethod: "fadeOut",
              };
              toastr.options.onHidden = function () {
                  window.location = "dreminder.html";
                };
                toastr["success"]("Successfully Logged in");
              }else{
                toaster("Either username or password is incorrect")
              }
            }
            }
