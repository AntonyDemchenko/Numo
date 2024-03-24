"use client";
export default function PostsError({ error }: { error: Error }) {
  return <h1>Error {error.message}</h1>;
}
