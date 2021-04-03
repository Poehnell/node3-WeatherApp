const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT ||3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tyler'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tyler Poehnell'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Welcome to the Help page where we will not help you',
        title: 'HELP?',
        name: 'Tyler Poe'
    })
})

//OLD WAY USING HTML-------------------------------
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })
//OLD WAY USING JSON--------------------------------
// app.get('/help', (req, res)=> {
//     res.send([{
//         name: 'Tyler',
//         age: 34
//     }, {
//         name: 'Sarah',
//         age: 30
//     }])
// })

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'Please input an address'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            res.send({ error })
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    res.send({error})
                }
                res.send({
                    location: location,
                    forecast: forecastData,
                    address: address
                })
            })
        }
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must search something!'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        msg: 'Nope no help for you',
        name: 'Tyler P'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        msg: 'NO page found',
        name: 'Tyler P'
    })
})

app.listen(port, () => {
    console.log('Server Started on port ' + port)
})