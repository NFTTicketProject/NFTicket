import React from "react";
import "./GuideBodyComponent.css";
import styled from "styled-components";

// icon components from MUI
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import GetAppIcon from "@mui/icons-material/GetApp";
import StorefrontIcon from "@mui/icons-material/Storefront";

import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const ImgDiv = styled.img`
  max-width: 800px;
  max-height: 500px;
  box-shadow: 1px 1px 15px gray;
  margin-bottom: 50px;
`;

const GuideBodyComponent = (props) => {
  return (
    <div className='bodyComponent'>
      {props.img !== "" && <ImgDiv src={props.img}></ImgDiv>}

      <div className='icon'>
        {props.icon === "ConfirmationNumberIcon" && (
          <ConfirmationNumberIcon style={{ fontSize: 50 }} />
        )}
        {props.icon === "LocalAtmIcon" && (
          <LocalAtmIcon style={{ fontSize: 50 }} />
        )}
        {props.icon === "LightbulbIcon" && (
          <LightbulbIcon style={{ fontSize: 50 }} />
        )}
        {props.icon === "GetAppIcon" && <GetAppIcon style={{ fontSize: 50 }} />}
        {props.icon === "StorefrontIcon" && (
          <StorefrontIcon style={{ fontSize: 50 }} />
        )}
      </div>
      <div className='smallTitle'>{props.title}</div>
      <div className='smallBody'>{props.body}</div>
    </div>
  );
};

export default GuideBodyComponent;
