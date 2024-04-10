import Link from "next/link";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="main_content">
      <h3>SignUp</h3>
      {children}
    </div>
  );
}
