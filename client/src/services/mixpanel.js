import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel
mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN || 'your_mixpanel_token', {
  debug: process.env.NODE_ENV === 'development'
});

// Track page views
export const trackPageView = (pageName) => {
  mixpanel.track('Page View', {
    page: pageName,
    timestamp: new Date().toISOString()
  });
};

// Track user actions
export const trackUserAction = (actionName, properties = {}) => {
  mixpanel.track(actionName, {
    ...properties,
    timestamp: new Date().toISOString()
  });
};

// Track authentication events
export const trackAuthEvent = (eventName, properties = {}) => {
  mixpanel.track(eventName, {
    ...properties,
    timestamp: new Date().toISOString()
  });
};

// Track compliance events
export const trackComplianceEvent = (eventName, properties = {}) => {
  mixpanel.track(eventName, {
    ...properties,
    timestamp: new Date().toISOString()
  });
};

// Track document events
export const trackDocumentEvent = (eventName, properties = {}) => {
  mixpanel.track(eventName, {
    ...properties,
    timestamp: new Date().toISOString()
  });
};

// Track report events
export const trackReportEvent = (eventName, properties = {}) => {
  mixpanel.track(eventName, {
    ...properties,
    timestamp: new Date().toISOString()
  });
};

// Identify user
export const identifyUser = (userId, userProperties = {}) => {
  mixpanel.identify(userId);
  mixpanel.people.set(userProperties);
};

// Reset user
export const resetUser = () => {
  mixpanel.reset();
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

// Track user session
export const trackSession = (sessionData) => {
  mixpanel.track('Session', {
    ...sessionData,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
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