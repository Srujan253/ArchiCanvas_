const Community = require('../models/community.model');
const ErrorHandler = require('../utils/errorHandler');
const Message = require('../models/message.model'); // <-- Add this


// ... (createCommunity, getAllCommunities functions remain the same) ...
exports.createCommunity = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return next(new ErrorHandler('Please provide a name and description.', 400));
        }
        const newCommunity = await Community.create({
            name,
            description,
            creator: req.user.id,
            members: [req.user.id] // The creator is the first member
        });
        res.status(201).json({
            status: 'success',
            message: 'Community created successfully! It is now pending admin approval.',
            data: { community: newCommunity }
        });
    } catch (error) {
        next(error);
    }
};

// --- Get all VISIBLE communities (for all logged-in users) ---
exports.getAllCommunities = async (req, res, next) => {
    try {
        // KEY LOGIC: Only fetch communities with status: 'approved' for the public list
        let queryObj = { status: 'approved' };

        // Handle search queries
        if (req.query.search) {
            queryObj.$or = [
                { name: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        const communities = await Community.find(queryObj).populate('creator', 'name');
        res.status(200).json({
            status: 'success',
            results: communities.length,
            data: { communities }
        });
    } catch (error) {
        next(error);
    }
};

// --- Get a single community's details ---
exports.getCommunityById = async (req, res, next) => {
    try {
        const community = await Community.findById(req.params.id)
            .populate('creator', 'name')
            .populate('members', 'name email') // Populate member details
            .populate('pendingMembers', 'name email'); // Also populate pending members for the owner

        // SECURITY: Ensure the community exists and is approved before showing details
        // (Admins or the creator might be able to see pending ones in a different route)
        if (!community || community.status !== 'approved') {
            return next(new ErrorHandler('Community not found or is not yet approved.', 404));
        }
        res.status(200).json({ status: 'success', data: { community } });
    } catch (error) {
        next(error);
    }
};

// --- User requests to join a community ---
exports.requestToJoinCommunity = async (req, res, next) => {
    try {
        const communityId = req.params.id;
        const userId = req.user.id;
        const community = await Community.findByIdAndUpdate(
            communityId,
            { $addToSet: { pendingMembers: userId } },
            { new: true }
        );
        if (!community) return next(new ErrorHandler('Community not found.', 404));
        res.status(200).json({ status: 'success', message: 'Your request to join has been sent to the owner for approval.' });
    } catch (error) {
        next(error);
    }
};
// --- User requests to join a community ---
exports.requestToJoinCommunity = async (req, res, next) => {
    try {
        const communityId = req.params.id;
        const userId = req.user.id;

        // Add the user to the pendingMembers list
        const community = await Community.findByIdAndUpdate(
            communityId,
            { $addToSet: { pendingMembers: userId } }, // Use $addToSet to prevent duplicates
            { new: true }
        );

        if (!community) return next(new ErrorHandler('Community not found.', 404));

        res.status(200).json({ status: 'success', message: 'Your request to join has been sent to the owner for approval.' });
    } catch (error) {
        next(error);
    }
};

// --- OWNER: Get pending join requests for their community ---
exports.getPendingRequests = async (req, res, next) => {
    try {
        // We can get the community from the isCommunityCreator middleware
        const community = await Community.findById(req.params.id).populate('pendingMembers', 'name email');
        
        res.status(200).json({
            status: 'success',
            data: {
                pendingRequests: community.pendingMembers
            }
        });
    } catch (error) {
        next(error);
    }
};

// --- OWNER: Approve a user's join request ---
exports.approveMember = async (req, res, next) => {
    try {
        const communityId = req.params.id;
        const { memberId } = req.body; // The ID of the user to approve

        if (!memberId) return next(new ErrorHandler('Please provide the member ID to approve.', 400));
        
        const community = await Community.findByIdAndUpdate(
            communityId,
            {
                $pull: { pendingMembers: memberId }, // Remove from pending
                $addToSet: { members: memberId },    // Add to approved members
                $inc: { memberCount: 1 }            // Increment member count
            },
            { new: true }
        );

        res.status(200).json({ status: 'success', message: 'Member has been approved.', data: { community } });
    } catch (error) {
        next(error);
    }
};

// --- OWNER: Reject a user's join request ---
exports.rejectMember = async (req, res, next) => {
    try {
        const communityId = req.params.id;
        const { memberId } = req.body; // The ID of the user to reject

        if (!memberId) return next(new ErrorHandler('Please provide the member ID to reject.', 400));

        await Community.findByIdAndUpdate(communityId, { $pull: { pendingMembers: memberId } });
        
        res.status(200).json({ status: 'success', message: 'Member has been rejected.' });
    } catch (error) {
        next(error);
    }
};

// --- Get all messages for a specific community ---
exports.getCommunityMessages = async (req, res, next) => {
    try {
        const messages = await Message.find({ community: req.params.id })
            .sort('createdAt')
            .populate('author', 'name'); // Get the author's name

        res.status(200).json({ status: 'success', data: { messages } });
    } catch (error) {
        next(error);
    }
};

// --- Post a new message in a community ---
exports.postMessage = async (req, res, next) => {
    try {
        const { content } = req.body;
        if (!content) return next(new ErrorHandler('Message content cannot be empty.', 400));

        const newMessage = await Message.create({
            content,
            author: req.user.id,
            community: req.params.id
        });
        
        // Populate author details for the response
        const populatedMessage = await Message.findById(newMessage._id).populate('author', 'name');

        res.status(201).json({ status: 'success', data: { message: populatedMessage } });
    } catch (error) {
        next(error);
    }
};

// --- Leave a community ---
exports.leaveCommunity = async (req, res, next) => {
    try {
        const communityId = req.params.id;
        const userId = req.user.id;

        const updatedCommunity = await Community.findByIdAndUpdate(
            communityId,
            { 
                $pull: { members: userId }, // Use $pull to remove user from members array
                $inc: { memberCount: -1 }
            },
            { new: true }
        );

        if (!updatedCommunity) return next(new ErrorHandler('Community not found.', 404));

        res.status(200).json({ status: 'success', message: 'You have left the community.' });
    } catch (error) {
        next(error);
    }
};