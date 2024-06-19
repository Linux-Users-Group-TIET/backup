import React from "react";
import VideoBackground from "../Components/VideoBackground";

import InfSco from "../Components/InfSco";
import Footer from "../Components/Footer";
import Product from "../Components/Product";
import GoDown from "../Components/GoDown";
import Slider from "../Components/Slider";
import Product2 from "../Components/Product2";
import Product1 from "../Components/Product1";

function Home() {
  return (
    <>
      <VideoBackground />
      <InfSco />
      <GoDown />
      <Product />
      <Product1 />
      <Product2 />
      <Slider />
    </>
  );
}

export default Home;
