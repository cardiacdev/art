import Link from "next/link";

import { Icons } from "./icons";

export const ProfilerLink = () => {
  return (
    <Link
      href={"/_profiler"}
      target="_blank"
      title="Open Symfony Profiler in new tab"
      rel="noreferrer"
      className={"fixed bottom-3 left-16 z-50 h-12 w-12"}>
      <Icons.symfony />
    </Link>
  );
};
