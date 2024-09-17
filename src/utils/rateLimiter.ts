import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per `windowMs`
  windowMs: 60 * 60 * 1000, // 1 hour window
  message: 'Too many requests from this IP, please try again in an hour',
});

export default limiter;