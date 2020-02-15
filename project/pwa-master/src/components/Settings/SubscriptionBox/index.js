import React from 'react';
import content from "./content";
import "./styles.scss";
import Button from "../../../common/Button";

const SubscriptionBox = ({ subscriptionIsOpen, toggleSubscription }) => {
    return (
        <section className="formContainer">
            <header onClick={() => toggleSubscription(!subscriptionIsOpen)} className="formHeaderContainer">
                <span className="expandIcon">
                    {!subscriptionIsOpen ? "+" : "-"}
                </span>
                <div className="formHeaderText">
                    {content.SUBCONTAINER4_LABEL}
                </div>
            </header>
            {subscriptionIsOpen && (
                <React.Fragment>
                    <div className="subscriptionRenewBox">
                        <div className="subscriptionRenewBoxLabel">
                            {content.SUBCONTAINER4_BOX_LABEL}
                        </div>
                        <div className="subscriptionRenewBoxDate">
                            January 1, 2021
                        </div>
                        <div className="subscriptionRenewBoxAmount">
                            $99.00
                        </div>
                    </div>
                    <div className="subscriptionDescription">
                        {content.SUBCONTAINER4_DESCRIPTION}
                    </div>
                    <div className="buttonWrapper">
                        <Button className="launchButton" buttonText={content.SUBCONTAINER4_BUTTON_TEXT} ></Button>
                    </div>
                </React.Fragment>
            )}
        </section>
    );
};

export default SubscriptionBox;