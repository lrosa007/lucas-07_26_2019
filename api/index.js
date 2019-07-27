const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

// Controller
const controller = require("./controller");

// Config
const { PORT, corsOptions } = require("./config");

// Rate Limiter
const rateLimiter = require("./rateLimiter");

const app = express();

// Middlewares
app.use(morgan("combined"));
app.use(cors(corsOptions));
app.use(helmet());
app.use(rateLimiter);

// Routes
app.get("/documents", controller.index);
app.post("/documents", controller.create);
app.delete("/documents/:id", controller.destroy);

// Server
app.listen(PORT, () => {
  console.log(`Upload API Running on port: ${PORT} 🚀`);
});
