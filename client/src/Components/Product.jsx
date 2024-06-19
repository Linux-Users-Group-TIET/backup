import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Product.module.css"; // Import CSS module for scoped styling
const Product = () => {
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
          FLORENTINE FLORENTINE FLORENTINE FLORENTINE FLORENTINE FLORENTINE
          FLORENTINE FLORENTINE FLORENTINE FLORENTINE FLORENTINE FLORENTINE
        </h1>
        <div className={styles.imageWrapper}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/magicsprings-dbaf7.appspot.com/o/Screenshot_20240619-165058.png?alt=media&token=160f3d9c-4b0c-4778-a287-2b380021f4b2"
            alt="placeholder"
          />
        </div>
      </section>
    </>
  );
};

export default Product;
