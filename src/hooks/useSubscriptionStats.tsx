import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSubscriptionStats = () => {
  return useQuery({
    queryKey: ["subscription-stats"],
    queryFn: async () => {
      return {
        total: 0,
        activeTools: 0,
        trialTools: 0,
        expiredTools: 0,
        pendingRenewals: 0,
        totalLicenses: 0,
        vendorCount: 0
      };
    }
  });
};
