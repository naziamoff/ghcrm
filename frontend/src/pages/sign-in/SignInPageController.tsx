import React, { FC, useState } from "react";
import { SignInPageView } from "./SignInPageView";
import { useSignIn } from "../../features/auth/hooks/useSignIn";

export const SignInPageController: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, error, loading } = useSignIn();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    signIn(email, password);
  };

  return (
    <SignInPageView
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      isLoading={loading}
      error={error}
    />
  );
};
