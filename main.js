//Load Libraries
const fortuneCookies = require('fortune-cookie');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');

//Configure PORT
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;

//Create an instance of express
const app = express();
app.use(cors());

//use morgan to log all request. use the combined format
app.use(morgan('combined'));

const cookies = () => {
    randomCookieId = Math.floor(Math.random() * fortuneCookies.length);

    return fortuneCookies[randomCookieId];
}

//resources
//GET /api/cookie --> application/json { cookie: 'cookie text' }
app.get('/api/cookie', (req, res) => {
    const count = parseInt(req.query['count']) || 1;
    console.info(count);

    res.status(200);
    res.type('application/json');

    if(count == 1)
        res.json({cookie: cookies() })
    else
    {
        const c = []
        for(let i = 0; i < count; i++)
            c.push({cookie: cookies() });
        res.json(c);
    }

})

//Server Frontend
app.use(express.static(__dirname + '/frontend'));

//start the server
app.listen(PORT, () => {
    console.info(`Server Started on Port ${PORT} at ${new Date()}`);
})