const Product = require("../models/Product");
const sendEmail = require("../utils/email");
// Upload product (sell OR auction)
const ErrorHandler = require('../utils/errorHandler');

exports.createProduct = async (req, res) => {
    try {
        const { title, description, price, isBiddable, biddingDays, tags } = req.body;
        const filePath = req.file ? `/${req.file.filename}` : null;
        

        let biddingEndTime = null;
        if (isBiddable === "true") {
            const days = Math.min(Math.max(parseInt(biddingDays), 1), 3);
            biddingEndTime = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
        }

        const product = new Product({
            title,
            description,
            photo: filePath,
            price,
            isBiddable: isBiddable === "true",
            biddingEndTime,
            tags: tags ? JSON.parse(tags) : [],
            // --- ADD THIS LINE ---
            user: req.user.id // Get the user ID from the isAuthenticatedUser middleware
        });

        await product.save();
        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Single Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Not Found" });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.notifyArtistForPurchase = async (req, res, next) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return next(new ErrorHandler('Product ID is missing from the URL.', 400));
        }

        const product = await Product.findById(productId).populate('user');
        if (!product) {
            return next(new ErrorHandler('Product not found', 404));
        }
        console.log("gi",product)
        if (!product.user) {
            return next(new ErrorHandler('The artist for this product could not be found.', 404));
        }

        const artist = product.user;
        const buyer = req.user;
          console.log(artist , buyer , "hiiii" )
        if (artist._id.toString() === buyer._id.toString()) {
            return next(new ErrorHandler('You cannot buy your own artwork.', 400));
        }

        const emailText = `
            Hi ${artist.name},
            A buyer is interested in purchasing your artwork: "${product.title}".
            You can contact them directly to arrange the sale.
            Buyer's Name: ${buyer.name}
            Buyer's Email: ${buyer.email}
            - The ArchiCanvas Team
        `;
        
        await sendEmail({
            to: artist.email,
            subject: `Purchase Inquiry for your artwork: "${product.title}"`,
            text: emailText,
        });

        res.status(200).json({ success: true, message: "Purchase inquiry sent to the artist!" });

    } catch (error) {
        next(error);
    }
};