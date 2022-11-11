const logout = (e) => {
  sessionStorage.removeItem("token");
  window.location = "login.html";
};

const toaster = (text)=>{
    
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr["error"](text, "Error")
}

const evalidate = ()=>{
    const email = document.getElementById("email").value;
    let atposition=email.indexOf("@");
  let dotposition=email.lastIndexOf("."); 
    if(email==null || email==''){
  toaster("Email cannot be empty")
    }else if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length){
      toaster('please enter a valid email address')
    }
}
