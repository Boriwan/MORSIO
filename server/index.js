
const PostController = require("./controllers/post");
const CategoryController = require("./controllers/category");
const CommentController = require("./controllers/comment");
const LikeController = require("./controllers/like");
const UserController = require("./controllers/user");
var express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

var app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoDBUri =
    "mongodb+srv://Oliver:admin1234@cluster0.uaaymiq.mongodb.net/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoDBUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
app.use(cors());

mongoose
    .connect(mongoDBUri)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// app.use((req, res, next) => {
//   req.user = {
//     uuIdentity: "28-4201-1",
//     uuIdentityName: "Jakub Stádník",
//     role: "admin",
//   };
//   next();
// });
// Add error handling for multer

//default port
const port = 8000;

app.use("/post", PostController);
app.use("/category", CategoryController);
app.use("/comment", CommentController);
app.use("/likes", LikeController);
app.use("/user", UserController);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});