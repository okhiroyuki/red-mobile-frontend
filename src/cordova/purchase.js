import { isCordova } from "./util";
const pid = "custom_modules";
let callback = null;

function getProduct() {
  return CdvPurchase.store.get(pid);
}

export function order() {
  return new Promise((resolve) => {
    if (isCordova()) {
      resolve(getProduct().getOffer().order());
    } else {
      resolve();
    }
  });
}

export function canPurchase() {
  return new Promise((resolve) => {
    if (isCordova()) {
      resolve(getProduct().canPurchase);
    } else {
      resolve(true);
    }
  });
}

export function setCallback(_callback) {
  callback = _callback;
}

export function getOwned() {
  return new Promise((resolve) => {
    if (isCordova()) {
      resolve(getProduct().owned);
    } else {
      resolve(false);
    }
  });
}

function owned() {
  if (callback) {
    callback(getProduct().owned);
  }
}

export function init() {
  if (!isCordova()) {
    return;
  }
  const { store, ProductType, Platform, LogLevel } = CdvPurchase;
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
    owned();
  });

  store.when().approved((transaction) => {
    console.log("finish subscription");
    transaction.finish();
  });

  store.when().productUpdated(() => {
    console.log("call productUpdated");
    owned();
  });

  store.when().receiptUpdated(() => {
    console.log("call receiptUpdated");
    owned();
  });

  store.initialize([Platform.GOOGLE_PLAY]);
}
