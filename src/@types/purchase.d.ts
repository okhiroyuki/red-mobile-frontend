interface Purchase {
  canPurchase(): boolean;
  getOwned(): boolean;
  setCallback(arg0: (owned: boolean) => void): void;
  order(): Promise<void>;
}
