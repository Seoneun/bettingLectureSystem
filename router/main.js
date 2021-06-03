module.exports = async function(app)
{
     const models = require("../models");

     var lecture_ids = await models.Lecture.findAll({
        attributes: ['lecture_id']
     });
     var length_lecture = Object.keys(lecture_ids).length;
    
     app.get('/', function(req,res){
        res.render('home');
     });
     app.get('/home',function(req,res){
      res.render('home.ejs');
     });
     app.get('/home_',function(req,res){
      res.render('home_.ejs');
     });
     app.get('/login',function(req,res){
        res.render('login.ejs');
     });
     app.get('/register',function(req,res){
        res.render('register.ejs');
     });
     app.get('/applyLecture', async function(req,res){
      await models.Lecture.findAll().then(lecture_table => {
        res.render('applyLecture.ejs', {lecture_table});
      });
     });
     app.get('/timeTable', async function(req,res){
      await models.Lecture.findAll().then(lecture_table => {
        res.render('timeTable.ejs', {lecture_table});
      });
     });
     app.get('/appliedLecture', async function(req,res){
      await models.BettingLecture.findAll({
        where: {
          email: decodeURIComponent(req.cookies.user_email)
        }
      }).then(betting_lecture_table => {
        res.render("appliedLecture.ejs", {betting_lecture_table});
      });
     });
     
     app.post("/sign_up", function(req,res){
      let body = req.body;
    
      models.User.create({
        name: body.userName,
        email: body.userEmail,
        password: body.password
      })
      .then( result => {
        res.redirect("/home");
      })
      .catch( err => {
        console.log(err);
        res.send('<script type="text/javascript">alert("이미 존재하는 계정입니다!");</script>');
      })
    });

    app.post("/sign_in", async function(req,res){
      let body = req.body;
  
      let result = await models.User.findOne({
          where: {
              email : body.userEmail
          }
      });

      if(result) {
        let dbPassword = result.dataValues.password;
        let inputPassword = body.password;
  
        if(dbPassword === inputPassword){
            console.log("비밀번호 일치");
            res.cookie("user", encodeURIComponent(result.dataValues.name));
            res.cookie("user_email", encodeURIComponent(result.dataValues.email));
            res.cookie("points", result.dataValues.points, {overwrite: true});
            res.redirect("/home_");
        }
        else{
            console.log("비밀번호 불일치");
            res.send('<script type="text/javascript">alert("비밀번호가 틀렸습니다!");</script>');
        }
      } else {
        console.log("없는 아이디");
        res.send('<script type="text/javascript">alert("등록되지 않은 사용자입니다.");</script>');
      }
  });

    app.post("/search_lecture", async function(req,res) {
        let body = req.body;
        const { Op, where, col, where, where } = require("sequelize");
        await models.Lecture.findAll({
          where: {
            [Op.or]: [
              {lecture_id: body.lecture_id},
              {lecture_name: body.lecture_name}
            ]
          }
        }).then(lecture_table => {
          res.render('timeTable.ejs', {lecture_table});
        })
    });

    app.post("/search_lecture_", async function(req,res) {
      let body = req.body;
      const { Op } = require("sequelize");
      await models.Lecture.findAll({
        where: {
          [Op.or]: [
            {lecture_id: body.lecture_id},
            {lecture_name: body.lecture_name}
          ]
        }
      }).then(lecture_table => {
        res.render('applyLecture.ejs', {lecture_table});
      })
  });

  /*for(i = 0; i < length_lecture; i++) {
    app.post('/apply_lecture_' + lecture_ids[i].dataValues.lecture_id, function(req, res) {
      console.log(lecture_ids);
      console.log(i);
      let body = req.body;
      models.BettingLecture.create({
        email: decodeURIComponent(req.cookies.user_email),
        lecture_id: lecture_ids[i].dataValues.lecture_id,
        betting_points: body.betting_cost
      });
      models.User.update(
        {points: req.cookies.points-body.betting_cost},
        {where: {email: decodeURIComponent(req.cookies.user_email)}}
        );
      res.cookie("points", req.cookies.points-body.betting_cost, {overwrite: true});
      res.redirect("/applyLecture");
    });
  }*/

    app.post('/apply_lecture_' + lecture_ids[0].dataValues.lecture_id, async function(req, res) {
      let body = req.body;
      models.BettingLecture.create({
        email: decodeURIComponent(req.cookies.user_email),
        lecture_id: lecture_ids[0].dataValues.lecture_id,
        betting_points: body.betting_cost
      });
      models.User.update(
        {points: req.cookies.points-body.betting_cost},
        {where: {email: decodeURIComponent(req.cookies.user_email)}}
        );
        res.cookie("points", req.cookies.points-body.betting_cost, {overwrite: true});
        res.redirect("/applyLecture");
    });

    app.post('/apply_lecture_' + lecture_ids[1].dataValues.lecture_id, async function(req, res) {
      let body = req.body;
      models.BettingLecture.create({
        email: decodeURIComponent(req.cookies.user_email),
        lecture_id: lecture_ids[1].dataValues.lecture_id,
        betting_points: body.betting_cost
      });
      models.User.update(
        {points: req.cookies.points-body.betting_cost},
        {where: {email: decodeURIComponent(req.cookies.user_email)}}
        );
      res.cookie("points", req.cookies.points-body.betting_cost, {overwrite: true});
      res.redirect("/applyLecture");
    });

    app.post('/apply_lecture_' + lecture_ids[2].dataValues.lecture_id, async function(req, res) {
      let body = req.body;
      models.BettingLecture.create({
        email: decodeURIComponent(req.cookies.user_email),
        lecture_id: lecture_ids[2].dataValues.lecture_id,
        betting_points: body.betting_cost
      });
      models.User.update(
        {points: req.cookies.points-body.betting_cost},
        {where: {email: decodeURIComponent(req.cookies.user_email)}}
        );
      res.cookie("points", req.cookies.points-body.betting_cost, {overwrite: true});
      res.redirect("/applyLecture");
    });

    app.post('/apply_lecture_' + lecture_ids[3].dataValues.lecture_id, async function(req, res) {
      let body = req.body;
      models.BettingLecture.create({
        email: decodeURIComponent(req.cookies.user_email),
        lecture_id: lecture_ids[3].dataValues.lecture_id,
        betting_points: body.betting_cost
      });
      models.User.update(
        {points: req.cookies.points-body.betting_cost},
        {where: {email: decodeURIComponent(req.cookies.user_email)}}
        );
      res.cookie("points", req.cookies.points-body.betting_cost, {overwrite: true});
      res.redirect("/applyLecture");
    });

    app.post('/apply_lecture_' + lecture_ids[4].dataValues.lecture_id, async function(req, res) {
      let body = req.body;
      models.BettingLecture.create({
        email: decodeURIComponent(req.cookies.user_email),
        lecture_id: lecture_ids[4].dataValues.lecture_id,
        betting_points: body.betting_cost
      });
      models.User.update(
        {points: req.cookies.points-body.betting_cost},
        {where: {email: decodeURIComponent(req.cookies.user_email)}}
        );
      res.cookie("points", req.cookies.points-body.betting_cost, {overwrite: true});
      res.redirect("/applyLecture");
    });

    app.post('/apply_lecture_' + lecture_ids[5].dataValues.lecture_id, async function(req, res) {
      let body = req.body;
      models.BettingLecture.create({
        email: decodeURIComponent(req.cookies.user_email),
        lecture_id: lecture_ids[5].dataValues.lecture_id,
        betting_points: body.betting_cost
      });
      models.User.update(
        {points: req.cookies.points-body.betting_cost},
        {where: {email: decodeURIComponent(req.cookies.user_email)}}
        );
      res.cookie("points", req.cookies.points-body.betting_cost, {overwrite: true});
      res.redirect("/applyLecture");
    });

    app.post('/apply_lecture_' + lecture_ids[6].dataValues.lecture_id, async function(req, res) {
      let body = req.body;
      models.BettingLecture.create({
        email: decodeURIComponent(req.cookies.user_email),
        lecture_id: lecture_ids[6].dataValues.lecture_id,
        betting_points: body.betting_cost
      });
      models.User.update(
        {points: req.cookies.points-body.betting_cost},
        {where: {email: decodeURIComponent(req.cookies.user_email)}}
        );
      res.cookie("points", req.cookies.points-body.betting_cost, {overwrite: true});
      res.redirect("/applyLecture");
    });

    app.post('/apply_lecture_' + lecture_ids[7].dataValues.lecture_id, async function(req, res) {
      let body = req.body;
      models.BettingLecture.create({
        email: decodeURIComponent(req.cookies.user_email),
        lecture_id: lecture_ids[7].dataValues.lecture_id,
        betting_points: body.betting_cost
      });
      models.User.update(
        {points: req.cookies.points-body.betting_cost},
        {where: {email: decodeURIComponent(req.cookies.user_email)}}
        );
      res.cookie("points", req.cookies.points-body.betting_cost, {overwrite: true});
      res.redirect("/applyLecture");
    });

    app.post('/apply_lecture_' + lecture_ids[8].dataValues.lecture_id, async function(req, res) {
      let body = req.body;
      models.BettingLecture.create({
        email: decodeURIComponent(req.cookies.user_email),
        lecture_id: lecture_ids[8].dataValues.lecture_id,
        betting_points: body.betting_cost
      });
      models.User.update(
        {points: req.cookies.points-body.betting_cost},
        {where: {email: decodeURIComponent(req.cookies.user_email)}}
        );
      res.cookie("points", req.cookies.points-body.betting_cost, {overwrite: true});
      res.redirect("/applyLecture");
    });

    app.post('/apply_lecture_' + lecture_ids[9].dataValues.lecture_id, async function(req, res) {
      let body = req.body;
      models.BettingLecture.create({
        email: decodeURIComponent(req.cookies.user_email),
        lecture_id: lecture_ids[9].dataValues.lecture_id,
        betting_points: body.betting_cost
      });
      models.User.update(
        {points: req.cookies.points-body.betting_cost},
        {where: {email: decodeURIComponent(req.cookies.user_email)}}
        );
      res.cookie("points", req.cookies.points-body.betting_cost, {overwrite: true});
      res.redirect("/applyLecture");
    });

    app.post('/apply_lecture_' + lecture_ids[10].dataValues.lecture_id, async function(req, res) {
      let body = req.body;
      models.BettingLecture.create({
        email: decodeURIComponent(req.cookies.user_email),
        lecture_id: lecture_ids[10].dataValues.lecture_id,
        betting_points: body.betting_cost
      });
      models.User.update(
        {points: req.cookies.points-body.betting_cost},
        {where: {email: decodeURIComponent(req.cookies.user_email)}}
        );
      res.cookie("points", req.cookies.points-body.betting_cost, {overwrite: true});
      res.redirect("/applyLecture");
    });

    app.post('/apply_lecture_' + lecture_ids[11].dataValues.lecture_id, async function(req, res) {
      let body = req.body;
      models.BettingLecture.create({
        email: decodeURIComponent(req.cookies.user_email),
        lecture_id: lecture_ids[11].dataValues.lecture_id,
        betting_points: body.betting_cost
      });
      models.User.update(
        {points: req.cookies.points-body.betting_cost},
        {where: {email: decodeURIComponent(req.cookies.user_email)}}
        );
      res.cookie("points", req.cookies.points-body.betting_cost, {overwrite: true});
      res.redirect("/applyLecture");
    });

    app.post("/delete_lecture_" + lecture_ids[0].dataValues.lecture_id, async function(req,res) {
      var lp = await models.BettingLecture.findOne({
        where: {
          email: decodeURIComponent(req.cookies.user_email),
          lecture_id: lecture_ids[0].dataValues.lecture_id,
        },
        attributes: ['betting_points']
      })

      models.User.update(
        {points: Number(req.cookies.points)+Number(lp.dataValues.betting_points)},
        {where: {email: decodeURIComponent(req.cookies.user_email)}}
        );
      res.cookie("points", Number(req.cookies.points)+Number(lp.dataValues.betting_points), {overwrite: true});

      models.BettingLecture.destroy({
        where: {
          email: decodeURIComponent(req.cookies.user_email),
          lecture_id: lecture_ids[0].dataValues.lecture_id,
        }
      });
      res.redirect("/appliedLecture");
  });

  app.post("/delete_lecture_" + lecture_ids[1].dataValues.lecture_id, async function(req,res) {
    var lp = await models.BettingLecture.findOne({
      where: {
        email: decodeURIComponent(req.cookies.user_email),
        lecture_id: lecture_ids[1].dataValues.lecture_id,
      },
      attributes: ['betting_points']
    })

    models.User.update(
      {points: Number(req.cookies.points)+Number(lp.dataValues.betting_points)},
      {where: {email: decodeURIComponent(req.cookies.user_email)}}
      );
    res.cookie("points", Number(req.cookies.points)+Number(lp.dataValues.betting_points), {overwrite: true});

    models.BettingLecture.destroy({
      where: {
        email: decodeURIComponent(req.cookies.user_email),
        lecture_id: lecture_ids[1].dataValues.lecture_id,
      }
    });
    res.redirect("/appliedLecture");
});

app.post("/delete_lecture_" + lecture_ids[2].dataValues.lecture_id, async function(req,res) {
  var lp = await models.BettingLecture.findOne({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[2].dataValues.lecture_id,
    },
    attributes: ['betting_points']
  })

  models.User.update(
    {points: Number(req.cookies.points)+Number(lp.dataValues.betting_points)},
    {where: {email: decodeURIComponent(req.cookies.user_email)}}
    );
  res.cookie("points", Number(req.cookies.points)+Number(lp.dataValues.betting_points), {overwrite: true});

  models.BettingLecture.destroy({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[2].dataValues.lecture_id,
    }
  });
  res.redirect("/appliedLecture");
});

app.post("/delete_lecture_" + lecture_ids[3].dataValues.lecture_id, async function(req,res) {
  var lp = await models.BettingLecture.findOne({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[3].dataValues.lecture_id,
    },
    attributes: ['betting_points']
  })

  models.User.update(
    {points: Number(req.cookies.points)+Number(lp.dataValues.betting_points)},
    {where: {email: decodeURIComponent(req.cookies.user_email)}}
    );
  res.cookie("points", Number(req.cookies.points)+Number(lp.dataValues.betting_points), {overwrite: true});

  models.BettingLecture.destroy({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[3].dataValues.lecture_id,
    }
  });
  res.redirect("/appliedLecture");
});

app.post("/delete_lecture_" + lecture_ids[4].dataValues.lecture_id, async function(req,res) {
  var lp = await models.BettingLecture.findOne({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[4].dataValues.lecture_id,
    },
    attributes: ['betting_points']
  })

  models.User.update(
    {points: Number(req.cookies.points)+Number(lp.dataValues.betting_points)},
    {where: {email: decodeURIComponent(req.cookies.user_email)}}
    );
  res.cookie("points", Number(req.cookies.points)+Number(lp.dataValues.betting_points), {overwrite: true});

  models.BettingLecture.destroy({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[4].dataValues.lecture_id,
    }
  });
  res.redirect("/appliedLecture");
});

app.post("/delete_lecture_" + lecture_ids[5].dataValues.lecture_id, async function(req,res) {
  var lp = await models.BettingLecture.findOne({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[5].dataValues.lecture_id,
    },
    attributes: ['betting_points']
  })

  models.User.update(
    {points: Number(req.cookies.points)+Number(lp.dataValues.betting_points)},
    {where: {email: decodeURIComponent(req.cookies.user_email)}}
    );
  res.cookie("points", Number(req.cookies.points)+Number(lp.dataValues.betting_points), {overwrite: true});

  models.BettingLecture.destroy({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[5].dataValues.lecture_id,
    }
  });
  res.redirect("/appliedLecture");
});

app.post("/delete_lecture_" + lecture_ids[6].dataValues.lecture_id, async function(req,res) {
  var lp = await models.BettingLecture.findOne({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[6].dataValues.lecture_id,
    },
    attributes: ['betting_points']
  })

  models.User.update(
    {points: Number(req.cookies.points)+Number(lp.dataValues.betting_points)},
    {where: {email: decodeURIComponent(req.cookies.user_email)}}
    );
  res.cookie("points", Number(req.cookies.points)+Number(lp.dataValues.betting_points), {overwrite: true});

  models.BettingLecture.destroy({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[6].dataValues.lecture_id,
    }
  });
  res.redirect("/appliedLecture");
});

app.post("/delete_lecture_" + lecture_ids[7].dataValues.lecture_id, async function(req,res) {
  var lp = await models.BettingLecture.findOne({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[7].dataValues.lecture_id,
    },
    attributes: ['betting_points']
  })

  models.User.update(
    {points: Number(req.cookies.points)+Number(lp.dataValues.betting_points)},
    {where: {email: decodeURIComponent(req.cookies.user_email)}}
    );
  res.cookie("points", Number(req.cookies.points)+Number(lp.dataValues.betting_points), {overwrite: true});

  models.BettingLecture.destroy({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[7].dataValues.lecture_id,
    }
  });
  res.redirect("/appliedLecture");
});

app.post("/delete_lecture_" + lecture_ids[8].dataValues.lecture_id, async function(req,res) {
  var lp = await models.BettingLecture.findOne({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[8].dataValues.lecture_id,
    },
    attributes: ['betting_points']
  })

  models.User.update(
    {points: Number(req.cookies.points)+Number(lp.dataValues.betting_points)},
    {where: {email: decodeURIComponent(req.cookies.user_email)}}
    );
  res.cookie("points", Number(req.cookies.points)+Number(lp.dataValues.betting_points), {overwrite: true});

  models.BettingLecture.destroy({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[8].dataValues.lecture_id,
    }
  });
  res.redirect("/appliedLecture");
});

app.post("/delete_lecture_" + lecture_ids[9].dataValues.lecture_id, async function(req,res) {
  var lp = await models.BettingLecture.findOne({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[9].dataValues.lecture_id,
    },
    attributes: ['betting_points']
  })

  models.User.update(
    {points: Number(req.cookies.points)+Number(lp.dataValues.betting_points)},
    {where: {email: decodeURIComponent(req.cookies.user_email)}}
    );
  res.cookie("points", Number(req.cookies.points)+Number(lp.dataValues.betting_points), {overwrite: true});

  models.BettingLecture.destroy({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[9].dataValues.lecture_id,
    }
  });
  res.redirect("/appliedLecture");
});

app.post("/delete_lecture_" + lecture_ids[10].dataValues.lecture_id, async function(req,res) {
  var lp = await models.BettingLecture.findOne({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[10].dataValues.lecture_id,
    },
    attributes: ['betting_points']
  })

  models.User.update(
    {points: Number(req.cookies.points)+Number(lp.dataValues.betting_points)},
    {where: {email: decodeURIComponent(req.cookies.user_email)}}
    );
  res.cookie("points", Number(req.cookies.points)+Number(lp.dataValues.betting_points), {overwrite: true});

  models.BettingLecture.destroy({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[10].dataValues.lecture_id,
    }
  });
  res.redirect("/appliedLecture");
});

app.post("/delete_lecture_" + lecture_ids[11].dataValues.lecture_id, async function(req,res) {
  var lp = await models.BettingLecture.findOne({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[11].dataValues.lecture_id,
    },
    attributes: ['betting_points']
  })

  models.User.update(
    {points: Number(req.cookies.points)+Number(lp.dataValues.betting_points)},
    {where: {email: decodeURIComponent(req.cookies.user_email)}}
    );
  res.cookie("points", Number(req.cookies.points)+Number(lp.dataValues.betting_points), {overwrite: true});

  models.BettingLecture.destroy({
    where: {
      email: decodeURIComponent(req.cookies.user_email),
      lecture_id: lecture_ids[11].dataValues.lecture_id,
    }
  });
  res.redirect("/appliedLecture");
});
}