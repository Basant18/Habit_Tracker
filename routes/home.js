const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');


//routes for allhabits and track status
router.get('/', homeController.home);
router.post('/addHabit', homeController.addHabit);
router.get('/deleteHabit/:id', homeController.deleteHabit);
router.get('/taskStatus/:id', homeController.taskStatus);
router.get('/taskUpdate', homeController.taskUpdate);

module.exports = router;