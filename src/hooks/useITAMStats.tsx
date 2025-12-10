import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useITAMStats = () => {
  return useQuery({
    queryKey: ["itam-stats"],
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

      let query = supabase.from("itam_assets").select("*").eq("is_deleted", false);
      
      if (orgId) {
        query = query.eq("organisation_id", orgId);
      } else {
        query = query.eq("tenant_id", tenantId);
      }

      const { data: assets } = await query;

      const totalAssets = assets?.length || 0;
      const laptops = assets?.filter(a => a.category?.toLowerCase().includes('laptop')).length || 0;
      const assigned = assets?.filter(a => a.status === 'assigned' || a.status === 'checked_out').length || 0;
      const available = assets?.filter(a => a.status === 'available').length || 0;
      const inRepair = assets?.filter(a => a.status === 'in_repair').length || 0;

      // Get licenses count
      let licensesQuery = supabase.from("asset_licenses").select("id");
      if (orgId) {
        licensesQuery = licensesQuery.eq("organisation_id", orgId);
      } else {
        licensesQuery = licensesQuery.eq("tenant_id", tenantId);
      }
      const { data: licensesData } = await licensesQuery;
      const licenses = licensesData?.length || 0;

      return {
        totalAssets,
        laptops,
        assigned,
        available,
        inRepair,
        licenses
      };
    }
  });
};
