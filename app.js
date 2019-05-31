window.addEventListener("load", (event) => {
    let long;
    let lat;
    let temperatureDestription = document.querySelector('.temperature-destription');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.temperature');
    const degreeSpan = document.querySelector('.temperature span');

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
                    // Celsius convert
                    let celsius = (temperature - 32) * (5 / 9);
                    // Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    // Convert Farenheit to Celsius
                    degreeSection.addEventListener('click', () => {
                        if(degreeSpan.textContent === "F"){
                            degreeSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else{
                            degreeSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });

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
