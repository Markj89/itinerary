// SCSS/CSS
import './../styles/private/style.scss';
import './../styles/public/style.css';

// JS
import * as angular from 'angular';
import * as uirouter from 'angular-ui-router';
var ngRoute = require('./../node_modules/angular-route/angular-route.min.js');
var vsGoogleAutocomplete = require('./../node_modules/vsGoogleAutocomplete/dist/vs-google-autocomplete.min.js');
var $ = require('jquery');

const ngModule = angular.module('app', ['ui.router', 'vsGoogleAutocomplete', 'ngRoute', 'mapView']);
require('./app')(ngModule);

const ngModule_Map = angular.module('mapView', ['ui.router', 'vsGoogleAutocomplete', 'ngRoute']);
require('./map')(ngModule_Map);

// IMAGES
import white_logo from './../images/busbank_logo_white.png';
var logo = document.getElementById('logo');
logo.src = white_logo;
