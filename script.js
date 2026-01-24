        // Hamburger Menu
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // FAQ Accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });

        // Dropdown Click Behavior
        const dropdownToggles = document.querySelectorAll('.nav-item > a.nav-link');
        
        dropdownToggles.forEach(toggle => {
            // Check if the link has a dropdown sibling
            if (toggle.nextElementSibling && toggle.nextElementSibling.classList.contains('dropdown-content')) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const parent = toggle.parentElement;
                    const isActive = parent.classList.contains('active');
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.nav-item.active').forEach(item => {
                        if (item !== parent) {
                            item.classList.remove('active');
                            // Remove active class from link too
                            const link = item.querySelector('.nav-link');
                            if(link) link.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    parent.classList.toggle('active');
                    toggle.classList.toggle('active');
                });
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-item')) {
                document.querySelectorAll('.nav-item.active').forEach(item => {
                    item.classList.remove('active');
                    const link = item.querySelector('.nav-link');
                    if(link) link.classList.remove('active');
                });
            }
        });

        // Smooth scrolling for anchor links (adjusted to not interfere with dropdowns)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                // Only prevent default if it's NOT a dropdown toggle that we just handled
                if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('dropdown-content')) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const offset = 80;
                        const targetPosition = target.offsetTop - offset;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
