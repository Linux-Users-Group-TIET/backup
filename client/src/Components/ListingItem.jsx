import React from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion

function ListingItem({ listing }) {
  return (
    <motion.li
      className="border rounded-lg shadow-md overflow-hidden relative"
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative">
        {/* Full-cover image */}
        <img
          src={listing.imageUrls[0]} // Assuming the first image in the array covers the listing
          alt={listing.name}
          className="object-cover w-full h-64 md:h-72 lg:h-80"
        />
        {/* Overlay for text */}
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-70 transition duration-300">
          {/* Text content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
            <p className="text-lg">{listing.description}</p>
            <p className="text-lg mt-2">Series: {listing.series}</p>
            <p className="text-lg">Price: ${listing.price}</p>
          </div>
        </div>
        {/* Name label at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 text-white text-lg font-semibold opacity-100 hover:opacity-0 transition duration-300 pointer-events-none">
          {listing.name}
        </div>
      </div>
    </motion.li>
  );
}

export default ListingItem;
