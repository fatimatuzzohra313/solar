import React from "react";
import { Plus, Upload, FileType } from "lucide-react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AccountDetails from "@/components/accountDetails/Acountdetail";
import UserProductsTable from "@/components/accountDetails/UserTable";


const info = () => {
  return (
    <DefaultLayout>
      <div>
        <UserProductsTable/>
      </div>
    </DefaultLayout>
  );
};

export default info;
