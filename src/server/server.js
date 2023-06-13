import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express();
app.use('/assets', express.static(path.resolve(__dirname, "assets")));

app.get('*', async (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"))
})
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}!`)
});
