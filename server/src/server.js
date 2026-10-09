require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const routes = require("./routes");
const cloudinary = require("./config/cloudinary");
const http = require("http");
const initializeSocket = require("./modules/communication/socket/socket");

// API Routes
app.use("/api/v1", routes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = initializeSocket(server);
app.set("io", io);

// Database
connectDB();

cloudinary.api
  .ping()
  .then(() => {
    console.log("☁️ Cloudinary connected");
  })
  .catch((error) => {
    console.error("❌ Cloudinary connection failed:", error.message);
  });

server.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});