"use client";
import Advance from "@/components/section/advance";
import Captcha from "@/components/section/captcha";
import Clients from "@/components/section/clients";
import FeaturesFast from "@/components/section/features-fast";
import TotalInfo from "@/components/section/totalInfo";
import UserCreates from "@/components/section/userCreates";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Home() {
  // const network = WalletAdapterNetwork.Mainnet;
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  // const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network]);
  return (
    <>
      {/* <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider> */}
            <QueryClientProvider client={queryClient}>
              <Advance />
              <Clients />
              <Captcha />
              <TotalInfo />
              <FeaturesFast />
              <UserCreates />
            </QueryClientProvider>
          {/* </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider> */}
    </>
  );
}
