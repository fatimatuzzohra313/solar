
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/page";



const StocksPage = () => {
  return (

    <DefaultLayout>
      <Dashboard />
    </DefaultLayout>
  );
};

export default StocksPage;
