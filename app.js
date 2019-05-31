window.addEventListener("load", (event) => {
    let long;
    let lat;
    let temperatureDestription = document.querySelector('.temperature-destription');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/da9d6e07a1e2bbd1023a6111c09ca38d/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json(); 
                })
                .then(data => {
                    //console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    // Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDestription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    
                    setIcons(icon, document.querySelector('.icon'));

                });

        });
    }else{
        h1.textcontent = "Not working - missing geolocation access"
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
