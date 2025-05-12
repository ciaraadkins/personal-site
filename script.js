// Simple script to enhance the user experience
// Last updated: May 12, 2025

document.addEventListener('DOMContentLoaded', function() {
    // Personality tab functionality
    const personalityNavButtons = document.querySelectorAll('.personality-nav-button');
    const personalityPanels = document.querySelectorAll('.personality-panel');
    
    // Make sure all tabs are initialized properly
    personalityPanels.forEach(panel => {
        if (!panel.classList.contains('active')) {
            panel.style.display = 'none';
        }
    });
    
    personalityNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Update active button
            personalityNavButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show target panel
            personalityPanels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(`${target}-panel`).classList.add('active');
        });
    });
    
    // Animate trait bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.querySelectorAll('.trait-bar').forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                }, 300);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const bigfivePanel = document.getElementById('bigfive-panel');
    if (bigfivePanel) {
        observer.observe(bigfivePanel);
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add year to copyright
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Mark active section in navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    function setActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Run on load
    setActiveLink();
    
    // Run on scroll
    window.addEventListener('scroll', setActiveLink);
    
    // Setup meme carousel
    function setupCarousel() {
        const carouselTrack = document.querySelector('.carousel-track');
        const carouselItems = document.querySelectorAll('.carousel-item');
        const dotsContainer = document.querySelector('.carousel-dots');
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');
        
        if (!carouselTrack || carouselItems.length === 0) return;
        
        let currentIndex = 0;
        
        // Create dots for navigation
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            carouselItems.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }
        
        // Handle video pause when switching slides
        function pauseAllVideos() {
            document.querySelectorAll('.carousel-video').forEach(video => {
                if (!video.paused) video.pause();
            });
        }
        
        // Function to go to a specific slide
        function goToSlide(index) {
            // Pause all videos when switching slides
            pauseAllVideos();
            
            if (index < 0) index = carouselItems.length - 1;
            if (index >= carouselItems.length) index = 0;
            
            currentIndex = index;
            const offset = -currentIndex * 100 + '%';
            carouselTrack.style.transform = 'translateX(' + offset + ')';
            
            // Update active dot
            if (dotsContainer) {
                document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
        }
        
        // Event listeners for controls
        if (prevButton) {
            prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));
        }
        
        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Only respond to arrow keys when carousel is in view
            const carouselSection = document.getElementById('meme-carousel');
            if (carouselSection && isElementInViewport(carouselSection)) {
                if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
                if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
            }
        });
    }
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Initialize the carousel
    setupCarousel();
    

    
    // Render Expert Generalist Radar Chart
    function renderRadarChart() {
        const canvas = document.getElementById('radar-chart');
        if (!canvas || !window.Chart) return;
        
        const data = {
            labels: [
                'Solutions Architecture',
                'Marketing & Content',
                'Development',
                'Analytics & Data',
                'Technical Documentation',
                'Project Management',
                'UX/UI Design',
                'AI Systems Integration'
            ],
            datasets: [
                {
                    label: 'Before AI',
                    data: [65, 70, 55, 75, 60, 60, 40, 30],
                    fill: true,
                    backgroundColor: 'rgba(136, 132, 216, 0.4)',
                    borderColor: 'rgb(136, 132, 216)',
                    pointBackgroundColor: 'rgb(136, 132, 216)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(136, 132, 216)'
                },
                {
                    label: 'With AI',
                    data: [92, 95, 85, 95, 90, 88, 80, 95],
                    fill: true,
                    backgroundColor: 'rgba(0, 119, 182, 0.4)',
                    borderColor: 'rgb(0, 119, 182)',
                    pointBackgroundColor: 'rgb(0, 119, 182)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(0, 119, 182)'
                }
            ]
        };
        
        const config = {
            type: 'radar',
            data: data,
            options: {
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Skills Transformation With AI',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        };
        
        new Chart(canvas, config);
    }
    
    // Render the radar chart when the page loads
    renderRadarChart();
});
