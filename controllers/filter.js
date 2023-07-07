const NewsArticle = require('../models/newsArticle');

exports.getNewsArticles = async (req, res) => {
  try {
    const { sortBy, sortOrder, limitFields, page, limit, ...filters } = req.query;

    // Construct the query object based on the provided query parameters
    const query = {};
    for (const key in filters) {
      query[key] = filters[key];
    }

    // Construct the projection object for limiting fields
    let projection;
    if (limitFields) {
      const fields = limitFields.split(',').join(' ');
      projection = fields;
    }

    // Construct the sort object based on sortBy and sortOrder parameters
    let sort;
    if (sortBy) {
      sort = {};
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    // Apply pagination
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 1000;
    const skip = (pageNumber - 1) * pageSize;
    const totalDocuments = await NewsArticle.find(query)
      .countDocuments();
    const totalPages = Math.ceil(totalDocuments / pageSize);

    const newsArticles = await NewsArticle.find(query, projection)
      .sort(sort)
      .skip(skip)
      .limit(pageSize);
    const modifiedNewsArticles = newsArticles.map((paper, index) => ({
      id: index + 1,
      ...paper._doc,
    }));
    res.json({
      data: modifiedNewsArticles,
      pageNumber,
      pageSize,
      totalPages,
      totalDocuments
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNewsArticlesById = async (req, res)=> {
  try {
    const { id } = req.params;

    const newsArticles = await NewsArticle.findById(id);

    if (!newsArticles) {
      return res.status(404).json({ message: 'Research paper not found' });
    }

    res.json(newsArticles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
