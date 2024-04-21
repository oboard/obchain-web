"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function WalletPublicKey({ publicKey }: { publicKey: string }) {
  const [copyed, setCopyed] = useState(false);
  const t = useTranslations("Wallet");
  return (
    <p className="flex flex-row items-center">
      <span className="mr-2 shrink-0">{t("public_key")}:</span>
      <span className="text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis">{ publicKey }</span>
      <Button
        className="ml-2 shrink-0"
        variant="outline"
        size="icon"
        onClick={() => {
          toast.success('Copyed!')
          navigator.clipboard.writeText(publicKey);
          setCopyed(true);
          setTimeout(() => setCopyed(false), 1000);
        }}
      >
        {copyed ? (
          <i className="icon-[tabler--check] h-4 w-4" />
        ) : (
          <i className="icon-[tabler--copy] h-4 w-4" />
        )}
      </Button>
    </p>
  );
}
