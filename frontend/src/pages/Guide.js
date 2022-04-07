import React from "react";

import GuideBody from "../components/guide/GuideBody";
import GuideHeader from "../components/guide/GuideHeader";
import GuideTitle from "../components/guide/GuideTitle";

const Guide = () => {
  return (
    <div style={{ paddingBottom: "100px" }}>
      <GuideHeader></GuideHeader>
      <GuideTitle></GuideTitle>
      <GuideBody></GuideBody>
    </div>
  );
};

export default Guide;
