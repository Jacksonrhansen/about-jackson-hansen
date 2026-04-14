/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach((carousel) => {
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const prevButton = carousel.querySelector('[data-carousel-prev]');
        const nextButton = carousel.querySelector('[data-carousel-next]');

        if (!slides.length || !prevButton || !nextButton) {
            return;
        }

        let activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));

        if (activeIndex < 0) {
            activeIndex = 0;
            slides[0].classList.add('is-active');
        }

        const showSlide = (index) => {
            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle('is-active', slideIndex === index);
            });
            activeIndex = index;
        };

        prevButton.addEventListener('click', () => {
            const nextIndex = (activeIndex - 1 + slides.length) % slides.length;
            showSlide(nextIndex);
        });

        nextButton.addEventListener('click', () => {
            const nextIndex = (activeIndex + 1) % slides.length;
            showSlide(nextIndex);
        });
    });

    const tableauEmbeds = document.querySelectorAll('.tableau-scroll-frame');

    tableauEmbeds.forEach((embed) => {
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let scrollLeft = 0;
        let scrollTop = 0;

        embed.addEventListener('mousedown', (event) => {
            isDragging = true;
            embed.classList.add('is-dragging');
            startX = event.pageX - embed.offsetLeft;
            startY = event.pageY - embed.offsetTop;
            scrollLeft = embed.scrollLeft;
            scrollTop = embed.scrollTop;
        });

        embed.addEventListener('mouseleave', () => {
            isDragging = false;
            embed.classList.remove('is-dragging');
        });

        embed.addEventListener('mouseup', () => {
            isDragging = false;
            embed.classList.remove('is-dragging');
        });

        embed.addEventListener('mousemove', (event) => {
            if (!isDragging) {
                return;
            }

            event.preventDefault();
            const x = event.pageX - embed.offsetLeft;
            const y = event.pageY - embed.offsetTop;
            const walkX = x - startX;
            const walkY = y - startY;

            embed.scrollLeft = scrollLeft - walkX;
            embed.scrollTop = scrollTop - walkY;
        });
    });

});
