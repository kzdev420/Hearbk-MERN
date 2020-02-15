import React from 'react';
import content from "./content";
import "./styles.scss";
import Button from "../../../common/Button";
import PaymentCard from "./PaymentCard";

const PaymentAccountForm = ({ paymentIsOpen, togglePayment }) => {
    return (
        <section className="formContainer">
            <header onClick={() => togglePayment(!paymentIsOpen)} className="formHeaderContainer">
                <span className="expandIcon">
                    {!paymentIsOpen ? "+" : "-"}
                </span>
                <div className="formHeaderText">
                    {content.SUBCONTAINER3_LABEL}
                </div>
            </header>
            {paymentIsOpen && (
                <React.Fragment>
                    <div className="paymentCardsContainer">
                        <PaymentCard />
                    </div>
                    <div className="buttonWrapper">
                        <Button className="launchButton" buttonText={content.SUBCONTAINER3_BUTTON_TEXT} ></Button>
                    </div>
                </React.Fragment>
            )}
        </section>
    );
};

export default PaymentAccountForm;