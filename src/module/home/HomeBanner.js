import React from "react";
import Search from "../../components/user/Search/Search";

const HomeBanner = () => {
  return (
    <div className="w-full z-20">
      <div className="relative w-full">
        <Search className={"absolute z-10 -bottom-8 w-[85%] -translate-y-2/4 -translate-x-1/2 left-1/2 max-md:top-[54%] md:top-[95%] lg:px-28"}/>
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
