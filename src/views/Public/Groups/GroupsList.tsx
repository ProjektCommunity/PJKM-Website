import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Card, CardContent, CardActionArea, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Placeholder for Group data type - refine based on actual API
interface Group {
  id: string;
  name: string;
  description?: string;
  logo_url?: string; // Assuming a field for a logo
}

// Placeholder data - replace with API call
const placeholderGroups: Group[] = [
  { id: '1', name: 'VRChat Explorers', description: 'Exploring amazing VRChat worlds.' },
  { id: '2', name: 'Art Creators Hub', description: 'A hub for artists in VRChat.' },
];

function GroupsList() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchGroups = async () => {
      setLoading(true);
      console.warn("Using placeholder groups data. Implement API call to /community.");
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      setGroups(placeholderGroups);
      setLoading(false);
    };
    fetchGroups();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Community Groups
      </Typography>
      {groups.length === 0 && !loading && (
        <Typography variant="subtitle1" align="center">
          No groups found.
        </Typography>
      )}
      <Grid container spacing={4} justifyContent="center">
        {groups.map((group) => (
          <Grid item key={group.id} xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea component={RouterLink} to={`/groups/${group.id}`}>
                {/* Add CardMedia for logo if available */}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {group.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {group.description || 'No description available.'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default GroupsList;
