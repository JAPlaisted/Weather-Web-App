window.addEventListener("load", () => {
  //Declare variables for main
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature-section");
  let temperatureSpan = document.querySelector(".temperature-section span");

  //Declare variables for Temperature Section
  let measurementSystem = document.querySelector(".measurement-system");
  let system = document.querySelector(".system");

  //Declare variables for weather conditions
  let feelsLike = document.querySelector(".feels-Like");
  let actualTemp = document.querySelector(".actual-temp");
  let cloudCoverage = document.querySelector(".cloud-coverage");
  let gust = document.querySelector(".gust");
  let currentHumidity = document.querySelector(".current-humidity");
  let precipitation = document.querySelector(".precipitation");
  let pressure = document.querySelector(".pressure");
  let uvIndex = document.querySelector(".uv-index");
  let windDegree = document.querySelector(".wind-degree");
  let windDirection = document.querySelector(".wind-direction");
  let windSpeed = document.querySelector(".wind-speed");
  let visibility = document.querySelector(".visibility");
  let lastUpdated = document.querySelector(".last-updated");

  //Declare variables for Location Information
  let currentCountry = document.querySelector(".current-country");
  let timezone = document.querySelector(".timezone");
  let currentRegion = document.querySelector(".current-region");
  let localTime = document.querySelector(".local-time");
  let lattitude = document.querySelector(".lattitude");
  let longitude = document.querySelector(".longitude");

  //Declare variables for Air Quality
  let daqi = document.querySelector(".daqi");
  let eqi = document.querySelector(".eqi");
  let carbonMonoxide = document.querySelector(".carbon-monoxide");
  let nitrogenDioxide = document.querySelector(".nitrogen-dioxide");
  let ozone = document.querySelector(".ozone");
  let sulferDioxide = document.querySelector(".sulfer-dioxide");
  let pm_25 = document.querySelector(".pm25");
  let pm_10 = document.querySelector(".pm10");

  //Obtain Location, API key, and data
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `https://api.weatherapi.com/v1/current.json?key=f778f2fa359447189e4233557212409&q=${lat},${long}&aqi=yes`;

      console.log(lat, long);

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const {
            wind_mph,
            wind_kph,
            wind_dir,
            wind_degree,
            vis_km,
            vis_miles,
            uv,
            pressure_mb,
            pressure_in,
            precip_mm,
            precip_in,
            last_updated,
            humidity,
            gust_kph,
            gust_mph,
            cloud,
            feelslike_c,
            feelslike_f,
            temp_c,
            temp_f,
            air_quality,
          } = data.current;
          const { country, lat, localtime, lon, region, tz_id } = data.location;
          const {
            co,
            ["gb-defra-index"]: gb,
            no2,
            o3,
            pm2_5,
            pm10,
            so2,
            ["us-epa-index"]: us,
          } = data.current.air_quality;
          const { icon, text } = data.current.condition;

          //Set DOM Elements from the API in main
          temperatureDegree.textContent = temp_c + "°";
          temperatureDescription.textContent = text;
          locationTimezone.textContent = region;

          //Set current icon
          function setIcon() {
            const currentIcon = icon;
            return currentIcon;
          }

          document
            .getElementById("current-icon")
            .setAttribute("src", setIcon());

          //Set DOM Elements from the API in Weather Conditions
          actualTemp.textContent = temp_c + "°C";
          feelsLike.textContent = feelslike_c + "°C";
          cloudCoverage.textContent = cloud + "%";
          gust.textContent = gust_kph + " kph";
          currentHumidity.textContent = humidity + "%";
          precipitation.textContent = precip_mm + " mm";
          pressure.textContent = pressure_mb + " mb";
          uvIndex.textContent = uv;
          windDegree.textContent = wind_degree + "°";
          windDirection.textContent = wind_dir;
          windSpeed.textContent = wind_kph + " kph";
          visibility.textContent = vis_km + " km";
          lastUpdated.textContent = last_updated;

          //Set DOM Elements from the API in Location Information
          currentCountry.textContent = country;
          timezone.textContent = tz_id;
          currentRegion.textContent = region;
          localTime.textContent = localtime;
          lattitude.textContent = lat;
          longitude.textContent = lon;

          //Set DOM Elements from the API in Air Quality
          daqi.textContent = air_quality["gb-defra-index"];
          eqi.textContent = air_quality["us-epa-index"];
          carbonMonoxide.textContent = Math.floor(co) + " μg/m3";
          nitrogenDioxide.textContent = Math.floor(no2) + " μg/m3";
          ozone.textContent = Math.floor(o3) + " μg/m3";
          sulferDioxide.textContent = Math.floor(so2) + " μg/m3";
          pm_25.textContent = Math.floor(pm2_5) + " μg/m3";
          pm_10.textContent = Math.floor(pm10) + " μg/m3";

          //Toggle temperature between Celsius/Farenheit main
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = temp_c + "°";
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temp_f + "°";
            }
          });

          //Toggle temperature between Celsius/Farenheit secondary
          measurementSystem.addEventListener("click", () => {
            if (system.textContent === "Metric System") {
              system.textContent = "English System";
              feelsLike.textContent = feelslike_f + "°F";
              actualTemp.textContent = temp_f + "°F";
              gust.textContent = gust_mph + " mph";
              precipitation.textContent = precip_in + "″";
              pressure.textContent = pressure_in + "″";
              windSpeed.textContent = wind_mph + " mph";
              visibility.textContent = vis_miles + " mi";
            } else {
              system.textContent = "Metric System";
              feelsLike.textContent = feelslike_c + "°C";
              actualTemp.textContent = temp_c + "°C";
              gust.textContent = gust_kph + " kph";
              precipitation.textContent = precip_mm + " mm";
              pressure.textContent = pressure_mb + " mb";
              windSpeed.textContent = wind_kph + " kph";
              visibility.textContent = vis_km + " km";
            }
          });
        });

      console.log(position);
    });
  } else {
    h1.textContent = " Your browser may not support JavaScript =/ ";
  }
});
