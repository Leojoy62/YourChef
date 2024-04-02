const express = require("express");

const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
const cors = require("cors");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

const VerifyJwt = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "Unauthorized Access" });
  }
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res
        .status(403)
        .send({ error: true, message: "Unauthorized access" });
    }

    req.decoded = decoded;
    next();
  });
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "leojoy62@gmail.com",
    pass: "qloy qkep zoeb lwnz",
  },
});

app.post("/send-email", async (req, res) => {
  try {
    const { from, to, subject, message } = req.body;

    // Send the email
    await transporter.sendMail({
      from: from, // Use the sender's email as the sender
      to: "leojoy62@gmail.com", // Replace with your own email address
      subject,
      text: message,
    });

    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email" });
  }
});

const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASSWORD}@cluster0.bgl6y.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    //Collections
    const userCollection = client.db("yourChef").collection("users");
    const menuCollection = client.db("yourChef").collection("menu");
    const reviewCollection = client.db("yourChef").collection("reviews");
    const cartCollection = client.db("yourChef").collection("carts");
    const paymentCollection = client.db("yourChef").collection("payments");
    const bookingCollection = client.db("yourChef").collection("bookings");

    //json web token
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "1h" });

      res.send({ token });
    });

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.user;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ error: true, message: "Forbidden Access" });
      }
      next();
    };

    //users apies
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists" });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users", VerifyJwt, verifyAdmin, async (req, res) => {
      const query = {};
      const result = await userCollection.find(query).toArray();
      res.send(result);
    });

    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await userCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.delete("/users/:id", VerifyJwt, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    //admin
    app.get("/users/admin/:email", VerifyJwt, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.user !== email) {
        return res.send({ admin: false });
      }
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const result = { admin: user?.role === "admin" };

      res.send(result);
    });

    //menu apies
    app.get("/menu", async (req, res) => {
      const query = {};
      const result = await menuCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/menu", VerifyJwt, verifyAdmin, async (req, res) => {
      const newItem = req.body;
      const result = await menuCollection.insertOne(newItem);
      res.send(result);
    });

    app.delete("/menu/:id", VerifyJwt, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.deleteOne(query);
      res.send(result);
    });

    //review apies
    app.get("/reviews", async (req, res) => {
      const query = {};
      const result = await reviewCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/myreviews", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await reviewCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/reviews", VerifyJwt, async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });

    //reservation / bookings
    app.post("/reservation", VerifyJwt, async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });

    app.get("/mybookings", VerifyJwt, async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/mybookings/:id", VerifyJwt, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/bookings", async (req, res) => {
      const query = {};
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });

    //Admin manage bookings
    app.delete("/managebookings/:id", VerifyJwt, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    });

    //Admin confirm booking
    app.patch("/managebooking/:id", async (req, res) => {
      const id = req.params.id;
      const updatedBooking = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: updatedBooking.status,
        },
      };
      const result = await bookingCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    //User Home Stats
    app.get("/user-stats", VerifyJwt, async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cart = await cartCollection.countDocuments(query);
      const reviews = await reviewCollection.countDocuments(query);
      const bookings = await bookingCollection.countDocuments(query);
      const payments = await paymentCollection.countDocuments(query);
      res.send({ cart, reviews, bookings, payments });
    });

    //Carts
    app.post("/carts", async (req, res) => {
      const menu = req.body;

      const result = await cartCollection.insertOne(menu);
      res.send(result);
    });

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/carts", VerifyJwt, async (req, res) => {
      const email = req.query.email;

      if (!email) {
        res.send([]);
      }

      const decodedEmail = req.decoded.user;

      if (email !== decodedEmail) {
        return res.send({ error: true, message: "Unauthorized access" });
      }
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();

      res.send(result);
    });

    //Payment Intent
    app.post("/create-payment-intent", VerifyJwt, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    //payment collection
    app.post("/payments", VerifyJwt, async (req, res) => {
      const payment = req.body;
      const insertResult = paymentCollection.insertOne(payment);
      const query = {
        _id: { $in: payment.cartItems.map((id) => new ObjectId(id)) },
      };
      const deleteResult = cartCollection.deleteMany(query);
      res.send({ insertResult, deleteResult });
    });

    app.get("/payments", VerifyJwt, async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    // Admin-Stats
    app.get("/admin-stats", VerifyJwt, verifyAdmin, async (req, res) => {
      const payments = await paymentCollection.find().toArray();
      const revenue = payments.reduce((sum, payment) => sum + payment.price, 0);
      const customers = await userCollection.estimatedDocumentCount();
      const products = await menuCollection.estimatedDocumentCount();
      const orders = await paymentCollection.estimatedDocumentCount();

      res.send({
        revenue,
        customers,
        products,
        orders,
      });
    });

    //order-stats

    app.get("/order-stats", VerifyJwt, verifyAdmin, async (req, res) => {
      const pipeline = [
        {
          $addFields: {
            menuItems: {
              $map: {
                input: "$menuItems",
                as: "menuItemId",
                in: { $toObjectId: "$$menuItemId" },
              },
            },
          },
        },
        {
          $lookup: {
            from: "menu",
            localField: "menuItems",
            foreignField: "_id",
            as: "menu_items",
          },
        },
        {
          $unwind: "$menu_items",
        },
        {
          $group: {
            _id: "$menu_items.category",
            itemCount: { $sum: 1 },
            totalPrice: { $sum: "$menu_items.price" },
          },
        },
        {
          $project: {
            category: "$_id",
            itemCount: 1,
            totalPrice: { $round: ["$totalPrice", 2] },
            _id: 0,
          },
        },
      ];

      try {
        const result = await paymentCollection.aggregate(pipeline).toArray();
        res.json(result);
      } catch (error) {
        console.error("Error in order-stats route:", error);
        res
          .status(500)
          .json({ error: "An error occurred while processing the request." });
      }
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello chef");
});

app.listen(port, () => {
  console.log(`Your chef server is running on port ${port}`);
});
