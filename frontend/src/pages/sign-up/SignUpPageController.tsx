import { FormEvent, useState } from "react";
import { SignUpPageView } from "./SignUpPageView";
import { useSignUp } from "../../features/auth/hooks/useSignUp";

export const SignUpPageController = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { signUp, error, isLoading } = useSignUp();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signUp(email, password, passwordConfirmation);
  };

  return (
    <SignUpPageView
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      passwordConfirmation={passwordConfirmation}
      setPasswordConfirmation={setPasswordConfirmation}
      error={error}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    />
  );
};
