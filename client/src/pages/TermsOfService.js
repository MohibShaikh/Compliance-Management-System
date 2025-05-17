import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Terms of Service
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          1. Acceptance of Terms
        </Typography>
        <Typography paragraph>
          By accessing and using the Compliance Management System, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Use License
        </Typography>
        <Typography paragraph>
          Permission is granted to temporarily access the materials (information or software) on the Compliance Management System for personal, non-commercial transitory viewing only.
        </Typography>
        <Typography paragraph>
          This is the grant of a license, not a transfer of title, and under this license you may not:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Modify or copy the materials" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Use the materials for any commercial purpose" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Attempt to decompile or reverse engineer any software contained on the system" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Remove any copyright or other proprietary notations from the materials" />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom>
          3. User Responsibilities
        </Typography>
        <Typography paragraph>
          As a user of the Compliance Management System, you agree to:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Provide accurate and complete information during registration" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Maintain the security of your account credentials" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Comply with all applicable laws and regulations" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Use the system in accordance with these terms" />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom>
          4. Data Privacy
        </Typography>
        <Typography paragraph>
          Your use of the Compliance Management System is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Disclaimer
        </Typography>
        <Typography paragraph>
          The materials on the Compliance Management System are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Limitations
        </Typography>
        <Typography paragraph>
          In no event shall the Compliance Management System or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the system.
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Revisions and Errata
        </Typography>
        <Typography paragraph>
          The materials appearing on the Compliance Management System could include technical, typographical, or photographic errors. We do not warrant that any of the materials on the system are accurate, complete, or current. We may make changes to the materials contained on the system at any time without notice.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8. Contact Information
        </Typography>
        <Typography paragraph>
          If you have any questions about these Terms of Service, please contact us at support@compliance-system.com
        </Typography>
      </Paper>
    </Container>
  );
};

export default TermsOfService; 