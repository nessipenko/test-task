const days = document.querySelector('.days'),
    hours = document.querySelector('.hours'),
    minutes = document.querySelector('.minutes'),
    seconds = document.querySelector('.seconds');

const btnFooter = document.querySelector('.footer__other_btn'),
    arrowFooter = document.querySelector('.footer__other_arrow');



function changeNameOfTheDate() {
    if (window.innerWidth < 992) {
        days.textContent = 'DD';
        hours.textContent = 'HH';
        minutes.textContent = 'MM';
        seconds.textContent = 'SS';
    } else if (window.innerWidth > 992) {
        days.textContent = 'Days';
        hours.textContent = 'Hours';
        minutes.textContent = 'Minutes';
        seconds.textContent = 'Seconds';
    }
}

btnFooter.addEventListener('click', () => {
    arrowFooter.classList.toggle('rotated');
});


const timer = (id, deadline, timezone) => {
    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };

    const getTimeRemaining = (endtime) => {
        const currentTimezoneOffset = (new Date()).getTimezoneOffset() * 60 * 1000;
        const endtimeWithTimezone = Date.parse(endtime) + currentTimezoneOffset + (timezone * 60 * 60 * 1000);

        const t = endtimeWithTimezone - Date.now(),
            seconds = (Math.floor(t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            days = Math.floor((t / (1000 * 60 * 60 * 24)));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };
    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            const t = getTimeRemaining(endtime);

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
    };
    setClock(id, deadline);
};



document.addEventListener("DOMContentLoaded", () => {

    let deadline = '2023-07-24',
        timezone = 0;
    timer('.timer', deadline, timezone);
    changeNameOfTheDate();


    const form = document.querySelector('#subscription_form'),
        emailInput = document.querySelector('#email_input'),
        submitBtn = document.querySelector('#submit_btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateEmail(emailInput.value)) {
            sendFormData(form);
        } else {
            alert('Plesae enter a valid email address!');
        }
    });

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function sendFormData(form) {
        const xhr = new XMLHttpRequest();
        const url = form.action;
        const method = form.method;
        const data = new FormData(form);


        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

                displaySuccessModal();
                form.reset();
            } else if (xhr.readyState === XMLHttpRequest.DONE) {
                alert("An error occurred. Please try again later.");
            }
        };

        xhr.send(data);
    }

    function displaySuccessModal() {
        const modal = document.querySelector('#modal'),
            closeBtn = modal.querySelector('.success-form__close');

        modal.style.display = 'block';

        closeBtn.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});


window.addEventListener('resize', () => {
    changeNameOfTheDate();
});
