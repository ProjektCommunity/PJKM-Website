import React, { useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Page from '../../../Components/Page';

const faqData = [
  {
    question: 'What is Projekt Community?',
    answer: 'Projekt Community is a vibrant community focused on VRChat communities and content creators. We aim to bring people together and create amazing experiences.',
  },
  {
    question: 'How can I join Projekt Community?',
    answer: 'You can join our community by visiting our Discord server: https://discord.com/invite/PJKT. We also have a VRChat group: https://vrchat.com/home/group/grp_f0481bfb-d6dd-4386-a13e-175f6b09ab0b ',
  },
  {
    question: 'What kind of events do you host?',
    answer: 'We host a variety of events, including game nights, workshops, social gatherings, contests.',
  },
  {
    question: 'How can I support Projekt Community?',
    answer: 'There are many ways to support us! You can participate in our events, spread the word, or support us through [mention Ko-fi, Patreon, etc. if applicable]. We appreciate all forms of support!',
  },
  {
    question: 'Who can I contact for business inquiries?',
    answer: 'For business inquiries, please email us at business@projektcommunity.com.',
  },
  {
    question: 'Who can I contact for support?',
    answer: 'If you need support or have any questions, please reach out to support@projektcommunity.com or ask in our Discord server.',
  },
];

const FAQPageContent = (): JSX.Element => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Frequently Asked Questions
      </Typography>
      {faqData.map((item, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <Typography variant="h6">{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

const FAQPage: React.FC = () => {
  useEffect(() => {
    document.title = "FAQ - Projekt Community";
  }, []);

  return Page(FAQPageContent);
};

export default FAQPage;
