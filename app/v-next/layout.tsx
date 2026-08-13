import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HISVIA — China Industrial Supply Chain Partner | Industrial Sourcing",
  description:
    "Describe an industrial part you need to build. HISVIA structures your requirement, maps Chinese manufacturing capabilities, verifies factory clusters, and connects you with qualified Chinese manufacturers for sourcing and OEM.",
  openGraph: {
    title: "HISVIA — China Industrial Supply Chain Partner",
    description:
      "Requirement → Capability → Evidence → Factory → Sourcing. Enter China's industrial supply chain with a structured sourcing request.",
    type: "website",
  },
};

export default function VNextLayout({ children }: { children: React.ReactNode }) {
  return children;
}
