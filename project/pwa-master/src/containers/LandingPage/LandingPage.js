import React, { useState, useCallback } from "react";
import Component from "../../components/LandingPage/LandingPageComponent";

const LandingPageContainer = (props) => {
  const [isCookieSet, setIsCookieSet] = useState(
    localStorage.getItem("showCookie")
  );
  const handleLaunchClick = useCallback(() => props.history.push("/signin"), [
    props.history,
  ]);
  const handleSetCookie = useCallback(() => {
    localStorage.setItem("showCookie", "true");
    setIsCookieSet(true)
  }, []);
  return (
    <Component
      handleLaunchClick={handleLaunchClick}
      showCookie={!isCookieSet}
      handleSetCookie={handleSetCookie}
      cookieCloseClick={() => setIsCookieSet(true)}
    />
  );
};

export default LandingPageContainer;
