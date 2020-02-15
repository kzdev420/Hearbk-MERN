import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import OrderFeedbackHistory from "../../components/OrderFeedbackHistory";
import { getOrderHistory } from "../../state/actions/userActions";
import { orderHistorySelector } from "../../state/selectors/order";

const OrderFeedbackHistoryContainer = ({tracksHistory = [], history, loading = true }) => {
  useEffect(() => {
    if (localStorage.getItem("isFirstUserLogin")) {
      history && history.push("/preferences");
    }
  }, [history]);
  const [hitStats, setToggle] = useState(true);
  const [menuIsOpen, handleClickMenuToggle] = useState(false);

  return (
    <OrderFeedbackHistory
      hitStats={hitStats}
      setToggle={setToggle}
      data={tracksHistory}
      menuIsOpen={menuIsOpen}
      handleClickMenuToggle={handleClickMenuToggle}
      loading={loading}
    />
  );
};

const dispatchAction = (dispatch) => ({
  getOrderHistoryDispatchAction: dispatch(getOrderHistory()),
});

export default connect(
  orderHistorySelector,
  dispatchAction
)(OrderFeedbackHistoryContainer);
