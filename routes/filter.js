const express = require('express');
const router = express.Router();
const newsArticleControllers = require('../controllers/filter');

router.get('/', newsArticleControllers.getNewsArticles);

module.exports = router;