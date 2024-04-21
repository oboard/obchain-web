"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function WalletPrivateKey({ privateKey }: { privateKey: string }) {
  const [copyed, setCopyed] = useState(false);
  const t = useTranslations("Wallet");
  return (
    <p className="flex flex-row items-center">
      <span className="mr-2 shrink-0">{t("private_key")}:</span>
      <input type="password" readOnly value={privateKey} className="text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis flex-1" />
      {/* <span className="text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis">{ privateKey }</span> */}
      <Button
        className="ml-2 shrink-0"
        variant="outline"
        size="icon"
        onClick={() => {
          toast.success('Copyed!')
          navigator.clipboard.writeText(privateKey);
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
