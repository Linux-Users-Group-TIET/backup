import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Product.module.css"; // Import CSS module for scoped styling

const Product3 = () => {
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
          VIRGO VIRGO VIRGO VIRGO VIRGO VIRGO VIRGO VIRGO VIRGO VIRGO VIRGO
          VIRGO VIRGO VIRGO VIRGO VIRGO VIRGO VIRGO VIRGO VIRGO VIRGO VIRGO
        </h1>
        <div className={styles.imageWrapper}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/magicsprings-dbaf7.appspot.com/o/Screenshot_20240619-165124.png?alt=media&token=50910563-e67d-4011-865a-3750571e6209"
            alt="placeholder"
          />
        </div>
      </section>
    </>
  );
};

export default Product3;
