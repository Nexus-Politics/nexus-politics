import type { Metadata } from "next";
import { getServerSideURL } from "./getURL";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  description:
    "Read the latest updates from Nexus Politics and the latest trends on current politics, government, and politicians.",
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: "Nexus Politics Blog",
  title: "Nexus Politics Blog",
};

export const mergeOpenGraph = (
  og?: Metadata["openGraph"],
): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
