import React from "react";
import "./GuideBodyComponent.css";

// icon components from MUI
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SellIcon from "@mui/icons-material/Sell";

const GuideBodyComponent = (props) => {
  return (
    <div className='bodyComponent'>
      <div className='icon'>
        {props.icon === "ConfirmationNumberIcon" && (
          <ConfirmationNumberIcon fontSize='large' />
        )}
        {props.icon === "SellIcon" && <SellIcon fontSize='large' />}
      </div>
      <div className='smallTitle'>{props.title}</div>
      <div className='smallBody'>{props.body}</div>
    </div>
  );
};

export default GuideBodyComponent;
