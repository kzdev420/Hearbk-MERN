import React from "react";
import "./LandingPageFooter.styles.scss";
import content from "./content";
import IconComponent from "../../../common/IconComponent";

const LandingPageFooter = () => {
  return (
    <div className="landingPageFooterContainer">
      <div className="socialMediaActionContainer">
        <a 
          href="https://www.facebook.com/hearbkapp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconComponent iconName="facebook" className="socialMediaIcon" />
        </a>
        <a 
          href="https://twitter.com/hearbkapp" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconComponent iconName="twitter_new" className="socialMediaIcon" />
        </a>
        <a 
          href="https://www.instagram.com/hearbkapp/" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconComponent iconName="instagram" className="socialMediaIcon" />
        </a>
        {/* <a>
          <IconComponent iconName="youtube" className="socialMediaIcon" />
        </a> */}
      </div>
      <div className="footerMenuContainer">
        <div className="footerMenuColumn">
          <a
            href="https://hearbk.com/hq/about-us/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.ABOUT_US}
          </a>
          <a
            href="https://hearbk.com/hq/manage-preferences/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.MANAGE_PREFERENCES}
          </a>
          <a
            href="https://hearbk.com/hq/terms-conditions/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.TERMS_AND_CONDITIONS}
          </a>
        </div>
        <div className="footerMenuColumn">
          <a
            href="https://hearbk.com/hq/cookie-policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.COOKIE_POLICY}
          </a>
          <a
            href="https://hearbk.com/hq/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.PRIVACY_POLICY}
          </a>
          <a
            href="https://hearbk.com/hq/refund-policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.REFUND_POLICY}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPageFooter;
