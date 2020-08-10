const app = require('./app');
const http = require('http');

const PORT = process.env.PORT || 8081

http.createServer(app).listen(PORT, () => {
    console.log(`The backend is running on port ${PORT}`);
    console.log("Press CTRL+C to quit");
})