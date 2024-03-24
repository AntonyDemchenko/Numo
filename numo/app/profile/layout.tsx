import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <div className="main_content">
      <h3>Profile list</h3>
      <ul>
        <li>
          <Link href={`/profile/user/${session?.user.id}`}>
            User profile {session?.user.name}
          </Link>
        </li>
      </ul>
      {children}
    </div>
  );
}
