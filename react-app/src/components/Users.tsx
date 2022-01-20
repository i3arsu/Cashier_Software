import { Dispatch, SetStateAction } from "react";
import useUsers from "../query-hooks/useUsers";

const Users = ({
  setSelectedUser,
}: {
  // TODO: find out if this is good practice!
  setSelectedUser: Dispatch<SetStateAction<string | null>>;
}) => {
  const users = useUsers();

  return (
    <>
      {users.isLoading && <p>Loading users...</p>}
      {users.isError && <p>Could not fetch users...</p>}
      {users.isSuccess && (
        <ul>
          {users.data.map(
            (user: { uid: string; name: string; url: string }) => (
              <li key={user.uid} onClick={() => setSelectedUser(user.uid)}>
                {user.name}
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
};

export default Users;
