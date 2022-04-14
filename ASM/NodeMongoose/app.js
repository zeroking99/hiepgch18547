const express = require('express')
const Product = require('./models/Product')
const mongoose = require('mongoose')

const app = express()
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


app.post('/edit', async(req, res) => {
    const id = req.body.id
    const name = req.body.txtName
    const color = req.body.txtColor
    const price = req.body.txtPrice
    const picURL = req.body.txtPic

    //await Product.updateOne({'_id':id},{$set: {'name':name,'price':price,'picURL':picURL}})
    var prod = await Product.findById(id)
    prod.name = name
    prod.color = color
    prod.price = price
    prod.picURL = picURL
    prod.save((err) => {
        if (!err)
            console.log("Ok")
        res.redirect("/viewAll")
    })
})

app.get('/edit', async(req, res) => {
    const id = req.query.id
    const prod = await Product.findById(id)

    res.render('edit', { 'product': prod })
})

app.get('/', async(req, res) => {

    var page = req.query.page

    if (page == 1) {
        const query = await Product.find().limit(3)
        res.render('home', { 'products': query })
    } else if (page == 2) {

        const query = await Product.find().skip(3).limit(3)
        res.render('home', { 'products': query })
    } else {
        const query = await Product.find()
        res.render('home', { 'products': query })
    }

    res.render('home')

})

app.get('/newProduct', (req, res) => {
    res.render('newProduct')
})
app.post('/search', async(req, res) => {
    const searchText = req.body.txtSearch
    const query = await Product.find({ 'name': searchText })
    res.render('home', { 'products': query })
})
app.get('/delete', async(req, res) => {
    const id = req.query.id
    await Product.deleteOne({ '_id': id })
    res.redirect('/viewAll')
})

app.get('/viewAll', async(req, res) => {
    var page = req.query.page

    if (page == 1) {
        const query = await Product.find().limit(3)
        res.render('allProduct', { 'products': query })
    } else if (page == 2) {
        //bo qua 5 ban ghi dau tien, lay 5 ban ghi tiep theo
        const query = await Product.find().skip(3).limit(3)
        res.render('allProduct', { 'products': query })
    } else {
        const query = await Product.find()
        res.render('allProduct', { 'products': query })
    }
})

app.post('/newProduct', async(req, res) => {
    const name = req.body.txtName
    const color = req.body.txtColor
    const price = req.body.txtPrice
    const picURL = req.body.txtPic

    const productEntity = new Product({ 'name': name, 'color': color, 'price': price, 'picURL': picURL })
    await productEntity.save()
    res.redirect('/')


})

const PORT = process.env.PORT || 5000

app.listen(PORT)
console.log("Server is running!")