import React from 'react';
import content from "./content";
import "./TrackReviews.styles.scss";
import CardSet from "./CardSet/CardSet";

const TrackReviewsComponent = ({ 
    isOpen,
    setExpandToggle,
    data
}) => {
    return (
        <section className="trackReviewsComponentContainer">
            <div className="trackReviewsTitle">
                {content.TITLE}
            </div>
            <div className="mainHitStatsRow">
                <div className="mainHitStatsCols">
                    {data.campaign}
                    <div className="colTitles">
                        {content.COL_TITLE_1}
                    </div>
                </div>
                <div className="mainHitStatsCols">
                    <div className="ratingRow">{data.avgRating}<span className="dividendFont">/10</span></div>
                    <div className="colTitles">{content.COL_TITLE_2}</div>
                </div>
            </div>
            <CardSet 
                isOpen={isOpen}
                setExpandToggle={setExpandToggle}
                data={data}
            />
        </section>
    );
};

export default TrackReviewsComponent;