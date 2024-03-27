import React from "react";
import styled from "styled-components";
import Search from "../../components/Search/Search";

const HomeBannerStyles = styled.section`
  background-color: #f0f0f0;
  text-align: center;
  position: relative;
  .image-slide {
    margin: auto;
    width: 100%;
    height: 400px;
    user-select: none;
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="slide-style">
        <Search></Search>
        <img
          className="image-slide"
          src="https://theme.hstatic.net/1000405477/1000524276/14/slideshow_2.jpg?v=17121"
          alt=""
        />
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
