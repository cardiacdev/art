interface PageProps {
  params: { id: string };
}

export default function Page({ params: { id } }: PageProps) {
  return <div>Project {id}</div>;
}
