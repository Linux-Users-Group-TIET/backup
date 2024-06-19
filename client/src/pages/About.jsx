import React from "react";
import styled from "styled-components";

const About = () => {
  return (
    <Container>
      <Header>
        <Title>Welcome to MagicSprings</Title>
        <Subtitle>Revolutionizing Bathroom Experiences</Subtitle>
      </Header>
      <Content>
        <Section>
          <SectionTitle>Our Story</SectionTitle>
          <Text>
            Founded in 2002, MagicSprings started with a simple mission: to
            transform the everyday bathroom experience into something
            extraordinary. Over the years, we have grown from a small local
            business to a global leader in bathroom fittings, known for our
            innovation, quality, and customer-centric approach.
          </Text>
        </Section>
        <Section>
          <SectionTitle>Innovation & Technology</SectionTitle>
          <Text>
            At MagicSprings, we are committed to integrating the latest
            technologies into our products. From touchless faucets to smart
            showers, our aim is to enhance convenience, sustainability, and
            aesthetics in every bathroom.
          </Text>
        </Section>
        <Section>
          <SectionTitle>Our Products</SectionTitle>
          <Text>
            We offer a wide range of products, including faucets, showers,
            bathtubs, toilets, and bathroom furniture. Each product is designed
            to combine functionality with modern elegance, ensuring that every
            bathroom becomes a sanctuary.
          </Text>
        </Section>
        <Section>
          <SectionTitle>Sustainability</SectionTitle>
          <Text>
            Sustainability is at the core of our values. We employ eco-friendly
            manufacturing processes and develop water-efficient fixtures to
            reduce our environmental footprint. Our products are designed to
            promote water and energy conservation without compromising on style
            or performance.
          </Text>
        </Section>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background: #000; /* White background */
  font-family: "Raleway", sans-serif;
`;

const Header = styled.header`
  text-align: center;
  padding: 50px 0;
  background: #000; /* Black header background */
  color: #fff; /* White text color */
`;

const Title = styled.h1`
  font-size: 36px;
  color: #fff; /* White title text color */
  margin: 0;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  color: #fff; /* White subtitle text color */
  margin: 10px 0 0;
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  background: #000; /* Black content background */
  color: #fff; /* White text color */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  padding: 20px;
  border-radius: 8px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 28px;
  color: #fff; /* White section title color */
  margin-bottom: 10px;
  position: relative;
  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background: #fff; /* White line color */
    display: block;
    position: absolute;
    bottom: -5px;
    left: 0;
  }
`;

const Text = styled.p`
  font-size: 16px;
  color: #fff; /* White text color */
  line-height: 1.6;
  border-left: 3px solid #fff; /* White border left */
  padding-left: 10px;
`;

export default About;
