import React, { useRef, useCallback } from "react";
import PropTypes from "prop-types";
import "./SignUp.styles.scss";
import InputField from "../../common/InputField";
import Button from "../../common/Button";

const ResetpasswordComponent = ({ onInputChange, password, repeatPassword, ResetPassword}) => {

  return (
    <div className="signUpContainer">
      <div className="signUpLabel">Reset Password</div>
      <div className="signUpText">Please enter your new password</div>
      <div className="inputContainer">
        <InputField
          id="password"
          value={password}
          type="password"
          placeholder="PASSWORD"
          hasIcon
          iconName="lock"
          className="inputField"
          onChange={onInputChange}
        />
        <InputField
          id="repeatPassword"
          value={repeatPassword}
          type="password"
          placeholder="REPEAT_PASSWORD"
          hasIcon
          iconName="lock"
          className="inputField"
          onChange={onInputChange}
        />
      </div>
      <div className="buttonWrapper">
        <Button
          className="launchButton"
          buttonText="Reset Password"
          onClick={ResetPassword}
        />
      </div>
    </div>
  );
};

ResetpasswordComponent.defaultProps = {
  password: "",
  repeatPassword: "",
};

ResetpasswordComponent.propTypes = {
  password: PropTypes.string,
  repeatPassword: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  ResetPassword: PropTypes.func.isRequired,
};

export default ResetpasswordComponent;
