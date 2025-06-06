import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import { getStaffList } from '@/utils/API/Staff'; // Assuming this path is correct based on your structure

// Interface for the structure returned by getStaffList
// This should match StaffMemberResponse from your API utility
interface StaffMember {
  id: number;
  User: {
    id: number;
    username: string;
    ProfilePhoto?: {
      path: string;
    };
  };
  Departments: {
    Department: {
      name: string;
    };
    JobTitles: {
      name: string;
    }[];
  }[];
}

function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const staffData = await getStaffList();
        setStaff(staffData);
        setError(null);
      } catch (err) {
        console.error("Error fetching staff data:", err);
        setError('Failed to load staff data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
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
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Our Staff
      </Typography>
      {staff.length === 0 && !loading && (
        <Typography variant="subtitle1" align="center">
          No staff members found.
        </Typography>
      )}
      <Grid container spacing={4} justifyContent="center">
        {staff.map((member) => (
          <Grid item key={member.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {member.User.ProfilePhoto?.path && (
                <CardMedia
                  component="img"
                  height="250"
                  image={member.User.ProfilePhoto.path}
                  alt={member.User.username}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              {!member.User.ProfilePhoto?.path && (
                 <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey.200' }}>
                   <Typography variant="caption">No Image</Typography>
                 </Box>
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {member.User.username}
                </Typography>
                {member.Departments.map((deptAssignment, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography variant="subtitle2" color="text.primary" component="div">
                      {deptAssignment.Department.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {deptAssignment.JobTitles.map(jt => jt.name).join(', ')}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default StaffPage;
