import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import "./styles.scss";

const Tabs = ({ tabs, selectedIndex, onTabChange, className }) => {
  return (
    <div className={cx("tabsContainer", className)}>
      {tabs.map((tab, index) => {
        return (
          <div
            role="button"
            className={cx("tabItem", index === selectedIndex && "isSelected")}
            onClick={() => onTabChange(index)}
            key={index}
          >
            {tab}
          </div>
        );
      })}
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  onTabChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Tabs.defaultProps = {
    className: "",
};

export default Tabs;
