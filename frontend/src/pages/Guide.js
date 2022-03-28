import React from "react";

import GuideBody from "../components/guide/GuideBody";
import GuideHeader from "../components/guide/GuideHeader";
import GuideTitle from "../components/guide/GuideTitle";
import Footer from "../components/Footer";

const Guide = () => {
  return (
    <div className='guidePage'>
      <GuideHeader></GuideHeader>
      <GuideTitle></GuideTitle>
      <GuideBody></GuideBody>
      <Footer></Footer>
    </div>
  );
};

export default Guide;
