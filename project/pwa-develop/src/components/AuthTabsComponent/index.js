import React from "react";
import content from "./content";
import Tabs from "../../common/Tabs";
import "./styles.scss";
const AuthTabsComponent = ({ selectedIndex, onTabChange }) => {
  return (
    <div className="authTabsContainer">
      <Tabs
        tabs={Object.values(content)}
        selectedIndex={selectedIndex}
        onTabChange={onTabChange}
      />
    </div>
  );
};

export default AuthTabsComponent;
