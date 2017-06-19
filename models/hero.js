'use strict'

const mongoose = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const HeroSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
      trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
}, { minimize: false });

HeroSchema.plugin(mongooseApiQuery)
HeroSchema.plugin(createdModified, { index: true })

const Heroes = mongoose.model('Heroes', HeroSchema)
module.exports = Heroes
