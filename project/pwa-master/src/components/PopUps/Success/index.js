import React from 'react';
import content from "./content";
import "./styles.scss";
import Button from "../../../common/Button";

const Success = (props) => {
    return (
        <div className="successContainer">
            <div className="successLabel">
                {content.SUCCESS}
            </div>
            <div className="descriptionContainer">
                <div>{content.DESCRIPTION_ONE}</div>
                <div>{content.DESCRIPTION_TWO}</div>
            </div>
            <div className="buttonWrapper">
                <Button 
                    className="successButton"
                    buttonText={content.PLACE_NEW_ORDER}
                    disabled={false}
                    onClick={props.placeNewOrderClick}
                />
            </div>
            <div className="buttonWrapper">
                <Button 
                    className="successButton"
                    buttonText={content.RATE_NEW_TRACKS}
                    disabled={false}
                    onClick={props.rateTrackClick}
                />
            </div>
        </div>
    );
};

Success.defaultProps = {

};

export default Success;