
        // Typed.js initialization
        document.addEventListener('DOMContentLoaded', function() {
            var typed = new Typed(".text", {
                strings: ["Frontend developer", "Web developer", "Graphic designer","Backend developer"],
                typeSpeed: 100,
                backSpeed: 100,
                backDelay: 1000,
                loop: true
            });
            
            // Dark mode toggle
            const darkModeToggle = document.querySelector(".dark-mode-toggle");
            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                const icon = darkModeToggle.querySelector('i');
                if (document.body.classList.contains('dark-mode')) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            });
            
            // Sticky navbar
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    navbar.classList.add('sticky');
                } else {
                    navbar.classList.remove('sticky');
                }
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
            
            // Animation on scroll
            const fadeElements = document.querySelectorAll('.fade-in');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            fadeElements.forEach(element => {
                element.style.opacity = 0;
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(element);
            });
        });
        
        // Email sending function
        function Send() {
            var name = document.getElementById("name").value;
            var email = document.getElementById("email").value;
            var message = document.getElementById("message").value;
            
            if (!name || !email || !message) {
                swal("Error", "Please fill in all fields", "error");
                return;
            }
            
            var body = "Name: " + name + "<br/>Email: " + email + "<br/>Message: " + message;
            
            Email.send({
                Host: "smtp.elasticemail.com",
                Username: "mlamboaaron0@gmail.com",
                Password: "DFB9786B3F970EF8C5E3A87874ADE676290C",
                To: 'mlamboaaron0@gmail.com',
                From: "mlamboaaron0@gmail.com",
                Subject: "New Message from Portfolio",
                Body: body
            }).then(
                message => {
                    if (message === "OK") {
                        swal("Success", "Your message was sent successfully", "success");
                        document.getElementById("name").value = "";
                        document.getElementById("email").value = "";
                        document.getElementById("message").value = "";
                    } else {
                        swal("Error", "Something went wrong. Please try again later.", "error");
                    }
                }
            );
        }
   