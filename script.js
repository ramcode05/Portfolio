// ==========================================
// GLOBALS & CONFIGURATION
// ==========================================
let currentTheme = "orange";

document.addEventListener("DOMContentLoaded", () => {
    // Reveal animations on scroll
    try {
        initScrollReveal();
    } catch (e) {
        console.error("Scroll reveal initialization failed:", e);
    }

    // Navigation and Mobile Toggle
    try {
        initNavigation();
    } catch (e) {
        console.error("Navigation initialization failed:", e);
    }

    // Contact Dispatcher Form
    try {
        initContactForm();
    } catch (e) {
        console.error("Contact form initialization failed:", e);
    }

    // Custom Cursor
    try {
        initCustomCursor();
    } catch (e) {
        console.error("Custom cursor initialization failed:", e);
    }

    // Grid Data Pipelines
    try {
        initGridPipelines();
    } catch (e) {
        console.error("Grid pipelines initialization failed:", e);
    }

    // Theme Switcher Controller
    try {
        initThemeSwitcher();
    } catch (e) {
        console.error("Theme switcher initialization failed:", e);
    }
});

// ==========================================
// SCROLL REVEAL & SKILL ANIMATION
// ==========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const skillProgressBars = document.querySelectorAll(".skill-meter-fill");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                
                // If this is the skills section, animate progress bars
                if (entry.target.id === "skills") {
                    animateSkillBars();
                }
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    function animateSkillBars() {
        skillProgressBars.forEach(bar => {
            const width = bar.getAttribute("data-width");
            bar.style.width = width;
        });
    }

    // Scroll spy for Nav Links
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-item");

    window.addEventListener("scroll", () => {
        let current = "";
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").slice(1) === current) {
                link.classList.add("active");
            }
        });
    });
}

// ==========================================
// STICKY HEADER & MOBILE NAV MENU
// ==========================================
function initNavigation() {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-item");

    // Toggle menu
    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            navToggle.classList.toggle("active");
        });
    }

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            if (navToggle) navToggle.classList.remove("active");
        });
    });
}



// ==========================================
// SECURE DISPATCH TELEGRAPH CONTACT FORM
// ==========================================
function initContactForm() {
    const dispatchForm = document.getElementById("dispatchForm");
    const formStatus = document.getElementById("formStatus");
    const btnCopyEmail = document.getElementById("btnCopyEmail");
    const emailAddress = document.getElementById("emailAddress");

    if (dispatchForm) {
        dispatchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            formStatus.className = "form-status";
            formStatus.textContent = "Packaging secure encryption envelopes...";

            setTimeout(() => {
                formStatus.className = "form-status success";
                formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Cipher text dispatched. Telegram wire sent.`;
                dispatchForm.reset();
            }, 1000);
        });
    }

    if (btnCopyEmail && emailAddress) {
        btnCopyEmail.addEventListener("click", () => {
            navigator.clipboard.writeText(emailAddress.textContent).then(() => {
                const icon = btnCopyEmail.querySelector("i");
                icon.className = "fa-solid fa-check text-orange";
                setTimeout(() => {
                    icon.className = "fa-regular fa-copy";
                }, 1500);
            });
        });
    }
}



// Skills Filter System
const filterBtns = document.querySelectorAll(".skill-filter-btn");
const skillCards = document.querySelectorAll(".skill-matrix-card");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Toggle active category button
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        skillCards.forEach(card => {
            const cat = card.getAttribute("data-category");
            if (filter === "all" || cat === filter) {
                card.style.display = "flex";
                card.style.opacity = "0";
                setTimeout(() => {
                    card.style.opacity = "1";
                }, 50);
            } else {
                card.style.display = "none";
            }
        });
    });
});


// ==========================================
// CUSTOM INTERACTIVE MOUSE CURSOR
// ==========================================
function initCustomCursor() {
    const cursorCircle = document.getElementById("customCursorCircle");
    const cursorDot = document.getElementById("customCursorDot");

    if (!cursorCircle || !cursorDot) return;

    console.log("Custom cursor registered and waiting for mouse movement.");

    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;
    let dotX = 0;
    let dotY = 0;
    let isVisible = false;

    // Smooth movement with linear interpolation (lerp)
    // Easing factor for trailing effect (lower = more lag, higher = less lag)
    const circleEase = 0.15;
    const dotEase = 0.35; // slightly softened dot to feel organic

    // Update target mouse coordinates on mousemove
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
            // First movement: set position immediately to prevent jumping from (0,0)
            circleX = mouseX;
            circleY = mouseY;
            dotX = mouseX;
            dotY = mouseY;
            
            // Enable custom cursor styling class on body only when mouse moves
            document.body.classList.add("custom-cursor-enabled");
            cursorCircle.classList.add("visible");
            cursorDot.classList.add("visible");
            isVisible = true;
        }
    });

    // Animation Loop
    function updateCursor() {
        if (isVisible) {
            // Lerp outer circle
            circleX += (mouseX - circleX) * circleEase;
            circleY += (mouseY - circleY) * circleEase;

            // Lerp inner dot slightly
            dotX += (mouseX - dotX) * dotEase;
            dotY += (mouseY - dotY) * dotEase;

            // Apply hardware-accelerated transforms
            cursorCircle.style.transform = `translate3d(${circleX}px, ${circleY}px, 0)`;
            cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
        }
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    // Fade out when leaving the browser window
    document.addEventListener("mouseleave", () => {
        cursorCircle.classList.remove("visible");
        cursorDot.classList.remove("visible");
    });

    document.addEventListener("mouseenter", () => {
        cursorCircle.classList.add("visible");
        cursorDot.classList.add("visible");
    });

    // Click feedback
    window.addEventListener("mousedown", () => {
        cursorCircle.classList.add("active");
        cursorDot.classList.add("active");
    });

    window.addEventListener("mouseup", () => {
        cursorCircle.classList.remove("active");
        cursorDot.classList.remove("active");
    });

    // Dynamic Hover States using event delegation (high-performance & dynamic)
    const interactiveSelectors = "a, button, input, textarea, select, .social-circle-btn, .btn-neo, .skill-filter-btn, .skill-matrix-card, .neo-project-card, .cert-item-card, .neo-hacks-list li";

    document.addEventListener("mouseover", (e) => {
        const target = e.target;
        if (target && target.closest(interactiveSelectors)) {
            cursorCircle.classList.add("hovered");
            cursorDot.classList.add("hovered");
        }
    });

    document.addEventListener("mouseout", (e) => {
        const target = e.target;
        if (target && target.closest(interactiveSelectors)) {
            const relatedTarget = e.relatedTarget;
            // Only remove if we aren't moving within or to another interactive element
            if (!relatedTarget || !relatedTarget.closest(interactiveSelectors)) {
                cursorCircle.classList.remove("hovered");
                cursorDot.classList.remove("hovered");
            }
        }
    });
}


// ==========================================
// GRID DATA PIPELINES CANVAS ANIMATION
// ==========================================
function initGridPipelines() {
    const canvas = document.getElementById("gridPipelines");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSpacing = 40; // Matches CSS background-size
    const packets = [];
    const maxPackets = 22;   // Fast active grid streams

    // DPI Scaling and Canvas Sizing
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.scale(dpr, dpr);

        // Re-initialize elements to fit new screen bounds cleanly
        initializeElements();
    }

    // DataPacket class representing a fast-moving data stream
    class DataPacket {
        constructor() {
            this.reset();
            // Distribute packets randomly on load so they don't all cluster
            if (this.orientation === 0) {
                this.x = Math.random() * window.innerWidth;
            } else {
                this.y = Math.random() * window.innerHeight;
            }
        }

        reset() {
            this.orientation = Math.random() < 0.5 ? 0 : 1; // 0 = Horizontal, 1 = Vertical
            this.speed = 3.2 + Math.random() * 4.8; // High-speed travel (3.2px to 8px per frame!)
            this.length = 140 + Math.random() * 140; // Long trailing segments
            this.thickness = 1.8 + Math.random() * 1.6; // Clear line weights
            this.opacity = 0.35 + Math.random() * 0.45; // Highly visible

            if (this.orientation === 0) {
                // Horizontal: travels along Y grid lines
                const gridCountY = Math.max(2, Math.ceil(window.innerHeight / gridSpacing));
                this.gridIndex = Math.floor(Math.random() * gridCountY);
                this.y = this.gridIndex * gridSpacing;

                this.direction = Math.random() < 0.5 ? 1 : -1;
                this.x = this.direction === 1 ? -this.length - 30 : window.innerWidth + 30;
                this.speed = this.speed * this.direction;
            } else {
                // Vertical: travels along X grid lines
                const gridCountX = Math.max(2, Math.ceil(window.innerWidth / gridSpacing));
                this.gridIndex = Math.floor(Math.random() * gridCountX);
                this.x = this.gridIndex * gridSpacing;

                this.direction = Math.random() < 0.5 ? 1 : -1;
                this.y = this.direction === 1 ? -this.length - 30 : window.innerHeight + 30;
                this.speed = this.speed * this.direction;
            }
        }

        update() {
            if (this.orientation === 0) {
                this.x += this.speed;
                if (this.direction === 1 && this.x > window.innerWidth + 30) this.reset();
                else if (this.direction === -1 && this.x < -this.length - 30) this.reset();
            } else {
                this.y += this.speed;
                if (this.direction === 1 && this.y > window.innerHeight + 30) this.reset();
                else if (this.direction === -1 && this.y < -this.length - 30) this.reset();
            }
        }

        draw() {
            // Mapping for canvas comet colors to match the active theme
            const themeColors = {
                orange: "255, 78, 32",
                red: "179, 0, 0",
                white: "18, 18, 18", // Dark lines on white base
                brown: "125, 78, 42"
            };
            const rgbColor = themeColors[currentTheme] || "255, 78, 32";

            let gradient;
            if (this.orientation === 0) {
                gradient = ctx.createLinearGradient(
                    this.x, this.y, 
                    this.x + this.length * -this.direction, this.y
                );
            } else {
                gradient = ctx.createLinearGradient(
                    this.x, this.y, 
                    this.x, this.y + this.length * -this.direction
                );
            }

            gradient.addColorStop(0, `rgba(${rgbColor}, ${this.opacity})`);
            gradient.addColorStop(1, `rgba(${rgbColor}, 0)`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = this.thickness;
            ctx.beginPath();

            if (this.orientation === 0) {
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.length * -this.direction, this.y);
            } else {
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.y + this.length * -this.direction);
            }
            ctx.stroke();
        }
    }

    // Initialize all canvas elements cleanly
    function initializeElements() {
        packets.length = 0;
        for (let i = 0; i < maxPackets; i++) {
            packets.push(new DataPacket());
        }
    }

    // Bind size updates
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Main animation loop
    function animate() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Render fast data signal streams
        packets.forEach(packet => {
            packet.update();
            packet.draw();
        });

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

// ==========================================
// THEME SWITCHER CONTROLLER
// ==========================================
function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll(".theme-btn");
    console.log("Theme switcher initialized, buttons found:", themeButtons.length);
    
    themeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const selectedTheme = btn.getAttribute("data-theme");
            console.log("Theme button clicked. Selected theme:", selectedTheme);
            
            // Remove active class from all buttons
            themeButtons.forEach(b => b.classList.remove("active"));
            // Add active class to clicked button
            btn.classList.add("active");

            // Remove all theme classes from body
            document.body.classList.remove("theme-red", "theme-white", "theme-brown");
            
            // Add new theme class if not default (orange)
            if (selectedTheme !== "orange") {
                document.body.classList.add(`theme-${selectedTheme}`);
            }

            // Update current theme in JS for canvas comets color
            currentTheme = selectedTheme;

            // Swap hero avatar image dynamically
            const avatarImg = document.getElementById("heroAvatarImg");
            
            const avatarMap = {
                orange: "images/avatar_orange.png",
                red:    "images/avatar_red.png",
                white:  "images/avatar_white.png",
                brown:  "images/avatar_brown.png"
            };
            const newSrc = avatarMap[selectedTheme] || "images/avatar_orange.png";

            if (avatarImg) {
                console.log("Setting avatar src from", avatarImg.src, "to", newSrc);
                avatarImg.src = newSrc;
            }
        });
    });
}
