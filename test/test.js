var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('niners', function() {
  
  it('should list all actions on /actions GET', function(done) {
  chai.request(server)
    .get('/actions')
    .end(function(err, res)
    {
    if(err){
        console.log("error");
        done(err);
    }
    else {
        res.should.have.status(200);
        done();
    }
  });
  });

  it('should get action by id/actions/:id GET', function(done) {
  chai.request(server)
    .get('/actions/5ae10b441b5ee435a8ecf0cd')
    .end(function(err, res)
    {
    if(err){
        console.log("error");
        done(err);
    }
    else {
      res.should.have.status(200);
        done();
    }
  });
  });

  
  it('should list all action of a user /actions/useractions/:id GET', function(done) {
  chai.request(server)
    .get('/actions/useractions/5ad0e88b554b6b42ec407619')
    .end(function(err, res)
    {
    if(err){
        console.log("error");
        done(err);
    }
    else {
        res.should.have.status(200);
        done();
    }
  });
  });

  it('should list the event of a action /actions/events/:id GET', function(done) {
  chai.request(server)
    .get('/actions/events/5ad0e88b554b6b42ec407619')
    .end(function(err, res)
    {
    if(err){
        console.log("error");
        done(err);
    }
    else {
        res.should.have.status(200);
        done();
    }
  });
  });

  it('should list all actions for newsletter /newsletter/actions GET', function(done) {
  chai.request(server)
    .get('/newsletter/actions')
    .end(function(err, res)
    {
    if(err){
        console.log("error");
        done(err);
    }
    else {
        res.should.have.status(200);
        done();
    }
  });
  });
  
  it('should logout the user /logout GET', function(done) {
  chai.request(server)
    .get('/logout')
    .end(function(err, res)
    {
    if(err){
        console.log("error");
        done(err);
    }
    else {
        res.should.have.status(200);
        done();
    }
  });
  });
  
  it('should add a single action /actions POST', function(done) {
  chai.request(server)
    .post('/actions')
    .send({"title": "Lakes is dilip","topic": "Wildlife","content": "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.","location": "Hyderabad","startTime": "7:00 AM","endTime": "12:00 PM","expLikes": "1"})
    .end(function(err, res)
    {
    if(err){
        console.log("error");
        done(err);
    }
    else {
      res.should.have.status(200);
        done();
    }
  });
  });

  it('should edit a single action /actions/:id PUT', function(done) {
  chai.request(server)
    .put('/actions/5ae10b441b5ee435a8ecf0cd')
    .send({"title": "put actions","topic": "Wildlife","content": "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.","location": "Hyderabad","startTime": "7:00 AM","endTime": "12:00 PM","expLikes": "1"})
    .end(function(err, res)
    {
    if(err){
        console.log("error");
        done(err);
    }
    else {
      res.should.have.status(200);
        done();
    }
  });
  });

  it('should delte action /actions/:id DELETE', function(done) {
  chai.request(server)
    .delete('/actions/5ae10b441b5ee435a8ecf0cd')
    .end(function(err, res)
    {
    if(err){
        console.log("error");
        done(err);
    }
    else {
      res.should.have.status(200);
        done();
    }
  });
  });

  it('should get all comments /comments GET', function(done) {
  chai.request(server)
    .get('/comments')
    .end(function(err, res)
    {
    if(err){
        console.log("error");
        done(err);
    }
    else {
      res.should.have.status(200);
        done();
    }
  });
  });

   it('should add a single comment /comments POST', function(done) {
   chai.request(server)
    .post('/actions/5ad10cd97a0e1a0a7c40167c/comment')
    .send({"text":"what!!","like":false})
    .end(function(err, res)
    {
    if(err){
        console.log("error");
        done(err);
    }
    else {
      res.should.have.status(200);
        done();
    }
  });
  });

  it('should edit a single comment /comments/:id PUT', function(done) {
  chai.request(server)
    .put('/actions/5ad10cd97a0e1a0a7c40167c/comment/5ad10cd97a0a7c40167c')
    .send({"text":"what is this!!","like":false})
    .end(function(err, res)
    {
    if(err){
        console.log("error");
        done(err);
    }
    else {
      res.should.have.status(200);
        done();
    }
  });
  });

  it('should delete a single comment /comments/:id DELETE', function(done) {
  chai.request(server)
    .delete('/actions/5ad10cd97a0e1a0a7c40167c/comment/5ad10cd97a0e1a0a7c40167c')
    .end(function(err, res)
    {
    if(err){
        console.log("error");
        done(err);
    }
    else {
      res.should.have.status(200);
        done();
    }
  });
  });

  it('should login user /login POST', function(done) {
   chai.request(server)
    .post('/login')
    .send({"username":"mukesh","password":"false"})
    .end(function(err, res)
    {
    if(err){
        console.log("error");
        done(err);
    }
    else {
      res.should.have.status(200);
        done();
    }
  });
  });

   it('should register new user /users POST', function(done) {
   chai.request(server)
    .post('/users')
    .send({ "firstName":"Dilip","lastName": "Kumar","email": "dilipya5@gmail.com","password":"Welcome01","phone":"6795366","subscription":"Daily","dob":"1996-07-20","username": "mukesh97"})
    .end(function(err, res)
    {
    if(err){
        console.log("error");
        done(err);
    }
    else {
      res.should.have.status(200);
        done();
    }
  });
  });


});