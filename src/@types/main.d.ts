interface Main {
  getIp(): string;
  start(username: string, password: string, port: number): void;
  launchNodeRED(value: string): void;
  openDashboard(): void;
  setBackKeyDownCallback(arg0: () => void): void;
  getStatus(): string;
  setStatusCallback(arg0: (status: string) => void): void;
  reset(): void;
}
