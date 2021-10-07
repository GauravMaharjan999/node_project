require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express()



let categories = [{
        "id": 1,
        "title": "action",
        "createdDate": "1-jan-2021"
    },
    {
        "id": 2,
        "title": "historic",
        "createdDate": "2-jan-2021"
    }
]; //id,title,createdDate

app.use(bodyParser.json());

//crud for categories

//get all categories, request method : get 
app.get('/categories', (req, res) => {
    res.json(categories);
})

//create a categories , request method :post
app.post('/categories', (req, res) => {
    categories.push(req.body)
    res.status(201).json(req.body)
})

//get categories by id , request method :Get
app.get('/categories/:id', (req, res) => {
    let category = categories.find(user => user.id === parseInt(req.params.id));
    if (!category) res.status(404).send(`The category with the given id: ${req.params.id} is not found`);

    res.json(category)
})







/* ------------------------------------------------------------------------------------------------------------------------------*/

let books = []; //id, title, description, categoryId, author, createdDate

//crud for books

//get all books, request method : get 
app.get('/books', (req, res) => {
    res.json(books);
})

//create a books , request method :post
app.post('/books', (req, res) => {
    result = categories.find(category => category.id == req.body.categoryId)
    console.log("the output is ", result)
    if (result) {
        books.push(req.body)
        res.status(201).json(req.body)
    } else {
        res.status(404).json({ message: `cannot find category id ${req.body.categoryId} ` })
    }

    //get books by id , request method :Get
    app.get('/books/:id', (req, res) => {
        let book = books.find(book => book.id === parseInt(req.params.id));
        if (!book) res.status(404).send(`The book with the given id: ${req.params.id} is not found`);

        res.json(book)
    })

})







const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running in the port ${port}`);
})