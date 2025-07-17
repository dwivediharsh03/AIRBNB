const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
// INDEX
module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index", { allListing });
};

// NEW FORM
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

// CREATE
module.exports.createListing = async (req, res, next) => {
    try {
        let response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
            .send();

          


        let url = req.file.path;
        let filename = req.file.filename;
        const listing = req.body.listing;
        const newListing = new Listing(listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        newListing.geometry= response.body.features[0].geometry;
        let saveListing= await newListing.save();
        console.log(saveListing);

        req.flash("success", "New Listing Created");
        res.redirect("/listings");
    } catch (err) {
        next(err);
    }
};

// SHOW
module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show", { listing });
};

// EDIT FORM
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit", { listing, originalImageUrl });
};

// UPDATE
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {

        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

// DELETE
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};
