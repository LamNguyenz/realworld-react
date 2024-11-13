import { QUERY_PROFILE_KEY } from "@/constants/query.constant";
import { useFollowMutation, useUnfollowMutation } from "@/queries/profiles.query";
import queryClient from "@/queries/queryClient";
import { useGetUserQuery } from "@/queries/user.query";
import { Link } from "react-router-dom";

interface FollowButtonProps {
  profileName: string;
  isFollowing: boolean;
}

const FollowButton = ({ profileName, isFollowing }: FollowButtonProps) => {
  const { data: user } = useGetUserQuery();

  const followUserMutation = useFollowMutation();
  const unfollowUserMutation = useUnfollowMutation();

  const onToggleFollow = () => {
    const username = profileName;
    if (!isFollowing) {
      followUserMutation.mutate(
        { username },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_PROFILE_KEY, username],
            });
          },
        }
      );
      return;
    }

    if (isFollowing) {
      unfollowUserMutation.mutate(
        { username },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_PROFILE_KEY, username],
            });
          },
        }
      );
      return;
    }
  };

  return (
    <>
      {user?.username === profileName ? (
        <Link
          to={`/profiles/${profileName}`}
          className="btn btn-sm btn-outline-secondary action-btn">
          <i className="ion-gear-a"></i>
          &nbsp; Edit Profile Settings
        </Link>
      ) : (
        <button
          className={`btn btn-sm btn-outline-${
            isFollowing ? "primary" : "secondary"
          } action-btn`}
          type="button"
          onClick={onToggleFollow}>
          {!isFollowing && <i className="ion-plus-round"></i>}
          {isFollowing && <i className="ion-minus-round"></i>}
          &nbsp; {isFollowing ? "Unfollow" : "Follow"} {profileName}
        </button>
      )}
    </>
  );
};
export default FollowButton;
