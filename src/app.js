const expr = require('express');
const path1 = require('path');
const hbs = require('hbs');
const fs = require('fs');
const myApp = expr ();
const geocode = require('./myutils/geocode');
const weatherReport = require('./myutils/forecast');
//const forecast = require('./myutils/forecast')

//setting up path for express config after changing views to templates
const viewspath = path1.join(__dirname, '../templates/views');
myApp.set('views', viewspath);   //setup handlebar views

//set partials path for express config
const partialspath = path1.join(__dirname, '../templates/partials');
hbs.registerPartials(partialspath);    // registering partials


///////////////////////--static--//////////////////////////////

myApp.get ('/home', (req, res) => {
    res.send('Express Application', {
        title: 'Home',
        designed_by: 'Sunny'
    });
})


//about page  --static
myApp.get('/about', (req, res) => {
    res.send('This is about page', {
        title: 'About',
        designed_by: 'Sunny'
    })
})

//weather page  --static


myApp.get('/weather', (req, res) => {
    
    res.send('This is weather page');
    
})

//sending back html  --static
myApp.get('/html', (req, res) => {
    res.send('<h1>Sending HTML</h1>');

})

//sending back json  --static
myApp.get('/json', (req, res) => {
    res.send({
        country : 'India',
        season : 'winters'
    });
})

//accessing static content index.html from folder named public at url http://localhost:3000/  and http://localhost:3000/index.html   --static
//const path1 = require('path')
//setting up path for express config
const htmlpath = path1.join(__dirname, '../public');
myApp.use(expr.static(htmlpath));


///////////////////////--handlebar for creating-->dynamic pages--//////////////////////////////
myApp.set('view engine', 'hbs')      //setting up handlebar engine


myApp.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        designed_by: 'Sunny Kumar :)'
    })
})

//weather page using handlebar  --dynamic
myApp.get('/indexhbs', (req, res) => {
    
    res.render('index',{
        title : 'This index page',
        designed_by : 'Sunny'
    });
    
})


//about page using handlebar --dynamic
myApp.get('/abouthbs', (req, res) => {
    
    res.render('about', {
        title : 'About',
        designed_by : 'Sunny'
    });
    
})



// //creating browser url using query string --section 8
// myApp.get('/products', (req, res ) => {
    
//     console.log(req.query);
//     res.send({
//         prodcts : []
//     });
// })

//creating browser url using query string and making search term necessary --section 8
myApp.get('/products', (req, res) => {
    
    if (!req.query.search) {
        
       return res.send({
            error : 'You must provide search term'
        });
    }
    console.log(req.query);
    res.send({
        prodcts: []
    });
})


////challenge -- creating an end point with given location
////here we can use url : localhost:3000/weather1?location=Sangrur
myApp.get('/weather1', (req, res) => {

    if (!req.query.location) {

        return res.send({
            error: 'You must provide location in end point'
        });
    }
    console.log(req.query);
    const city = req.query.location;

    weatherReport(req.query.location, (error, forecastdata) => {
        if (error) {
            return res.send({error})
        }

        res.send({
            forecast1: forecastdata,
            city,
            address: req.query.location
        })
     
    })
    
})




//creating 404 page --static--always create at end

// myApp.get('*', (req, res) => {
//     res.send('404 page');
// })


//creating 404 page --dynamic--using handlebar--always create at end

myApp.get('*', (req, res) => {
    res.render('404',{
        title : '404',
        errormsg : 'this is 404 error msg',
        designed_by : 'Sunny'
    });
})

myApp.listen ('3000', () => {
    console.log('web server started at port 3000');
}) 