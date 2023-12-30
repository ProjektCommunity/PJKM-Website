import {
	Accordion as MuiAccordion,
	AccordionProps,
	AccordionDetails as MuiAccordionDetails,
	AccordionSummary as MuiAccordionSummary,
	AccordionSummaryProps,
	Box,
	Card,
	CardContent,
	CardHeader,
	Paper,
	Table,
	Typography,
	styled,
} from '@mui/material'

import { ArrowForwardIos as ArrowForwardIosSharpIcon } from '@mui/icons-material'
import { useState } from 'react'

const FAQData = [
	{
		Q: 'What is Projekt Community (PJKT: COM)?',
		A: `Projekt: Community is a virtual events organization focused on celebrating the power and creativity of the VR community. Throughout the year we will hold many events focused on different creative endeavors within the VR space, all culminating in our yearly community festival!`,
	},
	{
		Q: 'How can I get involved?',
		A: `Anyone can be involved just by joining our events and Discord and following other socials. If you would like to help with making these events happen, you can apply for open team positions through our ⁠team-applications channel.\nIf you are part of a community, you can encourage them to join our events as well as apply for booths and event slots during our main festival. We also like to work with communities for events throughout the year to showcase their strengths and what makes them so much fun!`,
	},
	{
		Q: 'When and where is the main event?',
		A: 'The main event this year was June 23rd, 2023 and was hosted in VRChat in our custom PJKT world. You can join in vr or desktop mode! Stay tuned for info on our next event!',
	},
	{
		Q: 'Will there be any other events?',
		A: ' We will do our best to host other events throughout the year much like our Graffiti Grab event!',
	},
	{
		Q: 'How do I get an event or booth in the festival?',
		A: `To get an event slot or booth you must simply fill out an application which can be found pinned in our ⁠announcements channel. If your community already has a representative in the Discord, your community is automatically accepted for a booth this year, but must still apply for events!`,
	},
	{
		Q: 'How do I keep up with information about events and sign-ups?',
		A: 'To keep up with events and information please follow all of our socials and be sure to keep notifications on in Discord.',
	},
	{
		Q: `I'm having trouble with something related to PJKT:COM, where do I go?`,
		A: `Please feel free to use our help desk threads channel on Discord for any needed assistance. This will help keep your conversation all in one place and will make sure a staff member sees it!.`,
	},
	{
		Q: 'What is a community representative?',
		A: 'A community representative is one person from your community who will be the main point of contact when we are planning events or have questions for you.',
	},
	{
		Q: 'How do I become a community representitive?',
		A: 'Please talk to a team lead or director for the role.',
	},
	{
		Q: 'What are the benefits of being a representative?',
		A: 'Representatives have their own section in the Discord where they can post suggestions, ask questions, and give more input on the events we run. Community reps are also given a chance to get their communities involved in the making of events before we invite the public.',
	},
	{
		Q: 'Are you affiliated with VRChat?',
		A: 'No, we are not affiliated with VRChat. We are a community run organization that celebrates the creativity of the VR community.',
	},
]

const Accordion = styled((props: AccordionProps) => (
	<MuiAccordion
		disableGutters
		elevation={0}
		square
		{...props}
	/>
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&:before': {
		display: 'none',
	},
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor:
		theme.palette.mode === 'dark'
			? 'rgba(255, 255, 255, .05)'
			: 'rgba(0, 0, 0, .03)',
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

export default function FAQ() {
	const [expanded, setExpanded] = useState<number | null>(null)
	return (
		<Box
			height='100%'
			flexGrow={1}
			display={'flex'}
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
		>
			<Box
				sx={{
					p: 2,
					height: '100%',
					justifyContent: 'center',
					alignContent: 'center',
				}}
			>
				<Typography
					variant='h2'
					fontFamily='Nerdfont'
					fontWeight='bold'
					textAlign='center'
				>
					Frequently Asked Questions
				</Typography>
			</Box>
			<Box
				sx={{
					p: 2,
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				{/* List of questions with fold down answers */}
				<Box
					sx={{
						p: 2,
						maxWidth: '50em',
						width: '100%',
					}}
				>
					{FAQData.map(({ Q, A }, i) => (
						<Accordion
							key={i}
							onChange={() => {
								setExpanded(expanded === i ? null : i)
							}}
							expanded={expanded === i}
							sx={{
								borderRadius: '1em',
							}}
						>
							<AccordionSummary>
								<Typography variant='h5'>{Q}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography variant='h6'>{A}</Typography>
							</AccordionDetails>
						</Accordion>
					))}
				</Box>
			</Box>
		</Box>
	)
}
