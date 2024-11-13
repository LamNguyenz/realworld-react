import { QUERY_USER_KEY } from "@/constants/query.constant";
import useInputs from "@/lib/hooks/useInputs";
import queryClient from "@/queries/queryClient";
import { usePutUserMutation } from "@/queries/user.query";
import { toast } from "react-toastify";

interface SettingFormProps {
  data: Record<string, string | number>;
}

const SettingForm = ({ data }: SettingFormProps) => {
  const [userData, onChangeUserData] = useInputs({
    email: data?.email,
    username: data?.username,
    bio: data?.bio,
    image: data?.image,
    password: "",
  });

  const putUserMutation = usePutUserMutation();

  const onUpdateSetting = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    putUserMutation.mutate(
      {
        user: userData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QUERY_USER_KEY] });
          toast.success("Update user success");
        },
      }
    );
  };

  return (
    <form onSubmit={onUpdateSetting}>
      <fieldset>
        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            name="image"
            value={userData.image}
            onChange={onChangeUserData}
            placeholder="URL of profile picture"
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            name="username"
            value={userData.username}
            onChange={onChangeUserData}
            placeholder="Your Name"
          />
        </fieldset>
        <fieldset className="form-group">
          <textarea
            className="form-control form-control-lg"
            rows={8}
            name="bio"
            value={userData.bio}
            onChange={onChangeUserData}
            placeholder="Short bio about you"></textarea>
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            name="email"
            value={userData.email}
            onChange={onChangeUserData}
            placeholder="Email"
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            name="password"
            autoComplete="new-password"
            value={userData.password}
            onChange={onChangeUserData}
            placeholder="New Password"
          />
        </fieldset>
        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          disabled={putUserMutation.isPending}>
          Update Settings
        </button>
      </fieldset>
    </form>
  );
};
export default SettingForm;
