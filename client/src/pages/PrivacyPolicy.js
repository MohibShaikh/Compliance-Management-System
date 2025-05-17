import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Privacy Policy
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography paragraph>
          We collect information that you provide directly to us, including:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Name and contact information" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Company information" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Account credentials" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Usage data and analytics" />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography paragraph>
          We use the information we collect to:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Provide and maintain our service" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Process your transactions" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Send you technical notices and support messages" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Monitor and analyze usage patterns" />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom>
          3. Data Security
        </Typography>
        <Typography paragraph>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Data Retention
        </Typography>
        <Typography paragraph>
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Your Rights
        </Typography>
        <Typography paragraph>
          You have the right to:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Access your personal information" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Correct inaccurate data" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Request deletion of your data" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Object to processing of your data" />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom>
          6. Cookies and Tracking
        </Typography>
        <Typography paragraph>
          We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Third-Party Services
        </Typography>
        <Typography paragraph>
          We may employ third-party companies and individuals to facilitate our service, provide service-related services, or assist us in analyzing how our service is used.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8. Children's Privacy
        </Typography>
        <Typography paragraph>
          Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.
        </Typography>

        <Typography variant="h6" gutterBottom>
          9. Changes to This Policy
        </Typography>
        <Typography paragraph>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </Typography>

        <Typography variant="h6" gutterBottom>
          10. Contact Us
        </Typography>
        <Typography paragraph>
          If you have any questions about this Privacy Policy, please contact us at privacy@compliance-system.com
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy; 