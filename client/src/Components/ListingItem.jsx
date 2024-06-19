import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./ListingStyle.css";

const ListingItem = ({ listing }) => {
  return (
    <Link to={`/listing/${listing._id}`} className="block w-full h-full">
      <motion.li
        className="card border rounded-lg shadow-lg overflow-hidden relative"
        whileHover={{ scale: 1.05 }} /* Example of hover animation */
      >
        <div className="relative">
          <motion.img
            src={listing.imageUrls[0]}
            alt={listing.name}
            className="card__img object-cover w-full"
          />
          <div className="card__overlay absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100">
            <p className="text-white text-xl font-bold">View Product</p>
          </div>
        </div>
        <div className="card__details p-4">
          <motion.p
            className="card__name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
          >
            {listing.name}
          </motion.p>
          {/* <motion.p
            className="card__description text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4 } }}
          >
            {listing.description}
          </motion.p> */}
          <motion.p
            className="card__series text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6 } }}
          >
            Series: {listing.series}
          </motion.p>
          <motion.p
            className="card__price text-lg font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.8 } }}
          >
            Price: {listing.price}
          </motion.p>
        </div>
      </motion.li>
    </Link>
  );
};

export default ListingItem;
