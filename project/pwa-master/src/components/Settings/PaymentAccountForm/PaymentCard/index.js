import React, { useState } from "react";
import { Radio } from "antd";
import content from "./content";
import "./styles.scss";
import Icon from "../../../../common/IconComponent";
import Button from "../../../../common/Button";

const PaymentCardComponent = (props) => {
  const [isWarning, setIsWarning] = useState(false);
  return (
    <div className="paymentCard">
      <div onClick={() => setIsWarning(true)} className="cancelIconContainer">
        <Icon className="cancelIcon" iconName="Cancel" />
      </div>
      {isWarning && (
        <div className="warningModal">
          {content.WARNING}
          <div className="warningButtonWrapper">
            <Button 
              className="warningButton"
              buttonText={content.YES}
              onClick={() => {props.handleDeleteSavedCard(props.paymentId); setIsWarning(false)}} 
            />
            <Button 
              className="warningButton"
              buttonText={content.NO}
              onClick={() => setIsWarning(false)}
            />
          </div>
        </div>
      )}
      <div className="paymentCardContentContainer">
        <Radio
          className="radioButton"
          checked={props.selectedPaymentId === props.paymentId}
          onChange={() => props.handleSavedCardSelect(props.paymentId)}
        />
        <Icon className="creditCardIcon" iconName="creditcard" />
        <span className="paymentCardContent1">{content.CARD_CONTENT1}</span>
        <span className="paymentCardContent2">
          {content.CARD_CONTENT2}
          {props.cardDetails.last4}
        </span>
      </div>
    </div>
  );
};

export default PaymentCardComponent;
