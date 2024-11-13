import { IArticle } from "@/interfaces/main";
import { useGetUserQuery } from "@/queries/user.query";
import ButtonWithAccess from "./ButtonWithAccess";
import ButtonWithoutAccess from "./ButtonWithoutAccess";

interface IButtonSelectorProps {
  articleInfo: IArticle;
}

const ButtonSelector = ({ articleInfo }: IButtonSelectorProps) => {
  const { data: user } = useGetUserQuery();

  return (
    <>
      {user?.username === articleInfo.author?.username ? (
        <ButtonWithAccess articleInfo={articleInfo} />
      ) : (
        <ButtonWithoutAccess articleInfo={articleInfo} />
      )}
    </>
  );
};
export default ButtonSelector;
