import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import ForgotpasswordComponent from "../../components/ResetPassword/ForgotpasswordComponent.js";
import { SendResetPasswordLink } from "../../state/actions/userActions";
import { userSelector } from "../../state/selectors/users";

const ForgotpasswordContainer = ({ SendLink }) => {

    const [emailInfo, setemailInfo] = useState({});

    const handleInputChange = (e) => {
        let value = e.target.value;
        if (e.target.id === "email") {
            value = value.toLowerCase();
        }
        setemailInfo({
            ...emailInfo,
            [e.target.id]: value,
        });
      };
    
    const handleSendLink = useCallback(() => {
        SendLink(emailInfo);
    }, [SendLink, emailInfo]);
  
    return (
      <ForgotpasswordComponent
        {...emailInfo}
        onInputChange={handleInputChange}
        SendLink={handleSendLink}
      />
    );
  };

  const mapStateToProps = (state) => ({
    user: userSelector(state),
  });

  const mapActions = (dispatch) => ({
    SendLink: (data) =>
      dispatch(SendResetPasswordLink(data)),
  });
  
  export default connect(
    mapStateToProps,
    mapActions
  )(ForgotpasswordContainer);