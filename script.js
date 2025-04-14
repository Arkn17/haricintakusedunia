console.log("Script.js loaded");

// Elemen
const keywordInput = document.querySelector(".keyword-input");
const dingSound = document.getElementById("dingSound");
const warningSound = document.getElementById("warningSound");
const warningPopup = document.getElementById("warningPopup");

// Debug: Cek apakah elemen ditemukan
console.log("keywordInput:", keywordInput);
console.log("dingSound:", dingSound);
console.log("warningSound:", warningSound);
console.log("warningPopup:", warningPopup);

// Cek apakah elemen ditemukan, kalau tidak kasih alert
if (!keywordInput || !dingSound || !warningSound || !warningPopup) {
    console.error("One or more elements not found. Check HTML structure.");
    alert("Error: Some elements not found. Check console for details.");
}

// Atur volume suara
dingSound.volume = 0.3;
warningSound.volume = 0.3;

// Animasi kedip huruf satu per satu (hanya satu huruf terlihat pada satu waktu)
const letters = document.querySelectorAll(".letter");
function animateLetters() {
    let currentIndex = 0;
    function showNextLetter() {
        // Sembunyikan semua huruf
        gsap.set(letters, { opacity: 0 });
        // Tampilkan hanya huruf saat ini
        gsap.to(letters[currentIndex], {
            opacity: 1,
            duration: 0.2,
            onComplete: () => {
                currentIndex++;
                if (currentIndex < letters.length) {
                    // Lanjut ke huruf berikutnya
                    setTimeout(showNextLetter, 150);
                } else {
                    // Setelah semua huruf selesai, ulang animasi
                    setTimeout(animateLetters, 500);
                }
            }
        });
    }
    showNextLetter();
}

// Jalankan animasi pertama kali
animateLetters();

// Cek kata kunci
function checkKeyword() {
    console.log("Checking keyword...");
    const keyword = keywordInput.value.trim().toLowerCase();
    if (keyword === "haricintakusedunia") {
        console.log("Keyword correct, playing ding sound...");
        dingSound.play().then(() => {
            console.log("Ding sound played successfully");
            console.log("Redirecting to greeting.html...");
            window.location.href = "greeting.html";
        }).catch(error => {
            console.error("Error playing ding sound:", error);
            console.log("Redirecting to greeting.html despite sound error...");
            window.location.href = "greeting.html";
        });
    } else {
        console.log("Keyword incorrect, playing warning sound...");
        warningSound.play().then(() => {
            console.log("Warning sound played successfully");
            keywordInput.classList.add("shake");
            warningPopup.style.display = "block";
        }).catch(error => {
            console.error("Error playing warning sound:", error);
            warningPopup.style.display = "block";
        });
    }
}

// Tutup pop-up warning
function closeWarningPopup() {
    warningPopup.style.display = "none";
}

// Animasi shake untuk input salah
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`, styleSheet.cssRules.length);

document.querySelector(".keyword-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkKeyword();
    }
});

// Partikel bintang emas
function createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.top = "-10px";
    particle.style.width = Math.random() * 8 + 4 + "px";
    particle.style.height = particle.style.width;
    document.body.appendChild(particle);

    gsap.to(particle, {
        y: "100vh",
        opacity: 0,
        duration: Math.random() * 5 + 3,
        rotation: Math.random() * 360,
        onComplete: () => particle.remove()
    });
}

setInterval(createParticle, 500);