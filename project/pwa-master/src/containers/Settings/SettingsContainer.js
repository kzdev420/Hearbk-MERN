import React, { useEffect, useState, useCallback } from 'react';
import { connect } from "react-redux";
import SettingsComponent from "../../components/Settings/SettingsComponent";
import { 
    getUserData,
    updateUserInfo 
} from "../../state/actions/userActions";
import { userSelector } from "../../state/selectors/users";

const SettingsContainer = (props) => {
    const [profileIsOpen, toggleProfile] = useState(false);
    const [accountIsOpen, toggleAccount] = useState(false);
    const [paymentIsOpen, togglePayment] = useState(false);
    const [subscriptionIsOpen, toggleSubscription] = useState(false);
    const [preferencesIsOpen, togglePreferences] = useState(false);

    const { userData, getUserDataDispatchAction } = props;

    useEffect(() => {
        getUserDataDispatchAction();
    }, [getUserDataDispatchAction])

    console.log(userData);

    return (
        <SettingsComponent 
            profileIsOpen={profileIsOpen}
            accountIsOpen={accountIsOpen}
            paymentIsOpen={paymentIsOpen}
            subscriptionIsOpen={subscriptionIsOpen}
            preferencesIsOpen={preferencesIsOpen}
            toggleProfile={toggleProfile}
            toggleAccount={toggleAccount}
            togglePayment={togglePayment}
            toggleSubscription={toggleSubscription}
            togglePreferences={togglePreferences}
        />
    );
};

const dispatchActions = (dispatch) => ({
    getUserDataDispatchAction: () => dispatch(getUserData()),
    updateUserDispatchAction: (requestData) => dispatch(updateUserInfo(requestData))
});

export default connect (
    userSelector,
    dispatchActions
)(SettingsContainer);