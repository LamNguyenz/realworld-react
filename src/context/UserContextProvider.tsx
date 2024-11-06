import useIsLoginContext from "@/lib/hooks/userIsLoginContext";
import { createContext } from "react";

interface IUserContextProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext({} as ReturnType<typeof useIsLoginContext>);

const UserContextProvider = ({ children }: IUserContextProviderProps) => {
  return <UserContext.Provider value={useIsLoginContext()}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
