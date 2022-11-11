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

const submitter = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    
  
};
