const weatherDisplay = document.getElementById('weather-display');
if(weatherDisplay){
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  const city = 'Kampala,UG';
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const today = data.list[0];
      const forecast = data.list.filter((_, i) => i % 8 === 0).slice(0,3);
      let html = `<p><strong>Current Temp:</strong> ${today.main.temp.toFixed(1)}°C</p>
                  <p><strong>Weather:</strong> ${today.weather[0].description}</p>
                  <h4>3-Day Forecast:</h4><ul>`;
      forecast.forEach(day => {
        const date = new Date(day.dt*1000).toLocaleDateString(undefined,{ weekday:'short', month:'short', day:'numeric'});
        html += `<li>${date}: ${day.main.temp.toFixed(1)}°C, ${day.weather[0].description}</li>`;
      });
      html += '</ul>';
      weatherDisplay.innerHTML = html;
    })
    .catch(()=> weatherDisplay.textContent = 'Unable to load weather data.');
}
