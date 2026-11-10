(function () {
    'use strict';

    const tabLinks    = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const mainNav     = document.getElementById('main-nav');
    const navToggle   = document.querySelector('.nav-toggle');

    function activateTab(target) {
        tabContents.forEach(t => t.classList.remove('active'));
        tabLinks.forEach(l => l.classList.remove('active'));

        const section = document.getElementById(target);
        if (section) section.classList.add('active');

        document.querySelectorAll(`.tab-link[data-target="${target}"]`).forEach(l => {
            l.classList.add('active');
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });

        // close mobile nav
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    tabLinks.forEach(link => {
        link.addEventListener('click', function () {
            activateTab(this.dataset.target);
        });
    });

    navToggle.addEventListener('click', function () {
        const isOpen = mainNav.classList.toggle('open');
        this.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('#site-header') && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Hero painting toggle — click through candidate header paintings per tab
    // Note: the two Vermeer "Astronomer" paintings (vermeer-astronomer.jpg and
    // Johannes_Vermeer_-_The_Astronomer_-_WGA24685.jpg, both in header-paintings/)
    // are intentionally NOT in this rotation — Arielle wants the sepia/brown-toned
    // Vermeer painting reserved as the (future, static) background for the Art tab
    // once she's written content for it. Files are kept in header-paintings/ for that.
    const HERO_PAINTINGS = [
        { src: 'images/starry-night-rhone.jpg', label: 'Starry Night Over the Rhône — Vincent van Gogh', position: 'center 45%' },
        { src: 'header-paintings/gare-saint-lazare-hires.jpg', label: 'The Gare Saint-Lazare: Arrival of a Train — Claude Monet' },
        { src: 'header-paintings/abbey-rotated.png', label: 'The Hours in the Pennsylvania State Capitol — Edwin Austin Abbey' }
    ];

    // Painting choice is shared across every tab — switching it on one tab
    // switches it everywhere, and it stays put as you click between tabs.
    let currentPaintingIndex = 0;
    const allHeroes = document.querySelectorAll('.tab-hero[data-start]');

    function renderPaintingEverywhere(index) {
        const n = HERO_PAINTINGS.length;
        currentPaintingIndex = ((index % n) + n) % n;
        const painting = HERO_PAINTINGS[currentPaintingIndex];
        allHeroes.forEach(function (hero) {
            hero.style.backgroundImage =
                "linear-gradient(rgba(69, 57, 105, 0.30), rgba(69, 57, 105, 0.30)), url('" + painting.src + "')";
            hero.style.backgroundSize = painting.size || '';
            hero.style.backgroundPosition = painting.position || '';
            const label = hero.querySelector('.hero-painting-label');
            if (label) label.textContent = painting.label;
        });
    }

    allHeroes.forEach(function (hero) {
        const prev = hero.querySelector('.hero-painting-prev');
        const next = hero.querySelector('.hero-painting-next');

        if (prev) {
            prev.addEventListener('click', function () {
                renderPaintingEverywhere(currentPaintingIndex - 1);
            });
        }
        if (next) {
            next.addEventListener('click', function () {
                renderPaintingEverywhere(currentPaintingIndex + 1);
            });
        }
    });

    renderPaintingEverywhere(0);

}());
