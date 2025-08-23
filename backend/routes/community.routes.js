const express = require('express');
const router = express.Router();
const communityController = require('../controllers/community.controller');
// Import the new isCommunityCreator middleware
const { isAuthenticatedUser, restrictTo, isCommunityCreator } = require('../middleware/auth');

// == Public Routes (for artists and buyers) ==
router.get('/', isAuthenticatedUser, communityController.getAllCommunities);
router.post('/', isAuthenticatedUser, communityController.createCommunity);
router.get('/:id', isAuthenticatedUser, communityController.getCommunityById);
router.post('/:id/request-join', isAuthenticatedUser, communityController.requestToJoinCommunity); // Renamed from '/join'
router.post('/:id/leave', isAuthenticatedUser, communityController.leaveCommunity);

// == Community Owner Routes (Protected by isCommunityCreator middleware) ==
router.get('/:id/pending-requests', isAuthenticatedUser, isCommunityCreator, communityController.getPendingRequests);
router.post('/:id/approve-member', isAuthenticatedUser, isCommunityCreator, communityController.approveMember);
router.post('/:id/reject-member', isAuthenticatedUser, isCommunityCreator, communityController.rejectMember);

// == Message Routes (remain the same) ==
router.get('/:id/messages', isAuthenticatedUser, communityController.getCommunityMessages);
router.post('/:id/messages', isAuthenticatedUser, communityController.postMessage);

module.exports = router;