const express = require('express');
const upload = require('../middlewares/multer.js');
const { registerTalent } = require('../controllers/talentController.js');
const { getPendingTalents } = require("../controllers/getPendingTalents.js")
const { approveTalent } = require("../controllers/approveTalent.js")
const { removeTalent } = require("../controllers/removeTalent.js")
const { getAllApprovedTalents } = require('../controllers/allapproved.js')
const { registerClient , clientLogin } = require('../controllers/clientController.js')
const { createHireRequest } = require('../controllers/hireController.js')
const { updateHireRequestStatus } = require('../controllers/adminController.js')
const {verifyToken } = require('../middlewares/auth.js')
const { getPendingHireRequests } = require('../controllers/hireRequestController');
const router = express.Router();

router.post('/register', upload.single('profilePhoto'), registerTalent);

router.get('/pending', getPendingTalents);

router.put('/approve/:talentId', approveTalent);

router.delete('/remove/:talentId', removeTalent);

router.get('/approved-talents', getAllApprovedTalents);

router.post('/client-register', registerClient);

router.post("/client-login", clientLogin);

router.post('/hire', createHireRequest);

router.put('/hire/:requestId/status', updateHireRequestStatus);

router.get('/pending-hirerrequests', getPendingHireRequests);

module.exports = router;
