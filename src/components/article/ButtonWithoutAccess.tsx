import { IArticle } from "@/interfaces/main";

interface ButtonWithoutAccessProps {
  articleInfo: IArticle;
}

const ButtonWithoutAccess = ({ articleInfo }: ButtonWithoutAccessProps) => {
  return (
    <>
      <button
        type="button"
        className={`btn btn-sm btn-outline-${
          articleInfo.author.following ? "primary" : "secondary"
        }`}
        // onClick={() => onToggleFollow()}
      >
        <i className="ion-plus-round"></i>
        &nbsp; Follow {articleInfo.author.username}{" "}
        <span className="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button
        type="button"
        className={`btn btn-sm btn-outline-${
          articleInfo.favorited ? "primary" : "secondary"
        }`}
        // onClick={() => onToggleFavorite()}
      >
        <i className="ion-heart"></i>
        &nbsp; Favorite Post{" "}
        <span className="counter">{articleInfo.favoritesCount}</span>
      </button>
    </>
  );
};
export default ButtonWithoutAccess;
