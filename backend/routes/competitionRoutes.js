const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");

const { getCompetitionsByCategory,getUserCompetitionsByUserId ,createCompetition, updateRating ,deleteCompetition, getLeadCompetitionsByCategory} = require("../controllers/competitionController");
const upload = multer({ storage });

router.get('/:category', getCompetitionsByCategory);
router.post("/", upload.single("image"), createCompetition);
router.put("/update/:competitionId", updateRating);
router.delete("/:competitionId", deleteCompetition);
router.get('/top/:category', getLeadCompetitionsByCategory);
router.get('/UserCompetitions/:userId',getUserCompetitionsByUserId)
module.exports = router;