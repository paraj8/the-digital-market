require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const routes = require("./routes");

// API Routes
app.use("/api/v1", routes);

const PORT = process.env.PORT || 5000;

// Database
connectDB();

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});