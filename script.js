// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Simple project carousel
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const slides = document.querySelectorAll('.carousel-slide');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - index) * 100}%)`;
  });
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
  showSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
  showSlide(currentIndex);
});

// Initialize carousel
showSlide(currentIndex);

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Sticky Navigation Bar
const header = document.querySelector('header');
const sticky = header.offsetTop;

function handleScroll() {
  if (window.pageYOffset > sticky) {
      header.classList.add('sticky');
  } else {
      header.classList.remove('sticky');
  }
}

window.addEventListener('scroll', handleScroll);

// Back-to-top button
const backToTopBtn = document.createElement('button');
backToTopBtn.textContent = '⬆️';
backToTopBtn.className = 'back-to-top';
document.body.appendChild(backToTopBtn);

function toggleBackToTopButton() {
  if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
  } else {
      backToTopBtn.style.display = 'none';
  }
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', toggleBackToTopButton);

// Highlight active section in the navigation bar
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

function highlightNavLink() {
  let index = sections.length;

  while(--index && window.scrollY + 50 < sections[index].offsetTop) {}

  navLinks.forEach((link) => link.classList.remove('active'));
  navLinks[index].classList.add('active');
}

window.addEventListener('scroll', highlightNavLink);

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_USER_ID"); // Replace with your actual EmailJS user ID
})();

// Contact form submission handler
async function sendEmail(e) {
    e.preventDefault();

    // Get the form elements
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('span');
    const originalText = btnText.textContent;

    try {
        // Disable the submit button and change text while sending
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        
        // Use fetch to submit the form data to your preferred service
        // For example, using Formspree (you'll need to replace the URL with your form endpoint)
        const response = await fetch('https://formspree.io/f/your-form-id', {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Success message
            form.reset();
            showMessage('Thank you! Your message has been sent successfully.', 'success');
        } else {
            // Error message
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Sorry, there was a problem sending your message. Please try again later.', 'error');
    } finally {
        // Re-enable the submit button and restore original text
        submitBtn.disabled = false;
        btnText.textContent = originalText;
    }

    return false;
}

// Function to show status messages
function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;

    // Add the message to the form
    const form = document.getElementById('contactForm');
    form.insertAdjacentElement('beforeend', messageElement);

    // Remove the message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Add loading animation when sending
document.getElementById('contactForm').addEventListener('submit', function() {
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.classList.add('sending');
});
