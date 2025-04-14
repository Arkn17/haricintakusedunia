console.log("greeting.js loaded");

// Elemen
const giftBox = document.getElementById("giftBox");
const giftSound = document.getElementById("giftSound");
const birthdayVideo = document.getElementById("birthdayVideo");
const videoContainer = document.getElementById("videoContainer");
const continueButton = document.getElementById("continueButton");

// Debug: Cek apakah elemen ditemukan
console.log("giftBox:", giftBox);
console.log("giftSound:", giftSound);
console.log("birthdayVideo:", birthdayVideo);
console.log("videoContainer:", videoContainer);
console.log("continueButton:", continueButton);

// Cek apakah elemen ditemukan, kalau tidak kasih alert
if (!giftBox || !giftSound || !birthdayVideo || !videoContainer || !continueButton) {
    console.error("One or more elements not found. Check HTML structure.");
    alert("Error: Some elements not found. Check console for details.");
}

// Atur volume suara
giftSound.volume = 0.3;

// Animasi awal untuk judul dan hint
if (typeof gsap !== "undefined") {
    console.log("GSAP loaded, starting animations");
    gsap.from(".gift-title", { opacity: 0, y: 20, duration: 1.5, ease: "power2.out" });
    gsap.from(".gift-box", { opacity: 0, scale: 0.8, duration: 1, delay: 1 });
    gsap.from(".hint", { opacity: 0, y: 20, duration: 1, delay: 1.5 });
} else {
    console.error("GSAP not loaded, applying fallback");
    document.querySelector(".gift-title").style.opacity = 1;
    document.querySelector(".gift-box").style.opacity = 1;
    document.querySelector(".hint").style.opacity = 1;
}

// Tambahan: Partikel hati di sekitar kotak kado
function createHeartParticle() {
    const heart = document.createElement("div");
    heart.className = "heart-particle";
    const giftBoxRect = giftBox.getBoundingClientRect();
    const centerX = giftBoxRect.left + giftBoxRect.width / 2;
    const centerY = giftBoxRect.top + giftBoxRect.height / 2;

    heart.style.left = centerX + "px";
    heart.style.top = centerY + "px";
    document.body.appendChild(heart);

    gsap.to(heart, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        scale: 0,
        duration: 2,
        ease: "power1.out",
        onComplete: () => heart.remove()
    });
}

// Partikel hati muncul tiap 300ms sebelum kotak diklik
const heartInterval = setInterval(createHeartParticle, 300);

// Tambahan: Lampu kecil berkedip di sekitar kotak kado
function createGlowLight() {
    const light = document.createElement("div");
    light.className = "glow-light";
    const giftBoxRect = giftBox.getBoundingClientRect();
    const centerX = giftBoxRect.left + giftBoxRect.width / 2;
    const centerY = giftBoxRect.top + giftBoxRect.height / 2;

    const angle = Math.random() * 2 * Math.PI;
    const radius = 100;
    light.style.left = centerX + Math.cos(angle) * radius + "px";
    light.style.top = centerY + Math.sin(angle) * radius + "px";
    document.body.appendChild(light);

    gsap.to(light, {
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
}

// Buat beberapa lampu kecil
for (let i = 0; i < 5; i++) {
    setTimeout(createGlowLight, i * 300);
}

// Bikin partikel bintang emas (yang sudah ada)
function createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.top = "-10px";
    document.body.appendChild(particle);

    if (typeof gsap !== "undefined") {
        gsap.to(particle, {
            y: "100vh",
            opacity: 0,
            duration: Math.random() * 5 + 3,
            rotation: Math.random() * 360,
            onComplete: () => particle.remove()
        });
    } else {
        particle.style.transition = "all 5s";
        particle.style.transform = "translateY(100vh)";
        particle.style.opacity = 0;
        setTimeout(() => particle.remove(), 5000);
    }
}

// Partikel muncul tiap 500ms
setInterval(createParticle, 500);

// Tambahan: Efek konfeti saat kotak kado dibuka
function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        const giftBoxRect = giftBox.getBoundingClientRect();
        confetti.style.left = giftBoxRect.left + giftBoxRect.width / 2 + "px";
        confetti.style.top = giftBoxRect.top + giftBoxRect.height / 2 + "px";
        confetti.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
        document.body.appendChild(confetti);

        gsap.to(confetti, {
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            opacity: 0,
            rotation: Math.random() * 720,
            duration: 3,
            ease: "power1.out",
            onComplete: () => confetti.remove()
        });
    }
}

// Animasi saat kotak kado diklik
giftBox.addEventListener("click", () => {
    console.log("Gift box clicked, playing animation and sound...");
    giftBox.classList.add("open");
    clearInterval(heartInterval); // Hentikan partikel hati
    createConfetti(); // Tambahkan efek konfeti

    giftSound.play().then(() => {
        console.log("Gift sound played successfully");
        if (typeof gsap !== "undefined") {
            gsap.to(".gift-box", { opacity: 0, duration: 0.5 });
            gsap.to(".hint", { opacity: 0, duration: 0.5, onComplete: () => {
                document.querySelector(".gift-box").style.display = "none";
                document.querySelector(".hint").style.display = "none";
                showVideo();
            }});
        } else {
            document.querySelector(".gift-box").style.opacity = 0;
            document.querySelector(".hint").style.opacity = 0;
            setTimeout(() => {
                document.querySelector(".gift-box").style.display = "none";
                document.querySelector(".hint").style.display = "none";
                showVideo();
            }, 500);
        }
    }).catch(error => {
        console.error("Error playing gift sound:", error);
        if (typeof gsap !== "undefined") {
            gsap.to(".gift-box", { opacity: 0, duration: 0.5 });
            gsap.to(".hint", { opacity: 0, duration: 0.5, onComplete: () => {
                document.querySelector(".gift-box").style.display = "none";
                document.querySelector(".hint").style.display = "none";
                showVideo();
            }});
        } else {
            document.querySelector(".gift-box").style.opacity = 0;
            document.querySelector(".hint").style.opacity = 0;
            setTimeout(() => {
                document.querySelector(".gift-box").style.display = "none";
                document.querySelector(".hint").style.display = "none";
                showVideo();
            }, 500);
        }
    });
});

// Fungsi untuk menampilkan video dan tombol
function showVideo() {
    console.log("Showing birthday video and continue button...");
    videoContainer.style.display = "block";
    continueButton.style.display = "block";
    if (typeof gsap !== "undefined") {
        gsap.fromTo(videoContainer, 
            { opacity: 0, scale: 0.8 }, 
            { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
        );
        // Tambahan: Animasi untuk pesan video
        gsap.fromTo(".video-message", 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
        );
        gsap.fromTo(continueButton, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
        );
    } else {
        videoContainer.style.opacity = 1;
        videoContainer.style.transform = "scale(1)";
        document.querySelector(".video-message").style.opacity = 1;
        continueButton.style.opacity = 1;
    }
    birthdayVideo.play().then(() => {
        console.log("Video playing successfully");
    }).catch(error => {
        console.error("Error playing video:", error);
        redirectToFlower();
    });
}

// Tombol Lanjutkan
continueButton.addEventListener("click", () => {
    console.log("Continue button clicked, redirecting to flower.html...");
    redirectToFlower();
});

// Redirect ke flower.html setelah video selesai
birthdayVideo.addEventListener("ended", () => {
    console.log("Video ended, redirecting to flower.html...");
    redirectToFlower();
});

// Fungsi untuk redirect
function redirectToFlower() {
    if (typeof gsap !== "undefined") {
        gsap.to(videoContainer, {
            opacity: 0,
            duration: 0.5
        });
        gsap.to(continueButton, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                window.location.href = "flower.html";
            }
        });
    } else {
        videoContainer.style.opacity = 0;
        continueButton.style.opacity = 0;
        setTimeout(() => {
            window.location.href = "flower.html";
        }, 500);
    }
}