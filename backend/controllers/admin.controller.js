const User = require('../models/user.model');
const Product = require('../models/Product');
const Community = require('../models/community.model');
const ErrorHandler = require('../utils/errorHandler');
const Message = require('../models/message.model');


// --- Get all key stats for the dashboard ---
exports.getDashboardStats = async (req, res, next) => {
    try {
        // Run all count queries in parallel for efficiency
        const [
            totalBuyers,
            totalArtists,
            totalProducts,
            totalCommunities
        ] = await Promise.all([
            User.countDocuments({ role: 'buyer' }),
            User.countDocuments({ role: 'artist' }),
            Product.countDocuments(),
            Community.countDocuments({ status: 'approved' }) // Only count approved communities
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalBuyers,
                totalArtists,
                totalProducts,
                totalCommunities
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.getPendingArtists = async (req, res, next) => {
    try {
        const artists = await User.find({ role: 'artist', status: 'pending' });
        res.status(200).json({ success: true, artists });
    } catch (error) {
        next(error);
    }
};

exports.approveArtist = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { status: 'approved' });
        res.status(200).json({ success: true, message: 'Artist approved successfully.' });
    } catch (error) {
        next(error);
    }
};

exports.rejectArtist = async (req, res, next) => {
    try {
        // You could also delete the user: await User.findByIdAndDelete(req.params.id);
        await User.findByIdAndUpdate(req.params.id, { status: 'rejected' });
        res.status(200).json({ success: true, message: 'Artist rejected successfully.' });
    } catch (error) {
        next(error);
    }
};

// --- COMMUNITY REQUESTS ---
exports.getPendingCommunities = async (req, res, next) => {
    try {
        const communities = await Community.find({ status: 'pending' }).populate('creator', 'name');
        res.status(200).json({ success: true, communities });
    } catch (error) {
        next(error);
    }
};

exports.approveCommunity = async (req, res, next) => {
    try {
        await Community.findByIdAndUpdate(req.params.id, { status: 'approved' });
        res.status(200).json({ success: true, message: 'Community approved successfully.' });
    } catch (error) {
        next(error);
    }
};

exports.rejectCommunity = async (req, res, next) => {
    try {
        await Community.findByIdAndUpdate(req.params.id, { status: 'rejected' });
        res.status(200).json({ success: true, message: 'Community rejected successfully.' });
    } catch (error) {
        next(error);
    }
};

exports.getAnalyticsData = async (req, res, next) => {
    try {
        // 1. Top 10 Communities by member count
        const topCommunities = await Community.find({ status: 'approved' })
            .sort({ memberCount: -1 })
            .limit(10)
            .select('name memberCount');

        // 2. Messages sent per day for the last 30 days
        const oneMonthAgo = new Date();
        oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
        const messagesOverTime = await Message.aggregate([
            { $match: { createdAt: { $gte: oneMonthAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } },
            { $project: { date: "$_id", count: 1, _id: 0 } }
        ]);

        // 3. Top 5 Artists by number of artworks uploaded
        const topArtists = await Product.aggregate([
            { $group: { _id: "$user", artworkCount: { $sum: 1 } } },
            { $sort: { artworkCount: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'artistDetails'
                }
            },
            { $unwind: "$artistDetails" },
            { $project: { name: "$artistDetails.name", artworkCount: 1, _id: 0 } }
        ]);

        // 4. Artwork distribution by tags/category
        const artworkByCategory = await Product.aggregate([
            { $unwind: "$tags" },
            { $group: { _id: "$tags", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $project: { name: "$_id", value: "$count", _id: 0 } }
        ]);

        res.status(200).json({
            success: true,
            analytics: {
                topCommunities,
                messagesOverTime,
                topArtists,
                artworkByCategory
            }
        });

    } catch (error) {
        next(error);
    }
};