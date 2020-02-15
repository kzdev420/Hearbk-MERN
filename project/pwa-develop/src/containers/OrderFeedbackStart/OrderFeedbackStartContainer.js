import React from 'react';
import { connect } from "react-redux";
import OrderFeedbackStart from "../../components/OrderFeedbackStart";

const OrderFeedbackStartContainer = (props) => {
    return (
        <OrderFeedbackStart />
    )
}

const mapStateToProps = (state) => ({

});

const mapActions = (dispatch) => ({

});

export default connect (
    mapStateToProps,
    mapActions
)(OrderFeedbackStartContainer);