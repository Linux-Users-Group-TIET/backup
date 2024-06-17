import React from "react";
import "./VideoBackground.css"; // Import the CSS file for styling

const VideoBackground = () => {
  return (
    <div className="video-container">
      <video className="video-background" autoPlay loop muted>
        <source
          src="https://firebasestorage.googleapis.com/v0/b/magicsprings-dbaf7.appspot.com/o/4156328-uhd_4096_2160_25fps.mp4?alt=media&token=69200f32-e157-4375-b2cd-17a55e7540d8"
          type="video/mp4"
        />
        Your browser does not support the video tag. hiiii
      </video>
    </div>
  );
};

export default VideoBackground;
