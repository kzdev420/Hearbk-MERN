import React, { useState, useCallback } from "react";
import Login from "../Login";
import SignUp from "../SignUp";
import HearBKHeader from "../../common/HearBKHeader";
import AuthTabsComponent from "../../components/AuthTabsComponent";
import "./Auth.styles.scss";
import HearBKIcon from "../../common/HearBKIcon";
import { Link } from "react-router-dom";

const AuthContainer = (props) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const renderComponent = useCallback(() => {
    return selectedTabIndex === 1 ? (
      <SignUp {...props} handleSuccess={() => setSelectedTabIndex(0)}/>
    ) : (
      <Login {...props} />
    );
  }, [selectedTabIndex, props]);

  const handleTabChange = (index) => setSelectedTabIndex(index);

  return (
    <div style={{ width: "100%" }}>
      <Link to="/">
        <HearBKHeader />
      </Link>
      <AuthTabsComponent
        onTabChange={handleTabChange}
        selectedIndex={selectedTabIndex}
      />
      {renderComponent()}
      <div className="authHearBKFooter">
        <HearBKIcon />
      </div>
    </div>
  );
};

export default AuthContainer;
