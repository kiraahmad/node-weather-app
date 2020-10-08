const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define Paths for Express Config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Handlebars, engine and views location 
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicPath));


//Home page route
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Salama Balah'
    });
});

//About page route
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Salama Balah'
    });
});

//Help page route
app.get('/help', (req,res) => {
    res.render('help', {
        title:'Help',
        message: 'Welcome to the help page!',
        name: 'Salama Balah'
    });
});


//Weather page route
app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error:'please provide an address'
        });
         } else {
            geoCode(req.query.address, (error , data) => {
                if(error) {
                     return res.send({
                         error:"Can't find location, please try again a different term"
                     });
                } 
                    forecast(data.latitude,data.longitude, (error, forecastData) => {
                        if(error) {
                           return console.log(error);
                        }
                        res.send({
                            forecast: forecastData,
                            location: data.location,
                            address: req.query.address,
                    });
                });
            });
    }

});

//Help page not found route
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        message:'Help article not found',
        name: 'Salama Balah'
    });
});

//404 Page route
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        message:'Page not found',
        name: 'Salama Balah'
    });
});

app.listen(3000, () => {
    console.log('Server up and running!');
});