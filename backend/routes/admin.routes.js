const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { isAuthenticatedUser, restrictTo } = require('../middleware/auth');

// This route is protected and can only be accessed by logged-in admins
router.get('/stats', isAuthenticatedUser, restrictTo('admin'), adminController.getDashboardStats);
// --- Artist Approval Routes ---
router.get('/artists/pending', adminController.getPendingArtists);
router.patch('/artists/:id/approve', adminController.approveArtist);
router.patch('/artists/:id/reject', adminController.rejectArtist);

// --- Community Approval Routes ---
router.get('/communities/pending', adminController.getPendingCommunities);
router.patch('/communities/:id/approve', adminController.approveCommunity);
router.patch('/communities/:id/reject', adminController.rejectCommunity);
router.get('/analytics', adminController.getAnalyticsData);


module.exports = router;