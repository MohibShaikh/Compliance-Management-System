# Payment Security Implementation Guide

## 1. PCI DSS Compliance Implementation

### 1.1 Card Data Handling
```javascript
// Example of secure card data handling using Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return paymentIntent;
  } catch (error) {
    throw new Error('Payment processing failed');
  }
};

// Never store raw card data
const processPayment = async (paymentMethodId, amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      off_session: true,
    });
    return paymentIntent;
  } catch (error) {
    throw new Error('Payment processing failed');
  }
};
```

### 1.2 Secure Payment Form
```html
<!-- Example of secure payment form implementation -->
<form id="payment-form">
  <div id="card-element">
    <!-- Stripe Card Element will be inserted here -->
  </div>
  <button id="submit">Pay</button>
  <div id="error-message"></div>
</form>

<script>
const stripe = Stripe('pk_test_your_publishable_key');
const elements = stripe.elements();
const card = elements.create('card');
card.mount('#card-element');

// Handle form submission
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const {paymentMethod, error} = await stripe.createPaymentMethod({
    type: 'card',
    card: card,
  });
  
  if (error) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = error.message;
  } else {
    // Send paymentMethod.id to your server
    await processPayment(paymentMethod.id);
  }
});
</script>
```

## 2. Payment Data Encryption

### 2.1 Data Encryption at Rest
```javascript
const crypto = require('crypto');

class PaymentDataEncryption {
  constructor() {
    this.algorithm = 'aes-256-gcm';
    this.key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);
  }

  encrypt(data) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  }

  decrypt(encryptedData) {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(encryptedData.iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  }
}
```

### 2.2 Secure Payment Token Storage
```javascript
const { PaymentToken } = require('./models');

class PaymentTokenManager {
  async storeToken(userId, tokenData) {
    const encryption = new PaymentDataEncryption();
    const encryptedData = encryption.encrypt(tokenData);
    
    return await PaymentToken.create({
      userId,
      encryptedData: encryptedData.encrypted,
      iv: encryptedData.iv,
      authTag: encryptedData.authTag,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    });
  }

  async retrieveToken(userId, tokenId) {
    const token = await PaymentToken.findOne({
      where: {
        userId,
        id: tokenId,
        expiresAt: {
          [Op.gt]: new Date()
        }
      }
    });

    if (!token) {
      throw new Error('Token not found or expired');
    }

    const encryption = new PaymentDataEncryption();
    return encryption.decrypt({
      encrypted: token.encryptedData,
      iv: token.iv,
      authTag: token.authTag
    });
  }
}
```

## 3. Payment Processing Security

### 3.1 Transaction Monitoring
```javascript
class PaymentMonitor {
  constructor() {
    this.suspiciousPatterns = [
      { type: 'velocity', threshold: 5, window: 3600000 }, // 5 transactions per hour
      { type: 'amount', threshold: 10000 }, // $10,000
      { type: 'location', threshold: 2 } // 2 different countries
    ];
  }

  async monitorTransaction(transaction) {
    const riskScore = await this.calculateRiskScore(transaction);
    
    if (riskScore > 0.7) {
      await this.flagSuspiciousTransaction(transaction);
      return false;
    }
    
    return true;
  }

  async calculateRiskScore(transaction) {
    let score = 0;
    
    // Check transaction velocity
    const recentTransactions = await this.getRecentTransactions(transaction.userId);
    if (recentTransactions.length > this.suspiciousPatterns[0].threshold) {
      score += 0.3;
    }
    
    // Check transaction amount
    if (transaction.amount > this.suspiciousPatterns[1].threshold) {
      score += 0.3;
    }
    
    // Check location
    const locationScore = await this.checkLocationRisk(transaction);
    score += locationScore;
    
    return score;
  }
}
```

### 3.2 Fraud Prevention
```javascript
class FraudPrevention {
  async validateTransaction(transaction) {
    // Check for common fraud patterns
    const fraudChecks = [
      this.checkVelocity(transaction),
      this.checkAmount(transaction),
      this.checkLocation(transaction),
      this.checkDevice(transaction),
      this.checkBehavior(transaction)
    ];

    const results = await Promise.all(fraudChecks);
    return results.every(check => check.passed);
  }

  async checkVelocity(transaction) {
    const recentTransactions = await this.getRecentTransactions(transaction.userId);
    return {
      passed: recentTransactions.length < 5,
      reason: recentTransactions.length >= 5 ? 'High transaction velocity' : null
    };
  }

  async checkAmount(transaction) {
    const userAverage = await this.getUserAverageTransaction(transaction.userId);
    return {
      passed: transaction.amount <= userAverage * 3,
      reason: transaction.amount > userAverage * 3 ? 'Unusual transaction amount' : null
    };
  }
}
```

## 4. Security Best Practices

### 4.1 Payment API Security
```javascript
const express = require('express');
const router = express.Router();

// Rate limiting for payment endpoints
const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10 // 10 requests per window
});

// Payment endpoint with security measures
router.post('/process-payment',
  paymentLimiter,
  validatePaymentInput,
  authenticateUser,
  async (req, res) => {
    try {
      const { amount, currency, paymentMethodId } = req.body;
      
      // Validate amount
      if (amount <= 0 || amount > 1000000) {
        return res.status(400).json({ error: 'Invalid amount' });
      }
      
      // Process payment
      const paymentIntent = await createPaymentIntent(amount, currency);
      
      // Log transaction
      await logTransaction({
        userId: req.user.id,
        amount,
        currency,
        status: 'success',
        timestamp: new Date()
      });
      
      res.json({ success: true, paymentIntent });
    } catch (error) {
      // Log error
      await logError(error);
      
      // Return generic error
      res.status(500).json({ error: 'Payment processing failed' });
    }
  }
);
```

### 4.2 Secure Payment Logging
```javascript
class PaymentLogger {
  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'payment.log' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
      ]
    });
  }

  async logTransaction(transaction) {
    // Remove sensitive data
    const sanitizedTransaction = this.sanitizeTransaction(transaction);
    
    this.logger.info({
      type: 'payment',
      ...sanitizedTransaction,
      timestamp: new Date().toISOString()
    });
  }

  sanitizeTransaction(transaction) {
    const { cardNumber, cvv, ...sanitized } = transaction;
    return sanitized;
  }
}
```

## 5. Compliance Checklist

### 5.1 PCI DSS Requirements
- [ ] Implement strong access control measures
- [ ] Maintain a vulnerability management program
- [ ] Regularly monitor and test networks
- [ ] Maintain an information security policy
- [ ] Protect cardholder data
- [ ] Build and maintain a secure network

### 5.2 Security Controls
- [ ] Encrypt sensitive data
- [ ] Implement access controls
- [ ] Monitor system access
- [ ] Test security systems
- [ ] Maintain security policies
- [ ] Document security procedures 