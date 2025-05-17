import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel with your project token
mixpanel.init('0d09f28858df', {
  debug: process.env.NODE_ENV === 'development',
  track_pageview: true,
  persistence: 'localStorage'
});

// Track page views
export const trackPageView = (pageName, properties = {}) => {
  try {
    mixpanel.track('Page View', {
      page: pageName,
      timestamp: new Date().toISOString(),
      ...properties
    });
  } catch (error) {
    console.error('Mixpanel tracking error:', error);
  }
};

// Track user actions
export const trackUserAction = (actionName, properties = {}) => {
  try {
    mixpanel.track(actionName, {
      timestamp: new Date().toISOString(),
      ...properties
    });
  } catch (error) {
    console.error('Mixpanel tracking error:', error);
  }
};

// Track authentication events
export const trackAuthEvent = (eventName, properties = {}) => {
  try {
    mixpanel.track(eventName, {
      timestamp: new Date().toISOString(),
      ...properties
    });
  } catch (error) {
    console.error('Mixpanel tracking error:', error);
  }
};

// Identify user
export const identifyUser = (userId, userProperties = {}) => {
  try {
    mixpanel.identify(userId);
    mixpanel.people.set({
      ...userProperties,
      $last_login: new Date().toISOString()
    });
  } catch (error) {
    console.error('Mixpanel identification error:', error);
  }
};

// Reset user
export const resetUser = () => {
  try {
    mixpanel.reset();
  } catch (error) {
    console.error('Mixpanel reset error:', error);
  }
};

// Terms and Privacy Events
export const trackTermsEvent = (eventName, properties = {}) => {
  try {
    mixpanel.track(eventName, {
      timestamp: new Date().toISOString(),
      ...properties
    });
  } catch (error) {
    console.error('Mixpanel tracking error:', error);
  }
};

// Form Interactions
export const trackFormInteraction = (formName, action, properties = {}) => {
  try {
    mixpanel.track('Form Interaction', {
      form: formName,
      action,
      timestamp: new Date().toISOString(),
      ...properties
    });
  } catch (error) {
    console.error('Mixpanel tracking error:', error);
  }
};

// Error Tracking
export const trackError = (errorType, errorMessage, properties = {}) => {
  try {
    mixpanel.track('Error Occurred', {
      error_type: errorType,
      error_message: errorMessage,
      timestamp: new Date().toISOString(),
      ...properties
    });
  } catch (error) {
    console.error('Mixpanel tracking error:', error);
  }
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

export default mixpanel; 