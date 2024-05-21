import express from "express";
import mongoose, { mongo } from "mongoose";
import { Contact } from "./ContactModal.js";
import bodyParser from "express";
import cors from "cors";

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      dbName: "mern_start",
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//get All contacts
app.get("/", async (req, res) => {
  try {
    let contact = await Contact.find().sort({createdAt:-1});
    res.json({ message: "All Contacts", contact });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//Add contact
app.post("/", async (req, res) => {
  const { name, gmail, phone } = req.body;
  try {
    let contact = await Contact.findOne({ gmail });
    if (contact) return res.json({ message: "contact already exists" });
    contact = await Contact.create({ name, gmail, phone });
    res.json({ message: "Contact saved successfully...!", contact });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//Edit contact
app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    let contact = await Contact.findById(id);
    if (!contact) return res.json({ message: "Contact does not exist" });

    let data = await Contact.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({ message: "Contact has been updated", data });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//Delete contact
app.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    let contact = await Contact.findById(id);
    if (!contact) return res.json({ message: "Contact does not exist" });

    await contact.deleteOne();
    res.json({ message: "Your contact has been deleted" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

app.listen(2000, () => console.log("Server is running on port 2000"));

//username : satstardom
//password : YaMOySJkzQldFX7r
