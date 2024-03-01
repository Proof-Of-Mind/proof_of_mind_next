import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link className="block" href="/" aria-label="Cruip">
      <img
        src="/images/logo.jpg"
        width={38}
        height={38}
        // priority
        alt="logo"
      />
    </Link>
  );
}
