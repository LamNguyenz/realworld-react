import { QUERY_PROFILE_KEY } from "@/constants/query.constant";
import {
  followUser,
  getProfile,
  unfollowUser,
} from "@/repositories/profiles/profileRepository";
import { useMutation, useSuspenseQueries } from "@tanstack/react-query";

export const useGetProfileQueries = ({ username }: { username: string }) => {
  return useSuspenseQueries({
    queries: [
      {
        queryKey: [QUERY_PROFILE_KEY, username],
        queryFn: () => getProfile({ username }).then((res) => res.data.profile),
        staleTime: 20000,
      },
    ],
  });
};

export const useFollowMutation = () =>
  useMutation({
    mutationFn: followUser,
  });

export const useUnfollowMutation = () =>
  useMutation({
    mutationFn: unfollowUser,
  });
