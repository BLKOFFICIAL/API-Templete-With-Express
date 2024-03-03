const catImages = [
  "https://genrandom.com/27f8f26e-c6c7-4bae-b769-72074ce35b97",
  "https://genrandom.com/20619a89-ba41-454c-8fd2-24907f9027b2",
  "https://genrandom.com/9cd48de4-fd75-4557-bf68-c9dcd9ce6453",
];

module.exports = (api) => {
  api.get('/cat', (req, res) => {
    try {
      const randomIndex = Math.floor(Math.random() * catImages.length);
      const randomCatUrl = catImages[randomIndex];
      res.send({ image: randomCatUrl });
    } catch (error) {
      console.error('Error fetching cat image:', error);
      res.status(500).send({ error: 'Failed to fetch cat image' });
    }
  });
};
