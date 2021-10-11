require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const expressApp = express()


expressApp.use(bodyParser.json());



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



//crud for categories

//create a categories , request method :post
expressApp.post('/categories', (req, res) => {
    categories.push(req.body)
    res.status(201).json(req.body);
})

//get all categories, request method : get 
expressApp.get('/categories', (req, res) => {
    res.status(200).json(categories);
})



//get categories by id , request method :Get
expressApp.get('/categories/:id', (req, res) => {
    let category = categories.find(user => user.id === parseInt(req.params.id));
    if (!category) res.status(404).send(`The category with the given id: ${req.params.id} is not found`);

    res.status(200).json(category)
})

//update categories by id , request method :put
expressApp.put('/categories/:id', (req, res) => {
    let categoryIndex = categories.findIndex((category) => category.id === parseInt(req.params.id));

    if (categoryIndex === -1) {
        res.status(404).json({
            error: `Sorry, category with the given id: ${req.params.id} was not found`
        })
    }

    // categories[categoryIndex] = req.body;
    categories[categoryIndex]["id"] = req.body.id;
    categories[categoryIndex]["title"] = req.body.title;
    categories[categoryIndex]["createdDate"] = req.body.createdDate;

    res.status(200).json(req.body);
})

//delete categories by id , request method : delete

expressApp.delete("/categories/:id", (req, res) => {
    let categoryIndex = categories.findIndex((category) => category.id === parseInt(req.params.id));

    if (categoryIndex === -1) {
        return res.status(404).json({
            error: `Sorry, category with the given id: ${req.params.id} was not found`
        });
    }
    categories.splice(categoryIndex, 1);
    res.status(200).send(`Sucessfully deleted category having id : ${req.params.id}`)
})







/* ------------------------------------------------------------------------------------------------------------------------------*/

let books = []; //id, title, description, categoryId, author, createdDate

//crud for books

//create a books , request method :post
expressApp.post('/books', (req, res) => {
    result = categories.find(category => category.id == req.body.categoryId)
    if (result) {
        books.push(req.body)
        res.status(201).json(req.body)
    } else {
        res.status(404).json({ message: `cannot find category id ${req.body.categoryId} ` })
    }
})

//get all books, request method : get 
expressApp.get('/books', (req, res) => {
    res.status(200).json(books);
})




//get books by id , request method :Get
expressApp.get('/books/:id', (req, res) => {
    let book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) res.status(404).send(`The book with the given id: ${req.params.id} is not found`);

    res.status(200).json(book)
})


//update books by id , request method :put
expressApp.put('/books/:id', (req, res) => {
    let bookIndex = books.findIndex((book) => book.id === parseInt(req.params.id));

    if (bookIndex === -1) {
        res.status(404).json({
            error: `Sorry, book with the given id: ${req.params.id} was not found`
        })
    }

    // books[bookIndex] = req.body;
    books[bookIndex]["name"] = req.body.name;
    books[bookIndex]["title"] = req.body.title;
    books[bookIndex]["description"] = req.body.description;
    books[bookIndex]["categoryId"] = req.body.categoryId;
    books[bookIndex]["createdDate"] = req.body.createdDate;

    res.status(200).json(req.body);

})


//delete books by id , request method : delete

expressApp.delete("/books/:id", (req, res) => {
    let bookIndex = books.findIndex((book) => book.id === parseInt(req.params.id));

    if (bookIndex === -1) {
        return res.status(404).json({
            error: `Sorry, book with the given id: ${req.params.id} was not found`
        });
    }
    books.splice(bookIndex, 1);
    res.status(200).send(`Sucessfully deleted book having id : ${req.params.id}`)



})









const port = process.env.PORT || 3000;
expressApp.listen(port, () => {
    console.log(`Server is running in the port ${port}`);
})