import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

const Reports = () => {
  const [timeRange, setTimeRange] = useState('month');

  const reports = [
    {
      id: 1,
      title: 'Compliance Overview',
      date: '2024-02-15',
      type: 'PDF',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Security Audit',
      date: '2024-02-10',
      type: 'PDF',
      status: 'In Review'
    },
    {
      id: 3,
      title: 'Risk Assessment',
      date: '2024-02-01',
      type: 'PDF',
      status: 'Completed'
    }
  ];

  const metrics = [
    {
      title: 'Compliance Score',
      value: '85%',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Open Issues',
      value: '12',
      change: '-3',
      trend: 'down'
    },
    {
      title: 'Completed Tasks',
      value: '45',
      change: '+8',
      trend: 'up'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Reports
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="week">Last Week</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="quarter">Last Quarter</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<FilterIcon />}
          >
            Filter
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {metric.title}
                </Typography>
                <Typography variant="h4" component="div">
                  {metric.value}
                </Typography>
                <Typography
                  variant="body2"
                  color={metric.trend === 'up' ? 'success.main' : 'error.main'}
                >
                  {metric.change} from last period
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Report Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small">
                      <DownloadIcon />
                    </IconButton>
                    <IconButton size="small">
                      <PrintIcon />
                    </IconButton>
                    <IconButton size="small">
                      <ShareIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Reports; 