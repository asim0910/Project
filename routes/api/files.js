const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const File = require("../../models/File");
router.post("/", auth, async (req, res) => {
  try {
    const { doc, type, name } = req.body;
    const file = new File({ doc, type, id: req.user.id, name });
    await file.save();
    res.status(200).json({ status: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.get("/", auth, async (req, res) => {
  try {
    let files = await File.find({ id: req.user.id });

    res.json(files);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
