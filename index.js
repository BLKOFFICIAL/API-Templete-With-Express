const fs = require('fs');
const path = require('path');
const API = require('api-crafter');

const options = {
  projectName: 'My API',
  port: 3000,
  rateLimit: {
    windowMs: 60 * 1000,
    max: 10,
    message: 'Custom rate limit exceeded message: Too many requests',
  },
  logging: true,
  cors: {
    origin: '*',
    methods: 'GET,POST',
  },
  error: 'Custom unauthorized access message: You are not authorized to access this resource',
  maintenanceMessage: 'Custom maintenance message: Service is currently under maintenance. Please try again later.',
};

const myAPI = new API(options);


const routesDir = path.join(__dirname, 'routes');

// Function to load routes from a directory
const loadRoutes = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      loadRoutes(filePath);
    } else {
      if (file.endsWith('.js')) {
        require(filePath)(myAPI);
      }
    }
  });
};

// Load routes from the routes directory
loadRoutes(routesDir);

myAPI.app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

myAPI.start();
