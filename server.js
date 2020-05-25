const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers',(req,res)=>{
    res.send([
        {
          'id':'1',
          'image':'https://placeimg.com/64/64/any',
          'name':'이재빈',
          'birthday':'950810',
          'gender':'남자',
          'job':'대학생'
        },
        {
          'id':'2',
          'image':'https://placeimg.com/64/64/1',
          'name':'이인석',
          'birthday':'951010',
          'gender':'남자',
          'job':'대학생'
        },
        {
          'id':'3',
          'image':'https://placeimg.com/64/64/2',
          'name':'이찬주',
          'birthday':'950312',
          'gender':'남자',
          'job':'공돌이'
        }
    ]);
});

app.listen(port,()=>console.log('Listening on port '+port));