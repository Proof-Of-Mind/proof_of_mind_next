"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { notification } from "../../components/Notiofication";
import UserModal from "../UserModal";
import { ConnectContext } from "../provider/ConnectProvider";

export default function Header() {
  const { address, isConnected, check, connect, disconnect } =
    useContext(ConnectContext);

  const [showModal, setShowModal] = useState(false);

  const handleConnectWallet = () => {
    const flag = check();
    if (!flag) {
      console.error("connect wallet error");
      notification("", "top-center", 3);
    }
    if (!isConnected) {
      connect();
    } else {
      disconnect();
    }
  };

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="Cruip">
              <svg
                className="w-8 h-8 fill-current text-purple-600"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M31.952 14.751a260.51 260.51 0 00-4.359-4.407C23.932 6.734 20.16 3.182 16.171 0c1.634.017 3.21.28 4.692.751 3.487 3.114 6.846 6.398 10.163 9.737.493 1.346.811 2.776.926 4.262zm-1.388 7.883c-2.496-2.597-5.051-5.12-7.737-7.471-3.706-3.246-10.693-9.81-15.736-7.418-4.552 2.158-4.717 10.543-4.96 16.238A15.926 15.926 0 010 16C0 9.799 3.528 4.421 8.686 1.766c1.82.593 3.593 1.675 5.038 2.587 6.569 4.14 12.29 9.71 17.792 15.57-.237.94-.557 1.846-.952 2.711zm-4.505 5.81a56.161 56.161 0 00-1.007-.823c-2.574-2.054-6.087-4.805-9.394-4.044-3.022.695-4.264 4.267-4.97 7.52a15.945 15.945 0 01-3.665-1.85c.366-3.242.89-6.675 2.405-9.364 2.315-4.107 6.287-3.072 9.613-1.132 3.36 1.96 6.417 4.572 9.313 7.417a16.097 16.097 0 01-2.295 2.275z" />
              </svg>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link href="/features" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                  About us
                </Link>
              </li>
              <Dropdown title="Support">
                <li>
                  <Link href="/contact" className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href="/help/frequently-asked-questions" className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">
                    Help center
                  </Link>
                </li>
                <li>
                  <Link href="/404" className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">
                    404
                  </Link>
                </li>
              </Dropdown>
            </ul> */}

            <ul className="flex grow justify-end flex-wrap items-center">
              <li className="ml-3">
                <button
                  className="btn-sm text-white bg-purple-600 hover:bg-purple-700 mx-3 min-w-[132px]"
                  onClick={handleConnectWallet}
                >
                  {isConnected
                    ? address.substr(0, 6) + "..." + address.substr(-4)
                    : "Connect Wallet"}
                </button>
                {address ? (
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn-sm text-white bg-purple-600 hover:bg-purple-700 mx-3"
                  >
                    Info
                  </button>
                ) : null}
              </li>
            </ul>
          </nav>

          <div className="md:hidden">
            <button
              className="btn-sm text-white bg-purple-600 hover:bg-purple-700 min-w-[132px]"
              onClick={handleConnectWallet}
            >
              {isConnected
                ? address.substr(0, 6) + "..." + address.substr(-4)
                : "Connect Wallet"}
            </button>
          </div>
          {address ? (
            <div className="md:hidden">
              <button
                onClick={() => setShowModal(true)}
                className="btn-sm text-white bg-purple-600 hover:bg-purple-700"
              >
                Info
              </button>
            </div>
          ) : null}

          <UserModal
            showModal={showModal}
            callback={() => setShowModal(false)}
            title="User Info"
            button="Close"
          />

          {/* <MobileMenu /> */}
        </div>
      </div>
    </header>
  );
}
