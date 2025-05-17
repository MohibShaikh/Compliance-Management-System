import React, { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import TermsOfService from '../pages/TermsOfService';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import {
  trackUserAction,
  trackSearch,
  trackClick,
  trackScrollDepth,
  trackTimeOnPage,
  trackTermsEvent,
  trackUserPreference
} from '../services/mixpanel';

const TermsPreviewDialog = ({ open, onClose, onAccept }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [showToc, setShowToc] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchOpen, setSearchOpen] = React.useState(false);
  const contentRef = React.useRef(null);
  const startTimeRef = useRef(Date.now());
  const lastScrollRef = useRef(0);

  useEffect(() => {
    if (open) {
      startTimeRef.current = Date.now();
      trackTermsEvent('Terms Dialog Opened', { tab: activeTab === 0 ? 'Terms' : 'Privacy' });
    }
  }, [open, activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollTop = contentRef.current.scrollTop;
        const scrollHeight = contentRef.current.scrollHeight;
        const clientHeight = contentRef.current.clientHeight;
        const scrollDepth = (scrollTop / (scrollHeight - clientHeight)) * 100;
        
        if (Math.abs(scrollDepth - lastScrollRef.current) >= 25) {
          trackScrollDepth(activeTab === 0 ? 'Terms' : 'Privacy', Math.round(scrollDepth));
          lastScrollRef.current = scrollDepth;
        }
      }
    };

    const element = contentRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, [activeTab]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    trackUserAction('Terms Preview Tab Change', { tab: newValue === 0 ? 'Terms' : 'Privacy' });
  };

  const handleAccept = () => {
    const timeSpent = Date.now() - startTimeRef.current;
    trackTermsEvent('Terms Accepted', {
      tab: activeTab === 0 ? 'Terms' : 'Privacy',
      time_spent: timeSpent,
      scroll_depth: lastScrollRef.current
    });
    onAccept();
  };

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      trackClick('Terms Section', { section: sectionId });
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length >= 3) {
      trackSearch(query, [], { context: activeTab === 0 ? 'Terms' : 'Privacy' });
    }
  };

  const handleScrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      trackClick('Scroll to Top');
    }
  };

  const handleTocToggle = () => {
    setShowToc(!showToc);
    trackUserPreference('Table of Contents', !showToc);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    trackClick('Search Toggle', { state: !searchOpen });
  };

  const handleClose = () => {
    const timeSpent = Date.now() - startTimeRef.current;
    trackTimeOnPage(activeTab === 0 ? 'Terms' : 'Privacy', timeSpent);
    onClose();
  };

  const termsSections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'license', title: '2. Use License' },
    { id: 'responsibilities', title: '3. User Responsibilities' },
    { id: 'privacy', title: '4. Data Privacy' },
    { id: 'disclaimer', title: '5. Disclaimer' },
    { id: 'limitations', title: '6. Limitations' },
    { id: 'revisions', title: '7. Revisions and Errata' },
    { id: 'contact', title: '8. Contact Information' }
  ];

  const privacySections = [
    { id: 'collection', title: '1. Information We Collect' },
    { id: 'usage', title: '2. How We Use Your Information' },
    { id: 'security', title: '3. Data Security' },
    { id: 'retention', title: '4. Data Retention' },
    { id: 'rights', title: '5. Your Rights' },
    { id: 'cookies', title: '6. Cookies and Tracking' },
    { id: 'third-party', title: '7. Third-Party Services' },
    { id: 'children', title: '8. Children\'s Privacy' },
    { id: 'changes', title: '9. Changes to This Policy' },
    { id: 'contact', title: '10. Contact Us' }
  ];

  const sections = activeTab === 0 ? termsSections : privacySections;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: '80vh',
          maxHeight: '800px'
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" component="div">
          Terms and Privacy Policy
        </Typography>
        <Box>
          <Tooltip title="Toggle Table of Contents">
            <IconButton onClick={handleTocToggle}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Search">
            <IconButton onClick={handleSearchToggle}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </DialogTitle>

      {searchOpen && (
        <Box sx={{ px: 2, pb: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search in document..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => handleSearch('')}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
      )}
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Terms of Service" />
          <Tab label="Privacy Policy" />
        </Tabs>
      </Box>

      <Box sx={{ display: 'flex', height: 'calc(100% - 120px)' }}>
        {showToc && (
          <Box
            sx={{
              width: 250,
              borderRight: 1,
              borderColor: 'divider',
              overflow: 'auto'
            }}
          >
            <List>
              {sections.map((section) => (
                <ListItem key={section.id} disablePadding>
                  <ListItemButton onClick={() => handleSectionClick(section.id)}>
                    <ListItemText primary={section.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        <DialogContent
          ref={contentRef}
          dividers
          sx={{
            flex: 1,
            overflow: 'auto',
            position: 'relative'
          }}
        >
          <Box sx={{ height: '100%', overflow: 'auto' }}>
            {activeTab === 0 ? <TermsOfService /> : <PrivacyPolicy />}
          </Box>

          <Box
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              display: 'flex',
              gap: 1
            }}
          >
            <Tooltip title="Scroll to Top">
              <IconButton
                onClick={handleScrollToTop}
                sx={{ bgcolor: 'background.paper' }}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogContent>
      </Box>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Close
        </Button>
        <Button onClick={handleAccept} variant="contained" color="primary">
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsPreviewDialog; 