import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ListingItem = ({ listing }) => {
  return (
    <Link to={`/listing/${listing._id}`} className="block w-full h-full">
      <motion.li
        className="border rounded-lg shadow-lg overflow-hidden relative"
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
      >
        <div className="relative">
          <img
            src={listing.imageUrls[0]} // Assuming the first image in the array covers the listing
            alt={listing.name}
            className="object-cover w-full h-64 sm:h-80 md:h-96 lg:h-112 xl:h-128"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300">
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 text-center">
              <motion.p
                className="text-base sm:text-lg md:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
              >
                {listing.description}
              </motion.p>
              <motion.p
                className="text-base sm:text-lg md:text-xl mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4 } }}
              >
                Series: {listing.series}
              </motion.p>
              <motion.p
                className="text-base sm:text-lg md:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.6 } }}
              >
                Price: ${listing.price}
              </motion.p>
            </div>
          </div>
          <motion.div
            className="absolute bottom-4 left-4 right-4 bg-white text-black p-2 sm:p-3 md:p-2 
          text-sm sm:text-xl md:text-xs font-bold shadow-lg opacity-100 hover:opacity-80 
          transition duration-300 pointer-events-auto border-2 border-transparent 
          hover:border-black-500"
            initial={{ opacity: 0, y: 60 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.8 },
            }}
          >
            {listing.name}
          </motion.div>
        </div>
      </motion.li>
    </Link>
  );
};

export default ListingItem;
