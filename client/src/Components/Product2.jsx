import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Product.module.css"; // Import CSS module for scoped styling

const Product2 = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // GSAP timeline for infinite horizontal scroll effect
    let tl2 = gsap.timeline();
    tl2.to("#scrollingText", {
      x: 1000,
      duration: 50,
      repeat: -1,
      ease: "linear",
    });

    // GSAP timeline for text animation on scroll
    let tl = gsap.timeline();
    tl.to("#scrollingText", {
      xPercent: 15,
      scrollTrigger: {
        trigger: "#scrollingText",
        scrub: 1,
      },
    });
  }, []); // Run once on component mount

  return (
    <>
      <section className={`${styles.spacer} ${styles.spacerContent}`}>
        <h1 id="scrollingText">
          SPRINGLE SPRINGLE SPRINGLE SPRINGLE SPRINGLE SPRINGLE SPRINGLE
          SPRINGLE SPRINGLE SPRINGLE SPRINGLE SPRINGLE SPRINGLE SPRINGLE
          SPRINGLE
        </h1>
        <div className={styles.imageWrapper}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/magicsprings-dbaf7.appspot.com/o/Screenshot_20240619-165144.png?alt=media&token=4c1a3cf7-65c4-4be5-8294-1b745d5452cd"
            alt="placeholder"
          />
        </div>
      </section>
    </>
  );
};

export default Product2;
