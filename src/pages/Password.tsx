import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Password() {
  const [Password, setPassword] = useState("");

  function UnLockAdmin() {
    console.log(Password);
    console.log(import.meta.env.VITE_PASSWORD);
    if (Password === import.meta.env.VITE_PASSWORD) {
      localStorage.setItem("password", `${import.meta.env.VITE_PASSWORD}`);
      window.location.reload();
      toast.success("Success Unlock");
    } else {
      toast.error("Wrong Password");
    }
  }

  return (
    <div className="w-full flex items-center justify-center h-screen gap-1">
      <Toaster position="top-center" />
      <InputOTP maxLength={6} value={Password} onChange={(e) => setPassword(e)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button
        type="submit"
        onClick={UnLockAdmin}
        variant={"outline"}
        className="bg-green-500"
      >
        Unlock
      </Button>
    </div>
  );
}
