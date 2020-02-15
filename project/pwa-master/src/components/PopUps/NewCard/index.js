import React from 'react';
import content from "./content";
import "./styles.scss";
import InputField from "../../../common/InputField";
import Button from "../../../common/Button";

const NewCard = ({
    nameOnCard,
    cardNumber,
    expirationDate,
    cvc,
    onInputChange
}) => {
    return (
        <div className="newCardContainer">
            <div className="newCardHeaderContainer">
                {content.MAIN_HEADER}
            </div>
            <div className="inputFieldContainer">
                <div className="inputFieldHeader">
                    {content.INPUT_HEADER_1}
                </div>
                <InputField
                    id="nameOnCard"
                    onChange={onInputChange}
                    value={nameOnCard}
                    placeholder={content.INPUT_PLACEHOLDER_1}
                    className="inputField"
                />
                <div className="inputFieldHeader">
                    {content.INPUT_HEADER_2}
                </div>
                <InputField
                    id="cardNumber"
                    onChange={onInputChange}
                    value={cardNumber}
                    placeholder={content.INPUT_PLACEHOLDER_2}
                    className="inputField"
                />
                <div className="inputFieldRow">
                    <div className="inputFieldCols colLeft">
                        <div className="inputFieldHeader">
                            {content.INPUT_HEADER_3}
                        </div>
                        <InputField
                            id="expirationDate"
                            onChange={onInputChange}
                            value={expirationDate}
                            placeholder={content.INPUT_PLACEHOLDER_3}
                            className="inputField"
                        />
                    </div>
                    <div className="inputFieldCols">
                        <div className="inputFieldHeader">
                            {content.INPUT_HEADER_4}
                        </div>
                        <InputField
                            id="cvc"
                            onChange={onInputChange}
                            value={cvc}
                            placeholder={content.INPUT_PLACEHOLDER_4}
                            className="inputField"
                        />
                    </div>
                </div>
            </div>
            <div className="buttonWrapper">
                <Button
                className="launchButton"
                buttonText={content.SAVE_CARD_LABEL}
                onClick={""}
                ></Button>
            </div>
        </div>
    );
};

NewCard.defaultProps = {
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    cvc: ""
};

export default NewCard;