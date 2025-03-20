import clsx from "clsx";
import Image from "next/image";

interface Props {
  className?: string;
  loading?: "lazy" | "eager";
  priority?: "auto" | "high" | "low";
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
  } = props;

  const loading = loadingFromProps || "lazy";
  const priority = priorityFromProps || "low";

  return (
    /* eslint-disable @next/next/no-img-element */
    <Image
      alt="Nexus Politics Logo"
      width={400}
      height={225}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx("h-auto w-full max-w-[9.375rem]", className)}
      src="/logo_transparent_white.png"
    />
  );
};
