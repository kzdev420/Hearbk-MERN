import React from "react";
import InputField from "../../common/InputField";
import "./Login.styles.scss";
import "rc-checkbox/assets/index.css";
import Button from "../../common/Button";

const ForgotpasswordComponent = ({email, onInputChange, SendLink}) => {
  return (
    <div className="loginContainer">
      <div className="loginLabel">Forgot Password</div>
      <div className="loginText">
        Please enter your email address.
        The action will be expired after 10 minutes.
      </div>
      <div className="inputContainer">
        <InputField
          id="email"
          onChange={onInputChange}
          value={email}
          placeholder="Email Address"
          className="inputField"
          hasIcon
          iconName="email"
        />
      </div>
      <div className="buttonWrapper">
        <Button
          className="logInButton"
          buttonText="Send Link"
          onClick={SendLink}
        ></Button>
      </div>
    </div>
  );
};

ForgotpasswordComponent.defaultProps = {
  email: "",
};

export default ForgotpasswordComponent;
