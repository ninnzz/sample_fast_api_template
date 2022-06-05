// BIRTHDAY TO AGE
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


function convertDate(date_str) {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  temp_date = date_str.split("-");
  return temp_date[2] + " " + months[Number(temp_date[1]) - 1] + " " + temp_date[0];
}


// ------------- TODAY 
n =  new Date();
y = n.getFullYear();
m = String(n.getMonth() + 1).padStart(2, '0');
d = String(n.getDate()).padStart(2, '0');
date_today = y + "-" + m + "-" + d;
today_date = convertDate(date_today);

// console.log(today_date);
let today_split = today_date.split(" ")
today_format = today_split[1] + " " + today_split[0] + ", " + today_split[2]




function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function fetch_post() {

  // event.preventDefault();

  let dose = document.getElementById('dose').value;
  let vaccine_type = document.getElementById('vaccine').value;
  let date = document.getElementById('date').value;
  let time = document.getElementById('time').value;
  let location = document.getElementById('location').value;
  let slots = document.getElementById('slots').value;
  let age = document.getElementById('age').value;

  var inp_obj = {
    "dose" : dose,
    "vaccine_type" : vaccine_type,
    "date" : date,
    "time" : time,
    "location" : location,
    "slots" : slots,
    "age" : age
  }

  console.log(inp_obj)

  fetch('/event_form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inp_obj)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      let inp_age = ''

      if (data.age == 1) {
        inp_age = "All age"
      } else if (data.age == 2) {
        inp_age = "Below 17"
      } else if (data.age == 3) {
        inp_age = "Above 18"
      }

      patient_date = convertDate(data.date)
      let date_split = patient_date.split(" ")
      date_format = date_split[1] + " " + date_split[0] + ", " + date_split[2]

      let event_info = document.getElementById("inner_div");

      let popup_details = document.createElement("h2");
      let popup_dose = document.createElement("p");
      let popup_vaccine_type = document.createElement("p");
      let popup_date = document.createElement("p");
      let popup_time = document.createElement("p");
      let popup_location = document.createElement("p");
      let popup_slots = document.createElement("p");
      let popup_age = document.createElement("p");

      popup_details.innerHTML = "Details";
      popup_dose.innerHTML = "Dose: " + data.dose;
      popup_vaccine_type.innerHTML = "Vaccine: " + capitalizeFirstLetter(data.vaccine_type);
      popup_date.innerHTML = "Date: " + date_format;
      popup_time.innerHTML = "Time: " + data.time;
      popup_location.innerHTML = "Location: " + capitalizeFirstLetter(data.location);
      popup_slots.innerHTML = "Slots: " + data.slots;
      popup_age.innerHTML = "Age: " + inp_age;


      event_info.append(popup_details);
      event_info.append(popup_dose);
      event_info.append(popup_vaccine_type);
      event_info.append(popup_date);
      event_info.append(popup_time);
      event_info.append(popup_location);
      event_info.append(popup_slots);
      event_info.append(popup_age);

    }).catch((error) => {
      console.error('Error:', error);
    });
}

// POPUP
var containerElement = document.getElementById('app');
function popupOpenClose(popup) {
  
  /* Open popup */
  $(popup).show();

  /* Close popup and remove errors if user clicks on cancel or close buttons */
  $(popup).find("button[name=close]").on("click", function() {
    if ($(".formElementError").is(':visible')) {
      $(".formElementError").remove();
    }
    containerElement.setAttribute('class', 'wrapper');
    $(popup).hide();
    location.href = "/form_event";
  });
}

$(document).ready(function () {
  $("[data-js=open]").on("click", function() {

    let dose = document.getElementById('dose').value;
    let vaccine_type = document.getElementById('vaccine').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let location = document.getElementById('location').value;
    let slots = document.getElementById('slots').value;
    let age = document.getElementById('age').value;

    var dose_error = document.getElementById('dose_error');
    var vaccine_type_error = document.getElementById('vaccine_error');
    var date_error = document.getElementById('date_error');
    var time_error = document.getElementById('time_error');
    var location_error = document.getElementById('location_error');
    var slots_error = document.getElementById('slots_error');
    var age_error = document.getElementById('age_error');

    if (dose == "") {
      dose_error.innerHTML = "Please Enter Your Name";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      dose_error.innerHTML = "";
    }

    if (vaccine_type == "") {
      vaccine_type_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      vaccine_type_error.innerHTML = "";
    }

    if (date == "") {
      date_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else if (date < date_today) {
      date_error.innerHTML = "You cannot enter a date in the past.";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    }
    else {
      date_error.innerHTML = "";
    }

    if (time == "") {
      time_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      time_error.innerHTML = "";
    }

    if (location == "") {
      location_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      location_error.innerHTML = "";
    }

    if (slots == "") {
      slots_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      slots_error.innerHTML = "";
    }

    if (age == "") {
      age_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      age_error.innerHTML = "";
    }

    $('.wrapper').blur();
    containerElement.setAttribute('class', 'wrapper blur');
    popupOpenClose($(".popup"));
    fetch_post();
  });
});