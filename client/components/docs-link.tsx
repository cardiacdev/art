import Link from "next/link";

import { Icons } from "./icons";

export const DocsLink = () => {
  return (
    <Link
      href={"/_profiler"}
      target="_blank"
      rel="noreferrer"
      title="Open API Docs in new tab"
      className={"fixed bottom-3 left-3 z-50 h-12 w-12"}>
      <Icons.apiPlatform />
    </Link>
  );
};
