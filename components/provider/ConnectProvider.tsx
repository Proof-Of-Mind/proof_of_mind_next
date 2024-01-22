"use client";
import { createContext, useEffect, useState } from "react";

interface ConnectContextType {
  address: string;
  p: string;
  isConnected: boolean;
  network: string;
  check: () => boolean;
  connect: () => void;
  disconnect: () => void;
}

const defaultState: ConnectContextType = {
  address: "",
  p: "",
  isConnected: false,
  network: "",
  check: () => false,
  connect: () => {},
  disconnect: () => {},
};

export const ConnectContext = createContext<ConnectContextType>(defaultState);

export const ConnectProvider = ({ children }: any) => {
  const [address, setAddress] = useState("");
  const [p, setP] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [network, setNetwork] = useState("");

  const check = () => {
    if (typeof (window as any).okxwallet !== "undefined") {
      console.log("OKX is installed!");
      return true;
    } else {
      const win: any = typeof window !== "undefined" ? window : undefined;
      if (win) {
        const ua = win.navigator.userAgent;
        const isIOS = /iphone|ipad|ipod|ios/i.test(ua);
        const isAndroid = /android|XiaoMi|MiuiBrowser/i.test(ua);
        const isMobile = isIOS || isAndroid;
        const isOKApp = /OKApp/i.test(ua);
        if (isMobile && !isOKApp) {
          const encodedUrl =
            "https://www.okx.com/download?deeplink=" +
            encodeURIComponent("https://pom.wtf");
          window.location.href = encodedUrl;
        }
      }
      return false;
    }
  };

  const connect = () => {
    const win: any = typeof window !== "undefined" ? window : undefined;
    if (win) {
      const ua = win.navigator.userAgent;
      const isIOS = /iphone|ipad|ipod|ios/i.test(ua);
      const isAndroid = /android|XiaoMi|MiuiBrowser/i.test(ua);
      const isMobile = isIOS || isAndroid;
      const isOKApp = /OKApp/i.test(ua);

      if (isMobile && isOKApp) {
        // @ts-ignore
        (okxwallet as any).bitcoin
          .connect()
          .then(
            (accounts: {
              address: string;
              publicKey: string;
              compressedPublicKey: string;
            }) => {
              setAddress(accounts.address);
              if (
                accounts.compressedPublicKey &&
                accounts.compressedPublicKey !== ""
              ) {
                setP(accounts.compressedPublicKey);
              } else {
                setP(accounts.publicKey);
              }
              // @ts-ignore
              (okxwallet as any).bitcoin
                .getNetwork()
                .then((network: string) => {
                  setNetwork(network);
                  setIsConnected(true);
                });
            }
          );
      } else {
        (window as any).okxwallet.bitcoin
          .connect()
          .then(
            (accounts: {
              address: string;
              publicKey: string;
              compressedPublicKey: string;
            }) => {
              setAddress(accounts.address);
              if (
                accounts.compressedPublicKey &&
                accounts.compressedPublicKey !== ""
              ) {
                setP(accounts.compressedPublicKey);
              } else {
                setP(accounts.publicKey);
              }
              (window as any).okxwallet.bitcoin
                .getNetwork()
                .then((network: string) => {
                  setNetwork(network);
                  setIsConnected(true);
                });
            }
          );
      }
    }
  };

  const disconnect = () => {
    setAddress("");
    setIsConnected(false);
  };

  const accountChanged = () => {
    if (check()) {
      (window as any).okxwallet.bitcoin.on(
        "accountsChanged",
        (accounts: string[]) => {
          if (accounts.length === 0) {
            setAddress("");
            setIsConnected(false);
          } else {
            setAddress(accounts[0]);
          }
        }
      );
    }
  };

  useEffect(() => {
    // accountChanged()
  }, []);

  return (
    <ConnectContext.Provider
      value={{ address, p, isConnected, network, check, connect, disconnect }}
    >
      {children}
    </ConnectContext.Provider>
  );
};
