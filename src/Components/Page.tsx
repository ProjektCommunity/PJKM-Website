import Header from '@/Components/HeaderFooter/Header'

export default function Page(PageToShow: () => JSX.Element) {
	return (
		<Header>
			<PageToShow />
		</Header>
	)
}
