import React from "react";
import Checkbox from "rc-checkbox";
import content from "./content";
import InputField from "../../common/InputField";
import "./Login.styles.scss";
import "rc-checkbox/assets/index.css";
import Button from "../../common/Button";

const LoginComponent = ({ email, password, onInputChange, loginUser }) => {
  return (
    <div className="loginContainer">
      <div className="loginLabel">{content.LOGIN_LABEL}</div>
      <div className="loginText">{content.LOGIN_TEXT}</div>
      <div className="inputContainer">
        <InputField
          id="email"
          onChange={onInputChange}
          value={email}
          placeholder={content.EMAIL_ADDRESS}
          className="inputField"
          hasIcon
          iconName="email"
        />
        <InputField
          id="password"
          type="password"
          onChange={onInputChange}
          value={password}
          placeholder={content.PASSWORD}
          className="inputField"
          hasIcon
          iconName="lock"
        />
      </div>
      <div className="rememberMeContainer">
        <Checkbox
          className="checkBoxStyle"
          onChange={onInputChange}
          name="rememberUser"
        />
        <div className="rememberMeText">{content.REMEMBER}</div>
      </div>
      <div className="buttonWrapper">
        <Button
          className="logInButton"
          buttonText={content.LOGIN_LABEL}
          onClick={loginUser}
        ></Button>
      </div>
      <div className="forgotPassword" style={{ display: "none" }}>
        <span>{content.FORGOT_PASSWORD}</span>
      </div>
    </div>
  );
};

LoginComponent.defaultProps = {
  email: "",
  password: "", 
};

export default LoginComponent;
