import React, { useCallback, useState } from "react";
import isEmpty from "lodash/isEmpty";
import content from "./content";
import "./Discover.styles.scss";
import Icon from "../../common/IconComponent";
import AudioPlayer from "../AudioPlayer";
import SwipeableCards from "../../common/SwipeableCards";
import { ENUMS } from "../../utils";
import Iframe from "../../common/Iframe";
import FooterNav from "../FooterNav";
import Button from "../../common/Button";

const DiscoverComponent = ({
  handleSwipeEnd,
  track
}) => {
  const [cardMoveStyle, setCardMoveStyle] = useState("");
  const [isSelected, setIsSelected] = useState("");

  const handleButtonClick = (dir) => {
    setIsSelected(dir)
    setTimeout(() => {
      setAnimation(dir);
    }, 1000);
  }

  const setAnimation = useCallback((dir) => {
    if (dir === "Left") {
      setCardMoveStyle("slide-left");
    }
    if (dir === "Right") {
      setCardMoveStyle("slide-right");
    }
    if (dir === "Up") {
      setCardMoveStyle("slide-top");
    }
    setTimeout(() => {
      handleSwipeEnd(dir);
      setCardMoveStyle("");
      setIsSelected("");
    }, 1000);
  }, [handleSwipeEnd]);
  const getComponent = useCallback(() => {
    const {
      trackUrl,
      mediaType,
      trackTitle,
      display_name,
      profile_image,
    } = track;

    const mediacomponent =
      mediaType === ENUMS.MEDIA_TYPE_YOUTUBE ? (
        <Iframe
          width=""
          height=""
          className="discoverIFrame"
          src={trackUrl}
          title="video-iframe"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></Iframe>
      ) : (
        <AudioPlayer src={trackUrl} />
      );

    return (
      <div className={`songCardContainer ${cardMoveStyle}`}>
        <Icon className="bookmarkIcon" iconName="bookmark1" />
        <div className="profilePicIconContainer">
        {profile_image ? (
          <img
            alt="profileImg"
            className="profilePicIcon"
            src={profile_image}
          />
        ) : (
          <Icon className="defaultProfilePicIcon" iconName="default_pro_pic_icon" />
        )}
        </div>
        <div className="artistTagContainer">{display_name}</div>
        <div className="songContainer">
          {mediacomponent}
          <div className="songTitle">{trackTitle}</div>
        </div>
        <div className="iconContainerHeader">
          {content.ICON_CONTAINER_HEADER}
        </div>
        <div className="iconContainer">
          <div className="iconCols">
            <Button
              isIcon
              className="ratingIcons"
              iconName={isSelected === "Left" ? "thumbs_down_blue" : "thumbs_down"}
              onClick={() => handleButtonClick("Left")}
            />
            <div className={isSelected === "Left" ? "ratingLabels selected" : "ratingLabels"}>{content.MISS}</div>
          </div>
          <div className="iconCols">
            <Button
              isIcon
              className="ratingIcons"
              iconName={isSelected === "Up" ? "thumbs_up_down_blue" : "thumbs_up_down"}
              onClick={() => handleButtonClick("Up")}
            />
            <div className={isSelected === "Up" ? "ratingLabels selected" : "ratingLabels"}>{content.POTENTIAL}</div>
          </div>
          <div className="iconCols">
            <Button
              isIcon
              className="ratingIcons"
              iconName={isSelected === "Right" ? "thumbs_up_blue" : "thumbs_up"}
              onClick={() => handleButtonClick("Right")}
            />
            <div className={isSelected === "Right" ? "ratingLabels selected" : "ratingLabels"}>{content.HIT}</div>
          </div>
        </div>
      </div>
    );
  }, [track, cardMoveStyle, handleButtonClick, setIsSelected]);

  return (
    <div className="discoverComponentContainer">
      <Icon className="backgroundIcon" iconName="Path85" />
      <div className="discoverComponentHeader">
        {/* <div onClick={() => handleClickMenuToggle(!menuIsOpen)} className="menuIconContainer">
          <Icon iconName="menu_white" className="menuIcon" />
        </div>
        {menuIsOpen && (
          <Menu handleClickMenuToggle={handleClickMenuToggle} />
        )} */}
        <div className="headerIconContainer">
          <Icon className="headerIcon" iconName="logo86" />
        </div>
        <div className="title1">{content.TITLE_1}</div>
        <div className="title2">{content.TITLE_2}</div>
      </div>
      {!isEmpty(track) ? (
        <SwipeableCards
          className="songCardOuterContainer"
          swipeThreshold={125}
          onSwipeEnd={handleSwipeEnd}
        >
          {getComponent()}
        </SwipeableCards>
      ) : (
        <h3 style={{ color: "#FFF" }}>
          No more tracks to rate. Please come back later
        </h3>
      )}
      <FooterNav />
    </div>
  );
};

DiscoverComponent.defaultProps = {
  track: {},
};

export default DiscoverComponent;
