import { QUERY_USER_KEY } from "@/constants/query.constant";
import { getUser } from "@/repositories/users/usersRepository";
import { useQuery } from "@tanstack/react-query";

export const useGetUserQuery = () => {
  return useQuery({
    queryKey: [QUERY_USER_KEY],
    queryFn: () => getUser().then((res) => res.data.user),
    staleTime: 20000,
  });
};
