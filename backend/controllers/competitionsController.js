const Competition = require('../models/competitions');
exports.getCompetitionsByCategory = async (req, res) => {
    const {category} = req.params;
    console.log(category);
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