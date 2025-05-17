import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@mui/material';

const Compliance = () => {
  const complianceItems = [
    {
      id: 1,
      title: 'Data Protection',
      description: 'Ensure all sensitive data is properly encrypted and protected',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Payment Security',
      description: 'Implement secure payment processing and PCI DSS compliance',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Document Management',
      description: 'Maintain proper documentation and audit trails',
      status: 'completed'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Compliance Requirements
      </Typography>
      <Paper sx={{ mt: 2 }}>
        <List>
          {complianceItems.map((item) => (
            <ListItem key={item.id} divider>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.status === 'completed'}
                  indeterminate={item.status === 'in-progress'}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                secondary={item.description}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Compliance; 