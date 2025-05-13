const Competition = require('../models/Competition');

exports.createCompetition = async (req, res) => {
  try {
    const { ownerId, category, score=0,ownerEmail } = req.body;
    if (!ownerId || !category || !ownerEmail || !req.file) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newCompetition = new Competition({
      ownerId,
      category,
      score,
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

