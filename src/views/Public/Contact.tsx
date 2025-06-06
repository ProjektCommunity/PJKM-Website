import { Box, Typography, Grid } from '@mui/material'

export default function Contact() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" py={8}>
      <Typography variant="h2" fontWeight="bold" textAlign="center" sx={{ textDecoration: 'underline', mb: 4 }}>
        Contact Us
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Business
          </Typography>
          <Typography variant="body1">
            business@projektcommunity.com
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Support
          </Typography>
          <Typography variant="body1">
            support@projektcommunity.com
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
