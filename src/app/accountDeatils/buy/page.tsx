import React from "react";
import { Plus, Upload, FileType } from "lucide-react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import TableView from "@/components/inventory/TableView";
import SolarEquipmentForm from "@/components/accountDetails/TableUpload";
import AccountDetails from "@/components/accountDetails/Acountdetail";

const page = () => {
  return (
    <DefaultLayout>
      <div>
        <AccountDetails/>
      </div>
    </DefaultLayout>
  );
};

export default page;
