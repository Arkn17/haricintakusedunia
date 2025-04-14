// Animasi judul fade-in
gsap.from(".title", { opacity: 0, y: -50, duration: 2, ease: "power2.out" });

// Suara efek
const starSound = document.getElementById("starSound");

// Bikin partikel love berjatuhan
function createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "vw"; // Posisi acak horizontal
    particle.style.top = "-10px"; // Mulai dari atas layar
    document.body.appendChild(particle);

    gsap.to(particle, {
        y: "100vh", // Jatuh ke bawah
        opacity: 0, // Memudar
        duration: Math.random() * 3 + 2, // Durasi acak 2-5 detik
        rotation: Math.random() * 360, // Putar acak
        onStart: () => {
            starSound.currentTime = 0; // Reset suara
            starSound.play(); // Mainkan suara "ding"
        },
        onComplete: () => particle.remove() // Hapus setelah selesai
    });
}

// Partikel muncul tiap 300ms
setInterval(createParticle, 300);

// Logika kata kunci cinta
const keywordInput = document.getElementById("keyword");
const openButton = document.getElementById("openButton");
const correctKeyword = "sayang"; // Ganti dengan kata kunci yang kamu mau

keywordInput.addEventListener("input", () => {
    if (keywordInput.value.toLowerCase() === correctKeyword) {
        openButton.disabled = false; // Aktifkan tombol
    } else {
        openButton.disabled = true; // Nonaktifkan tombol
    }
});

// Transisi lembut saat klik tombol
openButton.addEventListener("click", () => {
    gsap.to(".container", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            window.location.href = "greeting.html"; // Ganti ke halaman berikutnya
        }
    });
});