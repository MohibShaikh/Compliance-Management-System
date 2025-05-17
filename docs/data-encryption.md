# Data Encryption and Key Management Guide

## 1. Data Encryption Implementation

### 1.1 Encryption Service
```javascript
const crypto = require('crypto');

class EncryptionService {
  constructor() {
    this.algorithm = 'aes-256-gcm';
    this.keyLength = 32; // 256 bits
    this.ivLength = 16; // 128 bits
    this.saltLength = 64;
    this.tagLength = 16;
  }

  async generateKey(password, salt) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 100000, this.keyLength, 'sha512', (err, key) => {
        if (err) reject(err);
        resolve(key);
      });
    });
  }

  async encrypt(data, key) {
    try {
      const iv = crypto.randomBytes(this.ivLength);
      const cipher = crypto.createCipheriv(this.algorithm, key, iv);
      
      let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      const tag = cipher.getAuthTag();
      
      return {
        encrypted,
        iv: iv.toString('hex'),
        tag: tag.toString('hex')
      };
    } catch (error) {
      throw new Error('Encryption failed');
    }
  }

  async decrypt(encryptedData, key) {
    try {
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        key,
        Buffer.from(encryptedData.iv, 'hex')
      );
      
      decipher.setAuthTag(Buffer.from(encryptedData.tag, 'hex'));
      
      let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return JSON.parse(decrypted);
    } catch (error) {
      throw new Error('Decryption failed');
    }
  }
}
```

### 1.2 Data Encryption at Rest
```javascript
class DataEncryption {
  constructor() {
    this.encryptionService = new EncryptionService();
  }

  async encryptSensitiveData(data) {
    const salt = crypto.randomBytes(64);
    const key = await this.encryptionService.generateKey(process.env.ENCRYPTION_KEY, salt);
    
    const encrypted = await this.encryptionService.encrypt(data, key);
    
    return {
      ...encrypted,
      salt: salt.toString('hex')
    };
  }

  async decryptSensitiveData(encryptedData) {
    const key = await this.encryptionService.generateKey(
      process.env.ENCRYPTION_KEY,
      Buffer.from(encryptedData.salt, 'hex')
    );
    
    return await this.encryptionService.decrypt(encryptedData, key);
  }
}
```

## 2. Key Management

### 2.1 Key Rotation Service
```javascript
class KeyRotationService {
  constructor() {
    this.keyStore = new Map();
    this.rotationInterval = 24 * 60 * 60 * 1000; // 24 hours
  }

  async rotateKeys() {
    const newKey = await this.generateNewKey();
    const timestamp = Date.now();
    
    this.keyStore.set(timestamp, {
      key: newKey,
      active: true
    });
    
    // Deactivate old keys
    this.deactivateOldKeys(timestamp);
    
    return timestamp;
  }

  async generateNewKey() {
    return crypto.randomBytes(32);
  }

  deactivateOldKeys(currentTimestamp) {
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    
    for (const [timestamp, keyData] of this.keyStore.entries()) {
      if (currentTimestamp - timestamp > maxAge) {
        keyData.active = false;
      }
    }
  }

  getActiveKey() {
    const activeKeys = Array.from(this.keyStore.entries())
      .filter(([_, keyData]) => keyData.active)
      .sort(([a], [b]) => b - a);
    
    return activeKeys[0]?.[1].key;
  }
}
```

### 2.2 Secure Key Storage
```javascript
class SecureKeyStorage {
  constructor() {
    this.vault = new Map();
  }

  async storeKey(keyId, key) {
    const masterKey = await this.getMasterKey();
    const encryptedKey = await this.encryptKey(key, masterKey);
    
    this.vault.set(keyId, {
      key: encryptedKey,
      createdAt: Date.now(),
      lastUsed: Date.now()
    });
  }

  async retrieveKey(keyId) {
    const keyData = this.vault.get(keyId);
    if (!keyData) {
      throw new Error('Key not found');
    }
    
    const masterKey = await this.getMasterKey();
    const decryptedKey = await this.decryptKey(keyData.key, masterKey);
    
    // Update last used timestamp
    keyData.lastUsed = Date.now();
    
    return decryptedKey;
  }

  async getMasterKey() {
    // In production, this would be stored in a secure key management service
    // like AWS KMS, HashiCorp Vault, or Azure Key Vault
    return process.env.MASTER_KEY;
  }
}
```

## 3. Data Protection

### 3.1 Sensitive Data Handling
```javascript
class SensitiveDataHandler {
  constructor() {
    this.encryptionService = new EncryptionService();
    this.keyRotationService = new KeyRotationService();
  }

  async protectSensitiveData(data) {
    const sensitiveFields = this.identifySensitiveFields(data);
    const protectedData = { ...data };
    
    for (const field of sensitiveFields) {
      if (data[field]) {
        protectedData[field] = await this.encryptField(data[field]);
      }
    }
    
    return protectedData;
  }

  identifySensitiveFields(data) {
    // Define sensitive fields based on your data model
    return [
      'creditCard',
      'ssn',
      'password',
      'email',
      'phoneNumber'
    ].filter(field => field in data);
  }

  async encryptField(value) {
    const key = await this.keyRotationService.getActiveKey();
    const encrypted = await this.encryptionService.encrypt(value, key);
    
    return {
      encrypted: true,
      data: encrypted
    };
  }
}
```

### 3.2 Data Masking
```javascript
class DataMasking {
  maskCreditCard(number) {
    return number.replace(/^(\d{4})\d+(\d{4})$/, '$1********$2');
  }

  maskEmail(email) {
    const [name, domain] = email.split('@');
    const maskedName = name.charAt(0) + '*'.repeat(name.length - 1);
    return `${maskedName}@${domain}`;
  }

  maskPhoneNumber(number) {
    return number.replace(/^(\d{3})\d+(\d{4})$/, '$1****$2');
  }

  maskSSN(ssn) {
    return ssn.replace(/^(\d{3})\d+(\d{4})$/, '$1-**-$2');
  }
}
```

## 4. Security Best Practices

### 4.1 Encryption Configuration
```javascript
const encryptionConfig = {
  algorithms: {
    symmetric: 'aes-256-gcm',
    asymmetric: 'rsa-oaep',
    hash: 'sha-512'
  },
  keyLengths: {
    symmetric: 256,
    asymmetric: 2048,
    salt: 64
  },
  iterations: {
    keyDerivation: 100000
  },
  rotation: {
    interval: 24 * 60 * 60 * 1000, // 24 hours
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
};
```

### 4.2 Security Controls
```javascript
class SecurityControls {
  constructor() {
    this.encryptionService = new EncryptionService();
    this.keyRotationService = new KeyRotationService();
    this.dataMasking = new DataMasking();
  }

  async validateEncryption(data) {
    const checks = [
      this.checkKeyRotation(),
      this.checkEncryptionStrength(),
      this.checkDataProtection()
    ];
    
    return Promise.all(checks);
  }

  async checkKeyRotation() {
    const lastRotation = await this.keyRotationService.getLastRotationTime();
    const now = Date.now();
    
    return {
      passed: now - lastRotation < encryptionConfig.rotation.interval,
      message: 'Key rotation check'
    };
  }

  async checkEncryptionStrength() {
    const key = await this.keyRotationService.getActiveKey();
    
    return {
      passed: key.length === encryptionConfig.keyLengths.symmetric / 8,
      message: 'Encryption strength check'
    };
  }
}
```

## 5. Compliance Requirements

### 5.1 Encryption Standards
- AES-256-GCM for symmetric encryption
- RSA-2048 for asymmetric encryption
- SHA-512 for hashing
- PBKDF2 for key derivation

### 5.2 Key Management Requirements
- Regular key rotation
- Secure key storage
- Access control for keys
- Audit logging
- Key backup and recovery

### 5.3 Data Protection Requirements
- Encryption at rest
- Encryption in transit
- Data masking
- Access control
- Audit logging 