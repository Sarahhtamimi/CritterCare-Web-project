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

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  if (themeBtn) themeBtn.textContent = '☀️';
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    if (body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
      themeBtn.textContent = '☀️';
    } else {
      localStorage.setItem('theme', 'light');
      themeBtn.textContent = '🌙';
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
function validateEvaluation() {
  //To read the service and the feedback from form
  var service = document.getElementById("service").value;
  var feedback = document.getElementById("feedback").value;

  // To read star value
  var ratingValue = "";
  var radios = document.getElementsByName("rating");
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      ratingValue = radios[i].value;
    }
  }

  //If it empty plz fill it
  if (service === "") {
    alert("Please select a service.");
    return false; //The form will not sent
  }
  //If it empty plz fill it
  if (ratingValue === "") {
    alert("Please select a rating.");
    return false;//The form will not sent
  }
   //If it empty plz fill it
  if (feedback.trim() === "") {
    alert("Please write your feedback.");
    return false;//The form will not sent
  }

  //If the rating is low  or high 
  if (parseInt(ratingValue) >= 4) {
    alert("Thank you for your positive feedback!");
  } else {
    alert("We are sorry for your experience. We will try to improve.");
  }

  // To go for the customer dashboard page
  document.location.href = "customer-dashboard.html";
  return false; 
}
// To store the request in the array
var pageRequests = [];   
  
function validateRequest() {
  var service = document.getElementById("service").value;
  var name = document.getElementById("name").value.trim();
  var date = document.getElementById("date").value;
  var details = document.getElementById("details").value.trim();

  // 1)There isnt service 
  if (service === "") {
    alert("Please select a service.");
    return false;
  }

  // 2) Full name and charcters 
  var parts = name.split(" ");
  if (name === "" || parts.length < 2) {
    alert("Please enter full name (first and last).");
    return false;
  }

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
  // 3) 
  if (date === "") {
    alert("Please choose a due date.");
    return false;
  }

  // 4) 
  if (details.length < 100) {
    alert("Description must be at least 100 characters.");
    return false;
  }
  // رسالة تأكيد + خيار البقاء أو الرجوع
  var stay = confirm("Your request was sent.\nOK: stay on this page\nCancel: go to dashboard");

  // نخزن الطلب في الـ array
  var info = "Service: " + service + " | Name: " + name + " | Date: " + date;
  pageRequests.push(info);

  if (stay) {
    // نعرض كل الطلبات اللي صارت في هذي الجلسة
    var list = document.getElementById("requestList");
    list.innerHTML = "<h3>Your requests on this page</h3>";

    for (var j = 0; j < pageRequests.length; j++) {
      list.innerHTML += "<p>" + (j + 1) + ". " + pageRequests[j] + "</p>";
    }

    // نفرغ الفورم عشان يقدر يرسل طلب جديد
    document.querySelector("#request form").reset();
    return false; // نوقف الإرسال
  } else {
    // يرجع للداشبورد – الطلبات ما تنخزن في أي مكان دائم
    document.location.href = "customer-dashboard.html";
    return false;
  }
}

