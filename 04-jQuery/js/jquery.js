(function () {

    let lastUpdateTime = null;
    let toggleTimes = {
        kitchenLight: null,
        livingCLight: null,
        livingALight: null,
        livingMusic: null
    };

    function random(number) {
        return Math.floor(Math.random() * (number + 1));
    }

    function updateClock() {
        const now = new Date();

        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        const timeString = `${hours}:${minutes}:${seconds}`;

        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');

        const dateString = `${year}-${month}-${day}`;

        $('#ClockTime').text(timeString);
        $('#ClockDate').text(dateString);
    }

    function updateTemperature() {
        const Ktemp = (10 + (random(200) / 10)).toFixed(1);
        const Ltemp = (10 + (random(200) / 10)).toFixed(1);
        //console.log(`Kitchen: ${Ktemp}°C, Living Room: ${Ltemp}°C`);

        $('#KitchenTemp').html(`${Ktemp} &deg;C`);
        $('#LivingTemp').html(`${Ltemp} &deg;C`);
    }

    function updateToggleTime(toggleType) {
        toggleTimes[toggleType] = new Date();
    }

    function updateAllToggleTimers() {
        const now = new Date();
        for (const [toggleType, toggleTime] of Object.entries(toggleTimes)) {
            if (toggleTime) {
                const secondsDiff = Math.floor((now - toggleTime) / 1000);
                let toggleDisplay = '';

                if (secondsDiff < 60) {
                    toggleDisplay = `${secondsDiff} seconds ago`;
                } else if (secondsDiff < 3600) {
                    const minutesDiff = Math.floor(secondsDiff / 60);
                    toggleDisplay = `${minutesDiff} minutes ago`;
                } else {
                    const hoursDiff = Math.floor(secondsDiff / 3600);
                    toggleDisplay = `${hoursDiff} hours ago`;
                }

                $(`#${toggleType}`).html(toggleDisplay); 
            } 
        }
    }

    function sliderChange(e) {
        const $target = $(e.target);
        const $parentElement = $target.closest('.d-flex');
        const $iconElement = $parentElement.find('.icon');
        const $timerElement = $parentElement.next();
        const toggleType = $timerElement.attr('id');

        if ($target.hasClass("fa-toggle-off")) {
            $target.removeClass("fa-toggle-off").addClass("fa-toggle-on");

            if ($parentElement.text().trim() === "Ambient Music") {
                $iconElement.removeClass("text-danger fa-volume-xmark")
                    .addClass("fa-music text-primary");
            } else {
                $iconElement.addClass("text-warning");
            }
        } else {
            $target.removeClass("fa-toggle-on").addClass("fa-toggle-off");

            if ($parentElement.text().trim() === "Ambient Music") {
                $iconElement.addClass("text-danger fa-volume-xmark")
                    .removeClass("fa-music text-primary");
            } else {
                $iconElement.removeClass("text-warning");
            }
        }

        console.log(toggleType)
        updateToggleTime(toggleType);
    }

    function updateWeatherUpdateTime() {
        if (lastUpdateTime) {
            const now = new Date();
            const secondsDiff = Math.floor((now - lastUpdateTime) / 1000);
            let timeDisplay = '';

            if (secondsDiff < 60) {
                timeDisplay = `${secondsDiff} seconds ago`;
            } else if (secondsDiff < 3600) {
                const minutesDiff = Math.floor(secondsDiff / 60);
                timeDisplay = `${minutesDiff} minutes ago`;
            } else {
                const hoursDiff = Math.floor(secondsDiff / 3600);
                timeDisplay = `${hoursDiff} hours ago`;
            }

            $('#WeatherUpdate').html(timeDisplay);
        }
    }

    function fetchWeatherData() {
        const location = $('#WeatherLocation').val();

        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=cedf58223ea889a325c281a9a5a62999`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $('#WeatherTemp').html(`${data.main.temp} &deg;C`);
                $('#WeatherMaxTemp').html(`${data.main.temp_max} &deg;C`);
                $('#WeatherMinTemp').html(`${data.main.temp_min} &deg;C`);
                $('#WeatherHumidity').html(`${data.main.humidity}%`);
                $('#WeatherSunrise').html(new Date(data.sys.sunrise * 1000).toLocaleTimeString());
                $('#WeatherSunset').html(new Date(data.sys.sunset * 1000).toLocaleTimeString());
                
                lastUpdateTime = new Date(); 
                updateWeatherUpdateTime(); 
            },
            error: function (error) {
                console.error('Error fetching weather data:', error);
                alert('Failed to retrieve data. Please try again later.');
            }
        });
    }


    $('#KitchenLightBtn').on('click', sliderChange);
    $('#LivingCLightBtn').on('click', sliderChange);
    $('#LivingALightBtn').on('click', sliderChange);
    $('#LivingMusicBtn').on('click', sliderChange);
    $('#WeatherBtn').on('click', fetchWeatherData);

    setInterval(updateWeatherUpdateTime, 1000);
    setInterval(updateAllToggleTimers, 1000);
    setInterval(updateTemperature, 5000);
    setInterval(updateClock, 1000);
    
})();


