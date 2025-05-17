import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel
mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
  debug: process.env.NODE_ENV === 'development',
  track_pageview: true,
  persistence: 'localStorage'
});

// Track page views with additional data
export const trackPageView = (pageName, properties = {}) => {
  mixpanel.track('Page View', {
    page: pageName,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Track user actions with detailed properties
export const trackUserAction = (actionName, properties = {}) => {
  mixpanel.track(actionName, {
    ...properties,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
};

// Track compliance events with specific data
export const trackComplianceEvent = (eventType, data) => {
  mixpanel.track('Compliance Event', {
    type: eventType,
    ...data,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
};

// Track document events
export const trackDocumentEvent = (eventType, data) => {
  mixpanel.track('Document Event', {
    type: eventType,
    ...data,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
};

// Track user authentication with detailed properties
export const trackAuthEvent = (eventType, userId, properties = {}) => {
  mixpanel.track('Authentication', {
    type: eventType,
    userId,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    ...properties
  });
};

// Track form submissions
export const trackFormSubmission = (formName, success, properties = {}) => {
  mixpanel.track('Form Submission', {
    form: formName,
    success,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    ...properties
  });
};

// Track errors
export const trackError = (errorType, error, properties = {}) => {
  mixpanel.track('Error', {
    type: errorType,
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    ...properties
  });
};

// Track performance metrics
export const trackPerformance = (metricName, value, properties = {}) => {
  mixpanel.track('Performance', {
    metric: metricName,
    value,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    ...properties
  });
};

// Identify user with detailed properties
export const identifyUser = (userId, userProperties) => {
  mixpanel.identify(userId);
  mixpanel.people.set({
    $email: userProperties.email,
    $name: userProperties.name,
    $created: new Date().toISOString(),
    $last_login: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    ...userProperties
  });
};

// Track user session
export const trackSession = (sessionData) => {
  mixpanel.track('Session', {
    ...sessionData,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
};

// Reset user
export const resetUser = () => {
  mixpanel.reset();
};

// Track feature usage
export const trackFeatureUsage = (featureName, properties = {}) => {
  mixpanel.track('Feature Usage', {
    feature: featureName,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    ...properties
  });
}; 