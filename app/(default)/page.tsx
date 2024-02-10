"use client";
// export const metadata = {
//   title: "Proof Of Mind",
//   description: "A distribute protocol based on recaptcha.",
// };

import Clients from "@/components/section/clients";
import Advance from "@/components/section/advance";
import Captcha from "@/components/section/captcha";
import UserCreates from "@/components/section/userCreates";
import FeaturesFast from "@/components/section/features-fast";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Advance />
        <Clients />
        <Captcha />
        <FeaturesFast />
        <UserCreates />
      </QueryClientProvider>
    </>
  );
}
