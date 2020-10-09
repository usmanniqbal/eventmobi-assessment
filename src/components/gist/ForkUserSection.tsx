import React, { useEffect, useState } from "react";
import { GistService } from "./GistService";
import { ForkUser, Owner } from "./models/Gist";

export interface IForkUserProps {
  forksUrl: string;
}

export interface IForkUserState {
  isLoading: boolean;
  users: Owner[];
  error: string;
}

const ForkUserSection = (props: IForkUserProps) => {
  const initialState: IForkUserState = {
    isLoading: true,
    users: [],
    error: ''
  }
  const [values, setValues] = useState(initialState);
  useEffect(() => {
    const fetchUsers = async () => {
      if (!props.forksUrl) {
        return;
      }
      let errorMsg;
      let response: ForkUser[];

      try {
        response = await gistService.getForkUsersDataByUrl(props.forksUrl);
      }
      catch (e) {
        response = [];
        if (e.response.status === 403) {
          errorMsg = e.response.statusText;
        }
      }
      setValues({
        users: response.slice(0, 3).map(o => o.owner),
        isLoading: false,
        error: errorMsg
      });
    }

    fetchUsers();
  }, [props.forksUrl]);

  const { isLoading, users, error } = values;
  const gistService = new GistService();

  return (
    <td >
      <div className="inline-img">
        {(isLoading || error)
          ? error ?? "Please wait..."
          : users.map((user, i) =>
            user.avatar_url
              ? <img key={i} height="100px" width="100px" alt="" src={user.avatar_url ?? ''} />
              : <b>{user.login}</b>)
        }
      </div>
    </td>
  );
}

export default ForkUserSection;
