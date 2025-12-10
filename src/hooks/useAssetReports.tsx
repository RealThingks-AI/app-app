import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAssetReports = () => {
  return useQuery({
    queryKey: ["asset-reports-data"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: userData } = await supabase
        .from("users")
        .select("organisation_id")
        .eq("auth_user_id", user.id)
        .single();

      const { data: profileData } = await supabase
        .from("profiles")
        .select("tenant_id")
        .eq("id", user.id)
        .maybeSingle();

      const tenantId = profileData?.tenant_id || 1;
      const orgId = userData?.organisation_id;

      // Fetch assets
      let assetsQuery = supabase.from("assets").select("*");
      if (orgId) {
        assetsQuery = assetsQuery.eq("organisation_id", orgId);
      } else {
        assetsQuery = assetsQuery.eq("tenant_id", tenantId);
      }
      const { data: assets } = await assetsQuery;

      // Fetch assignments
      let assignmentsQuery = supabase.from("asset_assignments").select("*, assets(name)");
      if (orgId) {
        assignmentsQuery = assignmentsQuery.eq("organisation_id", orgId);
      } else {
        assignmentsQuery = assignmentsQuery.eq("tenant_id", tenantId);
      }
      const { data: assignments } = await assignmentsQuery;

      // Fetch warranties
      let warrantiesQuery = supabase.from("asset_warranties").select("*");
      warrantiesQuery = warrantiesQuery.eq("tenant_id", tenantId);
      const { data: warranties } = await warrantiesQuery;

      // Fetch depreciation entries
      let depreciationQuery = supabase.from("depreciation_entries").select("*");
      depreciationQuery = depreciationQuery.eq("tenant_id", tenantId);
      const { data: depreciation } = await depreciationQuery;

      // Fetch licenses
      let licensesQuery = supabase.from("asset_licenses").select("*");
      if (orgId) {
        licensesQuery = licensesQuery.eq("organisation_id", orgId);
      } else {
        licensesQuery = licensesQuery.eq("tenant_id", tenantId);
      }
      const { data: licenses } = await licensesQuery;

      // Fetch maintenance
      let maintenanceQuery = supabase.from("asset_maintenance").select("*");
      maintenanceQuery = maintenanceQuery.eq("tenant_id", tenantId);
      const { data: maintenance } = await maintenanceQuery;

      return {
        assets: assets || [],
        assignments: assignments || [],
        warranties: warranties || [],
        depreciation: depreciation || [],
        licenses: licenses || [],
        maintenance: maintenance || []
      };
    }
  });
};
