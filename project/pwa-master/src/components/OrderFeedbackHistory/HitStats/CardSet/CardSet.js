import React from "react";
import Card from "./Card/Card";

const CardSet = ({
  isOpen,
  setExpandToggle,
  data = {
    trackStats: [],
  },
}) => {
  const cardArray = data && data.trackStats && data.trackStats.map((cardData, i) => {
    return (
      <Card
        id={i}
        setExpandToggle={setExpandToggle}
        cardData={cardData}
        key={i}
      />
    );
  });

  return cardArray || null;
};

export default CardSet;
