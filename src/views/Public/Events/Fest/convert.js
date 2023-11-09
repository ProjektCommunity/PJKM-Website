import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()
const convert = () => {
	const tsv = fs.readFileSync(
		path.join(
			__dirname,
			'PJKT 2023 Events Schedule (INTERNAL) - Sheet1.tsv'
		),
		'utf8'
	)

	// Convert the TSV to JSON with the header being on Line 4
	var curDate = ''
	const json = tsv
		.split('\n')
		.slice(4)
		.map((line) => {
			var [
				date,
				time,
				_1,
				name,
				_2,
				_3,
				marketing,
				_4,
				_5,
				eventType,
				_6,
				_7,
				venue,
			] = line.split('\t')
			if (name) {
				if (!date) date = curDate
				return {
					date,
					time,
					name,
					marketing,
					eventType,
					venue,
				}
			} else if (date) curDate = date
		})
		.filter((event) => event != undefined)
	// Write the JSON to a file
	fs.writeFileSync(
		path.join(__dirname, 'Events_Schedule.json'),
		JSON.stringify(json, null, 4),
		'utf8'
	)
}

convert()
