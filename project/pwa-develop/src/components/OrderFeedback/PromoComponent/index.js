import React from "react";
import content from "./content";
import "./styles.scss";
import InputField from "../../../common/InputField";

const PromoCodeComponent = ({
    onInputChange,
    promoCode,
}) => {
  return (
    <div className="promoContainer">
      <label className="promoLabel">{content.PROMO_LABEL}</label>
      <InputField
        id="promoCode"
        className="titleInput"
        onChange={onInputChange}
        value={promoCode}
      />
    </div>
  );
};

export default PromoCodeComponent;
