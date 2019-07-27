const { RateLimiterMemory } = require("rate-limiter-flexible");

module.exports = () => {
  const rateLimiter = new RateLimiterMemory({
    points: 6,
    duration: 1
  });

  return (req, res, next) => {
    rateLimiter
      .consume(req.ip)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(429).send("Too Many Requests");
      });
  };
};
