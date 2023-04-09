const connectDatabase = require("../../utils/db");
import NextCors from "nextjs-cors";
const User = require("../../models/UserModel");

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  connectDatabase();

  // *********************************************************************

  const { name, email } = req.body;

  switch (req.method) {
    case "POST":
      try {
        const user = await User.findOne({ email });
        if (user) return res.status(201).json({ success: true, data: user });

        if (email.slice(-16) !== "@vitbhopal.ac.in") {
          return res.status(400).json({
            success: false,
            error: "Only VIT bhopal students allowed.",
          });
        }

        const newUser = await User.create(req.body);
        res.status(201).json({ success: true, data: newUser });
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      break;
    case "GET":
      try {
        const users = await Faculty.find({});
        res.status(400).json({ success: true, data: users });
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Invalid request" });
      break;
  }
}
