const mongoose = require('mongoose');

const url = 'mongodb+srv://vishwas:vishwas123@cluster0.yphlh.mongodb.net/sampledb?retryWrites=true&w=majority';

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},(e)=>{
    if(e) throw e;
    console.log('MongoDB Connected!');
});