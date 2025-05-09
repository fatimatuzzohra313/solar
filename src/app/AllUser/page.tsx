import React from "react";
import { Plus, Upload, FileType } from "lucide-react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import AdminUsersPage from "@/components/profile/AllUser";


const info = () => {
  return (
    <DefaultLayout>
      <div>
        <AdminUsersPage/>
      </div>
    </DefaultLayout>
  );
};

export default info;
