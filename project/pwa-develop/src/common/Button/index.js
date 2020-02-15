import React from "react";
import PropTypes from "prop-types";
import IconComponent from "../IconComponent";

const Button = ({ className, onClick, buttonText, isIcon, iconName, disabled }) => {
  return !isIcon ? (
    <button className={className} onClick={onClick} disabled={disabled}>
      {buttonText}
    </button>
  ) : (
    <div role="button" onClick={onClick}>
      <IconComponent className={className} iconName={iconName} />
    </div>
  );
};

Button.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  disabled: PropTypes.bool,
  isIcon: PropTypes.bool
};

Button.defaultProp = {
    isIcon: false,
    disabled: false,
    buttonText: "",
};

export default Button;