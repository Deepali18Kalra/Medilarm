window.onload = () => {
  const token = sessionStorage.getItem("token");
  if (token === null) {
    window.location = "login.html";
  } else {
    getAllReminders();
  }
};
const addReminder = async () => {
  const name_medicine = document.getElementById("medicinename").value;
  const date_medicine = document.getElementById("medicinetime").value;
  const qty_medicine = document.getElementById("medicineqty").value;
  const unit_medicine = document.getElementById("medicineunit").value;
  if (name_medicine == null || name_medicine === "") {
    toaster("Name of medicine cannot be empty");
  } else if (date_medicine == null || date_medicine == "") {
    toaster("time of medicine cannot be empty");
  } else if (qty_medicine == null) {
    toaster("quantity of medication cannot be empty");
  } else if (unit_medicine == null || unit_medicine == "") {
    toaster("unit of medication cannot be empty");
  } else {
    const data = {
      nameofmedicine: name_medicine,
      date: date_medicine,
      quantity: qty_medicine,
      unit: unit_medicine,
      token: sessionStorage.getItem("token"),
    };
    url = "http://localhost:3001/monthlyreminder/add";

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
      $("#addremindermodal").modal("toggle");
      getAllReminders();
    }
  }
};
// const take = async (e) => {
//   url = "http://localhost:3001/monthlyreminder/take";
//   const response = await fetch(url, {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ token: sessionStorage.getItem("token"), id: e }), // body data type must match "Content-Type" header
//   });
//   if (response.status === 200) {
//     getAllReminders();
//   }
// };

const deleter = async (id) => {
  url = "http://localhost:3001/monthlyreminder/delete";
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: sessionStorage.getItem("token"), id, id }), // body data type must match "Content-Type" header
  });
  getAllReminders();
};

const getAllReminders = async () => {
  url = "http://localhost:3001/monthlyreminder/getall";
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: sessionStorage.getItem("token") }), // body data type must match "Content-Type" header
  });
  if (response.status === 200) {
    const reminders = await response.json();
    const notifbox = document.getElementById("notifbox");
    notifbox.innerHTML = "";
    reminders.map((item, index) => {
      setReminder(item.date, item.nameofmedicine,item.quantity,item.unit);
      notifbox.innerHTML += `<div class="notif" ondblclick="deleter('${
        item._id
      }')">
        <img src="./media/pill.png" alt="pill_icon" class="pill_icon">
        <div class="med_details">
        <p class="medname">${item.nameofmedicine}</p>
        <p class="quantity">Qty : ${item.quantity + " " + item.unit}</p>
        </div>
        <div class="status">
        <button class="status_button" onclick='take("${item._id}")'>
        </button>
        </div>
        </div>`;
    });
  } else {
    sessionStorage.removeItem("token");
    window.location = "login.html";
  }
};
const setReminder = (date, name,qty,unit) => {
  const now = new Date();
  const reminder_estimate = new Date(date);
  const remaining_milliseconds = reminder_estimate - now;
  console.log(remaining_milliseconds);
  if (remaining_milliseconds <=86400000) {
      player();
      toastify(name,qty,unit);
  }
  
};
const toastify = (name,qty,unit) => {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-bottom-right",
    preventDuplicates: true,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "60000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  toastr.info(
    `<p>Order ${name+" "+qty+" "+unit}</p><button type="button" class="btn clear btn-toastr" onclick="pauser()">Ordered</button>`,
    "Dosage Reminder"
  );
};
aud = new Audio("../media/ring.mp3");
const player = () => {
  aud.play();
};
const pauser = () => {
  aud.pause();
  toastr.clear();
};
