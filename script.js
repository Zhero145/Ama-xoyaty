document.addEventListener("DOMContentLoaded", function () {
    const backgrounds = document.querySelector(".hearts-wrapper");

    // Array of Hello Kitty images for the background
    const kittyImages = [
        "https://media1.tenor.com/m/o6T7cMh7G7oAAAAC/hello-kitty-cute.gif",
        "https://upload.wikimedia.org/wikipedia/en/0/05/Hello_kitty_character_portrait.png"
    ];

    function createFlyingKitty() {
        const kitty = document.createElement("img");

        // Randomly pick an image
        kitty.src = kittyImages[Math.floor(Math.random() * kittyImages.length)];
        kitty.classList.add("flying-kitty");

        // Randomize size: between 40px and 90px
        const size = Math.random() * 50 + 40;
        kitty.style.width = `${size}px`;

        // Randomize horizontal position
        kitty.style.left = `${Math.random() * 90}vw`;

        // Randomize animation duration for a slow, romantic float
        const duration = Math.random() * 15 + 10;
        kitty.style.animationDuration = `${duration}s`;

        // Add random slight delay
        kitty.style.animationDelay = `${Math.random() * 5}s`;

        if (backgrounds) {
            backgrounds.appendChild(kitty);
        } else {
            document.body.appendChild(kitty);
        }

        // Remove element after animation completes to keep the DOM clean
        setTimeout(() => {
            if (kitty.parentNode) {
                kitty.remove();
            }
        }, duration * 1000 + 5000);
    }

    // Create flying Hello Kittys periodically to keep the background filled
    setInterval(createFlyingKitty, 1500);

    // Initial batch just to start the scene nicely
    for (let i = 0; i < 8; i++) {
        setTimeout(createFlyingKitty, i * 500);
    }

    // --- Photo Slideshow Logic ---
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    if (slides.length > 1) {
        // Change photo every 3.5 seconds
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 3300);
    }

    // --- Background Music Logic ---
    const bgMusic = document.getElementById("bg-music");
    if (bgMusic) {
        // --- CUSTOMIZE VOLUME HERE ---
        // Change the volume here (0.0 is silent, 1.0 is max volume)
        // Example: 0.3 is 30% volume
        bgMusic.volume = 0.04;

        // Try to play immediately (modern browsers often block this unless the user has high engagement)
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay started successfully
                console.log("Audio autoplay allowed.");
            }).catch(error => {
                console.log("Autoplay blocked. Waiting for first click to start audio.", error);
                // Fallback: This listener waits for the user's first click anywhere on the page, 
                // then cleanly starts the background music.
                document.body.addEventListener("click", () => {
                    if (bgMusic.paused) {
                        bgMusic.play().catch(err => console.log("Audio playback failed:", err));
                    }
                }, { once: true });
            });
        }
    }

    // --- Custom Voice Audio Player Logic ---
    const voiceAudio = document.getElementById("voiceAudio");
    const playBtn = document.getElementById("voicePlayBtn");
    const progressBar = document.getElementById("voiceProgressBar");
    const progressContainer = document.getElementById("voiceProgressContainer");

    if (voiceAudio && playBtn && progressBar && progressContainer) {
        // Toggle Play/Pause
        playBtn.addEventListener("click", () => {
            if (voiceAudio.paused) {
                voiceAudio.play();
                playBtn.innerHTML = "⏸️"; // Change to pause icon
            } else {
                voiceAudio.pause();
                playBtn.innerHTML = "❤️"; // Change back to heart
            }
        });

        // Update progress bar as audio plays
        voiceAudio.addEventListener("timeupdate", () => {
            const progressPercent = (voiceAudio.currentTime / voiceAudio.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;

            // Reset when finished
            if (voiceAudio.ended) {
                playBtn.innerHTML = "❤️";
                progressBar.style.width = "0%";
            }
        });

        // Click on progress bar to skip
        progressContainer.addEventListener("click", (e) => {
            const clickX = e.offsetX;
            const containerWidth = progressContainer.clientWidth;
            const clickPercent = clickX / containerWidth;
            voiceAudio.currentTime = clickPercent * voiceAudio.duration;
        });
    }

    // --- Scroll to Top Floating Heart Logic ---
    const goTopBtn = document.getElementById("goTopBtn");
    if (goTopBtn) {
        // Show button when scrolled down
        window.addEventListener("scroll", () => {
            if (window.scrollY > 150) {
                goTopBtn.classList.add("visible");
            } else {
                goTopBtn.classList.remove("visible");
            }
        });

        // Scroll to top on click
        goTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
