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

    // Menu data from menu.jpg mapped to actual image files
    const menuItems = [
        { name: "Prime Rib + 3 Veggies & Gravy", price: "R50", description: "Tender prime rib with our signature gravy", image: "images/menu/rips.png" },
        { name: "Beef Stew Meal + 3 Veggies & Gravy", price: "R45", description: "Slow-cooked beef stew, rich and hearty", image: "images/menu/beefstew.png" },
        { name: "Wors Meat + 3 Veggies & Gravy", price: "R35", description: "Traditional South African boerewors", image: "images/menu/voers.jpg" },
        // I swapped the below items to match the images you actually have in your folder, 
        // but you can change the text back if you prefer!
        { name: "Braai Plate + 3 Veggies", price: "R60", description: "Premium mixed grill for the ultimate braai experience", image: "images/menu/braais.jpg" },
        { name: "Mixed Meat Combo", price: "R55", description: "A delicious variety of our best cuts", image: "images/menu/mix.jpg" },
        { name: "Biltong Stew + 3 Veggies", price: "R50", description: "Authentic African biltong stew", image: "images/menu/african-biltong-stew.jpg" }
    ];

    // Populate featured items on homepage
    const featuredGrid = document.getElementById('featured-items');
    if (featuredGrid) {
        // Show first 3 items as featured
        const featured = menuItems.slice(0, 3);
        featuredGrid.innerHTML = featured.map(item => `
            <div class="menu-item" data-aos="fade-up">
                <div class="menu-item-image" style="background-image: url('${item.image}'); background-size: cover; background-position: center;"></div>
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
        // Food items from your menu mapped to the actual image files in images/menu/
        const foodItems = [
            { name: "Prime Ribs", price: "R50", image: "images/menu/rips.png" },
            { name: "Beef Portion", price: "R47", image: "images/menu/beef.png" },
            { name: "Beef Stew", price: "R45", image: "images/menu/beefstew.png" },
            { name: "Wors Meat", price: "R35", image: "images/menu/voers.jpg" },
            { name: "Braai Plate", price: "R60", image: "images/menu/braais.jpg" },
            { name: "Mixed Meat", price: "R55", image: "images/menu/mix.jpg" },
            { name: "Liver Meal", price: "R35", image: "images/menu/liver.jpg" },
            { name: "Veg Platter", price: "R30", image: "images/menu/platveg.jpg" },
            { name: "Biltong Stew", price: "R50", image: "images/menu/african-biltong-stew.jpg" },
            { name: "Samp Portion", price: "R20", image: "images/menu/samp.jpg" }
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

    // ===== SHOPPING CART LOGIC =====
    let cart = [];
    const WHATSAPP_NUMBER = "27123456789"; // Replace with your actual number!

    const cartBtn = document.getElementById('cartBtn');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartDrawer = document.getElementById('cartDrawer');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotalValue = document.getElementById('cartTotalValue');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Open/Close Cart
    if(cartBtn) {
        cartBtn.addEventListener('click', () => {
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
        });
    }

    if(closeCartBtn && cartOverlay) {
        const closeCart = () => {
            cartDrawer.classList.remove('active');
            cartOverlay.classList.remove('active');
        };
        closeCartBtn.addEventListener('click', closeCart);
        cartOverlay.addEventListener('click', closeCart);
    }

    // Add items to cart
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));

            // Check if item already exists in cart
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCartUI();

            // Success Animation on Button
            const originalText = this.innerHTML;
            this.innerHTML = 'Added! <i class="fas fa-check"></i>';
            this.style.backgroundColor = "var(--magenta)";
            this.style.color = "var(--white)";
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = "transparent";
                this.style.color = "var(--magenta)";
            }, 1000);

            // Pop animation on cart icon
            cartCount.classList.add('pop');
            setTimeout(() => cartCount.classList.remove('pop'), 300);
        });
    });

    // Update Cart Display
    function updateCartUI() {
        if (!cartItemsContainer) return;
        
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty. Add some delicious meals!</div>';
        } else {
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                totalItems += item.quantity;

                cartItemsContainer.innerHTML += `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <span class="cart-item-price">R${item.price}</span>
                        </div>
                        <div class="cart-item-controls">
                            <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                        </div>
                    </div>
                `;
            });
        }

        cartCount.innerText = totalItems;
        cartTotalValue.innerText = `R${total}`;
    }

    // Change Quantity Function (Needs to be global)
    window.changeQty = function(index, change) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); // Remove item if quantity goes to 0
        }
        updateCartUI();
    };

    // Process Checkout
    if(checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert("Please add some items to your order first!");
                return;
            }

            let message = "Hi Phola Shisa Nyama, I'd like to place an order:\n\n";
            let total = 0;

            cart.forEach(item => {
                message += `▪ ${item.quantity}x ${item.name} (R${item.price * item.quantity})\n`;
                total += item.price * item.quantity;
            });

            message += `\n*Total: R${total}*`;
            message += `\n\nIs it available for collection?`;

            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
        });
    }
    console.log('Phola Shisa Nyama website loaded successfully!');
});