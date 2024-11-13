import { UserContext } from "@/context/UserContextProvider";
import { IProfileInfo } from "@/interfaces/main";
import { useContext, useEffect } from "react";
import FollowButton from "./profile/FollowButton";

interface ProfileProps {
  profile: IProfileInfo;
}

const Profile = ({ profile }: ProfileProps) => {
  const { isLogin } = useContext(UserContext);

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src={profile.image} className="user-img object-cover" />
            <h4>{profile.username}</h4>
            <p>{profile.bio}</p>
            {isLogin ? (
              <FollowButton
                profileName={profile.username}
                isFollowing={profile.following}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
