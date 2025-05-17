import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel
mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
  debug: process.env.NODE_ENV === 'development',
  track_pageview: true,
  persistence: 'localStorage'
});

// User Identification
export const identifyUser = (userId, userProperties = {}) => {
  mixpanel.identify(userId);
  mixpanel.people.set({
    $email: userProperties.email,
    $name: userProperties.name,
    $company: userProperties.company,
    $role: userProperties.role,
    $created: new Date().toISOString(),
    ...userProperties
  });
  trackUserAction('User Identified', userProperties);
};

// Page Views
export const trackPageView = (pageName, properties = {}) => {
  mixpanel.track('Page View', {
    page: pageName,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// User Actions
export const trackUserAction = (actionName, properties = {}) => {
  mixpanel.track(actionName, {
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Authentication Events
export const trackAuthEvent = (eventName, properties = {}) => {
  mixpanel.track(eventName, {
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Terms and Privacy Events
export const trackTermsEvent = (eventName, properties = {}) => {
  mixpanel.track(eventName, {
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Form Interactions
export const trackFormInteraction = (formName, action, properties = {}) => {
  mixpanel.track('Form Interaction', {
    form: formName,
    action,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Error Tracking
export const trackError = (errorType, errorMessage, properties = {}) => {
  mixpanel.track('Error Occurred', {
    error_type: errorType,
    error_message: errorMessage,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Performance Metrics
export const trackPerformance = (metricName, value, properties = {}) => {
  mixpanel.track('Performance Metric', {
    metric: metricName,
    value,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Session Tracking
export const trackSession = (action, properties = {}) => {
  mixpanel.track('Session Event', {
    action,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Feature Usage
export const trackFeatureUsage = (featureName, action, properties = {}) => {
  mixpanel.track('Feature Usage', {
    feature: featureName,
    action,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// User Journey
export const trackUserJourney = (step, properties = {}) => {
  mixpanel.track('User Journey', {
    step,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Search Analytics
export const trackSearch = (query, results, properties = {}) => {
  mixpanel.track('Search Performed', {
    query,
    results_count: results.length,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Navigation Analytics
export const trackNavigation = (from, to, properties = {}) => {
  mixpanel.track('Navigation', {
    from,
    to,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Time on Page
export const trackTimeOnPage = (pageName, duration, properties = {}) => {
  mixpanel.track('Time on Page', {
    page: pageName,
    duration,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Scroll Depth
export const trackScrollDepth = (pageName, depth, properties = {}) => {
  mixpanel.track('Scroll Depth', {
    page: pageName,
    depth,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Click Analytics
export const trackClick = (elementName, properties = {}) => {
  mixpanel.track('Element Clicked', {
    element: elementName,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Form Validation
export const trackFormValidation = (formName, field, isValid, properties = {}) => {
  mixpanel.track('Form Validation', {
    form: formName,
    field,
    is_valid: isValid,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Terms Acceptance
export const trackTermsAcceptance = (version, properties = {}) => {
  mixpanel.track('Terms Accepted', {
    version,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// User Preferences
export const trackUserPreference = (preference, value, properties = {}) => {
  mixpanel.track('User Preference Changed', {
    preference,
    value,
    timestamp: new Date().toISOString(),
    ...properties
  });
};

// Reset User
export const resetUser = () => {
  mixpanel.reset();
  trackUserAction('User Reset');
};

export default mixpanel; 