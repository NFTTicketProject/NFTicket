import React from "react";
import GuideBody from "../../components/guide/GuideBody.js";
import GuideHeader from "../../components/guide/GuideHeader.js";
import GuideTitle from "../../components/guide/GuideTitle.js";

const Guide = () => {
  return (
    <div className='guidePage'>
      <GuideHeader></GuideHeader>
      <GuideTitle></GuideTitle>
      <GuideBody></GuideBody>
    </div>
  );
};

export default Guide;
