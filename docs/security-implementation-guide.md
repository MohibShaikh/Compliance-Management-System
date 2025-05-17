# Security Implementation Guide

## Authentication Implementation

### JWT Implementation
```javascript
// Example JWT implementation
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user.id,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: '1h',
      algorithm: 'HS256'
    }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
```

### Password Security
```javascript
// Example password hashing
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
```

## Input Validation

### Express.js Middleware Example
```javascript
const { body, validationResult } = require('express-validator');

const validateUserInput = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/),
  body('name').trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
```

## CSRF Protection

### Express.js CSRF Implementation
```javascript
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(csrf({ cookie: true }));

// Middleware to add CSRF token to all responses
app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});
```

## Security Headers

### Express.js Security Headers
```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

## Database Security

### SQL Injection Prevention
```javascript
// Using parameterized queries with Sequelize
const { User } = require('./models');

const findUser = async (email) => {
  return await User.findOne({
    where: {
      email: email
    }
  });
};
```

## Session Management

### Express.js Session Configuration
```javascript
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

app.use(session({
  store: new RedisStore({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttl: 86400 // 24 hours
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
```

## Error Handling

### Secure Error Handling
```javascript
// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Don't expose internal errors to clients
  const errorResponse = {
    message: 'An error occurred',
    status: err.status || 500
  };
  
  // Only include detailed error in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.details = err.message;
  }
  
  res.status(errorResponse.status).json(errorResponse);
});
```

## Rate Limiting

### Express.js Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts, please try again after 15 minutes'
});

app.use('/api/auth/login', loginLimiter);
```

## Logging

### Security Logging
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Security event logging middleware
const securityLogger = (req, res, next) => {
  logger.info({
    timestamp: new Date().toISOString(),
    ip: req.ip,
    method: req.method,
    path: req.path,
    userAgent: req.get('user-agent')
  });
  next();
};
```

## Best Practices Checklist

1. **Authentication**
   - [ ] Implement MFA
   - [ ] Use secure password policies
   - [ ] Implement account lockout
   - [ ] Use secure session management

2. **Authorization**
   - [ ] Implement RBAC
   - [ ] Validate user permissions
   - [ ] Use principle of least privilege
   - [ ] Implement proper access controls

3. **Data Protection**
   - [ ] Encrypt sensitive data
   - [ ] Use secure communication
   - [ ] Implement proper key management
   - [ ] Regular security audits

4. **Input Validation**
   - [ ] Validate all user inputs
   - [ ] Sanitize data
   - [ ] Use parameterized queries
   - [ ] Implement proper error handling

5. **Security Headers**
   - [ ] Implement CSP
   - [ ] Use HSTS
   - [ ] Set secure cookies
   - [ ] Implement XSS protection

6. **Monitoring**
   - [ ] Implement logging
   - [ ] Set up alerts
   - [ ] Regular security scanning
   - [ ] Incident response plan 