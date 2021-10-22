const express = require('express');
const routers = express.Router();



let categories = []; //id,title,createdDate



//crud for categories

//create a categories , request method :post
routers.post('/categories', (req, res) => {
    categories.push(req.body)
    res.status(201).json(req.body);
})

//get all categories, request method : get 
routers.get('/categories', (req, res) => {
    res.status(200).json(categories);
})



//get categories by id , request method :Get
routers.get('/categories/:id', (req, res) => {
    let category = categories.find(user => user.id === parseInt(req.params.id));
    if (!category) res.status(404).send(`The category with the given id: ${req.params.id} was not found`);

    res.status(200).json(category)
})

//update categories by id , request method :put
routers.put('/categories/:id', (req, res) => {
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
routers.delete("/categories/:id", (req, res) => {
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
routers.post('/books', (req, res) => {
    let result = categories.find(category => category.id == req.body.categoryId)

    let book = books.find(book => book.id === parseInt(req.body.id));

    if (result && !book) {
        books.push(req.body)
        res.status(201).json(req.body)
    } else if (book) {
        res.send(`book having id: ${req.body.categoryId} is already created`)
    } else {

        res.status(404).json({ message: `cannot find category id ${req.body.categoryId} ` })
    }
})

//get all books, request method : get 
routers.get('/books', (req, res) => {
    res.status(200).json(books);
})




//get books by id , request method :Get
routers.get('/books/:id', (req, res) => {
    let book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) res.status(404).send(`The book with the given id: ${req.params.id} is not found`);

    res.status(200).json(book)
})


//update books by id , request method :put
routers.put('/books/:id', (req, res) => {
    let bookIndex = books.findIndex((book) => book.id === parseInt(req.params.id));
    let checkCategory = categories.find(category => category.id == req.body.categoryId)




    if (bookIndex === -1) {
        res.status(404).json({
            error: `Sorry, book with the given id: ${req.params.id} was not found`
        })
    }

    if (!checkCategory) {
        res.status(404).json({ error: ` Sorry, category having id: ${req.body.categoryId} doesn't exist` })
    } else if (req.body.id != req.params.id) {
        res.status(404).json({ error: ` Sorry, you cannot change id ` })

    } else {
        // books[bookIndex] = req.body;
        books[bookIndex]["name"] = req.body.name;
        books[bookIndex]["title"] = req.body.title;
        books[bookIndex]["description"] = req.body.description;
        books[bookIndex]["categoryId"] = req.body.categoryId;
        books[bookIndex]["createdDate"] = req.body.createdDate;

        res.status(200).json(req.body);

    }



})


//delete books by id , request method : delete

routers.delete("/books/:id", (req, res) => {
    let bookIndex = books.findIndex((book) => book.id === parseInt(req.params.id));

    if (bookIndex === -1) {
        return res.status(404).json({
            error: `Sorry, book with the given id: ${req.params.id} was not found`
        });
    }
    books.splice(bookIndex, 1);
    res.status(200).send(`Sucessfully deleted book having id : ${req.params.id}`)



})



module.exports = routers