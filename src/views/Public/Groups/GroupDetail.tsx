import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper, CircularProgress, Chip, List, ListItem, ListItemText, Divider, Link as MuiLink } from '@mui/material';
import { useParams } from 'react-router-dom';

// Placeholder for detailed Group data type - refine based on actual API
interface GroupDetailData {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  membersCount?: number;
  socials?: { name: string; url: string }[];
  events?: { id: string; name: string; date: string }[]; // Simplified event structure
}

// Placeholder data - replace with API call
const placeholderGroupDetail: GroupDetailData = {
  id: '1',
  name: 'VRChat Explorers',
  description: 'A community for exploring amazing VRChat worlds. We host weekly tours and events!',
  membersCount: 150,
  socials: [
    { name: 'Discord', url: '#' },
    { name: 'Twitter', url: '#' },
  ],
  events: [
    { id: 'evt1', name: 'Weekly World Hop', date: 'Every Friday' },
    { id: 'evt2', name: 'Art Gallery Showcase', date: '2023-10-15' },
  ],
};

function GroupDetail() {
  const { communityId } = useParams<{ communityId: string }>(); // communityId from route
  const [group, setGroup] = useState<GroupDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!communityId) {
      setError("Group ID is missing.");
      setLoading(false);
      return;
    }
    // Simulate API call
    const fetchGroupDetail = async () => {
      setLoading(true);
      console.warn(`Using placeholder group detail data for ID ${communityId}. Implement API call to /community/${communityId}.`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      // In a real app, you'd find the group by ID or fetch specifically
      if (communityId === placeholderGroupDetail.id) {
        setGroup(placeholderGroupDetail);
      } else {
        setError("Group not found.");
      }
      setLoading(false);
    };
    fetchGroupDetail();
  }, [communityId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !group) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error || 'Group data could not be loaded.'}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {group.name}
        </Typography>
        {/* Add logo image here if group.logo_url exists */}
        <Typography variant="body1" sx={{ mb: 2 }}>
          {group.description || 'No description available.'}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" gutterBottom>Details</Typography>
        <Typography variant="body1">Members: {group.membersCount || 'N/A'}</Typography>

        {group.socials && group.socials.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>Socials</Typography>
            <Box>
              {group.socials.map(social => (
                <Chip
                  key={social.name}
                  label={social.name}
                  component="a"
                  href={social.url}
                  target="_blank"
                  clickable
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </>
        )}

        {group.events && group.events.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>Associated Events</Typography>
            <List dense>
              {group.events.map(event => (
                <ListItem key={event.id}>
                  <ListItemText primary={event.name} secondary={event.date} />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Paper>
    </Box>
  );
}

export default GroupDetail;
