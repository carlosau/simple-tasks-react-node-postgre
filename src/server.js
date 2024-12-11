const express = require("express")
const todosRoutes = require("./todos-routes")
const app = express()

app.use(express.json())

app.get("/health", (req, res) => {
    return res.json("up")
})

app.listen(3333, () => console.log("Server is up in 3333"))