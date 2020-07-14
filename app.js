window.addEventListener('load', ()=> {
    let long, lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone  = document.querySelector('.location-timezone');
    let image = document.querySelector('.icon');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/"

            const api = `${proxy}https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&
            exclude=hourly,daily&appid=111f113e3cb0483ff13f9f7468137c95
            `;

            // const api2 = `https://us1.locationiq.com/v1/reverse.php?key=7bd738118f6428&lat=${lat}&lon=${long}&format=json`;
            const api2 = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${long}`;
            //const api2 = `https://geocode.xyz/${lat},${long}?json=1`;

            fetch(api2)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                locationTimezone.textContent = data.features[0].properties.address.state;
            });

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.current;

                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = data.current.weather[0].description;
                //locationTimezone.textContent = data.timezone;

                let iconsrc = data.current.weather[0].icon;
                image.src = `http://openweathermap.org/img/wn/${iconsrc}@2x.png`
            });
        });

        
    }
});
