# Compliance Management System

A comprehensive compliance management system built with React and Node.js.

## Features

### Authentication
- User registration with email and password
- Secure login system
- Password validation and security checks
- Terms of Service and Privacy Policy acceptance
- Session management

### Terms and Privacy
- Interactive Terms of Service and Privacy Policy pages
- Terms preview dialog with enhanced navigation:
  - Table of contents with quick section navigation
  - Search functionality
  - Scroll to top button
  - Toggle table of contents visibility
  - Smooth scrolling to sections
- Detailed terms acceptance tracking
- Analytics integration for terms interactions

### User Interface
- Modern Material-UI based design
- Responsive layout
- Intuitive navigation
- Loading states and error handling
- Form validation with clear error messages

### Analytics Integration
- Mixpanel integration for tracking:
  - User registration and login events
  - Terms acceptance and interactions
  - Page views and navigation
  - Form interactions
  - Error tracking
  - User actions and behaviors

### Security
- Secure password handling
- Terms of Service enforcement
- Privacy Policy compliance
- Data protection measures

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Mixpanel account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/compliance-system.git
cd compliance-system
```

2. Install dependencies:
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
```

3. Set up environment variables:
```bash
# Server .env
MONGODB_URI=your_mongodb_uri
NODE_ENV=development
PORT=5000

# Client .env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_MIXPANEL_TOKEN=your_mixpanel_token
```

4. Start the development servers:
```bash
# Start server
npm run server

# Start client (in a new terminal)
cd client
npm start
```

## Deployment

### Backend (Railway)
1. Create a Railway account
2. Connect your repository
3. Set environment variables
4. Deploy

### Frontend (Netlify)
1. Create a Netlify account
2. Connect your repository
3. Set build settings:
   - Build command: `cd client && npm run build`
   - Publish directory: `client/build`
4. Set environment variables
5. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/compliance-system 