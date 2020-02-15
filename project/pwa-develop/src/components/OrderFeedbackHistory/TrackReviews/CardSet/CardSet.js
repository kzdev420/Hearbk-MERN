import React from 'react';
import Card from "./Card/Card";

const CardSet = ({ 
    isOpen, 
    setExpandToggle, 
    data 
}) => {
    const cardArray = data.trackStats.map((cardData, i) => {
        return (
            <Card 
                id={i}
                isOpen={isOpen}
                setExpandToggle={setExpandToggle}
                cardData={cardData}
                key={i}
            />
        )
    })
    
    return (
        cardArray
    );
};

export default CardSet;