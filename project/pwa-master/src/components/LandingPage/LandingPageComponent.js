import React from "react";
import cx from "classnames";
import content from "./content";
import Icon from "../../common/IconComponent";
import LandingPageFooter from "./LandingPageFooter";
import Button from "../../common/Button";
import "./LandingPage.style.scss";
import HearBKHeader from "../../common/HearBKHeader";
import HearBKIcon from "../../common/HearBKIcon";
import PopUps from "../../components/PopUps/PopUpsComponent";

const Component = (props) => {
  return (
    <div className="landingPageContainer">
      <HearBKHeader />
      <div className="headingContainer">
        <div
          className="mainHeading"
          dangerouslySetInnerHTML={{ __html: content.MAIN_HEADING }}
        ></div>
        <div className="mainDescription">{content.MAIN_DESCRIPTION}</div>
        <div role="button" className="silverButtonContainer">
          <Button
            className="silverLaunchButton"
            buttonText={content.LAUNCH_BUTTON_TEXT}
            onClick={props.handleLaunchClick}
          ></Button>
        </div>
      </div>
      <div className="listenMusicContainer">
        <div className="listenMusicIconContainer">
          <Icon className={cx("listenMusicIcon")} iconName={"ListenMusic"} />
        </div>
        <div className="listenMusicSubTitle">
          {content.LISTEN_MUSIC_SUBTITLE}
        </div>
        <div className="listenMusicHeader">{content.LISTEN_MUSIC_HEADER}</div>
        <div className="listenMusicDescription">
          {content.LISTEN_MUSIC_DESCRIPTION}
        </div>
      </div>
      <div className="matterMostContainer">
        <div className="matterMostIconContainer">
          <Icon className={cx("matterMostIcon")} iconName={"MattersMost"} />
        </div>
        <div className="matterMostSubtitle">{content.MOST_MATTER_SUBTITLE}</div>
        <div className="matterMostHeader">{content.MOST_MATTER_HEADER}</div>
        <div className="matterMostDescription">
          {content.MOST_MATTER_DESCRIPTION}
        </div>
      </div>
      <div className="musicianFirstContainer">
        <div className="musicianFirstIconContainer">
          <Icon
            className={cx("musicianFirstIcon")}
            iconName={"MusicianFirst"}
          />
        </div>
        <div className="musicianFirstSubtitle">
          {content.MUSICIAN_FIRST_SUBTITLE}
        </div>
        <div className="musicianFirstHeader">
          {content.MUSICIAN_FIRST_HEADER}
        </div>
        <div className="musicianFirstDescription">
          {content.MUSICIAN_FIRST_DESCRIPTION}
        </div>
      </div>
      <div className="hearBKFooter">
        <HearBKIcon />
        <div className="buttonWrapper">
          <Button
            className="landingPageLaunchButton"
            buttonText={content.LAUNCH_BUTTON_TEXT}
            onClick={props.handleLaunchClick}
          ></Button>
        </div>
      </div>
      <LandingPageFooter />
      {props.showCookie && (
        <PopUps
          hasCloseIcon={false}
          name={"cookie"}
          handlers={{ handleCookieClick: props.handleSetCookie }}
          closeClick={props.cookieCloseClick}
        />
      )}
    </div>
  );
};

export default Component;
