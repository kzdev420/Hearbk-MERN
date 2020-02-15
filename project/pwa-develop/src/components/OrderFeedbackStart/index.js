import React from 'react';
import content from "./content";
import "./styles.scss";
import Icon from "../../common/IconComponent";
import Button from "../../common/Button";

const OrderFeedbackStartComponent = (props) => {
    return (
        <div className="orderFeedbackStartContainer">
            <Icon className="cancelIcon" iconName="cancel" />
            <Icon className="backgroundIcon" iconName="Path85" />
            <div className="orderFeedbackStartContainerHeader">
                <Icon className="headerIcon" iconName="logo86" />
                <div className="title1">
                    {content.TITLE_1}
                </div>
                <div className="title2">
                    {content.TITLE_2}
                </div>
            </div>
            <div className="hitFeedbackContainer">
                <div className="containerBackground"></div>
                <div className="containerContents">
                    <div className="titleContainer">
                        <div className="feedbackContainerTitle1">
                            {content.SUBTITLE_1A}
                        </div>
                        <div className="feedbackContainerTitle2">
                            {content.SUBTITLE_1B}
                        </div>
                    </div>
                    <div className="descriptionContainer">
                        {content.SUBDESCRIPTION_1}
                    </div>
                    <div className="buttonWrapper">
                        <Button 
                            className="launchButton"
                            buttonText={content.BUTTON_TEXT_1}
                            disabled={false}
                        />
                    </div>
                </div>
            </div>
            <div className="proFeedbackContainer">
                <div className="containerBackground"></div>
                <div className="containerContents">
                    <div className="titleContainer">
                        <div className="feedbackContainerTitle1">
                            {content.SUBTITLE_2A}
                        </div>
                        <div className="feedbackContainerTitle2">
                            {content.SUBTITLE_2B}
                        </div>
                    </div>
                    <div className="descriptionContainer">
                        {content.SUBDESCRIPTION_2}
                    </div>
                    <div className="buttonWrapper proFeedbackWrapper">
                        <Button 
                            className="launchButton"
                            buttonText={content.BUTTON_TEXT_2}
                            disabled={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderFeedbackStartComponent;