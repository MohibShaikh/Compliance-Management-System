import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon
} from '@mui/icons-material';

const Documents = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Compliance Policy',
      type: 'PDF',
      size: '2.5 MB',
      lastModified: '2024-02-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Security Guidelines',
      type: 'DOCX',
      size: '1.8 MB',
      lastModified: '2024-02-10',
      status: 'review'
    },
    {
      id: 3,
      name: 'Audit Report 2024',
      type: 'PDF',
      size: '4.2 MB',
      lastModified: '2024-02-01',
      status: 'archived'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleOpenDialog = (document = null) => {
    setSelectedDocument(document);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedDocument(null);
    setOpenDialog(false);
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'review':
        return 'warning';
      case 'archived':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Documents
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Upload Document
        </Button>
      </Box>

      <Paper>
        <List>
          {documents.map((doc) => (
            <ListItem key={doc.id} divider>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText
                primary={doc.name}
                secondary={
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      Type: {doc.type}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      Size: {doc.size}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      Last Modified: {doc.lastModified}
                    </Grid>
                  </Grid>
                }
              />
              <Chip
                label={doc.status}
                color={getStatusColor(doc.status)}
                size="small"
                sx={{ mr: 2 }}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="download" sx={{ mr: 1 }}>
                  <DownloadIcon />
                </IconButton>
                <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(doc.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedDocument ? 'Edit Document' : 'Upload New Document'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Document Name"
              margin="normal"
              defaultValue={selectedDocument?.name}
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary">
            {selectedDocument ? 'Save Changes' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Documents; 