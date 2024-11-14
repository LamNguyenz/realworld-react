import { QUERY_ARTICLE_KEY } from "@/constants/query.constant";
import { IArticle } from "@/interfaces/main";
import { useFollowMutation, useUnfollowMutation } from "@/queries/profiles.query";
import { useQueryClient } from "@tanstack/react-query";

interface ButtonWithoutAccessProps {
  articleInfo: IArticle;
}

const ButtonWithoutAccess = ({ articleInfo }: ButtonWithoutAccessProps) => {
  const followUserMutation = useFollowMutation();
  const unfollowUserMutation = useUnfollowMutation();
  const queryClient = useQueryClient();

  const { following, username } = articleInfo.author;

  const onToggleFollow = () => {
    if (following) {
      unfollowUserMutation.mutate(
        { username },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_ARTICLE_KEY] });
          },
        }
      );
      return;
    }

    if (!following) {
      followUserMutation.mutate(
        { username },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_ARTICLE_KEY] });
          },
        }
      );
      return;
    }
  };
  return (
    <>
      <button
        type="button"
        className={`btn btn-sm btn-outline-${
          articleInfo.author.following ? "primary" : "secondary"
        }`}
        onClick={() => onToggleFollow()}>
        {!following && <i className="ion-plus-round"></i>}
        {following && <i className="ion-minus-round"></i>}
        &nbsp; {following ? "Unfollow" : "Follow"} {username}{" "}
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
