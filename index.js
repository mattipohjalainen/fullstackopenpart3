const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

const app = express()
app.use(express.static("build"))
morgan.token("body", function getBody(req) {
    return JSON.stringify(req.body)
})
app.use(cors())
app.use(bodyParser.json())
//app.use(morgan('tiny'))
app.use(morgan(":method :url :body status :status :response-time ms"))

const formatPerson = per => {
    return {
        name: per.name,
        number: per.number,
        id: per._id
    }
}

app.get("/api/info", (req, res) => {
    console.log("kysytään lukumäärää...")
    Person.count({}).then(count => {
        console.log("saatiin numero", count)
        const info =
            "puhelinluettelossa " + count + " henkilön tiedot" + "<br/>" + new Date()
        res.send(info)
    })
})

app.get("/api/persons", (req, res) => {
    console.log("GETting persons...")
    Person.find({})
        .then(persons => {
            res.json(persons.map(formatPerson))
        })
        .catch(error => {
            console.log(error)
            res.status(404).end()
        })
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    console.log(id)

    Person.findById(id)
        .then(foundPerson => {
            if (foundPerson) {
                console.log("person found")
                response.json(formatPerson(foundPerson))
            } else {
                console.log("person not found by id, id")
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: "malformatted id" })
        })
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    console.log("delete ", id)

    Person.findByIdAndRemove(id)
        .then(console.log("removed person by id".id))
        .catch(error => {
            console.log(error)
        })

    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: "name missing" })
    } else if (body.number === undefined) {
        return response.status(400).json({ error: "number missing" })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    console.log("Creating person ", person)

    person.save().then(savedPerson => {
        response.json(formatPerson(savedPerson)).catch(error => {
            console.log(error)
        })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
