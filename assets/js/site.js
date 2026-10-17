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

}());
