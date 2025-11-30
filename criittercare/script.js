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
//======Dark/Light Theme===================
document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const themeBtn  = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    if (themeIcon) themeIcon.src = 'images/icons/sun.png';
  } else {
    if (themeIcon) themeIcon.src = 'images/icons/moon.png';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      body.classList.toggle('dark-theme');
      const isDark = body.classList.contains('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      if (themeIcon) {
        themeIcon.src = isDark ? 'images/icons/sun.png' : 'images/icons/moon.png';
      }
    });
  }
});



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

