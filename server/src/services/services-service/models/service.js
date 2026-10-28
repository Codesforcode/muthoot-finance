const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
trim: true,
},
slug: {
type: String,
required: true,
unique: true,
lowercase: true,
trim: true,
},
description: {
type: String,
default: '',
},
icon: {
type: String,
default: '',
},
href: {
type: String,
default: '#services',
},
isActive: {
type: Boolean,
default: true,
},
displayOrder: {
type: Number,
default: 0,
},
},
{ timestamps: true }
);

module.exports =
mongoose.models.Service ||
mongoose.model('Service', serviceSchema);
