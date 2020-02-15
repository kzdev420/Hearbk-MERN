import React, { useEffect, useState, useCallback } from 'react';
import { connect } from "react-redux";
import SettingsComponent from "../../components/Settings/SettingsComponent";
import { preferencsSelector } from '../../state/selectors/preferences';
import { 
    getUserDetails,
    updateUserData
} from "../../state/actions/userActions";

const SettingsContainer = ({ 
    getUserDetailsDispatchAction,
    userDetails,
    dispatchUpdate
}) => {
    const [profileIsOpen, toggleProfile] = useState(false);
    const [accountIsOpen, toggleAccount] = useState(false);
    const [paymentIsOpen, togglePayment] = useState(false);
    const [subscriptionIsOpen, toggleSubscription] = useState(false);
    const [preferencesIsOpen, togglePreferences] = useState(false);

    useEffect(() => {
        getUserDetailsDispatchAction()
    }, [getUserDetailsDispatchAction])

    const handleInputChange = useCallback(
        (e) => {
        let payload = {
            [e.target.id]: e.target.value
        };
        dispatchUpdate(payload);
    }, [dispatchUpdate]);

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
            details={userDetails}
            onInputChange={handleInputChange}
        />
    );
};

const dispatchAction = (dispatch) => ({
    getUserDetailsDispatchAction: () => dispatch(getUserDetails()),
    dispatchUpdate: (payload) => dispatch(updateUserData())
});

export default connect (
    preferencsSelector,
    dispatchAction
)(SettingsContainer);