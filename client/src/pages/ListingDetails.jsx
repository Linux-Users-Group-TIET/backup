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
    <div className="card">
      <nav>
        <svg
          className="arrow"
          viewBox="0 0 512 512"
          width="512px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 "
            stroke="#727272"
          />
        </svg>
        <Link to="/search">Back to all Plants</Link>
        <svg
          className="heart"
          viewBox="0 0 512 512"
          width="512px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"
            stroke="#727272"
          />
        </svg>
      </nav>
      <div className="photo">
        <Slider {...sliderSettings}>
          {listing.imageUrls.map((imageUrl, index) => (
            <div key={index}>
              <img
                src={imageUrl}
                alt={listing.name}
                className="object-contain w-full h-auto"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="description">
        <h2>{listing.name}</h2>
        <h4>Popular House Plant</h4>
        <h1>${listing.price}</h1>
        <p>{listing.description}</p>
        {/* <div className="button-container">
          <button className="add-to-cart" onClick={addToCart}>
            Add to Cart
          </button>
          <button className="wishlist">Wishlist</button> 
        </div>*/}
      </div>
    </div>
  );
};

export default ListingDetail;
