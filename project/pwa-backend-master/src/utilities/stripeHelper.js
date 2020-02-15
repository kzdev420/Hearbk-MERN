export const createPaymentMethod = (paymentToken, userStripeId) => {
  const stripeObj = require("stripe")(process.env.STRIPE_KEY);
  return stripeObj.paymentMethods
    .create({
      type: "card",
      card: {
        token: paymentToken,
      },
    })
    .then((res) =>
      stripeObj.paymentMethods.attach(res.id, {
        customer: userStripeId,
      })
    );
};

export const createStripeCustomer = (userEmail, token) => {
  const stripeObj = require("stripe")(process.env.STRIPE_KEY);
  return stripeObj.customers.create({
    email: userEmail,
    source: token,
  });
};

export const createPremiumSubscription = (userStripeId) => {
  const stripeObj = require("stripe")(process.env.STRIPE_KEY);
  return stripeObj.subscriptions.create({
    customer: userStripeId,
    items: [{ plan: process.env.STRIPE_PAYMENT_PLAN }],
  });
};

export const getPaymentMethods = (userStripeId) => {
  const stripeObj = require("stripe")(process.env.STRIPE_KEY);
  return stripeObj.paymentMethods.list({
    customer: userStripeId,
    type: "card",
  });
};

export const detachPaymentMethod = ({ id }) => {
  const stripeObj = require("stripe")(process.env.STRIPE_KEY);
  return stripeObj.paymentMethods.detach(id);
};
