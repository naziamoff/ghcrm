import { EmailConfirmedPageView } from "./EmailConfirmedPageView";
import { FC, useEffect } from "react";
import { useConfirmEmail } from "../../features/auth/hooks/useConfirmEmail";

export const EmailConfirmedPageController: FC = () => {
  const { confirmEmail, loading, error } = useConfirmEmail();

  useEffect(() => {
    confirmEmail();
  }, [confirmEmail]);

  return <EmailConfirmedPageView isLoading={loading} error={error} />;
};
