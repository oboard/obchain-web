"use client";
import { useTranslations } from "next-intl";
import WalletBalance from "./wallet-balance";
import WalletPublicKey from "./wallet-public-key";
import useLocalStorage from "@/hooks/use-local-storage";
import WalletBody from "./wallet-body";
import { getBalanceByAddress } from "@/app/actions";
import { useEffect, useState } from "react";
import { generateWalletKeyPair } from "@/lib/key";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SHA256 } from "crypto-js";
import { cn } from "@/lib/utils";

export default function Wallet() {
  const t = useTranslations("Wallet");

  const [publicKey, setPublicKey] = useLocalStorage("public_key", "");
  const [_privateKey, setPrivateKey] = useLocalStorage("private_key", "");

  const [balance, setBalance] = useState(0);
  const [key, setKey] = useLocalStorage("public_key", "");
  const [privateKey, setPrivateKeyValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    setPrivateKey(privateKey);
    const publicKey = SHA256(privateKey).toString();
    setPublicKey(publicKey);
  };

  useEffect(() => {
    getBalanceByAddress(publicKey).then((balance) => {
      setBalance(balance);
    });
  }, [publicKey]);

  const genKey = async () => {
    const keyPair = generateWalletKeyPair();
    setPublicKey(keyPair.public);
    setPrivateKey(keyPair.private);
  };

  return (
    <div className="bg-white/30 p-8 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="text-lg font-bold mb-4 flex flex-row gap-2">
        {t("title")}
        {publicKey != "" ? (
          <span className="text-xl text-blue-500 font-bold">
            {Intl.NumberFormat("en-us").format(balance)} Ob
          </span>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        {publicKey ? (
          <>
            <WalletPublicKey publicKey={publicKey} />
            <div className="flex flex-row gap-4 mt-4">
              <Button>{t("send")}</Button>
              <Button>{t("receive")}</Button>
              <Button>{t("transactions")}</Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">{t("remove")}</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t("remove")}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("remove_desc")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("remove_cancel")}</AlertDialogCancel>
                    <AlertDialogAction
                      className={cn(
                        buttonVariants({
                          variant: "destructive",
                        })
                      )}
                      onClick={(e) => {
                        setPublicKey("");
                        setPrivateKey("");
                      }}
                    >
                      {t("remove_submit")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            <Button onClick={genKey}>{t("create")}</Button>
            {/* <Button>{t("import")}</Button> */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">{t("import")}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t("import")}</DialogTitle>
                  <DialogDescription>{t("import_desc")}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      {t("private_key")}
                    </Label>
                    <Input
                      id="name"
                      defaultValue=""
                      type="text"
                      placeholder={t("private_key")}
                      value={privateKey}
                      onChange={(e) => setPrivateKeyValue(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit" onClick={handleSubmit}>
                      {t("import_submit")}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}
