import React from 'react';
import content from "./content";
import "./styles.scss";
import Icon from "../../../common/IconComponent";
import Button from "../../../common/Button";

const Cookie = (props) => {
    return (
        <div className="cookieContainer">
            <div className="mainIconContainer">
                <Icon className="mainIcon" iconName="COOKIE_1" />
            </div>
            <Button 
                className="acceptButton"
                buttonText={content.ACCEPT}
                onClick={() => props.handleCookieClick()}
            />
            <div className="descriptionContainer">
                <div className="description">
                    {content.DESCRIPTION_1A}
                    <br/>
                    {content.DESCRIPTION_1B}
                    <br/>
                    {content.DESCRIPTION_1C}
                </div>
                <div className="description">
                    {content.DESCRIPTION_2A}
                    <br/>
                    {content.DESCRIPTION_2B}
                </div>
            </div>
            <div className="buttonWrapper">
                <a
                className="launchButton"
                href="https://hearbk.com/hq/manage-preferences/"
                target="_blank"
                rel="noopener noreferrer"
                >{content.BUTTON_ONE_TEXT}</a>
                <a
                className="launchButton"
                href="https://hearbk.com/hq/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                >{content.BUTTON_TWO_TEXT}</a>
                <a
                className="launchButton"
                href="https://hearbk.com/hq/cookie-policy/"
                target="_blank"
                rel="noopener noreferrer"
                >{content.BUTTON_THREE_TEXT}</a>
            </div>
        </div>
    );
};

Cookie.defaultProps = {

};

export default Cookie;