interface PageProps {
  params: { id: string };
}

export default function Page({ params: { id } }: PageProps) {
  return <div>Client {id}</div>;
}
