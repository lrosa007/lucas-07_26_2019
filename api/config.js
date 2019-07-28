module.exports = {
  PORT: "4000",
  maxByteSize: 10 * 1024 * 1024,
  allowedFileTypes: ["image/jpeg", "image/png"],
  corsOptions: {
    origin: "*",
    optionsSuccessStatus: 200,
  },
};
