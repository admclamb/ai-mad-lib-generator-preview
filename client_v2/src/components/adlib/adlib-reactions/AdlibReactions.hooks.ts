import React, { useEffect, useState } from "react";
import ReactionService from "../../../services/ReactionService";
import { useAuth0 } from "@auth0/auth0-react";
import { ReactionTypeModel } from "../../../models/ReactionTypeModel";
import { ErrorModel } from "../../../models/ErrorModel";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { ReactionModel } from "../../../models/ReactionModel";

export const useAdlibReactions = (adlibId?: string) => {
  const { account } = useAppSelector((state) => state.account);
  const { getAccessTokenSilently } = useAuth0();
  const [userReactions, setUserReactions] = useState<ReactionModel[]>([]);
  const [reactions, setReactions] = useState<
    {
      reactionType: ReactionTypeModel;
      count: number;
    }[]
  >([]);

  const [error, setError] = useState<ErrorModel | null>(null);

  const getReactions = async () => {
    if (adlibId) {
      const { data, error: apiError } =
        await ReactionService.getReactionsFromAdlib(adlibId, account?.id);

      if (data) {
        setReactions(data.adlibReactions);

        setUserReactions(data?.reactions ?? []);
      }

      if (apiError) {
        setError(apiError);
      }
    }
  };

  const reactAdlib = async () => {
    if (account?.id && adlibId) {
      const accessToken = await getAccessTokenSilently();
      const { data, error: apiError } = await ReactionService.likeAdlib(
        adlibId,
        account.id,
        accessToken
      );

      if (data) {
        if (data.hasReacted) {
          setUserReactions([data]);
        }
        getReactions();
      }

      if (apiError) {
        setError(apiError);
      }
    }
  };

  useEffect(() => {
    getReactions();
  }, [adlibId, getAccessTokenSilently]);

  return { userReactions, reactions, error, reactAdlib };
};
