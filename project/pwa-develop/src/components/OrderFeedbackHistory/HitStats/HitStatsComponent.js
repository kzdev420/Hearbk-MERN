import React from 'react';
import content from "./content";
import "./HitStats.styles.scss";
import CardSet from "./CardSet/CardSet";

const HitStatsComponent = ({
    data
}) => {
    return (
        <div className="hitStatsComponentContainer">
            <div className="hitStatsTitle">
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
                    {data.totalListeners}
                    <div className="colTitles">
                        {content.COL_TITLE_2}
                    </div>
                </div>
                <div className="mainHitStatsCols">
                    {Math.round(data.hitRate)}<span className="colPercentSign">%</span>
                    <div className="colTitles">
                        {content.COL_TITLE_3}
                    </div>
                </div>
            </div>
            <CardSet
                data={data} 
            />
        </div>
    );
};

export default HitStatsComponent;