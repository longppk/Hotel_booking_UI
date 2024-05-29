import React from "react";
import Search from "../../components/user/Search/Search";

const HomeBanner = () => {
  return (
    <div className="w-full">
      <div className="relative w-full">
        <Search className={"absolute -bottom-8 w-full lg:px-28"}/>
        <img
          className="w-full h-[400px]"
          src="https://theme.hstatic.net/1000405477/1000524276/14/slideshow_2.jpg?v=17121"
          alt="Descriptive Alt Text"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
