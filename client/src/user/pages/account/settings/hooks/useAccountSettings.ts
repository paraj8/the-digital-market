import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, type AccountUser } from "../../../../features/account/api/accountApi";
import { persistAccountUser } from "../utils/accountSettingsUtils";

export const ACCOUNT_QUERY_KEY = ["account-user"] as const;

export function useAccountSettings() {
  const isSignedIn = Boolean(localStorage.getItem("token"));
  const queryClient = useQueryClient();
  const accountQuery = useQuery({
    queryKey: ACCOUNT_QUERY_KEY,
    queryFn: getCurrentUser,
    enabled: isSignedIn,
    retry: false,
  });

  const updateAccountUser = (user: AccountUser) => {
    queryClient.setQueryData(ACCOUNT_QUERY_KEY, user);
    persistAccountUser(user);
  };

  return {
    isSignedIn,
    user: accountQuery.data,
    isLoading: accountQuery.isPending,
    isError: accountQuery.isError,
    retry: () => void accountQuery.refetch(),
    updateAccountUser,
  };
}