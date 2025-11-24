// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 400) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Remove the content from the button
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


// FAQ Management Module with localStorage
const FAQManager = {
    STORAGE_KEY: 'userSubmittedFAQs',

    init() {
        this.form = document.getElementById('newq');
        this.container = document.querySelector('.faq-container');
        this.bindEvents();
        this.loadStoredFAQs();
    },

    bindEvents() {
        this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    handleSubmit(event) {
        event.preventDefault();
        
        const questionInput = document.getElementById('userQuestion');
        const question = questionInput.value.trim();

        if (question) {
            this.addQuestion(question);
            this.showNotification('Question submitted successfully!');
            questionInput.value = '';
        }
    },

    addQuestion(question, isFromStorage = false) {
        const newFaqId = this.generateFaqId();
        const faqHTML = this.createFaqHTML(newFaqId, question);
        
        this.container.insertAdjacentHTML('beforeend', faqHTML);
        
        if (!isFromStorage) {
            this.saveToStorage(question);
        }
    },

    generateFaqId() {
        const count = document.querySelectorAll('.faq-item').length;
        return `faq${count + 1}`;
    },

    createFaqHTML(id, question) {
        return `
            <div class="faq-item">
                <input type="checkbox" id="${id}" class="faq-toggle">
                <label for="${id}" class="faq-question">
                    <h3>${this.escapeHTML(question)}</h3>
                    <span class="faq-icon">+</span>
                </label>
                <div class="faq-answer">
                    <p>Thank you for your question! Our team will review it and add an answer soon.</p>
                </div>
            </div>
        `;
    },

    saveToStorage(question) {
        const existingFAQs = this.getStoredFAQs();
        existingFAQs.push({
            question: question,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingFAQs));
    },

    getStoredFAQs() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    loadStoredFAQs() {
        const storedFAQs = this.getStoredFAQs();
        storedFAQs.forEach(faq => {
            this.addQuestion(faq.question, true);
        });
    },

    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'faq-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 3000);
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => FAQManager.init());