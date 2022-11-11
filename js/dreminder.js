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
  const time_medicine = document.getElementById("medicinetime").value;
  const qty_medicine = document.getElementById("medicineqty").value;
  const unit_medicine = document.getElementById("medicineunit").value;
  if (name_medicine == null || name_medicine === "") {
    toaster("Name of medicine cannot be empty");
  } else if (time_medicine == null || time_medicine == "") {
    toaster("time of medicine cannot be empty");
  } else if (qty_medicine == null) {
    toaster("quantity of medication cannot be empty");
  } else if (unit_medicine == null || unit_medicine == "") {
    toaster("unit of medication cannot be empty");
  } else {
    let hours = time_medicine.split(":")[0];
    let minutes = time_medicine.split(":")[1];
    let AMPM = "";
    if (hours > 12) {
      AMPM = "PM";
    } else {
      AMPM = "AM";
    }
    const data = {
      nameofmedicine: name_medicine,
      time: [{ hours: parseInt(hours), minutes: parseInt(minutes), AMPM }],
      quantity: qty_medicine,
      unit: unit_medicine,
      token: sessionStorage.getItem("token"),
    };
    url = "http://localhost:3001/dailyreminder/add";

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
const take = async(e)=>{
  url = "http://localhost:3001/dailyreminder/take";
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: sessionStorage.getItem("token"),id:e }), // body data type must match "Content-Type" header
  });
  if(response.status===200){
    getAllReminders();
  }
}

const deleter = async(id)=>{
  url = "http://localhost:3001/dailyreminder/delete";
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: sessionStorage.getItem("token") ,id,id}), // body data type must match "Content-Type" header
  }); 
  getAllReminders();
}

const getAllReminders = async () => {
  url = "http://localhost:3001/dailyreminder/getall";
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
  if(response.status ===200){

    const reminders = await response.json();
    const notifbox = document.getElementById("notifbox");
    notifbox.innerHTML =""
    reminders.map((item,index)=>{
      setReminder(item.time,item.nameofmedicine,item._id)
      notifbox.innerHTML +=`<div class="notif" ondblclick="deleter('${item._id}')">
      <img src="./media/pill.png" alt="pill_icon" class="pill_icon">
      <div class="med_details">
      <p class="medname">${item.nameofmedicine}</p>
      <p class="quantity">Qty : ${item.quantity+" "+item.unit}</p>
      </div>
      <div class="status">
      <button class="status_button" onclick='take("${item._id}")'>
      <i class="material-icons" style="font-size:10px; color:${(!item.taken)?'rgb(126, 5, 5)':'green'}">circle</i>
      </button>
      <span class="status_title">${(item.taken)?'Taken':'Not Taken'}</span>
      </div>
      </div>`
    })
  }else{
    sessionStorage.removeItem('token')
    window.location='login.html'
  }
    
    
  };
const setReminder = (time,name,id)=>{
  reminder_time = time[0].hours+":"+time[0].minutes+":00"
  const now = new Date();
  const today = now.toString().split(" ").slice(0,4).join(" ")
  // const today = now.toISOString().split("T")[0]
  const reminder_estimate = new Date(today+" "+reminder_time)
  const remaining_milliseconds = reminder_estimate-now;
  if(remaining_milliseconds>=0){
    setTimeout(()=>{
player()
toastify(name,id)
    },remaining_milliseconds)
  }
}
const toastify = (name,id)=>{
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "60000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
  toastr.info(`<p>Take ${name}</p><button type="button" class="btn clear btn-toastr" onclick="pauser('${id}')">Taken</button>` , 'Dosage Reminder');
}
aud = new Audio('../media/ring.mp3');
const player = ()=>{
  aud.play(); 
}
const pauser = (id)=>{
  take(id)
  aud.pause()
  toastr.clear()
  
}