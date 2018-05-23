const mongoose = require("mongoose")

if ( process.env.NODE_ENV !== 'production' ) {
    require("dotenv").config()
}

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = process.env.MONGODB_URI

mongoose.connect(url).then(
    ()=>{
        console.log("connected to mongoDB")},
     (err)=>{
         console.log("err",err);
     }
)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (process.argv.length === 2) {
    //console.log("no parameters")

    Person
    .find({})
    .then(result => {
      result.forEach(per => {
        console.log(per.name, per.number)
      })
      mongoose.connection.close()
    })

    return
}

if (process.argv.length !== 4) {
    console.log("ei kahta parametria!")
    return
}

const name = process.argv[2]
const number = process.argv[3]

const person = new Person({
    name: name,
    number: number
  })
  
  console.log("lisätään henkilö", name, "numero", number, "luetteloon")

   person
    .save()
    .then(response => {
      //console.log('person saved!')
      mongoose.connection.close()
    })



