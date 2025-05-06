const express = require("express");
const router = express.Router();
const {getCompetitionsByCategory } = require("../controllers/competitionsController");
router.get('/:category', getCompetitionsByCategory); 


module.exports = router;
