import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ResetpasswordComponent from "../../components/ResetPassword/ResetpasswordComponent";
import "../../scss/common.styles.scss";
import { ResetPasswordAction } from "../../state/actions/userActions";
import { userSelector } from "../../state/selectors/users";
import { toast } from "react-toastify";
import history from "../../history";

const ResetpasswordContainer = ({ ResetPassword, handleSuccess }) => {

  const {userid, token} = useParams()
  const Savedtoken = localStorage.getItem("x-access-token");
  // if(Savedtoken != token){
  //   toast.error("Session Expired, Please try send ResetPassword Link");
  //   history.push("/forgotpassword");
  // }
  const [userData, setUserData] = useState({});

  const handleResetPassword = useCallback(() => {
    if (userData.password !== userData.repeatPassword) {
      toast.error("Passwords dont match");
      return;
    }
    ResetPassword(userData, userid)
      .then(() => {
        handleSuccess();
      })
      .catch(() => {
        toast.error("User registration failed");
      });
  }, [ResetPassword, userData, handleSuccess]);

  const handleInputChange = (e) => {
    let value = e.target.value;
    setUserData({
        ...userData,
        [e.target.id]: value,
    });
  };

  return (
    <ResetpasswordComponent
      onInputChange={handleInputChange}
      {...userData}
      ResetPassword={handleResetPassword}
    />
  );
};

const mapActions = (dispatch) => ({
    ResetPassword: (requestData, userid) =>
    dispatch(ResetPasswordAction(requestData, userid)),
});

const mapStateToProps = (state) => ({
  user: userSelector(state),
});

ResetpasswordContainer.propTypes = {
  user: PropTypes.object.isRequired,
  ResetPassword: PropTypes.func.isRequired,
};


export default connect(
  mapStateToProps,
  mapActions
)(ResetpasswordContainer);
