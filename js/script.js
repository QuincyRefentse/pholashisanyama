// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // Header scroll effect
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
                if (backToTop) backToTop.classList.add('show');
            } else {
                header.classList.remove('scrolled');
                if (backToTop) backToTop.classList.remove('show');
            }
        });
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Menu data from menu.jpg
    const menuItems = [
        { name: "Prime Rib + 3 Veggies & Gravy", price: "R50", description: "Tender prime rib with our signature gravy" },
        { name: "Chicken Meal + 3 Veggies & Gravy", price: "R47", description: "Juicy grilled chicken, perfectly spiced" },
        { name: "Beef Stew Meal + 3 Veggies & Gravy", price: "R45", description: "Slow-cooked beef stew, rich and hearty" },
        { name: "Wors Meat + 3 Veggies & Gravy", price: "R35", description: "Traditional South African boerewors" },
        { name: "Hamburger + 3 Veggies & Gravy", price: "R40", description: "Hand-formed beef patty with all the trimmings" },
        { name: "Polo Shrimp Niyama Meal", price: "R47", description: "Specialty chicken & shrimp combo" }
    ];

    // Populate featured items on homepage
    const featuredGrid = document.getElementById('featured-items');
    if (featuredGrid) {
        // Show first 3 items as featured
        const featured = menuItems.slice(0, 3);
        featuredGrid.innerHTML = featured.map(item => `
            <div class="menu-item" data-aos="fade-up">
                <div class="menu-item-image" style="background: linear-gradient(45deg, #930045, #b80b5a);"></div>
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p class="item-description" style="color: #666; margin-bottom: 10px;">${item.description}</p>
                    <div class="price" style="font-size: 2rem; font-weight: 800; color: #930045;">${item.price}</div>
                </div>
            </div>
        `).join('');
    }

    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const current = parseInt(stat.innerText);
            const increment = target / 50;
            
            if (current < target) {
                stat.innerText = Math.ceil(current + increment);
                setTimeout(animateStats, 30);
            } else {
                stat.innerText = target + (stat.getAttribute('data-count') === '10000' ? '+' : '');
            }
        });
    }

    // Trigger stats animation when in viewport
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // ===== FOOD SLIDER - FIFO ANIMATION =====
    // Food Items Slider - Moves from left to right with FIFO effect
    function initFoodSlider() {
        const foodSlider = document.getElementById('foodSlider');
        if (!foodSlider) return;
        
        // Food items from your menu (with placeholder images)
        // You can replace these with your actual food items
        const foodItems = [
            { name: "Prime Rib", price: "R50", image: "images/prime-rib.jpg" },
            { name: "Chicken", price: "R47", image: "images/chicken.jpg" },
            { name: "Beef Stew", price: "R45", image: "images/beef-stew.jpg" },
            { name: "Wors Meat", price: "R35", image: "images/wors.jpg" },
            { name: "Hamburger", price: "R40", image: "images/burger.jpg" },
            { name: "Shrimp", price: "R47", image: "images/shrimp.jpg" },
            { name: "Polo", price: "R47", image: "images/polo.jpg" },
            { name: "Rib Eye", price: "R55", image: "images/rib-eye.jpg" },
            { name: "Lamb Chops", price: "R60", image: "images/lamb.jpg" },
            { name: "Sausage", price: "R30", image: "images/sausage.jpg" }
        ];
        
        // Create food items HTML
        let foodHTML = '';
        
        // Add each food item (first set)
        foodItems.forEach(item => {
            foodHTML += `
                <div class="food-item">
                    <div class="food-item-image">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/120x120/930045/ffffff?text=${item.name.replace(' ', '+')}'">
                    </div>
                    <h4>${item.name}</h4>
                    <span class="food-item-price">${item.price}</span>
                </div>
            `;
        });
        
        // Duplicate the items for seamless loop (creates FIFO effect)
        foodItems.forEach(item => {
            foodHTML += `
                <div class="food-item">
                    <div class="food-item-image">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/120x120/930045/ffffff?text=${item.name.replace(' ', '+')}'">
                    </div>
                    <h4>${item.name}</h4>
                    <span class="food-item-price">${item.price}</span>
                </div>
            `;
        });
        
        foodSlider.innerHTML = foodHTML;
        
        // Adjust animation duration based on number of items for smooth FIFO effect
        const totalItems = foodItems.length * 2; // Because we duplicated
        const duration = totalItems * 1.2; // 1.2 seconds per item for smooth flow
        foodSlider.style.animationDuration = `${duration}s`;
        
        // Add click event to food items (optional - can link to menu)
        document.querySelectorAll('.food-item').forEach(item => {
            item.addEventListener('click', function() {
                window.location.href = 'menu.html';
            });
        });
    }

    // Initialize food slider
    initFoodSlider();

    // Optional: Add a resize handler to adjust animation speed on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Re-initialize slider to adjust animation if needed
            const foodSlider = document.getElementById('foodSlider');
            if (foodSlider) {
                const items = foodSlider.children.length;
                const duration = items * 1.2;
                foodSlider.style.animationDuration = `${duration}s`;
            }
        }, 250);
    });

    // Optional: Add touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const foodSlider = document.getElementById('foodSlider');
    if (foodSlider) {
        foodSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            // Pause animation on touch
            this.style.animationPlayState = 'paused';
        }, { passive: true });
        
        foodSlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            // Resume animation
            this.style.animationPlayState = 'running';
        }, { passive: true });
    }

    // Optional: Add keyboard accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });

    // Optional: Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            // If image fails to load, the onerror handler already provides placeholder
            console.log('Image failed to load:', this.src);
        });
    });

    // Optional: Add parallax effect to hero (subtle)
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    console.log('Phola Shisa Nyama website loaded successfully!');
});