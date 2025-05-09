import React from "react";
import { Plus, Upload, FileType } from "lucide-react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AccountDetails from "@/components/accountDetails/Acountdetail";


const info = () => {
  return (
    <DefaultLayout>
      <div>
        <AccountDetails/>
      </div>
    </DefaultLayout>
  );
};

export default info;
