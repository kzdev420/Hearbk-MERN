import React, { useCallback, useState, useEffect } from "react";
import { connect } from "react-redux";
import Component from "../../components/OrderFeedback/OrderFeedbackComponent";
import {
  updateOrderData,
  submitPayment,
  uploadAudioFileToIPFS,
  updateTrackDetails,
  addAnotherTrack,
  removeTrack,
  resetState,
} from "../../state/actions/orderActions";
import { orderSelector } from "../../state/selectors/order";
import { ENUMS } from "../../utils";
import { getGenres } from "../../state/actions/preferencesActions";
import { toast } from "react-toastify";
import {
  getPaymentMethods,
  deletePaymentMethod,
} from "../../state/actions/userActions";

const OrderFeedbackContainer = ({
  accountName,
  tracks,
  genres,
  paymentMethods,
  isSaveCardDetails,
  dispatchUpdate,
  dispatchTrackUpdate,
  dispatchAddNewTrack,
  dispatchGetGenres,
  dispatchRemoveTrack,
  history,
  dispatchResetState,
  getPaymentMethodsDispatchAction,
  deletePaymentMethodDispatchAction,
}) => {
  useEffect(() => {
    if (!localStorage.getItem("x-access-token")) {
      history && history.push("/signin");
    }
    if (localStorage.getItem("isFirstUserLogin")) {
      history && history.push("/preferences");
    }
  }, [history]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatchGetGenres();
    getPaymentMethodsDispatchAction();
  }, [dispatchGetGenres, getPaymentMethodsDispatchAction]);

  const [shouldCreateToken, setShouldCreateToken] = useState(false);
  const [isPremium, setIsPremium] = useState(
    !!localStorage.getItem("isPremiumUser")
  );
  const [isHyperTargeted, setIsHyperTargeted] = useState(
    !!localStorage.getItem("isPremiumUser")
  );
  const [isAddPremium, setAddPremium] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(undefined);
  const [promoCode, setPromoCode] = useState("");
  const getTotalAmount = useCallback(() => {
    const amount = tracks.reduce((total, track) => {
      return total + track.selectedFeedback;
    }, 0);
    return amount;
  }, [tracks]);
  const validateFormData = useCallback(() => {
    const isFormError = tracks.some((track) => {
      if (track.trackTitle.length < 1) {
        toast.error("Enter track title");
        return true;
      }
      if (!track.genreId) {
        toast.error("Select a genre for the tracks");
        return true;
      }
      if (track.mediaType === ENUMS.MEDIA_TYPE_FILEUPLOAD) {
        if (!track.fileUpload) {
          toast.error("Upload your mp3 file");
          return true;
        }
      }
      if (track.mediaType === ENUMS.MEDIA_TYPE_YOUTUBE) {
        if (track.trackUrl.length === 0) {
          toast.error("Enter YouTube url");
        }
        return track.trackUrl.length === 0;
      }
      return false;
    });
    return isFormError;
  }, [tracks]);
  const onSubmitPayment = useCallback(
    async (cardInfo) => {
      if (validateFormData()) {
        setIsError(true);
        return;
      }
      if (
        promoCode.length === 0 &&
        !(cardInfo && cardInfo.id && accountName.length > 0)
      ) {
        toast.error("Enter valid card details");
        return;
      }
      if (promoCode.length > 0 && promoCode !== "DAY_ONES") {
        toast.error("Enter valid promo code");
        return;
      }
      const tracksToUpload = tracks.map((track, index) => {
        delete track.fileToUpload;
        track.id = index;
        track.genreId = [track.genreId];
        return track;
      });
      setIsProcessing(true);
      const payload = {
        tracks: tracksToUpload,
        saveCardDetails: isSaveCardDetails,
        amount: getTotalAmount(),
        currency: "USD",
        paymentToken: promoCode.length > 0 ? "PROMO_CODE" : cardInfo.id,
        isAddPremium,
        ...(cardInfo &&
          cardInfo.paymentFromSavedCard && { paymentFromSaveCard: true }),
        ...(promoCode.length > 0 && { promoCode }),
      };

      const response = await submitPayment(payload);
      if (response.ok) {
        const data = await response.json();
        await Promise.all(
          tracksToUpload.map(async ({ id, mediaType, fileUpload }) => {
            if (mediaType === ENUMS.MEDIA_TYPE_FILEUPLOAD) {
              const { feedbackId } = data.find((track) => track.trackId === id);
              const formData = new FormData();
              formData.append("trackUpload", fileUpload);
              const uploadFileResponse = await uploadAudioFileToIPFS(
                formData,
                feedbackId
              );
            }
          })
        ).then(() => {
          setIsProcessing(false);
          setIsSuccess(true);
          if (isAddPremium) {
            setIsPremium(true);
            localStorage.setItem("isPremiumUser", String(true));
          }
        });
      } else {
        setIsProcessing(false);
        toast.error("Payment failed. Please check your card details or promo code")
      }
    },
    [
      tracks,
      getTotalAmount,
      validateFormData,
      isAddPremium,
      isSaveCardDetails,
      accountName,
      promoCode,
    ]
  );

  const handleInputChange = useCallback(
    (e) => {
      let payload = {};
      if (e.target.id === "promoCode") {
        setPromoCode(e.target.value);
      }
      if (e.target.name === "isAddPremium") {
        setAddPremium(e.target.checked);
      } else if (e.target.name === "isHyperTargeted") {
        setIsHyperTargeted(e.target.checked);
      } else {
        if (e.target.name === "saveCardDetails") {
          payload = {
            [e.target.name]: e.target.checked,
          };
        } else {
          payload = {
            [e.target.id]: e.target.value,
          };
        }
        dispatchUpdate(payload);
      }
    },
    [dispatchUpdate]
  );
  const handleSaveCardChanges = useCallback(
    (cardInfo) => {
      setShouldCreateToken(false);
      onSubmitPayment(cardInfo);
    },
    [onSubmitPayment]
  );

  const handleOrderNowClick = useCallback(() => {
    if (selectedPaymentId) {
      onSubmitPayment({ id: selectedPaymentId, paymentFromSavedCard: true });
    } else {
      setShouldCreateToken(true);
    }
  }, [onSubmitPayment, selectedPaymentId]);

  const handleTrackUpdates = useCallback(
    (e, index) => {
      if (e.id) {
        dispatchTrackUpdate(
          {
            [e.id]: e.value,
          },
          index
        );
      } else if (
        e.target.id === "fileUpload" &&
        e.target.files &&
        e.target.files.length > 0
      ) {
        dispatchTrackUpdate({ fileUpload: e.target.files[0] }, index);
      } else {
        dispatchTrackUpdate(
          {
            [e.target.id]: e.target.value,
          },
          index
        );
      }
    },
    [dispatchTrackUpdate]
  );

  const handlePaymentFormError = useCallback((e) => {
    console.log(e);
  }, []);

  const [menuIsOpen, handleClickMenuToggle] = useState(false);

  const setAddGenre = useCallback(
    (genre, index) => {
      dispatchTrackUpdate({ genreId: genre._id }, index);
    },
    [dispatchTrackUpdate]
  );

  const handleRemoveTrack = useCallback(
    (id) => {
      if (id === "premium") {
        setAddPremium(false);
      } else {
        dispatchRemoveTrack(id);
      }
    },
    [dispatchRemoveTrack]
  );

  const handleDeleteSavedCard = useCallback(
    (paymentId) => {
      deletePaymentMethodDispatchAction({ id: paymentId });
    },
    [deletePaymentMethodDispatchAction]
  );

  const handleSelectPayment = useCallback(
    (id) => {
      if (id === selectedPaymentId) {
        setSelectedPaymentId(undefined);
      } else {
        setSelectedPaymentId(id);
      }
    },
    [selectedPaymentId]
  );

  return (
    <Component
      isProcessing={isProcessing}
      selectedPaymentId={selectedPaymentId}
      handleDeleteSavedCard={handleDeleteSavedCard}
      handleSavedCardSelect={handleSelectPayment}
      promoCode={promoCode}
      isPremium={isPremium}
      genres={genres}
      isSuccess={isSuccess}
      accountName={accountName}
      paymentMethods={paymentMethods}
      tracks={tracks}
      isSaveCardDetails={isSaveCardDetails}
      shouldCreateToken={shouldCreateToken}
      onInputChange={handleInputChange}
      totalAmount={getTotalAmount}
      isAddPremium={isAddPremium}
      saveCardInformation={handleSaveCardChanges}
      onSubmitFeedback={handleOrderNowClick}
      handlePaymentFormError={handlePaymentFormError}
      handleTrackChanges={handleTrackUpdates}
      isPaymentFormReady={true}
      handleAddAnotherTrack={dispatchAddNewTrack}
      menuIsOpen={menuIsOpen}
      handleClickMenuToggle={handleClickMenuToggle}
      setAddGenre={setAddGenre}
      handleRemoveTrack={handleRemoveTrack}
      handleLogoClick={() => history.push("/")}
      handleRateTrackClick={() => {
        history.push("/discover");
        setIsSuccess(false);
      }}
      handlePlaceNewOrderClick={() => {
        dispatchResetState();
        setIsSuccess(false);
      }}
      closeSuccessPopUp={() => setIsSuccess(false)}
      isHyperTargeted={isHyperTargeted}
    />
  );
};

const dispatchAction = (dispatch) => ({
  dispatchUpdate: (payload) => dispatch(updateOrderData(payload)),
  dispatchTrackUpdate: (payload, index) =>
    dispatch(updateTrackDetails(payload, index)),
  dispatchAddNewTrack: () => dispatch(addAnotherTrack()),
  dispatchGetGenres: () => dispatch(getGenres()),
  dispatchRemoveTrack: (id) => dispatch(removeTrack(id)),
  dispatchResetState: () => dispatch(resetState()),
  getPaymentMethodsDispatchAction: () => dispatch(getPaymentMethods()),
  deletePaymentMethodDispatchAction: (payload) =>
    dispatch(deletePaymentMethod(payload)),
});

export default connect(
  orderSelector,
  dispatchAction
)(OrderFeedbackContainer);
