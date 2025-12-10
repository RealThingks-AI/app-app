import { AppmasterAdminsTable } from "@/components/SuperAdmin/AppmasterAdminsTable";

const SuperAdminAdmins = () => {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-xl font-bold">RT Apps Admins Management</h2>
        <p className="text-sm text-muted-foreground">
          Manage global RT Apps administrators with system-wide access
        </p>
      </div>
      <AppmasterAdminsTable />
    </div>
  );
};

export default SuperAdminAdmins;
