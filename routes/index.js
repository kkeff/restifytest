'use strict'

/**
* Module Dependencies
*/
const _      = require('lodash'),
errors = require('restify-errors')

/**
* Model Schema
*/
const Hero = require('../models/hero')

let heroCount = 0;

/**
* POST
*/
server.post('/heroes', function(req, res, next) {

  let data = req.body || {}
  data.id = heroCount++;

  let hero = new Hero(data)
  hero.save(function(err) {

    if (err) {
      log.error(err)
      return next(new errors.InternalError(err.message))
      next()
    }

    res.send(201)
    next()

  })

})


/**
* LIST
*/
server.get('/heroes', function(req, res, next) {
  console.log('Hej get');
  Hero.apiQuery(req.params, function(err, docs) {
    console.log('Hej get 2');

    if (err) {
      console.log('Hej get 3');
      log.error(err)
      return next(new errors.InvalidContentError(err.errors.name.message))
    }
    console.log('Hej get ok');
    res.send(docs)
    next()

  })

})


/**
* GET
*/
server.get('/heroes/:hero_id', function(req, res, next) {
  Hero.findOne({id: req.params.hero_id }, function(err, doc) {

    if (err) {
      log.error(err)
      return next(new errors.InvalidContentError(err.errors.name.message))
    }

    res.send(doc)
    next()

  })

})


/**
* UPDATE
*/
server.put('/heroes/:hero_id', function(req, res, next) {

  let data = req.body || {}

  if (!data._id) {
    _.extend(data, {
      _id: req.params.hero_id
    })
  }

  Hero.findOne({ _id: req.params.hero_id }, function(err, doc) {

    if (err) {
      log.error(err)
      return next(new errors.InvalidContentError(err.errors.name.message))
    } else if (!doc) {
      return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
    }

    Hero.update({ _id: data._id }, data, function(err) {

      if (err) {
        log.error(err)
        return next(new errors.InvalidContentError(err.errors.name.message))
      }

      res.send(200, data)
      next()

    })

  })

})

/**
* DELETE
*/
server.del('/heroes/:hero_id', function(req, res, next) {

  Hero.remove({ _id: req.params.hero_id }, function(err) {

    if (err) {
      log.error(err)
      return next(new errors.InvalidContentError(err.errors.name.message))
    }

    res.send(204)
    next()

  })

})
