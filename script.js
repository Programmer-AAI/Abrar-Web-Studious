//     const menuToggle = document.getElementById("menuToggle");
//     const navLinks = document.getElementById("navLinks");
//     const navButtons = document.getElementById("navButtons");

//     menuToggle.addEventListener("click", () => {
//         navLinks.classList.toggle("active");
//         navButtons.classList.toggle("active");
//     });

// document.addEventListener("DOMContentLoaded", () => {

//     const slides = document.querySelectorAll(".project-card");
//     const prevBtn = document.querySelector(".carousel-btn.prev");
//     const nextBtn = document.querySelector(".carousel-btn.next");
//     const dotsContainer = document.querySelector(".carousel-dots");

//     let currentIndex = 0;
//     let interval;

//     /* CREATE DOTS */
//     slides.forEach((_, i) => {
//         const dot = document.createElement("span");
//         if (i === 0) dot.classList.add("active");
//         dotsContainer.appendChild(dot);

//         dot.addEventListener("click", () => {
//             goToSlide(i);
//         });
//     });

//     const dots = document.querySelectorAll(".carousel-dots span");

//     function goToSlide(index) {
//         slides[currentIndex].classList.remove("active");
//         dots[currentIndex].classList.remove("active");

//         currentIndex = index;

//         slides[currentIndex].classList.add("active");
//         dots[currentIndex].classList.add("active");
//     }

//     function nextSlide() {
//         goToSlide((currentIndex + 1) % slides.length);
//     }

//     function prevSlide() {
//         goToSlide((currentIndex - 1 + slides.length) % slides.length);
//     }

//     nextBtn.addEventListener("click", nextSlide);
//     prevBtn.addEventListener("click", prevSlide);

//     /* AUTO SLIDE */
//     function startAutoSlide() {
//         interval = setInterval(nextSlide, 3000);
//     }

//     function stopAutoSlide() {
//         clearInterval(interval);
//     }

//     startAutoSlide();

//     document.querySelector(".carousel")
//         .addEventListener("mouseenter", stopAutoSlide);

//     document.querySelector(".carousel")
//         .addEventListener("mouseleave", startAutoSlide);

// });


//   // Form submission
//   const contactForm = document.getElementById('contactForm');
//   if (contactForm) {
//     contactForm.addEventListener('submit', async (e) => {
//       e.preventDefault();
      
//       // Show loading spinner
//       document.getElementById('loadingSpinner').style.display = 'block';
      
//       try {
//         const response = await fetch(contactForm.action, {
//           method: 'POST',
//           body: new FormData(contactForm),
//           headers: {
//             'Accept': 'application/json'
//           }
//         });
        
//         if (response.ok) {
//           contactForm.reset();
//           document.getElementById('successMessage').style.display = 'block';
//         } else {
//           throw new Error('Form submission failed');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       } finally {
//         document.getElementById('loadingSpinner').style.display = 'none';
//       }
//     });




//      function openWhatsApp(button) {
//     const plan = button.dataset.plan;
//     const price = button.dataset.price;

//     const message =
// `Hello,

// I’m interested in your ${plan} plan.
// Budget: ${price}

// I’d like to know more details about the process and timeline.
// Thank you.`;

//     const phone = "8801330910019";
//     const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

//     window.open(url, "_blank");
// }
//   }




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
            <p><strong>Website Type:</strong> ${websiteType}</p>
            <p><strong>Pages:</strong> ${pages}</p>
            <p><strong>Content Ready:</strong> ${content}</p>
            <p><strong>Features:</strong> ${features.join(", ") || "None"}</p>
            <p><strong>Notes:</strong> ${notes || "N/A"}</p>
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
    const data = window.briefData;
    
    const message = `Hello, I want a website.

Website Type: ${data.websiteType}
Pages: ${data.pages}
Content Ready: ${data.content}
Features: ${data.features.join(", ") || "None"}
Notes: ${data.notes || "N/A"}`;

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




 
