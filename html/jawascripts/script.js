let menuTimeout;

function toggleMenu() {
    const menu = document.querySelector('.menu');
    const menuItems = menu.querySelectorAll('.tt a');

    if (menu.classList.contains('show')) {
        menu.style.height = "0px";
        menuItems.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateX(-50px)";
        });
        menu.addEventListener('transitionend', () => {
            if (menu.style.height === "0px") {
                menu.classList.remove('show');
                menu.style.display = "none";
            }
        }, { once: true });
        
        // Clear the timeout to prevent auto-close if already closing
        clearTimeout(menuTimeout);
    } else {
        menu.style.display = "flex";
        menu.style.height = "auto";
        let height = menu.scrollHeight + "px";
        menu.style.height = "0px";
        setTimeout(() => menu.style.height = height, 10);
        menu.classList.add('show');

        // Add slide-in-left class with delay for each menu item
        menuItems.forEach((item, index) => {
            item.style.opacity = "0";
            item.style.transform = "translateX(-50px)";
            item.style.transition = `opacity 0.5s ease-out ${index * 0.2}s, transform 0.5s ease-out ${index * 0.2}s`;
            setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateX(0)";
            }, 20);
        });

        // Automatically close the menu after 5 seconds
        menuTimeout = setTimeout(() => {
            toggleMenu();
        }, 5000);
    }
}

// Attach the toggleMenu function to the hamburger click event
document.querySelector('.hamburger-menu').addEventListener('click', toggleMenu);





document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const services = document.querySelectorAll('.service');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Adding a separate observer for services to slide in from right to left one by one
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in-right');
                serviceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    services.forEach((service, index) => {
        serviceObserver.observe(service);
        service.style.transitionDelay = `${index * 0.2}s`; // Adds delay for each service to slide in one by one
    });


    

    // Existing menu toggle code
    function toggleMenu() {
        const menu = document.querySelector('.menu');
        if (menu.style.height === "0px" || !menu.style.height) {
            menu.style.display = "flex";
            menu.style.height = "auto";
            let height = menu.scrollHeight + "px";
            menu.style.height = "0px";
            setTimeout(() => menu.style.height = height, 10);
        } else {
            menu.style.height = "0px";
            menu.addEventListener('transitionend', () => {
                if (menu.style.height === "0px") {
                    menu.style.display = "none";
                }
            }, { once: true });
        }
    }

    // Function to validate the form
    function validateForm(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get form elements
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        // Simple validation
        if (!name || !email || !phone || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Regex for email and phone validation (basic examples)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10}$/;

        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!phonePattern.test(phone)) {
            alert('Please enter a valid phone number (10 digits).');
            return;
        }

        // If all validations pass
        alert('Form submitted successfully!');
        // You can add code here to actually submit the form data to your server

        // Reset the form
        document.querySelector('form').reset();
    }

    // Attach the validateForm function to the form submit event
    document.querySelector('form').addEventListener('submit', validateForm);
});
