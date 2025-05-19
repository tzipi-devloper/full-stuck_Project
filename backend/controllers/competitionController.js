const Competition = require('../models/Competition');

exports.createCompetition = async (req, res) => {
  try {
    console.log("הנתונים שקיבלתי:", JSON.stringify(req.body));
    const { ownerId, category, rating=0,ownerEmail } = req.body;
    if (!ownerId || !category || !ownerEmail || !req.file) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newCompetition = new Competition({
      ownerId,
      category,
      rating,
      ownerEmail,
      fileUrl: req.file.path
    });

    await newCompetition.save();
    res.status(201).json(newCompetition);
 } catch (error) {
  console.error('Error creating competition:', error.message, error.stack);
  res.status(500).json({ message: error.message, stack: error.stack });
}
};
exports.getCompetitionsByCategory = async (req, res) => {
    let {category} = req.params;
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }
    try {
      const competitions = await Competition.find({  category:category });
      res.json(competitions);

    } catch (error) {
      console.error('Failed to get competitions by category:', error);
      res.status(500).json({ message: 'Failed to get competitions by category' });
    }
  };
exports.updateRating = async (req, res) => {
  const { competitionId } = req.params;
  const { rating, userId } = req.body;

  try {
    const competition = await Competition.findById(competitionId);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    if (competition.ratedBy.includes(userId)) {
      return res.status(400).json({ message: 'User has already rated this competition' });
    }

    competition.rating += rating;
    competition.ratedBy.push(userId);
    console.log("fileUrl:", competition.fileUrl);
    await competition.save(); // שומר את הדירוג החדש

    res.status(200).json({ message: 'Score updated successfully', competition });
  } catch (error) {
    console.error('Error updating score:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




