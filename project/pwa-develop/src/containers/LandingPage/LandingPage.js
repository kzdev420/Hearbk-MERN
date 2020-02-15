import React, { useState, useCallback } from "react";
import Component from "../../components/LandingPage/LandingPageComponent";

const LandingPageContainer = (props) => {
  const [isCookieSet, setIsCookieSet] = useState(
    localStorage.getItem("showCookie")
  );
  const [showPreference, setShowPreferences] = useState(false);
  const handleLaunchClick = useCallback(() => props.history.push("/signin"), [
    props.history,
  ]);
  const handleSetCookie = useCallback(() => {
    localStorage.setItem("showCookie", "true");
    setIsCookieSet(true);
  }, []);
  const handlePreferenceClick = useCallback(() => {
    setShowPreferences(true);
    handleSetCookie();
  }, []);
  return (
    <Component
      handleLaunchClick={handleLaunchClick}
      showPreference={showPreference}
      showCookie={!isCookieSet}
      handleSetCookie={handleSetCookie}
      cookieCloseClick={() => setIsCookieSet(true)}
      handlePreferenceClick={handlePreferenceClick}
      handlePreferenceClose={() => setShowPreferences(false)}
    />
  );
};

export default LandingPageContainer;
