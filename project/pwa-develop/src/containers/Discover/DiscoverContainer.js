import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";

import DiscoverComponent from "../../components/Discover/DiscoverComponent";
import { discoverSelector } from "../../state/selectors/discover";
import {
  getTracksForDiscover,
  postDiscoverFeedback,
} from "../../state/actions/discoverActions";

const DiscoverContainer = (props) => {
  const { tracks, getTracksDispatchAction } = props;

  useEffect(() => {
    if (!localStorage.getItem("x-access-token")) {
      props.history && props.history.push("/signin");
    }
    if (localStorage.getItem("isFirstUserLogin")) {
      props.history && props.history.push("/preferences");
    }
  }, [props.history]);

  useEffect(() => {
    getTracksDispatchAction();
  }, [getTracksDispatchAction]);

  const [componentIndex, setComponentIndex] = useState(0);
  const handleSwipeEnd = useCallback(
    (e) => {
      const { tracks } = props;
      let feedbackType = "HIT";
      if (e === "Left") {
        feedbackType = "MISS";
      }
      if (e === "Up") {
        feedbackType = "POTENTIAL";
      }
      postDiscoverFeedback({
        feedbackId: tracks[componentIndex]._id,
        feedbackType,
      });
      setComponentIndex(componentIndex + 1);
    },
    [componentIndex, props]
  );

  const [menuIsOpen, handleClickMenuToggle] = useState(false);

  return (
    <DiscoverComponent
      track={tracks[componentIndex]}
      handleSwipeEnd={handleSwipeEnd}
      menuIsOpen={menuIsOpen}
      handleClickMenuToggle={handleClickMenuToggle}
    />
  );
};

const dispatchActions = (dispatch) => ({
  getTracksDispatchAction: () => dispatch(getTracksForDiscover()),
});

export default connect(
  discoverSelector,
  dispatchActions
)(DiscoverContainer);
