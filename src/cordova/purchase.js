const pid = "custom_modules";
let Vue;

function getProduct() {
  return CdvPurchase.store.get(pid);
}

export function order() {
  return getProduct().getOffer().order();
}

export function canPurchase() {
  return getProduct().canPurchase;
}

function owned() {
  return getProduct().owned;
}

export function init(_vue) {
  const { store, ProductType, Platform, LogLevel } = CdvPurchase;
  Vue = _vue;
  if (!store) {
    console.log("Store not available");
    return;
  }
  store.verbosity = LogLevel.INFO;

  store.error((error) => {
    console.log(`ERROR ${error.code}: ${error.message}`);
  });

  store.register({
    id: pid,
    alias: "subscription1",
    platform: Platform.GOOGLE_PLAY,
    type: ProductType.PAID_SUBSCRIPTION,
  });

  store.ready(() => {
    console.log("\\o/ STORE READY \\o/");
    Vue.$root.owned = owned();
  });

  store.when().approved((transaction) => {
    console.log("finish subscription");
    transaction.finish();
  });

  store.when().productUpdated(() => {
    console.log("call productUpdated");
    Vue.$root.owned = owned();
  });

  store.when().receiptUpdated(() => {
    console.log("call receiptUpdated");
    Vue.$root.owned = owned();
  });

  store.initialize([Platform.GOOGLE_PLAY]);
}
