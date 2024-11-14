import { QUERY_ARTICLES_KEY } from "@/constants/query.constant";
import { IArticle } from "@/interfaces/main";
import { useDeleteArticleMutation } from "@/queries/articles.query";
import queryClient from "@/queries/queryClient";
import { useNavigate } from "react-router-dom";

interface IButtonWithAccessProps {
  articleInfo: IArticle;
}

const ButtonWithAccess = ({ articleInfo }: IButtonWithAccessProps) => {
  const navigate = useNavigate();

  const deleteArticleMutation = useDeleteArticleMutation();

  console.log("articleInfo: ", articleInfo);

  const onDelete = (slug: string) => {
    deleteArticleMutation.mutate(
      { slug },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QUERY_ARTICLES_KEY] });
          navigate("/");
        },
      }
    );
  };

  return (
    <>
      <button
        onClick={() =>
          navigate(`/editor/${articleInfo.slug}`, { state: articleInfo })
        }
        type="button"
        className="btn btn-sm btn-outline-secondary">
        <i className="ion-edit"></i> Edit Article
      </button>
      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => onDelete(articleInfo.slug)}>
        <i className="ion-trash-a"></i> Delete Article
      </button>
    </>
  );
};
export default ButtonWithAccess;
