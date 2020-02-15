import React, { useRef, useCallback } from "react";
import PropTypes from "prop-types";
import content from "./content";
import "./SignUp.styles.scss";
import InputField from "../../common/InputField";
import Button from "../../common/Button";

const SignUpComponent = ({
  onInputChange,
  email,
  displayName,
  username,
  password,
  repeatPassword,
  registerUser,
  fileToUpload,
}) => {
  const fileUploadRef = useRef(null);
  const handleAddPhotoClick = () => {
    fileUploadRef.current.click();
  };

  return (
    <div className="signUpContainer">
      <div className="signUpLabel">{content.SIGN_UP_LABEL}</div>
      <div className="signUpText">{content.SIGN_UP_TEXT}</div>
      <div className="inputContainer">
        <InputField
          id="email"
          value={email}
          placeholder={content.EMAIL_ADDRESS}
          hasIcon
          iconName="email"
          className="inputField"
          onChange={onInputChange}
        />
        <InputField
          id="displayName"
          value={displayName}
          placeholder={content.DISPLAY_NAME}
          hasIcon
          iconName="displayname"
          className="inputField"
          onChange={onInputChange}
        />
        <InputField
          id="username"
          value={username}
          placeholder={content.USERNAME}
          hasIcon
          iconName="username"
          className="inputField"
          onChange={onInputChange}
        />
        <InputField
          id="password"
          value={password}
          type="password"
          placeholder={content.PASSWORD}
          hasIcon
          iconName="lock"
          className="inputField"
          onChange={onInputChange}
        />
        <InputField
          id="repeatPassword"
          value={repeatPassword}
          type="password"
          placeholder={content.REPEAT_PASSWORD}
          hasIcon
          iconName="lock"
          className="inputField"
          onChange={onInputChange}
        />
      </div>
      <div className="addPhotoContainer">
        {!fileToUpload && <Button
          className="addPhotoButton"
          isIcon
          iconName="addphoto"
          onClick={handleAddPhotoClick}
        />}
        <input
          accept="image/*"
          ref={fileUploadRef}
          style={fileToUpload && { width: "auto", zIndex: "1" }}
          id="profileImg"
          type="file"
          className="fileInputClass"
          onChange={onInputChange}
        />
      </div>
      <div className="buttonWrapper">
        <Button
          className="launchButton"
          buttonText={content.CREATE_ACCOUNT}
          onClick={registerUser}
        />
      </div>
    </div>
  );
};

SignUpComponent.defaultProps = {
  username: "",
  displayName: "",
  password: "",
  email: "",
  repeatPassword: "",
};

SignUpComponent.propTypes = {
  username: PropTypes.string,
  displayName: PropTypes.string,
  password: PropTypes.string,
  repeatPassword: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
};

export default SignUpComponent;
