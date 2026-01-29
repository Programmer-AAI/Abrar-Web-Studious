// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navButtons = document.getElementById("navButtons");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        navButtons.classList.toggle("active");
    });
}
window.addEventListener("scroll", () => {
  document.querySelector(".navbar")
    .classList.toggle("scrolled", window.scrollY > 10);
});

// Carousel Functionality
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".project-card");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");
    const dotsContainer = document.querySelector(".carousel-dots");

    if (slides.length > 0) {
        let currentIndex = 0;
        let interval;

        // CREATE DOTS
        slides.forEach((_, i) => {
            const dot = document.createElement("span");
            if (i === 0) dot.classList.add("active");
            dotsContainer.appendChild(dot);

            dot.addEventListener("click", () => {
                goToSlide(i);
            });
        });

        const dots = document.querySelectorAll(".carousel-dots span");

        function goToSlide(index) {
            slides[currentIndex].classList.remove("active");
            dots[currentIndex].classList.remove("active");

            currentIndex = index;

            slides[currentIndex].classList.add("active");
            dots[currentIndex].classList.add("active");
        }

        function nextSlide() {
            goToSlide((currentIndex + 1) % slides.length);
        }

        function prevSlide() {
            goToSlide((currentIndex - 1 + slides.length) % slides.length);
        }

        if (nextBtn) nextBtn.addEventListener("click", nextSlide);
        if (prevBtn) prevBtn.addEventListener("click", prevSlide);

        // AUTO SLIDE
        function startAutoSlide() {
            interval = setInterval(nextSlide, 3000);
        }

        function stopAutoSlide() {
            clearInterval(interval);
        }

        startAutoSlide();

        const carousel = document.querySelector(".carousel");
        if (carousel) {
            carousel.addEventListener("mouseenter", stopAutoSlide);
            carousel.addEventListener("mouseleave", startAutoSlide);
        }
    }

    // Project Brief Form Toggle
    const startBtn = document.getElementById("startBrief");
    const briefStartDiv = document.getElementById("briefStart");
    const form = document.getElementById("briefForm");

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            // Hide the start section
            if (briefStartDiv) {
                briefStartDiv.style.display = "none";
            }
            
            // Show the form
            if (form) {
                form.style.display = "block";
                form.style.opacity = "0";
                form.style.transform = "translateY(20px)";
                
                // Animate the form in
                setTimeout(() => {
                    form.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                    form.style.opacity = "1";
                    form.style.transform = "translateY(0)";
                }, 10);
            }
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading spinner
            const loadingSpinner = document.getElementById('loadingSpinner');
            if (loadingSpinner) loadingSpinner.style.display = 'block';
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    contactForm.reset();
                    const successMessage = document.getElementById('successMessage');
                    if (successMessage) successMessage.style.display = 'block';
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                if (loadingSpinner) loadingSpinner.style.display = 'none';
            }
        });
    }
});

// WhatsApp Functions (Global)
function openWhatsApp(button) {
    const plan = button.dataset.plan;
    const price = button.dataset.price;

    const message = `Hello,

I'm interested in your ${plan} plan.
Budget: ${price}

I'd like to know more details about the process and timeline.
Thank you.`;

    const phone = "8801330910019";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

// Project Brief Functions
function confirmAndSendBrief() {
    const siteType = document.getElementById("SiteType").value;
    const websiteType = document.getElementById("websiteType").value;
    const pages = document.getElementById("pages").value;
    const content = document.getElementById("content").value;
    const notes = document.getElementById("notes").value;

    let features = [];
    document.querySelectorAll('.checkbox-group input[name="feature"]:checked').forEach(cb => {
        features.push(cb.value);
    });

    if (!websiteType || !pages) {
        alert("Please select website type and number of pages.");
        return;
    }

    // Store the data in variables for later use
    window.briefData = {
        siteType,

        websiteType,
        pages,
        content,
        features,
        notes
    };

    // Show preview in confirmation modal
    const previewContent = document.getElementById("previewContent");
    if (previewContent) {
        previewContent.innerHTML = `
  <p><strong>Selected Plan:</strong> ${siteType || "Not selected"}</p>
  <p><strong>Website Type:</strong> ${websiteType}</p>
  <p><strong>Pages:</strong> ${pages}</p>
  <p><strong>Content Ready:</strong> ${content}</p>
  <p><strong>Features:</strong> ${features.join(", ") || "None"}</p>
  <p><strong>Notes:</strong> ${notes || "Not Avalable"}</p>
`;
    }

    // Show confirmation modal
    const confirmationModal = document.getElementById("confirmationModal");
    if (confirmationModal) {
        confirmationModal.style.display = "flex";
    }
}

function closeConfirmation() {
    const confirmationModal = document.getElementById("confirmationModal");
    if (confirmationModal) {
        confirmationModal.style.display = "none";
    }
}

function sendToWhatsApp() {
  setStep(3);

    const data = window.briefData;
    
    const message = `Hello,

I would like a website.

Selected Plan: ${data.siteType || "Not selected"}
Website Category: ${data.websiteType}
Pages: ${data.pages}
Content Ready: ${data.content}
Features: ${data.features.join(", ") || "None"}
Notes: ${data.notes || "N/A"}

Please let me know the next steps.
Thank you.`;


    const phone = "8801330910019";
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    // Close confirmation modal
    closeConfirmation();
    
    // Hide the form
    const form = document.getElementById("briefForm");
    if (form) form.style.display = "none";
    
    // Reset the form
    resetForm();
    
    // Show success message
    const successMessage = document.getElementById("successMessageBrief");
    if (successMessage) successMessage.style.display = "block";
    
    // Open WhatsApp in new tab after a short delay
    setTimeout(() => {
        window.open(url, "_blank");
    }, 500);
setTimeout(() => {
  hideStepBar();
  clearStepProgress();
  localStorage.clear(); // 👈 ADD THIS
}, 1500);
}

function resetForm() {
    // Reset form fields
    const websiteType = document.getElementById("websiteType");
    const pages = document.getElementById("pages");
    const content = document.getElementById("content");
    const notes = document.getElementById("notes");
    
    if (websiteType) websiteType.selectedIndex = 0;
    if (pages) pages.selectedIndex = 0;
    if (content) content.selectedIndex = 0;
    if (notes) notes.value = "";
    
    // Uncheck all checkboxes
    document.querySelectorAll('.checkbox-group input[name="feature"]').forEach(cb => {
        cb.checked = false;
    });
}

function showFormAgain() {
    // Hide success message
    const successMessage = document.getElementById("successMessageBrief");
    if (successMessage) successMessage.style.display = "none";
    
    // Show the form again
    const form = document.getElementById("briefForm");
    if (form) {
        form.style.display = "block";
        resetForm();
    }
}

function setStep(stepNumber) {
  const steps = document.querySelectorAll(".step");
  const lines = document.querySelectorAll(".line");

  saveStep(stepNumber);

  steps.forEach((step, index) => {
    step.classList.remove("active", "completed");

    if (index + 1 < stepNumber) {
      step.classList.add("completed");
    } else if (index + 1 === stepNumber) {
      step.classList.add("active");
    }
  });

  lines.forEach((line, index) => {
    line.classList.remove("completed");
    if (index + 1 < stepNumber) {
      line.classList.add("completed");
    }
  });
}


function showStepBar() {
  const bar = document.getElementById("stepBar");
  bar.style.display = "block";
  setTimeout(() => bar.classList.add("show"), 10);
}

function hideStepBar() {
  const bar = document.getElementById("stepBar");
  bar.classList.remove("show");
  setTimeout(() => bar.style.display = "none", 400);
}
document.addEventListener("DOMContentLoaded", () => {
  const savedStep = getSavedStep();

  if (savedStep >= 2) {
    showStepBar();
    setStep(savedStep);

    document.getElementById("briefForm").style.display = "block";
    document.getElementById("startBrief").style.display = "none";
  }
});






// Add this to your existing script.js file

function initializeServicesCarousel() {
  const track = document.querySelector('.services-carousel-track');
  const slides = document.querySelectorAll('.service-slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  if (!track || slides.length === 0) return;
  
  let currentIndex = 0;
  const slidesToShow = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const totalSlides = slides.length;
  
  // Create dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < Math.ceil(totalSlides / slidesToShow); i++) {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
      
      dot.addEventListener('click', () => {
        goToSlide(i * slidesToShow);
      });
    }
  }
  
  function updateSlidePosition() {
    const slideWidth = slides[0].offsetWidth + 20; // width + gap
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('span');
      const activeDotIndex = Math.floor(currentIndex / slidesToShow);
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeDotIndex);
      });
    }
    
    // Update button states
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= totalSlides - slidesToShow;
  }
  
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, totalSlides - slidesToShow));
    updateSlidePosition();
  }
  
  function nextSlide() {
    if (currentIndex < totalSlides - slidesToShow) {
      currentIndex += slidesToShow;
      updateSlidePosition();
    }
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex -= slidesToShow;
      updateSlidePosition();
    }
  }
  
  // Event Listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  // Auto-slide (optional)
  let autoSlideInterval;
  
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      if (currentIndex >= totalSlides - slidesToShow) {
        goToSlide(0);
      } else {
        nextSlide();
      }
    }, 4000);
  }
  
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  
  // Start auto-slide
  startAutoSlide();
  
  // Pause auto-slide on hover
  const carouselContainer = document.querySelector('.services-carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
  }
  
  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newSlidesToShow = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      if (newSlidesToShow !== slidesToShow) {
        goToSlide(0);
      }
    }, 250);
  });
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeServicesCarousel();
});


// Debounced resize handler for better performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Use Intersection Observer for lazy loading
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.service-slide').forEach(slide => {
    observer.observe(slide);
  });
}
function initializeServicesCarousel() {
  const track = document.querySelector('.services-carousel-track');
  const slides = document.querySelectorAll('.service-slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.services-carousel-dots'); // Changed
  
  if (!track || slides.length === 0) return;
  
  let currentIndex = 0;
  const slidesToShow = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const totalSlides = slides.length;
  
  // Create dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < Math.ceil(totalSlides / slidesToShow); i++) {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
      
      dot.addEventListener('click', () => {
        goToSlide(i * slidesToShow);
      });
    }
  }
  
  function updateSlidePosition() {
    const slideWidth = slides[0].offsetWidth + 20;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('span');
      const activeDotIndex = Math.floor(currentIndex / slidesToShow);
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeDotIndex);
      });
    }
    
    // Update button states
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= totalSlides - slidesToShow;
  }
  
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, totalSlides - slidesToShow));
    updateSlidePosition();
  }
  
  function nextSlide() {
    if (currentIndex < totalSlides - slidesToShow) {
      currentIndex += slidesToShow;
      updateSlidePosition();
    }
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex -= slidesToShow;
      updateSlidePosition();
    }
  }
  
  // Event Listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  // Auto-slide
  let autoSlideInterval;
  
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      if (currentIndex >= totalSlides - slidesToShow) {
        goToSlide(0);
      } else {
        nextSlide();
      }
    }, 4000);
  }
  
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  
  startAutoSlide();
  
  // Pause auto-slide on hover
  const carouselContainer = document.querySelector('.services-carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
  }
  
  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newSlidesToShow = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      if (newSlidesToShow !== slidesToShow) {
        goToSlide(0);
      }
    }, 250);
  });
}

const reviews = document.querySelectorAll(".review-card");
const dotsContainer = document.querySelector(".review-dots");
let reviewIndex = 0;

// Create dots
reviews.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.onclick = () => showReview(i);
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("span");

function showReview(index) {
  reviews.forEach(r => r.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  reviews[index].classList.add("active");
  dots[index].classList.add("active");
  reviewIndex = index;
}

document.querySelector(".review-btn.next").onclick = () =>
  showReview((reviewIndex + 1) % reviews.length);

document.querySelector(".review-btn.prev").onclick = () =>
  showReview((reviewIndex - 1 + reviews.length) % reviews.length);

// Auto slide
setInterval(() => {
  showReview((reviewIndex + 1) % reviews.length);
}, 5000);




// FAQ Functionality
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
}

// Call this when page loads
document.addEventListener('DOMContentLoaded', function() {
  initFAQ();
});

// ================= SAVE & RESTORE BRIEF FORM =================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("briefForm");
  if (!form) return;

  const inputs = form.querySelectorAll("input, select, textarea");

  // 🔹 Restore saved data on load
  inputs.forEach(input => {
    const key = input.id || input.name;
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      if (input.type === "checkbox") {
        input.checked = savedValue === "true";
      } else {
        input.value = savedValue;
      }

      // Show form if user already started
      document.getElementById("briefStart").style.display = "none";
      form.style.display = "block";
    }
  });

  // 🔹 Save data on typing
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      const key = input.id || input.name;

      if (input.type === "checkbox") {
        localStorage.setItem(key, input.checked);
      } else {
        localStorage.setItem(key, input.value);
      }
    });
  });
});
