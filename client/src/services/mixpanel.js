import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel
mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
  debug: process.env.NODE_ENV === 'development',
  track_pageview: true,
  persistence: 'localStorage'
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

// Track compliance events
export const trackComplianceEvent = (eventType, data) => {
  mixpanel.track('Compliance Event', {
    type: eventType,
    ...data,
    timestamp: new Date().toISOString()
  });
};

// Track document events
export const trackDocumentEvent = (eventType, data) => {
  mixpanel.track('Document Event', {
    type: eventType,
    ...data,
    timestamp: new Date().toISOString()
  });
};

// Track user authentication
export const trackAuthEvent = (eventType, userId) => {
  mixpanel.track('Authentication', {
    type: eventType,
    userId,
    timestamp: new Date().toISOString()
  });
};

// Identify user
export const identifyUser = (userId, userProperties) => {
  mixpanel.identify(userId);
  mixpanel.people.set({
    $email: userProperties.email,
    $name: userProperties.name,
    $created: new Date().toISOString(),
    ...userProperties
  });
};

// Reset user
export const resetUser = () => {
  mixpanel.reset();
}; 