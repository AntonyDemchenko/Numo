import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    id: string;
  };
};

const ProfilePage = async (props: Props) => {
  const session = await getServerSession(authOptions);

  const response = await fetch(
    process.env.BACKEND_URL + `/api/user/${props.params.id}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.backendTokens.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const user = await response.json();

  return (
    <div>
      <div>User Profile</div>

      <div className="">
        <p className="">Name:</p>
        <p className="">{user.name}</p>
        <p className="">Email:</p>
        <p className="">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
