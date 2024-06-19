import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ListingDetail.css"; // Import your CSS file for styling

const ListingDetail = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [listing, setListing] = useState(null);
  const [quantity, setQuantity] = useState(1); // Initial quantity is 1

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listing/${id}`); // Adjust URL as per your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch listing");
        }
        const data = await response.json();
        setListing(data);
      } catch (error) {
        console.error("Failed to fetch listing:", error);
      }
    };

    fetchListing();
  }, [id]);

  const addToCart = () => {
    // Implement your add to cart functionality here
    console.log(`Added ${quantity} ${listing.name}(s) to cart.`);
    // Example: You can use localStorage, a global state management (like Redux), or an API call to add to cart
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  if (!listing) {
    return <p>Loading...</p>;
  }

  // Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div className="wrapper">
      <Link to="/search" className="back-button">
        Back
      </Link>
      <div className="product-img">
        <Slider {...sliderSettings}>
          {listing.imageUrls.map((imageUrl, index) => (
            <div key={index} className="image-container">
              <img
                src={imageUrl}
                alt={listing.name}
                className="object-contain"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="product-info">
        <div className="product-text">
          <h1>{listing.name}</h1>
          <h2>{listing.series}</h2>
          <p>{listing.description}</p>
        </div>
        <div className="product-price-btn">
          <p>
            <span>{listing.price}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;

