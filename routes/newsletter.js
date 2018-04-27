var express= require('express');
var User = require('../models/User');
var Action = require('../models/Action');
var nodemailer= require('nodemailer');
var schedule= require('node-schedule');
var Q = require('q'),
moment = require('moment'),
ejs= require('ejs');

var cron = require('cron');

//Email -Functionality

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'natureniners@gmail.com',
    pass: 'ITis@6177'
  }
});



var deffered = Q.defer();

var date= new Date();
var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '00 54 16 26 * 4',
  onTick: function() {
    console.log("now");
     type = 'Monthly';
    days = 1; 
    var news= [];
    var last= new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    console.log(last);
      Action.find({},function(req,actions){
        for(i=0; i<actions.length; i++){
          if(actions[i].pubDate < date && actions[i].pubDate> last){
          news.push(actions[i]); 
          if(news.length==4){
          break;      
          }
                
        }
        }
        ejs.renderFile('views/email.ejs', {Content: news}, (err, content)=> {
          if(err){
            console.log(err);
          }
          else{
            User.find({'subscription': type},function(err,user){
            for(var i = user.length - 1; i >= 0; i--){
            console.log("user mail is: "+user[i].email);
            var mailOptions = {
                from: 'natureniners@gmail.com',
                to:user[i].email,
                subject: 'Latest Actions',
                html: content
              };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
              deffered.reject(console.log('failed: ' + err));
        } else {
              deffered.resolve(body)
              console.log('Email sent: ' + info.response);
        }
      });

      }
            });
      }
        });
    });
  // }


  },
  start: false,
  timeZone: 'America/New_York'
});
job.start();


//Weekly email

var weeklyjob = new CronJob({
  cronTime: '00 47 13 * * 5',
  onTick: function() {
    console.log("now");
     type = 'Weekly';
    days = 1; 
    var news= [];
    var last= new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    console.log(last);
      Action.find({},function(req,actions){
        for(i=0; i<actions.length; i++){
          if(actions[i].pubDate < date && actions[i].pubDate> last){
          news.push(actions[i]); 
          if(news.length==4){
          break;      
          }
                
        }
        }
        ejs.renderFile('views/email.ejs', {Content: news}, (err, content)=> {
          if(err){
            console.log(err);
          }
          else{
            User.find({'subscription': type},function(err,user){
            for(var i = user.length - 1; i >= 0; i--){
            console.log("user mail is: "+user[i].email);
            var mailOptions = {
                from: 'natureniners@gmail.com',
                to:user[i].email,
                subject: 'Latest Actions',
                html: content
              };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
              deffered.reject(console.log('failed: ' + err));
        } else {
              deffered.resolve(body)
              console.log('Email sent: ' + info.response);
        }
      });

      }
            });
      }
        });
    });
  // }


  },
  start: false,
  timeZone: 'America/New_York'
});
weeklyjob.start();


//Daily email

var dailyjob = new CronJob({
  cronTime: '00 55 13 * * 0-6',
  onTick: function() {
    console.log("now");
     type = 'Daily';
    days = 1; 
    var news= [];
    var last= new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    console.log(last);
      Action.find({},function(req,actions){
        for(i=0; i<actions.length; i++){
          if(actions[i].pubDate < date && actions[i].pubDate> last){
          news.push(actions[i]); 
          if(news.length==4){
          break;      
          }
                
        }
        }
        ejs.renderFile('views/email.ejs', {Content: news}, (err, content)=> {
          if(err){
            console.log(err);
          }
          else{
            User.find({'subscription': type},function(err,user){
            for(var i = user.length - 1; i >= 0; i--){
            console.log("user mail is: "+user[i].email);
            var mailOptions = {
                from: 'natureniners@gmail.com',
                to:user[i].email,
                subject: 'Latest Actions',
                html: content
              };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
              deffered.reject(console.log('failed: ' + err));
        } else {
              deffered.resolve(body)
              console.log('Email sent: ' + info.response);
        }
      });

      }
            });
      }
        });
    });
  // }  


  },
  start: false,
  timeZone: 'America/New_York'
});
dailyjob.start();
