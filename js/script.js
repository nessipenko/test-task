
//variables
const days = document.querySelector('.days');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const btnFooter = document.querySelector('.footer__other_btn');
const arrowFooter = document.querySelector('.footer__other_arrow');

//change the name of the date
function changeNameOfTheDate() {
    if (window.innerWidth < 992) {
        days.textContent = 'DD';
        hours.textContent = 'HH';
        minutes.textContent = 'MM';
        seconds.textContent = 'SS';
    } else if (window.innerWidth >= 992) {
        days.textContent = 'Days';
        hours.textContent = 'Hours';
        minutes.textContent = 'Minutes';
        seconds.textContent = 'Seconds';
    }
}

//window resize
window.addEventListener('resize', changeNameOfTheDate);

//footer button click
btnFooter.addEventListener('click', () => {
    arrowFooter.classList.toggle('rotated');
    const targetEl = document.querySelector('#other-events');
    targetEl.scrollIntoView({ behavior: 'smooth' });
});

//add zero to numbers
const addZero = (num) => {
    return num <= 9 ? '0' + num : num;
};

//calculate time
const getTimeRemaining = (endtime, timezone) => {
    const currentTimezoneOffset = (new Date()).getTimezoneOffset() * 60 * 1000;
    const endtimeWithTimezone = Date.parse(endtime) + currentTimezoneOffset + (timezone * 60 * 60 * 1000);
    const t = endtimeWithTimezone - Date.now();

    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
};

//update timer
const updateClock = (selector, endtime, timezone) => {
    const timer = document.querySelector(selector);

    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');

    const timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
        const t = getTimeRemaining(endtime, timezone);

        days.textContent = addZero(t.days);
        hours.textContent = addZero(t.hours);
        minutes.textContent = addZero(t.minutes);
        seconds.textContent = addZero(t.seconds);

        if (t.total <= 0) {
            days.textContent = '00';
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';

            clearInterval(timeInterval);
        }
    }

    updateClock();
};

//DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const deadline = '2023-07-24';
    const timezone = 0;

    updateClock('.timer', deadline, timezone);
    changeNameOfTheDate();

    setTimeout(() => {
        const footerButton = document.querySelectorAll('.footer__other_btn');
        const slides = document.querySelectorAll('.carousel__slide');

        footerButton.forEach((button) => {
            button.addEventListener('click', () => {
                const img = button.nextElementSibling;

            });
        });

        slides.forEach((item) => {
            item.addEventListener('click', () => {
                slides.forEach((accItem) => {
                    accItem.classList.remove('active');
                });
                item.classList.add('active');
                item.classList.add('visited');
            });
        });
    }, 10);

    const otherEventsSection = document.getElementById('other-events');
    const footerOtherBtn = document.querySelector('.footer__other_btn');

    footerOtherBtn.addEventListener('click', () => {
        otherEventsSection.style.display = 'block';
        otherEventsSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
});

// Subscription & Popup

const form = document.querySelector('#subscription_form');
const popup = document.querySelector('#popup');
const popupTitle = document.querySelector('.popup__form_title');
const popupSubtitle = document.querySelector('.popup__form_subtitle');
const popupCloseBtnUp = document.querySelector('.popup__form_close');
const popupCloseBtnDown = document.querySelector('.popup__form_btn');
const popupCloseOverlay = document.querySelector('.popup__wrapper');
const emailInput = document.querySelector('#email_input');

function showPopup(className) {
    popup.classList.add(className);
    document.body.classList.add('popup-open');
}

function closePopup() {
    popup.style.display = 'none';
    document.body.classList.remove('popup-open');
    form.reset();
}

function getSuccessPopup() {
    popupTitle.textContent = 'Success';
    popupSubtitle.textContent = 'You have successfully subscribed to the email newsletter!';
    showPopup('active');
}

function getErrorPopup(message) {
    popupTitle.textContent = 'Error!';
    popupSubtitle.textContent = message || 'Please try again later';
    showPopup('active');
}

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!emailInput.validity.valid) {
        getErrorPopup('Please check your email');
        return;
    }

    const form = event.target,
        formData = new FormData(form),
        email = emailInput.value;

    if (!isValidEmail(email)) {
        getErrorPopup('Invalid email format');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        } if (xhr.status === 200) {
            if (xhr.status === 200) {
                getSuccessPopup();
            } else {
                getErrorPopup();

            }
        } else {
            getErrorPopup();
        }
    };
    xhr.send(formData);
});

popupCloseBtnUp.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup();
});

popupCloseBtnDown.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup();
});

popupCloseOverlay.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target === popupCloseOverlay) {
        closePopup();
    }
});
