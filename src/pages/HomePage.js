import React from "react";
import Layout from "../layout/Layout";
import HomeBanner from "../module/home/HomeBanner";
import IntroduceLeft from "../module/home/IntroduceLeft";
import IntroduceRight from "../module/home/IntroduceRight";
import RoomList from "../components/Room/RoomCategory";
import RoomCategory from "../components/Room/RoomCategory";

const HomePage = (props) => {
  return (
    <Layout>
      <HomeBanner></HomeBanner>
      <RoomCategory></RoomCategory>
      <IntroduceLeft
        title="Destination Of Luxury"
        titleContent="A Pleasant Stay"
        content="At Luxury Vela Hotel - the iconic hotel that offers 280 luxurious rooms and suites that feature stylish interiors and high class. Soothing hues in each room create a relaxing ambiance that provides business and leisure travelers an indulgent refuge after a day of exploring Ho Chi Minh City."
        image="https://lavelasaigon.com/wp-content/uploads/2022/11/Luxury-Double-Room-1-scaled-e1671530952768.jpg"
      ></IntroduceLeft>
      <IntroduceRight
        titleContent="Glamorous Moments"
        content="Whether you are holding a lavish banquet, a formal business seminar, an intimate cocktail reception, or a wedding solemnization. Our experienced team expertly managed every event—what an ideal place for your gatherings."
        image="https://lavelasaigon.com/wp-content/uploads/2022/10/home-banner-4.png"
      ></IntroduceRight>
      <IntroduceLeft
        titleContent="Release The Body And Mind"
        content="There’s nothing like a full day at the spa with all the work to put your mind and body in rest mode. Let sit back to relax and rebalance your energy or work up a sweat with our modern fitness facilities."
        image="https://lavelasaigon.com/wp-content/uploads/2022/12/spa-treatment-dark-wall-scaled.jpg"
      ></IntroduceLeft>
    </Layout>
  );
};

export default HomePage;
