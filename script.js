document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const modal = document.querySelector(".modal");
    const modalImg = document.querySelector(".modal-content");
    const closeModal = document.querySelector(".close");
    const viewButtons = document.querySelectorAll(".view-button");

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Fungsi untuk toggle menu
    function toggleMenu() {
        navLinks.classList.toggle('active');
    }

    // Event listener untuk hamburger menu
    hamburger.addEventListener('click', toggleMenu);

    // Tutup menu saat mengklik di luar menu
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-sun');
            icon.classList.toggle('fa-moon');
        }
    });

    // Google Maps
    function initMap() {
        const location = { lat: 1.6748, lng: 101.4482 }; // Koordinat Dumai
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: location
        });
        new google.maps.Marker({
            position: location,
            map: map
        });
    }

    // Modal Sertifikat
    function openModal(imgSrc) {
        if (imgSrc) {
            modal.style.display = "block";
            modalImg.src = imgSrc;
        } else {
            alert("Gambar tidak ditemukan!");
        }
    }

    function closeModalFunction() {
        modal.style.display = "none";
    }

    viewButtons.forEach(button => {
        button.addEventListener("click", function () {
            const certificationCard = this.closest(".certification-card");
            const imgSrc = certificationCard.querySelector(".certification-image").src;
            openModal(imgSrc);
        });
    });

    closeModal.addEventListener("click", closeModalFunction);

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeModalFunction();
        }
    });

    window.initMap = initMap;
    window.openModal = openModal;
    window.closeModal = closeModalFunction;
});
