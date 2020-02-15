import React from 'react';
import content from "./content";
import "./Card.styles.scss";
import Icon from "../../../../../common/IconComponent";

const Card = ({
    isOpen, 
    setExpandToggle, 
    cardData 
}) => {
    return (
        <div className="bigWrapper">
            <div className="ratingIconWrapper greenWrapper">
                {cardData.review.rating}
            </div>
            <div className="reviewSubContainers">
                <div onClick={() => setExpandToggle(!isOpen)} className="subContainerHeader">
                    <span className="expandIcon">
                        {!isOpen ? "+" : "-"}
                    </span>
                    <Icon className="trackIcon" iconName={cardData.review.type === "audio" ? "musical_note" : "video_camera"} />
                    <div className="reviewHeaderContainer">
                        <div className="trackTitle">
                            {cardData.trackTitle}
                        </div>
                        <div className="trackDescription">
                            {cardData.review.description}
                        </div>
                        <div className="trackDate">
                            {cardData.review.date}
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <React.Fragment>
                        <div className="subContainerBody">
                            <div className="commentsLabel">
                                {content.COMMENTS_LABEL}
                            </div>
                            <div className="commentsContainer">
                                {cardData.review.comment}
                            </div>
                        </div>
                        <div className="subContainerFooter">
                            <Icon className="reviewerProfilePic" />
                            <div>reviewed by <span className="reviewerTag">@{cardData.review.reviewer}</span></div>
                        </div>
                    </React.Fragment>
                )}
            </div>            
        </div>
    );
};

export default Card;