//

// hamgurger menu transition
const hamburger = document.querySelector('.hamburger');
const menuCollapse = document.querySelector('.menu-collapse');
hamburger.addEventListener('click', () => {
    toggleMenu();
});

const menuLinks = document.querySelectorAll('.menu-collapse a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuCollapse.classList.contains('open')) {
            toggleMenu();
        }
    });
});

function toggleMenu() {
    menuCollapse.classList.toggle('open');
    const hamburgerImg = hamburger.querySelector('img');

    if (menuCollapse.classList.contains('open')) {
        menuCollapse.style.display = 'flex';
        menuCollapse.style.width = '50%';
        menuCollapse.style.transition = 'width 0.5s ease, transform 0.5s ease';
        menuCollapse.style.transform = 'translateX(0)';

        hamburgerImg.src = './images/icons8-close-150.png';
        hamburgerImg.style.transition = 'transform 0.5s';
        hamburgerImg.style.transform = 'rotateY(180deg)';
    } else {
        menuCollapse.style.transition = 'width 0.5s ease, transform 0.5s ease';
        menuCollapse.style.transform = 'translateX(100%)';
        menuCollapse.style.width = '0';
        setTimeout(() => {
            menuCollapse.style.display = 'none';
        }, 500);

        hamburgerImg.src = './images/icons8-menu-150.png';
        hamburgerImg.style.transition = 'transform 0.5s';
        hamburgerImg.style.transform = 'rotateY(0deg)';
    }
}




const lightMode = document.querySelector('.light-mode');
const darkMode = document.querySelector('.dark-mode');
const rollBox = document.querySelector('.roll-box');
const toggleMode = document.querySelector('.toggle-mode');

toggleMode.addEventListener('click', () => {
    rollBox.classList.toggle('roll');
    lightMode.classList.toggle('show');
    darkMode.classList.toggle('show');

    if (rollBox.classList.contains('roll')) {
        rollBox.style.transition = 'all 0.5s';
        rollBox.style.transform = 'translateX(40.1px)';
        rollBox.style.backgroundColor = '#ff5e00';
        toggleMode.style.backgroundColor = '#333';
        toggleMode.style.transition = 'all 0.5s .1s';

        const darkModeImg = document.querySelector('.dark-mode img');
        const lightModeImg = document.querySelector('.light-mode img');
        lightModeImg.src = './images/icons8-sun-100.png';
        lightModeImg.style.transition = 'all 0.5s';
        darkModeImg.src = './images/icons8-moon-60.png';
        darkModeImg.style.transition = 'all 0.5s';

        document.body.style.backgroundColor = '#1c1b1b';
        // document.body.style.color = '#fff';
        document.documentElement.style.setProperty('--text-dark-color', '#fff');
        // return;
    }
    else if (!(rollBox.classList.contains('roll'))) {
        rollBox.style.transition = 'all 0.5s';
        rollBox.style.transform = 'translateX(0)';
        rollBox.style.backgroundColor = '#fdcfb5';

        toggleMode.style.backgroundColor = '#fff';
        toggleMode.style.transition = 'all 0.5s .1s';

        const darkModeImg = document.querySelector('.dark-mode img');
        darkModeImg.src = './images/icons8-moon-50.png';
        darkModeImg.style.transition = 'all 0.5s';
        const lightModeImg = document.querySelector('.light-mode img');
        lightModeImg.src = './images/icons8-sun-60.png';
        lightModeImg.style.transition = 'all 0.5s';
        document.body.style.backgroundColor = 'initial';
        // document.body.style.color = 'initial';
        document.documentElement.style.setProperty('--text-dark-color', '#0e0e0e');
        // return;
    }
}
);



const moreBtn = document.querySelector('.more-btn');

moreBtn.addEventListener('click', () => {
    const coursesHolder = document.querySelector('.courses-holder');
    coursesHolder.classList.toggle('show');
    if (coursesHolder.classList.contains('show')) {
        // coursesHolder.style.overflow = 'visible';
        coursesHolder.style.height = '750px';
        coursesHolder.style.transition = 'height 0.5s';
        coursesHolder.style.overflowY = 'auto';
        moreBtn.innerText = 'Show less';
        // return;
    }
    else if (!(coursesHolder.classList.contains('show'))) {
        // coursesHolder.style.overflow = 'hidden';
        coursesHolder.style.height = '350px';
        coursesHolder.style.transition = 'height 0.5s';
        coursesHolder.style.overflowY = 'hidden';
        moreBtn.innerText = 'See more';
        // return;
    }

});


// carousel effect

function setupCarousel(containerId, indicatorsId, allowManual = false) {
    const container = document.getElementById(containerId);
    const carousel = container.querySelector('.carousel');
    const dots = document.getElementById(indicatorsId).querySelectorAll('.dot');
    let index = 0;
    let interval;

    function updateSlide() {
        carousel.style.transform = `translateX(${-index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function nextSlide() {
        index = (index + 1) % dots.length;
        updateSlide();
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, 6000);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            index = i;
            updateSlide();
            if (allowManual) {
                stopAutoSlide();
                startAutoSlide();
            }
        });
    });

    if (allowManual) {
        let startX = 0;

        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            stopAutoSlide();
        });

        container.addEventListener('touchend', (e) => {
            let endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) {
                index = (index + 1) % dots.length;
            } else if (endX - startX > 50) {
                index = (index - 1 + dots.length) % dots.length;
            }
            updateSlide();
            startAutoSlide();
        });
    }

    startAutoSlide();
}

// Initialize both carousels
setupCarousel('autoCarousel', 'autoIndicators'); // Auto-moving only
setupCarousel('manualCarousel', 'manualIndicators', true); // Auto + manual slide

// rendering images for tablet to mobile screen
const heroImages = document.querySelectorAll('.hero-image-container img');

window.addEventListener('resize', renderImages);
renderImages();

function renderImages() {
    if (window.innerWidth <= 768) {
        heroImages.forEach((image, index) => {
            image.src = `./images/home-mid-${index + 1}.png`;
        });
    } else if (window.innerWidth > 800) {
        heroImages.forEach((image, index) => {
            image.src = `./images/home-${index + 1}-1.png`;
        });
    }
}

// Get the button
let toTopBtn = document.getElementById("toTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        toTopBtn.style.display = "flex";
    } else {
        toTopBtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
toTopBtn.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

//
// Initialize EmailJS
// (function(){
//     emailjs.init("-YtRAfpms_MlTpqFx"); // Replace with your actual public key
//   })();

//   // Handle form submission
//   document.querySelector('.contact-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     emailjs.sendForm('service_r2s1whb', 'template_emrom8e', this)
//       .then(function(response) {
//         alert("Message sent successfully!");
//         console.log("SUCCESS", response.status, response.text);
//         document.getElementById("contact-form").reset();
//       }, function(error) {
//         alert("Oops! Something went wrong.");
//         console.log("FAILED", error);
//       });
//   });

(function () {
    emailjs.init("-YtRAfpms_MlTpqFx"); // Replace with your actual public key
})();

const btn = document.querySelector('.submit-btn');

document.querySelector(".contact-form")
    .addEventListener('submit', function (event) {
        event.preventDefault();

        btn.value = 'Sending...';

        const serviceID = 'service_jyl0w4t';
        const templateID = 'template_emrom8e';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Send Email';
                alert('Sent!');
                document.querySelector(".contact-form").reset();

            }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
    });
