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
