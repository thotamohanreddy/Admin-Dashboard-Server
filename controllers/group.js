const NewsArticle = require('../models/newsArticle');

exports.groupByCountry = async (req, res) => {
    try {
        const groupBy = { _id: "$country", count: { $sum: 1 } };

        const result = await NewsArticle.aggregate([
            { $group: groupBy },
            { $sort: { count: -1 } }
        ]);

        const formattedResult = result.map(({ _id, count }) => ({
            country: _id === "" ? "Other" : _id,
            count
        }));

        res.json(formattedResult);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.groupByField = async function groupByField(req, res) {
  try {
    const { field } = req.query;

    if (!field) {
      return res.status(400).json({ message: 'Field is required for grouping' });
    }

    const groupBy = { _id: `$${field}`, count: { $sum: 1 } };

    const result = await NewsArticle.aggregate([
      { $group: groupBy },
      { $sort: { count: -1 } }
    ]);

    const formattedResult = result.map(({ _id, count }) => ({
      id: _id === '' ? 'Other' : _id,
      count
    }));

    res.json(formattedResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
