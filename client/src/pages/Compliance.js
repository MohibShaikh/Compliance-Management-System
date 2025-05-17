import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Add as AddIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';

const Compliance = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);

  // Sample compliance data structure
  const complianceData = {
    kda: {
      title: 'Karachi Development Authority',
      requirements: [
        { id: 1, name: 'Building Safety', status: 'completed', dueDate: '2024-03-01' },
        { id: 2, name: 'Fire Safety', status: 'pending', dueDate: '2024-03-15' },
        { id: 3, name: 'Parking Facilities', status: 'in-progress', dueDate: '2024-04-01' }
      ]
    },
    sepa: {
      title: 'Sindh Environmental Protection Agency',
      requirements: [
        { id: 4, name: 'Waste Management', status: 'completed', dueDate: '2024-03-01' },
        { id: 5, name: 'Energy Efficiency', status: 'pending', dueDate: '2024-03-15' }
      ]
    },
    kwsb: {
      title: 'Karachi Water and Sewerage Board',
      requirements: [
        { id: 6, name: 'Water Supply', status: 'in-progress', dueDate: '2024-04-01' },
        { id: 7, name: 'Drainage System', status: 'pending', dueDate: '2024-03-15' }
      ]
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleRequirementClick = (requirement) => {
    setSelectedRequirement(requirement);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRequirement(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'in-progress':
        return <WarningIcon color="warning" />;
      case 'pending':
        return <ErrorIcon color="error" />;
      default:
        return null;
    }
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      completed: { color: 'success', label: 'Completed' },
      'in-progress': { color: 'warning', label: 'In Progress' },
      pending: { color: 'error', label: 'Pending' }
    };

    const config = statusConfig[status];
    return (
      <Chip
        label={config.label}
        color={config.color}
        size="small"
        sx={{ ml: 1 }}
      />
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Compliance Management
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="KDA Requirements" />
          <Tab label="SEPA Requirements" />
          <Tab label="KW&SB Requirements" />
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        {Object.entries(complianceData).map(([key, data]) => (
          <Grid item xs={12} md={6} lg={4} key={key}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {data.title}
                </Typography>
                <List>
                  {data.requirements.map((requirement) => (
                    <ListItem
                      key={requirement.id}
                      button
                      onClick={() => handleRequirementClick(requirement)}
                    >
                      <ListItemIcon>
                        {getStatusIcon(requirement.status)}
                      </ListItemIcon>
                      <ListItemText
                        primary={requirement.name}
                        secondary={`Due: ${requirement.dueDate}`}
                      />
                      {getStatusChip(requirement.status)}
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<AddIcon />}
                  color="primary"
                  fullWidth
                >
                  Add Requirement
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedRequirement?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Due Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Status"
                  select
                  fullWidth
                  SelectProps={{ native: true }}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Progress
                </Typography>
                <LinearProgress variant="determinate" value={70} />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Compliance; 