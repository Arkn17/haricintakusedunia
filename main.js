console.log("main.js loaded");

// Cek apakah GSAP dimuat
if (typeof gsap === "undefined") {
    console.error("GSAP not loaded, animations will not work.");
}

// Animasi saat halaman dimuat
window.addEventListener("load", () => {
    // Mulai animasi bunga
    document.body.classList.remove("container");

    // Tambahan: Animasi fade-in untuk judul "I Love You"
    if (typeof gsap !== "undefined") {
        gsap.fromTo(".love-title", 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
        );
    } else {
        // Fallback jika GSAP tidak dimuat
        document.querySelector(".love-title").style.opacity = 1;
    }
});