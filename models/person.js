const mongoose = require("mongoose")

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = "mongodb://fullstack:sekred@ds231460.mlab.com:31460/fullstack-persons"

mongoose.connect(url).then(
    () => {
        console.log("connected to mongoDB")},
    (err) => {
        console.log("err",err)
    }
)

const Person = mongoose.model("Person", {
    name: String,
    number: String
})

module.exports = Person