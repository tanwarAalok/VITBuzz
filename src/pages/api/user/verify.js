const connectDatabase = require("../../../utils/db");
import NextCors from "nextjs-cors";
const User = require("@/server/models/UserModel");

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


        const newUser = await User.create(req.body);
        res.status(201).json({ success: true, data: newUser });
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Invalid request" });
      break;
  }
}
