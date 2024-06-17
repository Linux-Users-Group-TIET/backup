import Listing from "../listing.model.js";

export const createListing = async (req,res,next)=> {
try {
    
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);

} catch (error) {
    next(error);
}
}

export const getListings = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      const searchTerm = req.query.searchTerm || '';
      const sort = req.query.sort || 'createdAt';
      const order = req.query.order || 'desc';
  
      const filter = {
        name: { $regex: searchTerm, $options: 'i' }
      };
  
      // Add series filter if provided
      if (req.query.series) {
        filter.series = req.query.series;
      }
  
      // Add price filter if provided
      if (req.query.minPrice || req.query.maxPrice) {
        filter.price = {};
        if (req.query.minPrice) {
          filter.price.$gte = parseFloat(req.query.minPrice);
        }
        if (req.query.maxPrice) {
          filter.price.$lte = parseFloat(req.query.maxPrice);
        }
      }
  
      const listings = await Listing.find(filter)
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };
  

export const getListingById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};