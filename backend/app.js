const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

// A50BhTXa09RvzJNr
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://leo:A50BhTXa09RvzJNr@meanappcluster-rby5d.mongodb.net/node-angular?retryWrites=true&w=majority',{
  useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
})
  .then(_ => console.log('Connected to Database!'))
  .catch(error => console.log('Connection Failed!', error))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result=>{
    res.status(201).json({
      message: 'Post added successfully',
      postID: result.id
    });
  });
  // console.log(post);

});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(doc=>{
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: doc
      });
    })
    // .catch();

})

app.delete('/api/posts/:id',(req,res,next)=>{
  Post.deleteOne({_id:req.params.id}).then(result=>console.log(result));
  res.status(200).json({message:'Post deleted!'})
})

module.exports = app;
