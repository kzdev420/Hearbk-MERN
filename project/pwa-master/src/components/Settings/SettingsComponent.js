import React from 'react';
import content from "./content";
import "./Settings.styles.scss";
import Icon from "../../common/IconComponent";
import Button from "../../common/Button";
import ProfileForm from "./ProfileForm";
import AccountForm from "./AccountForm";
import PaymentAccountForm from "./PaymentAccountForm";
import SubscriptionBox from "./SubscriptionBox";
import ListenerPreferencesForm from "./ListenerPreferencesForm";
import FooterNav from "../FooterNav";

const SettingsComponent = ({
    profileIsOpen,
    accountIsOpen,
    paymentIsOpen,
    subscriptionIsOpen,
    preferencesIsOpen,
    toggleProfile,
    toggleAccount,
    togglePayment,
    toggleSubscription,
    togglePreferences
}) => {
    return (
        <div className="settingsContainer">
            <div className="largeBannerHeaderContainer">
                <Icon className="exitIcon" iconName="exittoapp" />
                <div className="headerTitle1">
                    {content.HEADER}
                </div>
                <div className="profilePicIconContainer">
                    <Icon className="profilePicIcon" iconName="profilepic" />
                </div>
            </div>
            <div className="settingsStatusContainer">
                <div className="points">
                    <div className="subHeaderLabel">
                        {content.POINTS_LABEL}
                    </div>
                    <div className="subHeaderAmount">
                        {content.POINTS}
                    </div>
                </div>
                <div className="status">
                    <div className="statusBox">
                        {content.STATUS}
                    </div>
                    <div className="insiderBox">
                        <Icon className="checkIcon" iconName="playlistaddcheck" />
                        {content.INSIDER}
                    </div>
                </div>
                <div className="balance">
                    <div className="subHeaderLabel">
                        {content.BALANCE_LABEL}
                    </div>
                    <div className="subHeaderAmount">
                        <span className="subHeaderAmountFontAdjust">
                            {content.BALANCE_SIGN}
                        </span>
                        <span>
                            {content.BALANCE_DOLLARS}
                        </span>
                        <span className="subHeaderAmountFontAdjust">
                            {content.BALANCE_CENTS}
                        </span>
                    </div>
                </div>
            </div>
            <ProfileForm profileIsOpen={profileIsOpen} toggleProfile={toggleProfile} />
            <AccountForm accountIsOpen={accountIsOpen} toggleAccount={toggleAccount} />
            <PaymentAccountForm paymentIsOpen={paymentIsOpen} togglePayment={togglePayment} />
            <SubscriptionBox subscriptionIsOpen={subscriptionIsOpen} toggleSubscription={toggleSubscription} />
            {/* <ListenerPreferencesForm preferencesIsOpen={preferencesIsOpen} togglePreferences={togglePreferences} /> */}
            <div className="buttonWrapper">
                <Button 
                    className="launchButton logoutButton" 
                    hasIcon={true} 
                    iconClassName="exitToAppIcon" 
                    iconName="exittoapp_blue" 
                    buttonText={content.LOGOUT}
                ></Button>
            </div>
            <FooterNav />
        </div>
    );
};

export default SettingsComponent;