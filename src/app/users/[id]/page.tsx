interface SingleUserPageParam {
  id: string;
}

export default function Page({ params }: { params: SingleUserPageParam }) {
  const { id: UserId } = params;

  return <div>Page for user: {UserId}</div>;
}
