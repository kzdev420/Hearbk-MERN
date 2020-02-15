export const orderSelector = ({ orderDetails, userDetails, preferences }) => ({
    accountName: orderDetails.accountName,
    tracks: orderDetails.tracks,
    isSaveCardDetails: orderDetails.saveCardDetails,
    isPremiumUser: userDetails.isPremiumUser,
    genres: preferences.genres,
    paymentMethods: userDetails.paymentMethods
});

export const orderHistorySelector = ({ orderDetails }) => ({
    tracksHistory: orderDetails.orderHistory,
    loading: orderDetails.loading
});