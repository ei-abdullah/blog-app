import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set('view engine', 'ejs');

const extractBlogData = (req) => {
    const blogData = {
        name: req.body["writer-name"] || "",
        gender: req.body["writer-gender"] || "",
        blog: req.body["writer-blog"] || ""
    }
    return blogData;
}

app.get("/", (req, res) => {
    res.render("index.ejs", { blogData: {} })
})

app.post("/writeblog", (req, res) => {
    res.render("write-blog.ejs", { blogData: {} })
})

app.post("/submitblog", (req, res) => {
    const blogData = extractBlogData(req)
    res.render("index.ejs", { blogData });
})

app.post("/editblog", (req, res) => {
    const blogData = extractBlogData(req)

    res.render("write-blog.ejs", { blogData })
})

app.post("/deleteblog", (req, res) => {
    res.render("index.ejs", { blogData: {} })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

