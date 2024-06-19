import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./ListingStyle.css";

const ListingItem = ({ listing }) => {
  return (
    <Link to={`/listing/${listing._id}`} className="block w-full h-full">
      <motion.li
        className="custom-card" // Updated class name for the card
        whileHover={{ scale: 1.05 }}
      >
        <div className="custom-card-img">
          <motion.img
            src={listing.imageUrls[0]}
            alt={listing.name}
            className="custom-img"
          />
        </div>
        <div className="custom-card-title">{listing.name}</div>
        <div className="custom-card-subtitle">{listing.series}</div>
        <hr className="custom-card-divider" />
        <div className="custom-card-footer">
          <div className="custom-card-price">{listing.price}</div>
        </div>
      </motion.li>
    </Link>
  );
};

export default ListingItem;
