var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var cheerio = require('cheerio');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const request = require('request');
      cheerio = require('cheerio');
      initialPage = "http://www.insecam.org/en/bycountry/NZ"
      initialPage2 = "http://www.insecam.org/en/bycountry/NZ/?page=2"
      initialPage3 = "http://www.insecam.org/en/bycountry/NZ/?page=3"
      initialPage4 = "http://www.insecam.org/en/bycountry/NZ/?page=4"

    //  file = 'data.json'


function getLinksFromInitialPage (url, callback) {
  request(initialPage, function (err, resp, body) {
    var $ = cheerio.load(body)
    var links = []
    $(".thumbnail-item a").each(function(i, elem) {
      links.push(`http://www.insecam.org${($(this).attr('href'))}`)
    })
    callback(null, links)
  })
}
function getLinksFromSecondPage (url, callback) {
  request(initialPage2, function (err, resp, body) {
    var $ = cheerio.load(body)
    var links2 = []
    $(".thumbnail-item a").each(function(i, elem) {
      links2.push(`http://www.insecam.org${($(this).attr('href'))}`)
    })
    callback(null, links2)
  })
}
function getLinksFromThirdPage (url, callback) {
  request(initialPage3, function (err, resp, body) {
    var $ = cheerio.load(body)
    var links3 = []
    $(".thumbnail-item a").each(function(i, elem) {
      links3.push(`http://www.insecam.org${($(this).attr('href'))}`)
    })
    callback(null, links3)
  })
}
function getLinksFromFourthPage (url, callback) {
  request(initialPage4, function (err, resp, body) {
    var $ = cheerio.load(body)
    var links4 = []
    $(".thumbnail-item a").each(function(i, elem) {
      links4.push(`http://www.insecam.org${($(this).attr('href'))}`)
    })
    callback(null, links4)
  })
}

getLinksFromInitialPage(initialPage, function (err, urls) {
  fetchCameras(urls, function(err, cameras) {
  })
})
getLinksFromSecondPage(initialPage2, function (err, urls) {
  fetchCameras(urls, function(err, cameras) {
  })
})
getLinksFromThirdPage(initialPage3, function (err, urls) {
  fetchCameras(urls, function(err, cameras) {
  })
})
getLinksFromFourthPage(initialPage4, function (err, urls) {
  fetchCameras(urls, function(err, cameras) {
  })
})

function fetchCameras (cameraUrls, callback){
    var cameras = []
    cameraUrls.forEach(function(url) {
      fetchDetails(url, function(err, camera){
        console.log(camera);
        cameras.push(camera)
        if (cameras.length === cameraUrls.length){
          callback(null, cameras)
        }
      })
    })
}

function fetchDetails (url, callback) {
  request (url, function (err, resp, body) {
    var camera = {}
    var $ = cheerio.load(body)
    $('.detailsdesc').each(function (index) {
      // console.log(camera);
      switch (index) {
        case 0:
          camera.country = $(this).text().trim();
          break;
        case 1:
          camera.countryCode = $(this).text().trim();
          break;
        case 2:
          camera.region = $(this).text().trim();
          break;
        case 3:
            camera.city = $(this).text().trim();
          break;
        case 4:
          camera.latitude = $(this).text().trim();
          break;
        case 5:
          camera.longitude = $(this).text().trim();
          break;
        case 6:
          camera.zip = $(this).text().trim();
          break;
        case 7:
          camera.timezone = $(this).text().trim();
          break;
        case 8:
          camera.manufacturer = $(this).text().trim();
          break;
      }
    })
    callback(null, camera)
  })
}





module.exports = app;
