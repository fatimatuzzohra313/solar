import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Advanced Chart | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Advanced Chart page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
  // other metadata
};

const AdvancedChartPage: React.FC = () => {
  return (
    <DefaultLayout>
      <h1>helo</h1>
    </DefaultLayout>
  );
};

export default AdvancedChartPage;
