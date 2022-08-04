
const express = require('express');
const cors = require('cors');
const fs = require('fs')
const multer = require('multer');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth');
const mongoose = require('./database/connection');
const app = express();
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Car = require('./models/Cars');
const Parts = require('./models/Parts');
const Book = require('./models/Book');
const Bookparts = require('./models/Partsbook');
const path = require('path');


app.use(express.json());
app.use(express.static('./images'));



app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE");
        return res.status(200).json({});
    }
    next();
});

////////////////// For Register User ////////////////////
app.post('/registerusers', (req, res) => {
    console.log(req.body);
    var mydata = new User(req.body);

    mydata.save().then(function () {
        console.log('Register Successfully!');
        res.send(mydata);
    }).catch(function () {
        console.log("Error in Registration!!!");
    });
});



app.get('/users', function (req, res) {
    User.find().then(function (user) {
        res.send(user);
    }).catch(function (e) {
        res.send(e)
    });

});

///////////////// For Login //////////////////////
app.post("/login", async function(req, res) {
    try {
      const user = await User.checkCrediantialsDb(
        req.body.username,
        req.body.password
      );
      //const message = await user.message;
      if (user) {
        const token = await user.generateAuthToken();
        res.status(201).json({
          token: token,
          id:user.id,
          user: user
        });
      } else {
        res.json({
          message: "Username and Password do not match or do not exist."
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
  
//dashboard tokens client file
app.get('/user/me', auth, function (req, res) {
    res.send(req.user);
});

////////////// For Logging Out ////////////////////////
app.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

////////////////// Show Cars ///////////////////////
app.get("/showcars", function (req, res) {
    Car.find().then(function (Car) {
        console.log(Car);
        // res.json(houseModel);
        res.send(Car);
    }).catch(function (e) {
        res.send(e);
    });
});

////////////////// Show Parts ///////////////////////
app.get("/showparts", function (req, res) {
    Parts.find().then(function (Parts) {
        console.log(Parts);
        // res.json(houseModel);
        res.send(Parts);
    }).catch(function (e) {
        res.send(e);
    });
});


///////////////////// Show Profile //////////////////////
app.get("/showprofile", auth, function (req, res) {
    User.find().then(function (User) {
        console.log(User);
        res.send(User);
    }).catch(function (e) {
        res.send(e);
    });
});



///////////////// Profile Update ////////////////////
app.put('/profileupdate', auth, function (req, res) {   //update profile
    console.log(req.body);
    User.findByIdAndUpdate(req.user._id, req.body, { new: true }, (err, user) => {
        res.send("succesfull");
    });
});

///////////////////// Booking/////////////////////////
app.put('/booking', auth, function (req, res) {
    console.log(req.body);
    User.findByIdAndUpdate(req.user._id, req.body, { new: true }, (err, user) => {
        res.send("succesfull");
    });
});


/////////////////// Get Car  //////////////////////

app.get('/updatespecificCar/:id', function (req, res) {
    uid = req.params.id.toString();
    Car.findById(uid).then(function (Car) {
        res.send(Car);
    }).catch(function (e) {
        res.send(e)
    });
});

/////////////////// Car Update /////////////////////

app.put('/updateCar/:id', function (req, res) {
    uid = req.params.id.toString();
    console.log("update Car responding......")
    console.log(uid);
    console.log(req.body);
    Car.findByIdAndUpdate({ _id: uid }, req.body).then(function () {
        console.log("Car updated successfully.")
        res.send();
    }).catch(function (e) {

    })
});

///////////// Delete Car ///////////////////////
app.delete('/deleteCar/:id', function (req, res) {
    Car.findByIdAndDelete(req.params.id).then(function () {
        console.log("Car deleted successfully.");
        res.send();
    }).catch(function () {

    });
});

///////////// Car Link ////////////////////////////

app.post('/addcars', (req, res) => {
    console.log(req.body);
    var mydata = new Car(req.body);
    mydata.save().then(function () {
        console.log(' Car Added Successfully!');
        res.send(mydata);
    }).catch(function () {
        console.log("Error in Adding Cars!!!");


    });
});

////////// Car Image//////////////////////////////////////////

var storage = multer.diskStorage({
    destination: "images/Cars",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, "Sagar" + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb("Only image files accepted!!"), false;
    }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
});


app.post('/car_img', upload.single('imageFile'), (req, res) => {
    res.send(req.file);
    console.log(req.file);

});


/////////// Parts Link //////////////////////////////////

app.post('/addparts', (req, res) => {
    console.log(req.body);
    var mydata = new Parts(req.body);
    mydata.save().then(function () {
        console.log(' Parts Added Successfully!');
        res.send(mydata);
    }).catch(function () {
        console.log("Error in Adding Cars!!!");


    });
});

///////////////// Parts Image ///////////////////////////

var storage1 = multer.diskStorage({
    destination: "images/parts",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, "Sagar" + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb("Only image files accepted!!"), false;
    }
    cb(null, true);
};

var upload1 = multer({
    storage: storage1,
    limits: { fileSize: 1000000 }
});


app.post('/parts_img', upload1.single('imageFile1'), (req, res) => {
    res.send(req.file);
    console.log(req.file);
});

////////////////// For Booking Service Center ////////////////////
app.post('/bookservicing', (req, res) => {
    console.log(req.body);
    var mydata = new Book(req.body);

    mydata.save().then(function () {
        console.log('Booked Successfully!');
        res.send(mydata);
        
    }).catch(function () {
        console.log("Error in Booking!!!");
    });
});


/////////////////// Get Parts  //////////////////////
app.get('/updatespecificparts/:id', function (req, res) {
    uid = req.params.id.toString();
    Parts.findById(uid).then(function (Parts) {
        res.send(Parts);
    }).catch(function (e) {
        res.send(e)
    });
});

/////////////////// Parts Update /////////////////////

app.put('/updateparts/:id', function (req, res) {
    uid = req.params.id.toString();
    console.log("update parts responding......")
    console.log(uid);
    console.log(req.body);
    Parts.findByIdAndUpdate({ _id: uid }, req.body).then(function () {
        console.log("Parts Updated Successfully.")
        res.send();
    }).catch(function (e) {

    })
});

///////////// Delete Parts ///////////////////////
app.delete('/deleteparts/:id', function (req, res) {
    Parts.findByIdAndDelete(req.params.id).then(function () {
        console.log("Parts Deleted Successfully.");
        res.send();
    }).catch(function () {

    });
});

///////////// Delete Users ///////////////////////
app.delete('/deleteuser/:id', function (req, res) {
    User.findByIdAndDelete(req.params.id).then(function () {
        console.log("User Deleted Successfully.");
        res.send();
    }).catch(function () {

    });
});

///////////////////// Show Booking //////////////////////
app.get("/showbooking", auth, function (req, res) {
    Book.find().then(function (Book) {
        console.log(Book);
        res.send(Book);
    }).catch(function (e) {
        res.send(e);
    });
});
app.get("/getOrder", auth, function (req, res) {
    Bookparts.find().then(function (Book) {
        console.log(Book);
        res.send(Book);
    }).catch(function (e) {
        res.send(e);
    });
});


///////////// Delete Booking ///////////////////////
app.delete('/deletebooking/:id', function (req, res) {
    Book.findByIdAndDelete(req.params.id).then(function () {
        console.log("Booking Deleted successfully.");
        res.send();
    }).catch(function () {

    });
});

////////////////// For Booking Parts ////////////////////
app.post('/bookparts', (req, res) => {
    console.log(req.body);
    var mydata = new Bookparts(req.body);

    mydata.save().then(function () {
        console.log('Booked Successfully!');
        res.send(mydata);
    }).catch(function () {
        console.log("Error in Booking!!!");
    });
});

app.get('/', (req, res) => {
    res.json("Api is Running");
})

var server = app.listen(6060, function () {
    console.log("Server Connected Successfully");
});
