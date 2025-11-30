// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 400) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        backToTopButton.textContent = '';
    }
});

// Real-time Clock Functionality
function updateClock() {
    const now = new Date();
    
    // Format the time as HH:MM:SS AM/PM
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Get the clock element
    const clockElement = document.getElementById('realTimeClock');
    
    // Update the clock if element exists
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Start the clock when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Update immediately
    updateClock();
    
    // Update every second (1000 milliseconds)
    setInterval(updateClock, 1000);
});





// FAQ 
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newq');
    const container = document.querySelector('.faq-container');
   
    // Load saved questions when page opens
    loadQuestions();
    
    // When form is submitted
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const input = document.getElementById('userQuestion');
        const question = input.value.trim();
        
        if (question) {
            addQuestion(question);
            saveQuestion(question);
            input.value = '';
            alert('Question submitted!');
        }
    });
    
    // Add question to page
    function addQuestion(question) {
        const faqCount = document.querySelectorAll('.faq-item').length;
        const newId = 'faq' + (faqCount + 1);
        
        const newFaq = document.createElement('div');
        newFaq.className = 'faq-item';
        newFaq.innerHTML = '<input type="checkbox" id="' + newId + '" class="faq-toggle">' +
                          '<label for="' + newId + '" class="faq-question">' +
                          '<h3>' + question + '</h3>' +
                          '<span class="faq-icon">+</span>' +
                          '</label>' +
                          '<div class="faq-answer">' +
                          '<p>Thank you for your question! We will review it and post an answer soon.</p>' +
                          '</div>';
        
        container.appendChild(newFaq);
    }
    
    // Save question to browser storage
    function saveQuestion(question) {
        var savedQuestions = JSON.parse(localStorage.getItem('faqQuestions')) || [];
        savedQuestions.push(question);
        localStorage.setItem('faqQuestions', JSON.stringify(savedQuestions));
    }
    
    // Load questions from storage
    function loadQuestions() {
        var savedQuestions = JSON.parse(localStorage.getItem('faqQuestions')) || [];
        for (var i = 0; i < savedQuestions.length; i++) {
            addQuestion(savedQuestions[i]);
        }
    }
});
const body = document.body;
const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon'); // 👈 مهم

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  if (themeIcon) themeIcon.src = 'images/sun.png';   // أيقونة الثيم الفاتح
} else {
  if (themeIcon) themeIcon.src = 'images/moon.png';  // أيقونة الثيم الداكن
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    if (body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
      if (themeIcon) themeIcon.src = 'images/icons/sun.png';   // إذا صار دارك نوري أيقونة الشمس
    } else {
      localStorage.setItem('theme', 'light');
      if (themeIcon) themeIcon.src = 'images/icons/moon.png';  // إذا صار لايت نوري القمر
    }
  });
}


// ===== Join the Team form validation (About Us) =====
function validateJoinForm(e) {
    if (e) {
        e.preventDefault();
    }

    var nameInput  = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var dobInput   = document.getElementById("DoB");
    var photoInput = document.getElementById("photo");

    var name  = nameInput.value.trim();
    var email = emailInput.value.trim();
    var dob   = dobInput.value;
    var photo = photoInput.value;

    if (name === "" || email === "" || dob === "" || photo === "") {
        alert("Please fill in all fields.");
        if (name === "") nameInput.focus();
        else if (email === "") emailInput.focus();
        else if (dob === "") dobInput.focus();
        else photoInput.focus();
        return false; 
    }

    var startsWithNumber = /^[0-9]/;
    if (startsWithNumber.test(name)) {
        alert("Name cannot start with a number.");
        nameInput.focus();
        return false;
    }

    
    var imgRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
    if (!imgRegex.test(photo)) {
        alert("Photo must be an image file.");
        photoInput.value = "";
        photoInput.focus();
        return false;
    }

    var year = parseInt(dob.substring(0, 4), 10);
    if (year > 2008) {
        alert("Date of birth must be in 2008 or earlier.");
        dobInput.focus();
        return false;
    }

    alert("Thank you, " + name + "! Your application has been submitted.");
    return true;
}

document.addEventListener("DOMContentLoaded", function () {
    var joinForm = document.getElementById("applicationForm");
    if (joinForm) {
        joinForm.addEventListener("submit", validateJoinForm);
    }
});

// Evaluation page:-
//In this page we have two thing ti validate (Service/ Rating)
function validateEvaluation() {
  //To read the service and the rating from form
  var service = document.getElementById("service").value;
  var feedback = document.getElementById("feedback").value;

  // To read star value from 1- 5
  var ratingValue = "";
var radios = document.getElementsByName("rating");
for (var i = 0; i < radios.length; i++) {
  if (radios[i].checked) {
    ratingValue = radios[i].value;
  }
}


  //If it empty plz fill it
  if (service === "") {
    alert("There is no service selected.");
    return false; //The form will not sent
  }
  //If it empty plz fill it
  if (ratingValue === "") {
    alert("Please select a rating.");
    return false;//The form will not sent
  }
   //If it empty plz fill it ========
  if (feedback.trim() === "") {
    alert("Please write your feedback.");
    return false;//The form will not sent
  }

  //If it here then the valdation is good we will diasplay massage acording to the rating if it is low  or high 
  if (parseInt(ratingValue) >= 4) {
    alert("Thank you for your positive feedback!");
  } else {
    alert("We are sorry for your experience. We will try to improve.");
  }

  // To tranfer  to the customer dashboard page
  document.location.href = "customer-dashboard.html";
  return false; 
}


//Request page:-
// To store the request in the array to display it
var pageRequests = [];   
  
function validateRequest() {

  //To get the valus for each option:
  var service = document.getElementById("service").value;
  var name = document.getElementById("name").value.trim();
  var date = document.getElementById("date").value;

  // I sthere is selected service?
  if (service === "") {
    alert("There is no selectedv service.");
    return false;
  }

  // I sit Full name ? 
  var parts = name.split(" ");
  if (name === "" || parts.length < 2) {
    alert("Please enter full name (first and last).");
    return false;
  }
   //Is it contain spical charcter?
  var hasBadChar = false;
  for (var i = 0; i < name.length; i++) {
    var ch = name.charAt(i);
    if ((ch >= "0" && ch <= "9") || ch === "?" || ch === "!" || ch === "@") {
      hasBadChar = true;
    }
  }
  if (hasBadChar) {
    alert("Name must not contain numbers or ? ! @.");
    return false;
  }
  

  //Valdate the date:
  //Is there is date?
if (date === "") {
    alert("Please choose a due date.");
    return false;
}
//To take the day date for now 
var today = new Date();
today.setHours(0, 0, 0, 0);

//To take the selected date
var selected = new Date(date);

// I s date in the past?
if (selected < today) {
    alert("Invalid date. Please choose a future date.");
    return false;
}

// To see how many days between?
var diffInDays = (selected - today) / (1000 * 60 * 60 * 24);

// If it very neer 
if (diffInDays < 3) {
    alert("Due date is very soon. Please choose a later date.");
    return false;
}

  var details = document.getElementById("details").value.trim();

  // Valdate the description very short
  if (details.length < 100) {
    alert("Description is very short, must be at least 100 characters.");
    return false;
  }
  // Stay or go to dashbord page
  var stay = confirm("Your request was sent.\nOK: stay on this page\nCancel: go to dashboard");

  //Store service if it stay in the page
  var info = "Service: " + service + " | Name: " + name + " | Date: " + date;
  pageRequests.push(info);

  if (stay) {
    // Display the request list
    var list = document.getElementById("requestList");
    list.innerHTML = "<h3>Your requests on this page</h3>";

    for (var j = 0; j < pageRequests.length; j++) {
      list.innerHTML += "<p>" + (j + 1) + ". " + pageRequests[j] + "</p>";
    }

    //Make it empty to store new
    document.querySelector("#request form").reset();
    return false; 
  } else {
    // Back to dashboard 

    document.location.href = "customer-dashboard.html";
    return false;
  }
}
// service provider 
document.addEventListener("DOMContentLoaded", function(){

    let services = localStorage.getItem("services");
    services = services ? JSON.parse(services) : [];

    let box = document.getElementById("services-container");

    if(services.length === 0){
        box.innerHTML = "<p> No services added yet </p>";
        return;
    }

    services.forEach(function(s){
        let div = document.createElement("div");
        div.className = "cardProvider";

        div.innerHTML = `
            <img src="${s.photo}" alt="service img">
            <p>${s.name}</p>
            <p>${s.price} SAR</p>
        `;

        box.appendChild(div);
    });

});
//add form
document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".add-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("service-name").value.trim();
        let desc = document.getElementById("service-description").value.trim();
        let price = document.getElementById("service-price").value.trim();
        let file = document.getElementById("service-photo");

        if (name === "") {
            alert("Please enter the service name.");
            return;
        }

        if (/^[0-9\u0660-\u0669]/.test(name)) {
         

            alert("Service name cannot start with a number.");
            return;
        }

        if (desc === "") {
            alert("Please enter the description.");
            return;
        }

        if (/^[0-9\u0660-\u0669]/.test(desc)) {
            alert("Description cannot start with a number.");
            return;
        }

        if (price === "") {
            alert("Please enter the price.");
            return;
        }

        if (isNaN(price)) {
            alert("Price must be a number.");
            return;
        }

        if (file.files.length === 0) {
            alert("Please upload a photo.");
            return;
        }

        let reader = new FileReader();
        reader.onload = function () {
            let newService = {
                name: name,
                description: desc,
                price: price,
                photo: reader.result
            };

            let list = JSON.parse(localStorage.getItem("services") || "[]");
            list.push(newService);
            localStorage.setItem("services", JSON.stringify(list));

            alert("Service added successfully!");
            form.reset();
        };

        reader.readAsDataURL(file.files[0]);
    });
});
//manage staff members

//  existing staff list
let staffList = JSON.parse(localStorage.getItem("staffList")) || [
    { name: "Sarah Altamimi", photo: "images/staff/staff2.png" },
    { name: "Raneem Aloraini", photo: "images/staff/staff3.png" },
    { name: "Aliyah Alharbi", photo: "images/staff/staff4.png" },
    { name: "Leenah Altamimi", photo: "images/staff/staff5.png" },
    { name: "Noura Almutairi", photo: "images/staff/staff6.png" },
    { name: "Dana Alshammari", photo: "images/staff/staff7.png" }
];

function showStaff() {
    let area = document.querySelector(".checkbox-column");
    if (!area) return;

    area.innerHTML = "";

    staffList.forEach((st, i) => {
        let row = `
            <label>
                <input type="checkbox" data-id="${i}">
                <img src="${st.photo}" width="50" onerror="this.src='images/staff/default.png'">
                ${st.name}
            </label>
        `;
        area.innerHTML += row;
    });
}
showStaff();


// Delete Staff Member
const deleteForm = document.querySelector(".delete-form");
if (deleteForm) {
    deleteForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let checks = document.querySelectorAll(".checkbox-column input[type='checkbox']");
        let picked = [];

        checks.forEach(c => {
            if (c.checked) picked.push(Number(c.dataset.id));
        });

        if (picked.length === 0) {
            alert("select at least one staff member.");
            return;
        }

        if (!confirm("Are you sure you want to delete the selected staff?")) return;

        staffList = staffList.filter((_, index) => !picked.includes(index));
        localStorage.setItem("staffList", JSON.stringify(staffList));
        showStaff();
        alert("Staff deleted successfully.");
    });
}


// Add New Staff Member
document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".add-staff-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        //all filds
        let inputs = form.querySelectorAll("input[type='text'], input[type='email'], textarea");

        let digitStart  = /^[0-9\u0660-\u0669]/; 
        let numbersOnly = /^[0-9]+$/;             // onlu num for date

        // first name
        let firstName = inputs[0].value.trim();
        if (firstName === "") {
            alert("First name is required");
            return;
        }
        if (digitStart.test(firstName)) {
            alert("First name cannot start with a number");
            return;
        }

        // date
        let day   = inputs[1].value.trim();
        let month = inputs[2].value.trim();
        let year  = inputs[3].value.trim();

        // Day
        if (day === "") {
            alert("Day is required");
            return;
        }
        if (!numbersOnly.test(day)) {
            alert("Day must be numbers only");
            return;
        }

        // Month
        if (month === "") {
            alert("Month is required");
            return;
        }
        if (!numbersOnly.test(month)) {
            alert("Month must be numbers only");
            return;
        }

        // Year
        if (year === "") {
            alert("Year is required");
            return;
        }
        if (!numbersOnly.test(year)) {
            alert("Year must be numbers only");
            return;
        }

        //  last name
        let lastName = inputs[4].value.trim();
        if (lastName === "") {
            alert("Last name is required");
            return;
        }
        if (digitStart.test(lastName)) {
            alert("Last name cannot start with a number");
            return;
        }

        //  Areas of expertise
        for (let i = 5; i <= 7; i++) {
            let v = inputs[i].value.trim();
            if (v === "") {
                alert("Expertise fields cannot be empty");
                return;
            }
            if (digitStart.test(v)) {
                alert("Expertise cannot start with a number");
                return;
            }
        }

        //  Email 
        
        let email = inputs[14].value.trim();
        if (email === "") {
            alert("Email is required");
            return;
        }
        if (digitStart.test(email)) {
            alert("Email cannot start with a number");
            return;
        }
        //@ it must to be there
        if (!email.includes("@")) { alert("Please enter a valid email"); return; }

        // Education 
       
        let education = inputs[15].value.trim();
        if (education === "") {
            alert("Education is required");
            return;
        }
        if (digitStart.test(education)) {
            alert("Education cannot start with a number");
            return;
        }

        //  Staff photo
        let photo = document.getElementById("staff-photo");
        if (!photo || photo.files.length === 0) {
            alert("Staff photo is required");
            return;
        }

        // add
        let reader = new FileReader();

        reader.onload = function () {
            let fullName = firstName + " " + lastName;

            staffList.push({
                name: fullName,
                photo: reader.result
            });

            localStorage.setItem("staffList", JSON.stringify(staffList));
            alert("Staff Added Successfully");
            form.reset();
            showStaff();
        };

        reader.readAsDataURL(photo.files[0]);
    });
});
