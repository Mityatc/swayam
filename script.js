document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const toggleBtn = document.querySelector('.toggle-btn');
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('dark', 'light');
        body.classList.add(savedTheme);
        sidebar.classList.remove('dark', 'light');
        sidebar.classList.add(savedTheme);
    }

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark');
        body.classList.toggle('light');
        sidebar.classList.toggle('dark');
        sidebar.classList.toggle('light');
        
        // Save theme preference
        const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);

        // Update charts and fireflies based on theme
        updateGitHubChartTheme();
        updateLeetCodeChartTheme();
        if (currentTheme === 'dark') {
            startFireflyEffect();
        } else {
            stopFireflyEffect();
        }
    });

    // Navigation button click handlers
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = {
        'Home': ['hero', 'skills-card', 'github-activity-card', 'leetcode-activity-card', 'download-section', 'social-links'],
        'About Me': ['about-me-section'],
        'Projects': ['projects-section'],
        'Contact': ['contact-section']
    };

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const buttonText = this.textContent.trim();
            
            // Hide all sections first
            const allSections = document.querySelectorAll('.hero, .skills-card, .github-activity-card, .leetcode-activity-card, .download-section, .social-links, #about-me-section, #projects-section, #contact-section');
            allSections.forEach(section => {
                section.style.display = 'none';
            });

            // Show sections for the clicked button
            if (buttonText === 'Home') {
                document.querySelector('.main-content').style.display = 'flex';
                const homeSections = document.querySelectorAll('.hero, .skills-card, .github-activity-card, .leetcode-activity-card, .download-section, .social-links');
                homeSections.forEach(section => {
                    section.style.display = section.classList.contains('social-links') ? 'flex' : 'block';
                });
            } else {
                document.querySelector('.main-content').style.display = 'block';
                const sectionToShow = document.getElementById(sections[buttonText][0]);
                if (sectionToShow) {
                    sectionToShow.style.display = 'block';
                }
            }
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Color Theme Selector
    const colorOptions = document.querySelectorAll('.color-option');
    const colorThemeSelector = document.querySelector('.color-theme-selector');
    const colorThemeBtn = document.querySelector('.color-theme-btn');

    // Function to set color theme
    function setColorTheme(color) {
        document.body.setAttribute('data-theme-color', color);
        colorOptions.forEach(option => {
            if (option.getAttribute('data-color') === color) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        localStorage.setItem('theme-color', color);
    }

    // Initialize color theme from localStorage
    const savedColor = localStorage.getItem('theme-color');
    if (savedColor) {
        setColorTheme(savedColor);
    } else {
        setColorTheme('#ec1839'); // Default color
    }

    // Add click event listeners to color options
    colorOptions.forEach(option => {
        option.style.backgroundColor = option.getAttribute('data-color');
        option.addEventListener('click', () => {
            const color = option.getAttribute('data-color');
            setColorTheme(color);
        });
    });

    // Toggle color theme panel
    colorThemeBtn.addEventListener('click', () => {
        colorThemeSelector.classList.toggle('open');
    });

    // Close color theme panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!colorThemeSelector.contains(e.target)) {
            colorThemeSelector.classList.remove('open');
        }
    });

    // Function to get greeting based on time
    function getGreeting() {
        const hour = new Date().getHours();
        let greeting = '';

        if (hour >= 5 && hour < 12) {
            greeting = 'Good Morning!';
        } else if (hour >= 12 && hour < 17) {
            greeting = 'Good Afternoon!';
        } else if (hour >= 17 && hour < 21) {
            greeting = 'Good Evening!';
        } else {
            greeting = 'Good Night!';
        }

        return greeting;
    }

    // Update greeting on page load
    const greetingElement = document.querySelector('.greeting');
    if (greetingElement) {
        greetingElement.textContent = getGreeting();
    }

    // Update greeting every minute
    setInterval(() => {
        const greetingElement = document.querySelector('.greeting');
        if (greetingElement) {
            greetingElement.textContent = getGreeting();
        }
    }, 60000);

    // Status badge configuration
    const statusConfig = [
        { icon: '🚀', text: 'Currently Building...' },
        { icon: '✅', text: 'Available for Internships' },
        { icon: '💡', text: 'Open to New Ideas' },
        { icon: '🌱', text: 'Learning & Growing' }
    ];

    // Function to update status badge
    function updateStatus() {
        const statusBadge = document.querySelector('.status-badge');
        if (statusBadge) {
            const randomStatus = statusConfig[Math.floor(Math.random() * statusConfig.length)];
            statusBadge.innerHTML = `
                <span class="status-icon">${randomStatus.icon}</span>
                <span class="status-text">${randomStatus.text}</span>
            `;
        }
    }

    // Update status on page load
    updateStatus();

    // Update status every 30 seconds
    setInterval(updateStatus, 30000);

    // GitHub configuration
    const GITHUB_USERNAME = 'Mityatc';

    // Function to update GitHub chart theme
    function updateGitHubChartTheme() {
        const contributionsChart = document.getElementById('contributions-chart');
        if (contributionsChart) {
            const isDark = document.body.classList.contains('dark');
            // Use the latest activity URL with timestamp to prevent caching
            const timestamp = new Date().getTime();
            contributionsChart.src = `https://ghchart.rshah.org/${GITHUB_USERNAME}?t=${timestamp}`;
        }
    }

    // Update GitHub chart on theme change
    const themeToggle = document.querySelector('.toggle-btn');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(() => {
                updateGitHubChartTheme();
                updateLeetCodeChartTheme();
            }, 100);
        });
    }

    // Initial theme setup
    updateGitHubChartTheme();
    updateLeetCodeChartTheme();

    // Refresh GitHub chart more frequently (every 2 minutes)
    setInterval(updateGitHubChartTheme, 2 * 60 * 1000);

    // GitHub chart error handling
    const contributionsChart = document.getElementById('contributions-chart');
    if (contributionsChart) {
        contributionsChart.onerror = function() {
            const timestamp = new Date().getTime();
            this.src = `https://ghchart.rshah.org/404/${GITHUB_USERNAME}?t=${timestamp}`;
        };
    }

    // LeetCode chart theme handling
    function updateLeetCodeChartTheme() {
        const leetcodeChart = document.getElementById('leetcode-chart');
        if (leetcodeChart) {
            const isDark = document.body.classList.contains('dark');
            leetcodeChart.src = `https://leetcode.card.workers.dev/?username=Mityatc&theme=${isDark ? 'dark' : 'light'}&font=poppins&extension=null&border=0`;
        }
    }

    // LeetCode chart error handling
    const leetcodeChart = document.getElementById('leetcode-chart');
    if (leetcodeChart) {
        leetcodeChart.onerror = function() {
            this.src = `https://leetcode.card.workers.dev/404/Mityatc`;
        };
    }

    // Profile Views Counter
    function updateViewCount() {
        const viewCountElement = document.getElementById('view-count');
        if (viewCountElement) {
            let views = localStorage.getItem('profileViews');
            if (!views) {
                views = 0;
            }
            views = parseInt(views) + 1;
            localStorage.setItem('profileViews', views);
            viewCountElement.textContent = views.toLocaleString();
        }
    }

    // Initialize view count
    updateViewCount();

    // Update view count every 24 hours
    setInterval(() => {
        const lastUpdate = localStorage.getItem('lastViewUpdate');
        const now = new Date().getTime();
        
        if (!lastUpdate || (now - lastUpdate) > 24 * 60 * 60 * 1000) {
            updateViewCount();
            localStorage.setItem('lastViewUpdate', now);
        }
    }, 60 * 60 * 1000); // Check every hour

    // Firefly Effect
    function createFirefly(container) {
        console.log('Creating firefly');
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        // Random movement variables (reduced range for more controlled movement)
        const tx1 = (Math.random() - 0.5) * 100;
        const ty1 = (Math.random() - 0.5) * 100;
        const tx2 = (Math.random() - 0.5) * 100;
        const ty2 = (Math.random() - 0.5) * 100;
        const tx3 = (Math.random() - 0.5) * 100;
        const ty3 = (Math.random() - 0.5) * 100;
        const tx4 = (Math.random() - 0.5) * 100;
        const ty4 = (Math.random() - 0.5) * 100;
        const tx5 = (Math.random() - 0.5) * 100;
        const ty5 = (Math.random() - 0.5) * 100;
        
        // Set custom properties for animation
        firefly.style.setProperty('--tx1', `${tx1}px`);
        firefly.style.setProperty('--ty1', `${ty1}px`);
        firefly.style.setProperty('--tx2', `${tx2}px`);
        firefly.style.setProperty('--ty2', `${ty2}px`);
        firefly.style.setProperty('--tx3', `${tx3}px`);
        firefly.style.setProperty('--ty3', `${ty3}px`);
        firefly.style.setProperty('--tx4', `${tx4}px`);
        firefly.style.setProperty('--ty4', `${ty4}px`);
        firefly.style.setProperty('--tx5', `${tx5}px`);
        firefly.style.setProperty('--ty5', `${ty5}px`);
        
        // Set initial position
        firefly.style.left = `${x}px`;
        firefly.style.top = `${y}px`;
        
        container.appendChild(firefly);
        console.log('Firefly added to container');
        
        // Remove firefly after animation
        setTimeout(() => {
            firefly.remove();
        }, 15000);
    }

    function startFireflyEffect(count = 20) {
        console.log('Starting firefly effect');
        const container = document.getElementById('firefly-container');
        if (!container) {
            console.log('Firefly container not found');
            return;
        }
        
        // Clear existing fireflies
        container.innerHTML = '';
        
        // Create initial fireflies
        for (let i = 0; i < count; i++) {
            createFirefly(container);
        }
        
        // Continuously create new fireflies
        const interval = setInterval(() => {
            if (document.body.classList.contains('dark')) {
                createFirefly(container);
            } else {
                clearInterval(interval);
                console.log('Stopping firefly effect - light mode');
            }
        }, 1000);
        
        // Store interval ID for cleanup
        container.dataset.intervalId = interval;
        console.log('Firefly effect started');
    }

    function stopFireflyEffect() {
        console.log('Stopping firefly effect');
        const container = document.getElementById('firefly-container');
        if (!container) {
            console.log('Firefly container not found');
            return;
        }
        
        // Clear the interval
        const intervalId = container.dataset.intervalId;
        if (intervalId) {
            clearInterval(parseInt(intervalId));
            delete container.dataset.intervalId;
        }
        
        // Clear all fireflies
        container.innerHTML = '';
        console.log('Firefly effect stopped');
    }

    // Initialize firefly effect if dark theme is active
    if (document.body.classList.contains('dark')) {
        console.log('Initializing firefly effect - dark mode detected');
        startFireflyEffect();
    }

    // Cursor Trail Effect
    let canCreateTrail = true;
    const trailThrottleDelay = 50; // Milliseconds between trail elements

    function createTrailElement(x, y) {
        // Only create trail if in dark mode
        if (document.body.classList.contains('dark') && canCreateTrail) {
            const trail = document.createElement('div');
            trail.classList.add('cursor-trail');
            trail.style.left = `${x}px`;
            trail.style.top = `${y}px`;

            document.body.appendChild(trail);

            // Remove the element after animation finishes
            setTimeout(() => {
                trail.remove();
            }, 600); // Match CSS animation duration

            // Throttle creation
            canCreateTrail = false;
            setTimeout(() => {
                canCreateTrail = true;
            }, trailThrottleDelay);
        }
    }

    // Mouse event listener
    document.addEventListener('mousemove', (e) => {
        createTrailElement(e.clientX, e.clientY);
    });

    // Touch event listeners
    document.addEventListener('touchmove', (e) => {
        // Prevent scrolling while creating trail
        e.preventDefault();
        const touch = e.touches[0];
        createTrailElement(touch.clientX, touch.clientY);
    }, { passive: false });

    // Handle touch start
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        createTrailElement(touch.clientX, touch.clientY);
    });

    // Image Popup Functionality
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    document.body.appendChild(overlay);

    // Create close button
    const closeButton = document.createElement('div');
    closeButton.className = 'close-popup';
    closeButton.innerHTML = '×';
    document.body.appendChild(closeButton);

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.add('popup-active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            closeButton.style.display = 'flex';
        });
    });

    function closePopup() {
        const activeItem = document.querySelector('.gallery-item.popup-active');
        if (activeItem) {
            activeItem.classList.remove('popup-active');
        }
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        closeButton.style.display = 'none';
    }

    closeButton.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);

    // Close popup on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePopup();
        }
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: this.querySelector('input[name="name"]').value,
                email: this.querySelector('input[name="email"]').value,
                subject: this.querySelector('input[name="subject"]').value,
                message: this.querySelector('textarea[name="message"]').value
            };

            // Here you would typically send the form data to a server
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', formData);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            
            // Insert success message after the form
            this.parentNode.insertBefore(successMessage, this.nextSibling);
            
            // Reset form
            this.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }

    // Phone number copying functionality
    const phoneItem = document.querySelector('.contact-item:has(i.fa-phone)');
    if (phoneItem) {
        phoneItem.addEventListener('click', function() {
            const phoneNumber = this.querySelector('p').textContent.trim();
            
            // Create a temporary input element
            const tempInput = document.createElement('input');
            tempInput.value = phoneNumber;
            document.body.appendChild(tempInput);
            
            // Select and copy the text
            tempInput.select();
            document.execCommand('copy');
            
            // Remove the temporary input
            document.body.removeChild(tempInput);
            
            // Show feedback
            const originalText = this.querySelector('p').textContent;
            this.querySelector('p').textContent = 'Copied!';
            
            // Reset text after 2 seconds
            setTimeout(() => {
                this.querySelector('p').textContent = originalText;
            }, 2000);
        });
    }

    // Add placeholder attributes to form inputs
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.setAttribute('placeholder', ' ');
    });

    // Touch event handling
    document.addEventListener('DOMContentLoaded', function() {
        // Prevent default touch behaviors that might interfere
        document.addEventListener('touchmove', function(e) {
            if (e.target.closest('.contributions-graph, .leetcode-graph')) {
                // Allow horizontal scrolling for graphs
                return;
            }
            // For other elements, prevent default only if it's a vertical scroll
            if (Math.abs(e.touches[0].clientX) > Math.abs(e.touches[0].clientY)) {
                e.preventDefault();
            }
        }, { passive: false });

        // Ensure buttons are clickable
        const buttons = document.querySelectorAll('.nav-btn, .social-btn, .project-link, .download-btn, .toggle-btn, .color-theme-btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function(e) {
                e.stopPropagation();
            }, { passive: true });

            button.addEventListener('touchend', function(e) {
                e.stopPropagation();
                // Trigger click event
                this.click();
            }, { passive: true });
        });

        // Fix for iOS Safari
        document.addEventListener('gesturestart', function(e) {
            e.preventDefault();
        }, { passive: false });

        // Ensure proper scrolling
        const scrollableElements = document.querySelectorAll('.container, .main-content, .contributions-graph, .leetcode-graph');
        scrollableElements.forEach(element => {
            element.addEventListener('touchstart', function(e) {
                this.style.overflow = 'auto';
            }, { passive: true });
        });
    });
}); 