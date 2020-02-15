import React from "react";
import { Input } from "antd";

const InputField = ({
  id,
  passableRef,
  className,
  placeholder,
  hasIcon,
  iconPosition,
  onChange,
  iconName,
  type,
  disabled,
  value,
  accept,
  style
}) => {
  let componentStyle = style;
  if (hasIcon) {
    switch (iconPosition) {
      case "right": 
      componentStyle = {
          ...componentStyle,
          background: `url('../../img/${iconName}.png') no-repeat`,
          backgroundSize: "17px 17px",
          backgroundPosition: "100% 15%",
          paddingRight: "30px"
        }
        break;
      default: {
        componentStyle = {
          ...componentStyle,
          background: `url('../../img/${iconName}.png') no-repeat`,
          backgroundSize: "17px 17px",
          backgroundPosition: "8px 16px",
          paddingLeft: "30px"
        }
        break;
      }
    }
  }
  return (
    <Input
      id={id}
      accept={accept}
      ref={passableRef}
      className={className}
      style={componentStyle}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      value={value}
    />
  );
};

InputField.defaultProps = {
  disabled: false,
  passableRef: null,
};

export default InputField;
