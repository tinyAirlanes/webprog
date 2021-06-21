const express = require('express');
const path = require('path');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const app = express();
const apiRouter = require('./routes/apiRouter');

const port = 3000;


const viewsDir = path.join(__dirname, './views');
app.engine("mst", mustache(path.join(viewsDir, "partials")));
app.set('views', viewsDir);
app.set('view engine', 'mst');



const expressSwaggerGenerator = require('express-swagger-generator');
const expressSwagger = expressSwaggerGenerator(app);
const options = {
    swaggerDefinition: {
        info: {
            description: 'description',
            title: 'title',
            version: '1.0.0',
        },
        host: `localhost:${port}`,
        produces: ["application/json", "image/png", "image/jpeg", "image/jpg"],
    },
    basedir: __dirname,
    files: ['./routes/**/*.js', './models/**/*.js'],
};
expressSwagger(options);

app.use(express.static('./public'));
app.use(express.static('./data'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busboyBodyParser());

app.use(morgan('dev'))

app.get('/about', (req, res) => {
    res.render('about', {
        headTitle: 'About', aboutCurrent: 'current'
    });
});
app.get('/', (req, res) => {
    res.render('index', {
        headTitle: 'Home', homeCurrent: 'current'
    });
});
app.use('', apiRouter);


console.log("OK")
app.listen(port, function () { console.log('Server listening on port',port); });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
   });
   
   // error handler
   app.use((req, res) => {
       res.status(400).send('Incorrect routing');
   });
   app.use((err, req, res, next) => {
       console.log('Error!', err);
   });
   console.log("OK")
app.use((err, req, res, next) => {
    console.log('Error!', err);
});