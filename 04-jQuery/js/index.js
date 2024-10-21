var app = (
    function () {
        'use strict';
        
        const KitchenTemp = document.getElementById('KitchenTemp');
        const LivingTemp = document.getElementById('LivingTemp');
        const KitchenLightBtn = document.getElementById('KitchenLightBtn');
        const LivingCLightBtn = document.getElementById('LivingCLightBtn');
        const LivingALightBtn = document.getElementById('LivingALightBtn');
        const LivingMusicBtn = document.getElementById('LivingMusicBtn');

        function random(number) {
            return Math.floor(Math.random() * (number + 1));
        }

        function sliderChange(e) {
            console.log(e.target.parentElement.parentElement.childNodes[1].innerText)
            
            if (e.target.classList.contains("fa-toggle-off")) {
                e.target.classList.remove("fa-toggle-off");
                e.target.classList.add("fa-toggle-on");
                if (e.target.parentElement.parentElement.childNodes[1].innerText == " Ambient Music"){
                    e.target.parentElement.parentElement.childNodes[1].children[0].classList.remove("text-danger");
                    e.target.parentElement.parentElement.childNodes[1].children[0].classList.remove("fa-volume-xmark");
                    e.target.parentElement.parentElement.childNodes[1].children[0].classList.add("fa-music");
                    e.target.parentElement.parentElement.childNodes[1].children[0].classList.add("text-primary");  
                }else{
                    e.target.parentElement.parentElement.childNodes[1].children[0].classList.add("text-warning"); 
                }
            } else {
                e.target.classList.remove("fa-toggle-on");
                e.target.classList.add("fa-toggle-off");

                if (e.target.parentElement.parentElement.childNodes[1].innerText == " Ambient Music") {
                    e.target.parentElement.parentElement.childNodes[1].children[0].classList.add("text-danger");
                    e.target.parentElement.parentElement.childNodes[1].children[0].classList.add("fa-volume-xmark");
                    e.target.parentElement.parentElement.childNodes[1].children[0].classList.remove("fa-music");
                    e.target.parentElement.parentElement.childNodes[1].children[0].classList.remove("text-primary"); 
                } else {
                    e.target.parentElement.parentElement.childNodes[1].children[0].classList.remove("text-warning");
                }
            }
        }

        function updateClock() {
            const now = new Date();

            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();

            hours = (hours < 10 ? '0' : '') + hours;
            minutes = (minutes < 10 ? '0' : '') + minutes;
            seconds = (seconds < 10 ? '0' : '') + seconds;

            const timeString = `${hours}:${minutes}:${seconds}`;

            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');

            const dateString = `${year}-${month}-${day}`;

            document.getElementById('ClockTime').textContent = timeString;
            document.getElementById('ClockDate').textContent = dateString;
        }

        var UpdateTemperature = function () {
            var Ktemp = (10 + (random(200) / 10));
            var Ltemp = (10 + (random(200) / 10));
            console.log("Kitchen: " + Ktemp + "°C, Living Room: " + Ltemp + "°C");

            KitchenTemp.innerHTML = Ktemp + ' &deg;C';
            LivingTemp.innerHTML = Ltemp + ' &deg;C';
        }

        KitchenLightBtn.addEventListener('click', sliderChange);
        LivingCLightBtn.addEventListener('click', sliderChange);
        LivingALightBtn.addEventListener('click', sliderChange);
        LivingMusicBtn.addEventListener('click', sliderChange);
        setInterval(UpdateTemperature, 5000);
        setInterval(updateClock, 1000);
    }
)();
