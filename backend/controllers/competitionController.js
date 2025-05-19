const Competition = require('../models/Competition');

exports.createCompetition = async (req, res) => {
  try {
    const { ownerId, category, rating=0,ownerEmail } = req.body;
    if (!ownerId || !category || !ownerEmail || !req.file) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newCompetition = new Competition({
      ownerId,
      category,
      rating,
      ownerEmail,
      file: req.file.path
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
  const { rating } = req.body;

  try {
    const competition = await Competition.findById(competitionId);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    competition.rating += rating;
    await competition.save(); 

    res.status(200).json({ message: 'Score updated successfully', competition });
  } catch (error) {
    console.error('Error updating score:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


