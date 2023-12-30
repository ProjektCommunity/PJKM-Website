import * as API from '../'
import GG from '@/assets/photos/Home/GraffitiGrab.png'
import Fest from '@/assets/photos/Home/PJKTFEST.png'
import Lenz from '@/assets/photos/Home/ProjektLenz.png'
import LenzPoster from '@/assets/photos/Events/Lenz.png'
import horrorcon from '@/assets/photos/Home/ProjektHorrorCon.png'

export async function getProjects(): Promise<API.Schedule[]> {
	// API not build yet. Fake API call
	return new Promise((res, reject) => {
		setTimeout(() => {
			res([
				{
					year: 2023,
					projects: [
						{
							name: 'Graffiti Grab',
							image: 'https://media.discordapp.net/attachments/1062043257531535360/1090692397903655104/graffitigrab-01-01-01.png?ex=655502f3&is=65428df3&hm=7f30f6680f5d4279840e10ce2e32a92e64ca40354ce45660227b8efd9dd92d97&=&width=811&height=456',
							buttonImg: GG.toLocaleString(),
							route: '',
							startDate: new Date('April 2, 2023 12:00 AM'),
							endDate: new Date('April 9, 2023 11:59 PM'),
							videoUrl:
								'https://www.youtube.com/watch?v=Fl2QYJO3z-8',
							EasterHunt: {
								description: `We're thrilled to have you join us for our exciting easter hunt by PJKT and in collaboration with Explore VRChat -A community for World Creators, Curators, and Explorers!\n\nStarting April 2nd, grab some friends and hunt down Easter eggs in 7 worlds for a chance to be entered into a raffle! There will be two winners chosen, with grand prize of $50 USD gift cards to each of the two winners for either Steam or Meta, winners' choice!`,
								worlds: [
									{
										name: 'Movie and Chill',
										link: 'https://vrchat.com/home/world/wrld_791ebf58-54ce-4d3a-a0a0-39f10e1b20b2',
									},
									{
										name: `Freddy's Custom Pizzaria`,
										link: 'https://vrchat.com/home/world/wrld_19150cfd-170b-4ca7-a32e-6ba0ae080c09',
									},
									{
										name: `Elite's Easter Hunt 2`,
										link: 'https://vrchat.com/home/world/wrld_ed0f2369-32cf-4c22-addf-955681322ff3',
									},
									{
										name: `THE_MALL`,
										link: 'https://vrchat.com/home/world/wrld_ede03628-4807-4e23-af0e-6d1e28c38895',
									},
									{
										name: `SLY FEST: AZURIA`,
										link: 'https://vrchat.com/home/world/wrld_f30cc3f2-49ff-4790-8df1-23a98665fdd0',
									},
									{
										name: 'Spirts of the Sea',
										link: 'https://vrchat.com/home/world/wrld_9da1349e-470b-47fd-a9b5-bd57d49255e2',
									},
									{
										name: 'JSR Festival Lite',
										link: 'https://vrchat.com/home/world/wrld_1e1bb472-6304-4ae6-b67f-74293a07947f',
									},
								],
								collaborations: [
									{
										name: 'Explore VRChat',
										link: 'https://discord.gg/XANAGXEJpn',
									},
								],
								raffle: {
									description: `Can you find all the eggs? If you do, then fill out the google form to join in the raffle where two winners will be chosen to win a $50 Steam or Meta gift card! Winners will be announced by ${new Date(
										'April 10, 2023 11:59:59 EST'
									).toLocaleDateString()}`,
									raffleLink:
										'https://docs.google.com/forms/d/e/1FAIpQLSef5kwny7cFCQ30hjSBY3BdyWgUNBv0upYAyFVHaO8KNpxcUg/viewform?embedded=true',
									winners: ['@moofycreates', '@unrealx_'],
								},
							},
						},
						{
							name: 'FEST',
							image: 'https://media.discordapp.net/attachments/1062043257531535360/1119390479813976147/PJKT_2023_Poster-01-_Compress_Twitter.jpg?ex=6557e69f&is=6545719f&hm=c1f24efcead891dc300d03e5e897a9217ece39c684a50e29fdad99cef883b569&=&width=409&height=614',
							buttonImg: Fest.toLocaleString(),
							route: '',
							startDate: new Date('2023-06-23T13:00:00-04:00'),
							endDate: new Date('2023-06-26T01:00:00-04:00'),
							videoUrl: [
								'https://www.youtube.com/watch?v=E6XKrZPFmXQ',
								'https://www.youtube.com/watch?v=iUomHABxZUo',
								'https://www.youtube.com/watch?v=gd6Ei7o9XEU',
								'https://www.youtube.com/watch?v=iGztI7TV2f8',
								'https://www.youtube.com/watch?v=xjPTgtx8uu4',
							],
							events: [
								{
									// June 23, 2023 1:00 PM EST
									event: 'Opening Ceremony',
									startDate: new Date(
										'June 23, 2023 1:00 PM EST'
									),
									endDate: new Date(
										'June 23, 2023 2:00 PM EST'
									),
									Description: '',
									eventType: '',
									venue: {
										name: 'PJKT Stage',
										link: '',
									},
									community: '',
									streamed: true,
									streamLink: 'PJKT',
									quest: false,
								},
								{
									// June 23, 2023 2:00 PM EST to 4:00 PM EST
									startDate: new Date(
										'June 23, 2023 2:00 PM EST'
									),
									endDate: new Date(
										'June 23, 2023 4:00 PM EST'
									),
									event: 'Artifex Performance',
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1121860354218147890/Artifex_Poster_ft_PJKTCOM.png?ex=659841df&is=6585ccdf&hm=f9fb9ac8f2208e03f365f0644aab40f21f8adf5c147714534da2b53d07520ea2&=&format=webp&quality=lossless&width=245&height=671',
									Description: '',
									eventType: 'Theater/Live Performance',
									venue: {
										name: 'PJKT Stage',
										link: '',
									},
									community: 'Onetwostep',
									streamed: true,
									streamLink: 'PJKT',
									quest: false,
								},
								{
									// June 23, 2023 4:30 PM EST to 5:30 PM EST
									event: "Skits'N'Bits Improv Show",
									startDate: new Date(
										'June 23, 2023 4:30 PM EST'
									),
									endDate: new Date(
										'June 23, 2023 5:30 PM EST'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1121899801701781615/Improv_Show.png?ex=6598669c&is=6585f19c&hm=c46dbad1a27f497af0c63906833ed5e6b5525be1c3e040ad9033947f73d2216e&=&format=webp&quality=lossless&width=1311&height=671',
									Description:
										"Come let Skits'N'Bits bring you to laughter with our skilled cast of improvisors with games and scenes inspired by your suggestions!",
									eventType: 'Theater/Live Performance',
									venue: {
										name: "Skits 'n' Bits Theatre",
										link: '',
									},
									community: 'Walgesicht',
									streamed: true,
									streamLink: 'PJKT',
									quest: true,
								},
								{
									// June 23, 2023 6:00 PM EST to 7:00 PM EST
									event: 'Inter-Community VR PvP event',
									startDate: new Date(
										'June 23, 2023 6:00 PM EST'
									),
									endDate: new Date(
										'June 23, 2023 7:00 PM EST'
									),
									Description:
										'Come join the largest-scale PVP battle ever seen at a VR convention! Join up with members of the Death Korps of VR, Dalek HQ, United Republic and Blood Ravens as we show off our communities and what we do. Join our open instance whether you prefer to watch as a spectator, join the battle or a combination of both. Hopefully, join one of the communities and make some new friends. ',
									eventType: 'Other',
									venue: {
										name: 'Chosin Outpost',
										link: '',
									},
									community: 'TransformX2',
									streamed: true,
									streamLink: 'PJKT',
									quest: false,
								},
								{
									// June 23, 2023 8:00 PM EST to 10:00 PM EST
									event: 'Explore VRChat World Hop',
									startDate: new Date(
										'June 23, 2023 8:00 PM EST'
									),
									endDate: new Date(
										'June 23, 2023 10:00 PM EST'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1121951339644203078/Explore_VRChat.jpg?ex=6598969c&is=6586219c&hm=8ece0c7f30a89e0cfd13291df05fed5eb159dbc83d737aa4a18bb6e93f7b9f92&=&format=webp',
									Description: '',
									eventType: 'Other',
									community: 'Rickity',
									streamed: false,
									streamLink: '',
									quest: false,
								},
								{
									// June 23, 2023 11:00 PM EST to 2:00 AM EST next day
									event: 'TAB Secret Solvers Game Nights',
									startDate: new Date(
										'June 23, 2023 11:00 PM EST'
									),
									endDate: new Date(
										'June 24, 2023 2:00 AM EST'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1121994401607069696/TABSS_GAME_NIGHT_PJKT_VERTICAL.png?ex=6598beb6&is=658649b6&hm=844eda4678637ddbaaa5d64c06a70653f851bdb9f569b5a1d8901714b9e8c293&=&format=webp&quality=lossless&width=377&height=670',
									Description:
										'Come Hang out With VRChat Investigative Team TAB Secret Solvers, meet the crew and play some Games!',
									eventType: 'Other',
									venue: {
										name: 'TAB Secret Solvers HQ',
										link: '',
									},
									community: 'NovedPlayer',
									streamed: true,
									streamLink: 'PJKT',
									quest: true,
								},
								{
									event: 'Behind the Scenes with the LPD',
									startDate: new Date(
										'June 24, 2023 10:00 AM EST'
									),
									endDate: new Date(
										'June 24, 2023 11:30 AM EST'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1122162274837209089/Fpboox_XEBwxi_e.jpg?ex=65995b0f&is=6586e60f&hm=e4574f22663cfaee76030829096200057085d8e2fb2aa8ef84039e44644505ef&=&format=webp',
									Description:
										'Please join us for a behind-the-scenes view of the LPD! We will explore the station, including the back rooms that are normally exclusive to officers. You will also have the opportunity to observe an average day in the life of an LPD officer.',
									eventType: 'Other',
									venue: {
										name: 'LPD Stage',
										link: '',
									},
									community: 'LPD',
									streamed: false,
									streamLink: '',
									quest: true,
								},
								{
									// June 24, 2023 12:00 pmm EST to 3:00 pm EST
									event: 'Avi Wars Tournament',
									startDate: new Date(
										'June 24, 2023 12:00 PM EST'
									),
									endDate: new Date(
										'June 24, 2023 3:00 PM EST'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1122194615706079232/Avi_Wars_Tournament_PJKT.png?ex=6599792d&is=6587042d&hm=1cab767c6e54a65e9ba6c2df172de25686970fb42c5438b52f9376b6fb983473&=&format=webp&quality=lossless&width=1193&height=671',
									Description:
										'Show your skills (or luck) in this turnbased PVP game based on the old Worms games.',
									eventType: 'Sports/Tournaments',
									venue: {
										name: 'Avi Wars',
										link: '',
									},
									community: 'xCirrex',
									streamed: true,
									streamLink: 'https://www.twitch.tv/xcirrex',
									quest: false,
								},
								{
									// June 24, 2023 3:30 PM EST to 4:30 PM EST
									event: "Skits'N'Bits Improv Workshop",
									startDate: new Date(
										'June 24, 2023 3:30 PM EST'
									),
									endDate: new Date(
										'June 24, 2023 4:30 PM EST'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1122245776861560872/Improv_Workshop.png?ex=6599a8d3&is=658733d3&hm=b740f6eafa5cfd6e81a6f06a876c65bf1e8c594289d05e5ec375493a190c7985&=&format=webp&quality=lossless&width=377&height=670',
									Description:
										'An improv workshop open to all skill levels! Get a taste for what our weekly workshops are like or get a chance to flex your improv muscles once again!',
									eventType: 'Class/Workshop',
									venue: {
										name: "Skits 'n' Bits Theatre",
										link: '',
									},
									community: 'Walgesicht',
									streamed: false,
									streamLink: '',
									quest: true,
								},
								{
									// June 24, 2023 6:00 PM EST to 9:00 PM EST
									event: 'TVRS Comedy Show',
									startDate: new Date(
										'June 24, 2023 6:00 PM EST'
									),
									endDate: new Date(
										'June 24, 2023 9:00 PM EST'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1122285200349614241/comedy_night_poster2.png?ex=6599cd8a&is=6587588a&hm=5ce599ccd762db059646f6912108a78f66cedf625a278fffe300ea1ce64a98a0&=&format=webp&quality=lossless&width=497&height=671',
									Description:
										"This Saturday June 24th at 6 PM EST, join us in The Virtual Reality Show's Studio for the first edition of their Comedy Show! Featuring Professional Comedians and clean Comedy all is welcome to come in for a laugh! Big Shout out to TVRS And FailedToRender for this collaboration! ",
									eventType: 'Theater/Live Performance',
									venue: {
										name: 'TVRS Studio',
										link: '',
									},
									community: 'Gobit',
									streamed: true,
									streamLink:
										'https://www.twitch.tv/thevirtualrealityshow',
									quest: false,
								},
								{
									// June 24, 2023 10:00 PM EST to 12:00 AM EST
									event: 'Daily Life of a Soldier',
									startDate: new Date(
										'June 24, 2023 10:00 PM EST'
									),
									endDate: new Date(
										'June 25, 2023 12:00 AM EST'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1122342306616447086/WwPjktComEvent.png?ex=659a02ba&is=65878dba&hm=fbdb671eea870fc2c6ea567fddaf26fdff944a3a3553896a2d7edd9879ec6d65&=&format=webp&quality=lossless&width=474&height=671',
									Description:
										'The life of a solider is a life and world of it own! Come on in, check it out and join in the fun!',
									eventType: 'Class/Workshop',
									venue: {
										name: 'Graf Zeppelin Base',
										link: '',
									},
									community: 'Hølly',
									streamed: true,
									streamLink: 'PJKT',
									quest: false,
								},
								{
									event: 'RP Workshop - Kochō no Boss Rush',
									startDate: new Date(
										'June 25, 2023 9:00 AM EST'
									),
									endDate: new Date(
										'June 25, 2023 10:30 AM EST'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1122511018766123059/TwitterLogoYakuza.png?ex=659a9fda&is=65882ada&hm=ff17ee1c060e575dcbcd92e7c6b6ebbbf243de9c8f177a96b39c8dc3f29f8c3e&=&format=webp&quality=lossless',
									Description:
										'"Kochō no Boss Rush" is an immersive roleplay event organized by the community Kochō no Yakuza. The event aims to engage and train the public in the art of fighting and roleplaying, specifically centered around epic boss encounters we usually have within the community. It offers participants a unique opportunity to learn combat techniques, enhance their roleplaying skills, and then put their newly acquired abilities to the test in a thrilling boss scenario.',
									eventType: 'Class/Workshop',
									venue: {
										name: '',
										link: '',
									},
									community: 'Euky',
									streamed: true,
									streamLink: 'PJKT',
									quest: false,
								},
								{
									event: 'Pool event',
									startDate: new Date(
										'June 25, 2023 12:00 PM EST'
									),
									endDate: new Date(
										'June 25, 2023 2:00 PM EST'
									),
									Description: '',
									eventType: 'Other',
									venue: {
										name: '',
										link: '',
									},
									community: '',
									streamed: false,
									streamLink: '',
									quest: false,
								},
								{
									event: '"Attack On Kamino"',
									startDate: new Date(
										'June 25, 2023 3:00 PM EST'
									),
									endDate: new Date(
										'June 25, 2023 4:30 PM EST'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1122602571140431932/VRChat_2023-06-13_23-43-47.png?ex=659af51d&is=6588801d&hm=71f0d93af044dff90dcd14a4080c8958a047bfce836498d4533bfda16208824e&=&format=webp&quality=lossless&width=1193&height=671',
									Description:
										'The Home world of the clones Is under invasion by the separatists and Is ready to hold back the siege and protect their home what ever It takes. This event Will be an avatar pvp operation battle for all of those who love star wars and want to immerse themselves in the heat of battle.',
									eventType: 'Other',
									venue: {
										name: 'Star Wars˸ BF2 2005 Kamino',
										link: '',
									},
									community: 'KoreFuze',
									streamed: true,
									streamLink: 'PJKT',
									quest: false,
								},
								{
									event: 'AMA with Ugandan Knuckles',
									startDate: new Date(
										'June 25, 2023 5:00 PM EST'
									),
									endDate: new Date(
										'June 25, 2023 6:00 PM EST'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1122632687409188884/image.png?ex=659b112a&is=65889c2a&hm=c025ef63514ec0c88d392cd10e84e4ccab8fe8323a0866da589b22b66e89933d&=&format=webp&quality=lossless&width=377&height=670',
									Description:
										'We will be learning about the Ugandan Knuckles lore and be taking questions.',
									eventType: 'Panel/Talk',
									venue: {
										name: 'Uganda',
										link: '',
									},
									community: 'Legoman99573',
									streamed: true,
									streamLink: 'PJKT',
									quest: true,
								},
								{
									event: 'Campfire stories',
									startDate: new Date(
										'June 25, 2023 7:00 PM EST'
									),
									endDate: new Date(
										'June 25, 2023 8:00 PM EST'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1122660842958237736/Campfire_stories.png?ex=659b2b62&is=6588b662&hm=882c7fb9c460695a1891767a8316cfb80ed46bcb8a8480de0c53a4680b1b3c22&=&format=webp&quality=lossless&width=1193&height=671',
									Description: '',
									eventType: 'Other',
									venue: {
										name: '',
										link: '',
									},
									community: '',
									streamed: false,
									streamLink: '',
									quest: false,
								},
								{
									event: 'Closing Ceremony',
									startDate: new Date(
										'June 25, 2023 9:00 PM EST'
									),
									endDate: new Date(
										'June 25, 2023 10:00 PM EST'
									),
									image: '',
									Description: '',
									eventType: '',
									venue: {
										name: 'PJKT Stage',
										link: '',
									},
									community: '',
									streamed: true,
									streamLink: 'PJKT',
									quest: false,
								},
								{
									event: 'After Party',
									startDate: new Date(
										'June 25, 2023 10:00 PM EST'
									),
									endDate: new Date(
										'June 26, 2023 1:00 AM EST'
									),
									Description: '',
									eventType: '',
									venue: {
										name: '',
										link: '',
									},
									community: '',
									streamed: false,
									streamLink: '',
									quest: false,
								},
							],
						},
						{
							name: 'Lenz',
							image: LenzPoster,
							buttonImg: Lenz.toLocaleString(),
							route: '',
							startDate: new Date('September 29, 2023 12:00 AM'),
							endDate: new Date('October 1, 2023 11:59 PM'),
							videoUrl: [
								'https://www.youtube.com/watch?v=OTcdCA07shs',
								'https://www.youtube.com/watch?v=t6AQ5ItVB_U',
							],
						},
						{
							name: 'HorrorCon',
							image: 'https://media.discordapp.net/attachments/1063954825219424297/1159951012539420713/pjkthorrorconskeleposter.png?ex=6557cd90&is=65455890&hm=7cd02f381575cf35bfa33f4d2e604807831b5d55daf80ea7b7af042e828223ea&=&width=345&height=613',
							buttonImg: horrorcon.toLocaleString(),
							videoUrl:
								'https://www.youtube.com/watch?v=f9vyh5gKQrA',
							route: '',
							startDate: new Date(
								'October 28, 2023 12:00 PM PDT'
							),
							endDate: new Date('October 30, 2023 12:00 AM PDT'),
							events: [
								{
									event: 'Tarot Card Reading w/ Incognootle & Madame Macabre',
									startDate: new Date(
										'October 28, 2023 12:00 PM PDT'
									),
									endDate: new Date(
										'October 28, 2023 1:00 PM PDT'
									),
									venue: {
										name: 'PJKT˸ Horrorcon 2023',
										link: 'https://vrchat.com/home/world/wrld_50b4b9a8-c5d1-428c-93d5-9193da64bc47',
									},
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1167899527320174614/Tarot_Reading_Poster.png?ex=6599a231&is=65872d31&hm=6fdf30aa63518cbbcb071a5d6093bbefcc9da751f7e1adee5c761b8778907236&=&format=webp&quality=lossless&width=503&height=671',
									quest: true,
								},
								{
									event: "Joker's Wild W/ Murphy",
									startDate: new Date(
										'October 28, 2023 1:30 PM PDT'
									),
									endDate: new Date(
										'October 28, 2023 2:30 PM PDT'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1167920304639709256/posters_JokersWild_1.png?ex=6599b58b&is=6587408b&hm=4b0148e1909bd9b3c565b0701dc53f1b9698618e6a2a44dacbf685c6e74d9264&=&format=webp&quality=lossless&width=537&height=671',
									venue: {
										name: 'PJKT˸ Horrorcon 2023',
										link: 'https://vrchat.com/home/world/wrld_50b4b9a8-c5d1-428c-93d5-9193da64bc47',
									},
									quest: true,
								},
								{
									event: "Skits'N'Bits Improv Show",
									startDate: new Date(
										'October 28, 2023 3:00 PM PDT'
									),
									endDate: new Date(
										'October 28, 2023 4:00 PM PDT'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1167944566637346856/promoposter3.png?ex=6599cc24&is=65875724&hm=b4063863aa5298ef3764e602ad60765c4bca0770152e5ea25428f0ab82295d94&=&format=webp&quality=lossless&width=503&height=671',
									venue: {
										name: "Skits 'n' Bits Theatre (18+)",
										link: 'https://vrchat.com/home/world/wrld_dbf2dee1-26de-4fc0-892d-1338b88636ab',
									},
									quest: true,
								},
								{
									event: 'D&D Panel w/ CasualCap',
									startDate: new Date(
										'October 28, 2023 4:30 PM PDT'
									),
									endDate: new Date(
										'October 28, 2023 5:30 PM PDT'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1167966791633477773/horror_con_vert.png?ex=6599e0d6&is=65876bd6&hm=9748d062de1dc6431e488db9ad9baa2b340a36dd37d370fd46a9ffcf8029cfec&=&format=webp&quality=lossless&width=366&height=671',
									venue: {
										name: 'PJKT˸ Horrorcon 2023',
										link: 'https://vrchat.com/home/world/wrld_50b4b9a8-c5d1-428c-93d5-9193da64bc47',
									},
									quest: true,
								},
								{
									event: 'Avatar Costume Contest',
									startDate: new Date(
										'October 28, 2023 6:00 PM PDT'
									),
									endDate: new Date(
										'October 28, 2023 7:00 PM PDT'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1167991570650374224/IMG_6265.png?ex=6599f7ea&is=658782ea&hm=435474a4193e3fe80e02a832cd7cab1c9d91e7a4810b0f3e4663b20bb53c666c&=&format=webp&quality=lossless&width=475&height=671',
									venue: {
										name: 'PJKT˸ Horrorcon 2023',
										link: 'https://vrchat.com/home/world/wrld_50b4b9a8-c5d1-428c-93d5-9193da64bc47',
									},
									quest: true,
								},
								{
									event: 'Story Time w/ MrCreepyPasta',
									startDate: new Date(
										'October 28, 2023 7:30 PM PDT'
									),
									endDate: new Date(
										'October 28, 2023 8:30 PM PDT'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1168013932867362926/image0_1.png?ex=659a0cbe&is=658797be&hm=7dd8e817a30cf136c09d74f205ffd29610cabcb983bd4109e364a2baea84ed6a&=&format=webp&quality=lossless&width=671&height=671',
									venue: {
										name: 'PJKT˸ Horrorcon 2023',
										link: 'https://vrchat.com/home/world/wrld_50b4b9a8-c5d1-428c-93d5-9193da64bc47',
									},
									quest: true,
								},
								{
									event: "Rave: DJ'd by RobRomansVoice, Odyssey Eurobeat, Taffa, Creep-P, onumi, and YZX b2b z0mb0t",
									startDate: new Date(
										'October 28, 2023 9:30 PM PDT'
									),
									endDate: new Date(
										'October 29, 2023 1:30 AM PDT'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1168042999784165506/horrorvr_poster.png?ex=659a27d0&is=6587b2d0&hm=1f3142ae2794976d441f59794262b32aea09a7c71d42c569514cbd4f6c21a1ac&=&format=webp&quality=lossless&width=537&height=671',
									quest: true,
								},
								{
									event: 'Horror Feud w/ Murphy',
									startDate: new Date(
										'October 29, 2023 12:00 PM PDT'
									),
									endDate: new Date(
										'October 29, 2023 1:00 PM PDT'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1168260954849558618/posters_HorrorFeud_1.png?ex=659af2cc&is=65887dcc&hm=83c954892c04474136c34c8ac7a76df03ded002c5b4c400d76d6e7f76cf438ea&=&format=webp&quality=lossless&width=537&height=671',
									venue: {
										name: 'PJKT˸ Horrorcon 2023',
										link: 'https://vrchat.com/home/world/wrld_50b4b9a8-c5d1-428c-93d5-9193da64bc47',
									},
									quest: true,
								},
								{
									event: 'SPooky Stories w/ Spoken Heart',
									startDate: new Date(
										'October 29, 2023 1:30 PM PDT'
									),
									endDate: new Date(
										'October 29, 2023 2:30 PM PDT'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1168283740108247181/Spokenheart.png?ex=659b0805&is=65889305&hm=c0869b32e935a2b042a3c7e42ce753b760799c553b34fe1401270daeaf1b9963&=&format=webp&quality=lossless&width=377&height=670',
									venue: {
										name: 'PJKT˸ Horrorcon 2023',
										link: 'https://vrchat.com/home/world/wrld_50b4b9a8-c5d1-428c-93d5-9193da64bc47',
									},
									quest: true,
								},
								{
									event: 'JosHosh Adventures',
									startDate: new Date(
										'October 29, 2023 3:00 PM PDT'
									),
									endDate: new Date(
										'October 29, 2023 4:00 PM PDT'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1168307230727229560/horrorPosters-06.png?ex=659b1de5&is=6588a8e5&hm=6559b348af534e28bb0a72569cb1b0bb58fb1b2b79812fad8e1f13a198c95349&=&format=webp&quality=lossless&width=519&height=671',
									venue: {
										name: 'LittleFoot Campfire',
										link: 'https://vrchat.com/home/world/wrld_a3c0ff6b-bc03-4c79-8c46-ef20f8178225',
									},
									quest: true,
								},
								{
									event: 'Snakes Paw Podcast',
									startDate: new Date(
										'October 29, 2023 4:30 PM PDT'
									),
									endDate: new Date(
										'October 29, 2023 5:30 PM PDT'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1168329207928082552/horrorPosters-05.png?ex=659b325d&is=6588bd5d&hm=130d996fb650d989072c8867d6096c08e17529279c8c4ff5bd0047ba34b19562&=&format=webp&quality=lossless&width=671&height=671',
									venue: {
										name: 'PJKT˸ Horrorcon 2023',
										link: 'https://vrchat.com/home/world/wrld_50b4b9a8-c5d1-428c-93d5-9193da64bc47',
									},
									quest: true,
								},
								{
									event: 'A Night on Endor w/ United Republic',
									startDate: new Date(
										'October 29, 2023 6:00 PM PDT'
									),
									endDate: new Date(
										'October 29, 2023 7:00 PM PDT'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1168358309603069982/PJKT_Ewok_Hunt_Ad_2.png?ex=659b4d78&is=6588d878&hm=1b9c1cf7b06885055cf7d969d849c671de5e6847c5049e3c20f7d346bb8b697f&=&format=webp&quality=lossless&width=1193&height=671',
									venue: {
										name: 'PJKT˸ Horrorcon 2023',
										link: 'https://vrchat.com/home/world/wrld_50b4b9a8-c5d1-428c-93d5-9193da64bc47',
									},
									quest: true,
								},
								{
									event: 'HorrorCon VR Admin Panel',
									startDate: new Date(
										'October 29, 2023 7:30 PM PDT'
									),
									endDate: new Date(
										'October 29, 2023 8:30 PM PDT'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1168377851511324754/image0_1.png?ex=659b5fab&is=6588eaab&hm=a070d21f86f84527d2d9b9bf1464f1628a8dafd8fec9d48c81dfc1227db4b478&=&format=webp&quality=lossless&width=671&height=671',
									venue: {
										name: 'PJKT˸ Horrorcon 2023',
										link: 'https://vrchat.com/home/world/wrld_50b4b9a8-c5d1-428c-93d5-9193da64bc47',
									},
									quest: true,
								},
								{
									event: 'Artifex Concert',
									startDate: new Date(
										'October 29, 2023 8:30 PM PDT'
									),
									endDate: new Date(
										'October 30, 2023 12:00 AM PDT'
									),
									image: 'https://media.discordapp.net/attachments/1062043257531535360/1168393561176293386/Concert.png?ex=659b6e4c&is=6588f94c&hm=83ba4e4e2787d274210440b2c9e7a29b61880396a362b336c1ca1e9ac7159eaa&=&format=webp&quality=lossless&width=437&height=671',
									venue: {
										name: "llama's cave",
										link: 'https://vrchat.com/home/world/wrld_9dd89483-e609-459f-89f1-5a368f82d2dc',
									},
									quest: false,
								},
							],
						},
					],
				},
			])
		})
	})
}
