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
    const limit = 5;
    const { filter, page } = req.query;
    let files = await File.find({ id: req.user.id, type: filter })
      .sort({
        data: -1,
      })
      .skip(limit * page)
      .limit(limit);
    let total_count = await File.countDocuments({
      id: req.user.id,
      type: filter,
    });

    res.json({ data: files, total_count: Math.ceil(total_count / limit) });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
