const express = require('express');
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
});

app.post('/', (req, res) => {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/2aeb62077d";

    const option = {
        method: "POST",
        auth: "mandal:ed7fbf723ed58070688f2b5d3ad60bd0-us8"
    }

   const request = https.request(url, option, function(response){

    if (response.statusCode === 200){
        res.send("Successfully Subscribed!");
    }else{
        res.send("There was an error with signing up, Please TRY Again!")
    }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});



app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000...")
});

//List Id
//2aeb62077d