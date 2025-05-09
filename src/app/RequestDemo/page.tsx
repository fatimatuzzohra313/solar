import React from "react";
import { Plus, Upload, FileType } from "lucide-react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import AdminUsersPage from "@/components/profile/AllUser";
import AdminJoinRequests from "@/components/profile/AdminJoinRequests";


const info = () => {
  return (
    <DefaultLayout>
      <div>
        <AdminJoinRequests/>
      </div>
    </DefaultLayout>
  );
};

export default info;
