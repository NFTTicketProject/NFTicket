import React from "react";
import "./GuideBodyComponent.css";

// icon components from MUI
import SellIcon from "@mui/icons-material/Sell";
import BrushIcon from "@mui/icons-material/Brush";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";

import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const GuideBodyComponent = (props) => {
  return (
    <div className='bodyComponent'>
      <div className='icon'>
        {props.icon === "SellIcon" && <SellIcon fontSize='large' />}
        {props.icon === "BrushIcon" && <BrushIcon fontSize='large' />}
        {props.icon === "ShoppingBagIcon" && (
          <ShoppingBagIcon fontSize='large' />
        )}
        {props.icon === "PeopleIcon" && <PeopleIcon fontSize='large' />}

        {props.icon === "ConfirmationNumberIcon" && (
          <ConfirmationNumberIcon fontSize='large' />
        )}
      </div>
      <div className='smallTitle'>{props.title}</div>
      <div className='smallBody'>{props.body}</div>
    </div>
  );
};

export default GuideBodyComponent;
