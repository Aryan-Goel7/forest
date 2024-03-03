const pool = require("../db");

const addTag = async (req, res) => {
  try {
    const { tagName, tagColour } = req.body.tag;
    const uid = req.body.user.uid;
    const addTagQuery = {
      text: "INSERT INTO tags (uid , tname , colour ) VALUES ($1 , $2, $3 )",
      values: [uid, tagName, tagColour],
    };
    await pool.query(addTagQuery);
    res.send({
      success: true,
      message: "Tag Added Successfully",
    });
  } catch (err) {
    console.error(err);
  }
};
const getTags = async (req, res) => {
  try {
    const uid = req.body.user.uid;
    const getTagQuery = {
      text: "SELECT tid ,tname , colour from tags WHERE uid = $1",
      values: [uid],
    };
    const tags = await pool.query(getTagQuery);
    const userTags = tags.rows;
    console.log(userTags);
    res.status(200).send({
      success: true,
      message: "User tags Reterieved Successfully.",
      tags: userTags,
    });
  } catch (err) {
    console.error(err);
  }
};

const updateTag = (req, res) => {
  try {
    const uid = req.user.uid;
    const tid = req.body.tid;
    const { tname, colour } = req.body.tag;
    const tagUpdateQuery = `UPDATE tags SET tname=${tname} colour = ${colour} where tid = ${tid} and uid=${uid}`;
    const queryResult = pool.query(tagUpdateQuery);
    res.status(200).send({
      success: true,
      message: "Tag update Successfully",
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getTags,
  addTag,
  updateTag,
};
