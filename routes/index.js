var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });

// });

// router.post('/', function(req,res){
//   res.render('index1')

// })

const fs = require("fs");
const { type } = require('os');

/* GET home page. */
router.get('/', function (req, res) {
  fs.readdir(`./uplodes`, { withFileTypes: true }, function (err, files) {
    res.render("index", { files });
  })
});

router.get('/creatfile', function (req, res) {
  fs.writeFile(`./uplodes/${req.query.filename}`,"", function (err) {
    if (err) res.send(err);
    else res.redirect("/")
      // res.send("bangai")
      ;
  });

})

router.get('/creatfolder', function (req, res) {
  fs.mkdir(`./uplodes/${req.query.foldername} `, function (err) {
    if (err) res.send(err);
    else res.redirect("/")
      // res.send("bangai")
      ;
  });
})


router.get('/delete/:type/:filename', function (req, res) {
  if (req.params.type === "folder") {
    fs.rmdir(`./uplodes/${req.params.filename} `, function (err) {
      res.redirect("back");
    })
  } else {
    fs.unlink(`./uplodes/${req.params.filename}`, function (err) {
      res.redirect("back");
    })
  }
});

router.get('/file/:filename', function (req, res) {
  fs.readdir(`./uplodes`, { withFileTypes: true }, function (err, files) {
    fs.readFile(`./uplodes/${req.params.filename}`,"utf-8",function(err,filedata){
      res.render("opened", { files, filename: req.params.filename ,filedata });
    })
  
  })
});   


router.post('/update/:filename', function (req,res) {
  fs.writeFile(`./uplodes/${req.params.filename}`, req.body.data, function (err) {
    res.redirect("back");
  })
});

router.post('/updatename/:oldfilename', function(req,res){
  fs.rename(`./uplodes/${req.params.oldfilename}`,`./uplodes/${req.body.filename}`,function(err){
    if (err) res.send(err);
    else res.redirect("/");
  })
});

  
module.exports = router;
