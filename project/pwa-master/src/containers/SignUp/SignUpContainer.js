import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SignUpComponent from "../../components/SignUp/SignUpComponent";
import "../../scss/common.styles.scss";
import { registerUserAction } from "../../state/actions/userActions";
import { userSelector } from "../../state/selectors/users";
import { toast } from "react-toastify";
import { validateRegex } from "../../utils";

const SignUpContainer = ({ registerUser, handleSuccess }) => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    displayName: "",
  });
  const [fileToUpload, setFileToUpload] = useState(null);
  const handleNewUserRegister = useCallback(() => {
    if (userData.password !== userData.repeatPassword) {
      toast.error("Passwords dont match");
      return;
    }
    if (
      userData.email.length === 0 ||
      !validateRegex("email", userData.email)
    ) {
      toast.error("Enter valid email address");
      return;
    }
    if (!userData.displayName || userData.displayName.length === 0) {
      toast.error("Enter display name");
      return;
    }
    if (!userData.displayName || userData.username.length === 0) {
      toast.error("Enter username name");
      return;
    }
    registerUser(userData, fileToUpload)
      .then(() => {
        handleSuccess();
      })
      .catch(() => {
        toast.error("User registration failed");
      });
  }, [registerUser, userData, fileToUpload, handleSuccess]);
  const handleInputChange = (e) => {
    if (
      e.target.id === "profileImg" &&
      e.target.files &&
      e.target.files.length > 0
    ) {
      setFileToUpload(e.target.files[0]);
    } else {
      let value = e.target.value;
      if (e.target.id === "email") {
        value = e.target.value.toLowerCase();
      }
      setUserData({
        ...userData,
        [e.target.id]: value.trim(),
      });
    }
  };
  return (
    <SignUpComponent
      onInputChange={handleInputChange}
      {...userData}
      fileToUpload={fileToUpload}
      registerUser={handleNewUserRegister}
    />
  );
};

const mapActions = (dispatch) => ({
  registerUser: (requestData, file) =>
    dispatch(registerUserAction(requestData, file)),
});

const mapStateToProps = (state) => ({
  user: userSelector(state),
});

SignUpContainer.propTypes = {
  user: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapActions
)(SignUpContainer);
