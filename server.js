import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'
import { exec } from 'child_process'
const app = express()
config()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 9000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function os_func() {
	this.execCommand = function (cmd, callback) {
		console.log("Rebuilding Website...")
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`)
				return
			}

			callback(stdout)
		})
	}
}

var os = new os_func()

os.execCommand('npm i && npm run build', () => {
	app.use(express.static(path.join(__dirname, 'dist')))

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'dist', 'index.html'))
	})

	app.listen(port, host, async () => {
		if (host != "localhost")
			console.log(`Listening at https://${process.env.VITE_BRANCH == 'DEVELOPMENT' ? 'www_beta' : 'www'}.projektcommunity.com | (${host}:${port})`)
		else
			console.log(`Listening at http://${host}:${port}`)
	})
})