// // Import packages
// const express = require("express");
// const home = require("./routes/home");

// // Middlewares
// const app = express();
// app.use(express.json());


// // Routes
// app.use("/home", home);

// // connection
// const port = process.env.PORT || 9001;
// app.listen(port, () => console.log(`Listening to port ${port}`));

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const formStack = 'https://www.formstack.com/api/v2/form/4932247.json';
const restDB = 'https://votesong-17d2.restdb.io/rest/song?aggregate=SUM:Song 1&aggregate=SUM:Song 2&aggregate=SUM:Song 3';


app.get('/', (req, res) => {
    axios.all([
        axios.get(formStack,{
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer 598da089953a8f5ce4c4ffeeee26df86'
          }
        }),
        axios.get(restDB,{
          headers: {
            'content-type': 'application/json',
           'x-apikey': '9c1f746e4fdd157ccb8b86ee8fd3fcda8d6a5',
           'cache-control': 'no-cache'
          }
        })

    ])
    .then(axios.spread((songnames, restDB) => {
        res.status(200).json({ 
          song1_name: songnames.data.fields[0].options[0].label,
          song1_artist: songnames.data.fields[0].options[0].value,
          song1_votes: restDB.data['SUM Song 1'],
          song2_name: songnames.data.fields[0].options[1].label, 
          song2_artist: songnames.data.fields[0].options[1].value,
          song2_votes: restDB.data['SUM Song 2'],
          song3_name: songnames.data.fields[0].options[2].label,
          song3_artist: songnames.data.fields[0].options[2].value, 
          song3_votes: restDB.data['SUM Song 3'], 
        });
    }));
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});