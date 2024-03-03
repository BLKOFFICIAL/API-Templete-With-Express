const weather = require('weather-js');

module.exports = (api) => {
  api.get('/weather', (req, res) => {
    const { city, car } = req.query; // you can get more query like this
    if (!city) {
      return res.status(400).send({ error: 'City parameter is required' });
    }

    weather.find({ search: city, degreeType: 'C' }, (err, result) => {
      if (err) {
        console.error('Error fetching weather data:', err);
        return res.status(500).send({ error: 'Failed to fetch weather data' });
      }

      if (result && result.length > 0) {
        const currentWeather = result[0].current;
        console.log(car);
        res.send(currentWeather);
      } else {
        res.status(404).send({ error: 'Weather data not found' });
      }
    });
  });
};
