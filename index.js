const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

app.use(bodyParser.json())
//app.use(morgan('tiny'))
app.use(morgan(':method :url :body status :status :response-time ms'))


let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
  ]
  
  app.get('/info', (req, res) => {
    const info = 'puhelinluettelossa ' + persons.length + ' henkilön tiedot' + '<br/>'
    + new Date()
    //res.send('<h1>Hello World!</h1>')
    res.send(info)
  })
  
  app.get('/persons', (req, res) => {
    console.log("persons: ",persons)
    res.json(persons)
  })

  app.get('/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)

   // console.log(note)
  
    if ( person ) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log("delete ", id)
    const exists = persons.map(per => per.id).includes(id)
    //notes = persons.filter(person => person.id !== id)
    console.log("exists: ", exists)

    if (exists === false) {
      return response.status(404).end()
    }
    //persons.splice(index, 1)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    //const maxId = persons.length > 0 ? persons.map(n => n.id).sort().reverse()[0] : 1
    //return maxId + 1
    return Math.floor(Math.random() * Math.floor(100));
  }
  
  app.post('/persons', (request, response) => {
    const body = request.body
  
   if (body.name === undefined) {
      return response.status(400).json({error: 'name missing'})
    } else if (body.number === undefined) {
      return response.status(400).json({error: 'number missing'})
    }
    
    const exists = persons.map(per => per.name).includes(body.name)

    if (exists === true) {
      return response.status(400).json({error: 'name must be unique'})
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
    console.log("Creating person ", person)
  
    persons = persons.concat(person)
  
    response.json(person)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })