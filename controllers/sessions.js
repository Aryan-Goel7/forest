const pool = require("../db");
const moment = require("moment");
date = moment().format("YYYY-MM-DD");
const addSession = async (req, res) => {
  try {
    const date = date();
    const { start_time, end_time, tid } = req.body.session;
    const uid = req.body.user.uid;
    const time_spent = end_time - start_time;
    const addSessionQuery = {
      text: "INSERT INTO sessions (uid , tid , start_time , end_time ,date, time_spent ) VALUES ($1 , $2 , $3 , $4 , $5, $6)",
      values: [uid, tid, start_time, end_time, date, time_spent],
    };
    await pool.query(addSessionQuery);
    res.status(200).send({
      success: true,
      message: "Session Added Successfully",
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(501).send({
      success: false,
      message: "An error Occured",
      error: {
        message: err,
      },
    });
  }
};

const getSession = async (req, res) => {
  try {
    console.log(date);
    const tags = req.query.tags?.split(",");
    const from = req.query?.from;
    const to = req.query?.to;
    const currentDay = req.query?.currentDay || false;
    const currentWeek = req.query.currentWeek || false;
    const currentYear = req.query.currentYear || false;
    let getSessionQuery =
      "SELECT tags.tname,tags.colour,sessions.start_time , sessions.end_time, sessions.date from sessions JOIN tags ON sessions.tid = tags.tid WHERE ";
    if (from && to) {
      getSessionQuery += ` session.date BETWEEN \'${from}\' AND \'${to}\'`;
    }
    if (currentDay) {
      getSessionQuery += " session.date = CURRENT_DATE";
    }
    if (currentWeek) {
      getSessionQuery += " sessions.date > CURRENT_DATE - 8 ";
    }
    if (currentYear) {
      getSessionQuery += " sessions.date > CURRENT_DATE - 365 ";
    }
    if (tags) {
      let cooking = "";
      tags.forEach((element, index) => {
        if (index > 0) {
          cooking += " OR ";
        }
        cooking += `tags.tname = '${element}'`;
      });
      console.log(cooking);
      getSessionQuery += cooking;
    }
    res.status(200).send({
      message: getSessionQuery,
    });
  } catch (err) {
    console.error(err);
    res.status(501).send({
      success: false,
      message: "An error Occured at Back End",
      error: {
        message: err,
      },
    });
  }
};

module.exports = {
  addSession,
  getSession,
};
