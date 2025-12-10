import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAssetSetupConfig = () => {
  const { data: sites = [] } = useQuery({
    queryKey: ["itam-sites"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data: userData } = await supabase
        .from("users")
        .select("organisation_id")
        .eq("auth_user_id", user.id)
        .single();

      if (!userData?.organisation_id) return [];

      const { data } = await supabase
        .from("itam_sites")
        .select("*")
        .eq("organisation_id", userData.organisation_id);

      return data || [];
    }
  });

  const { data: locations = [] } = useQuery({
    queryKey: ["itam-locations"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data: userData } = await supabase
        .from("users")
        .select("organisation_id")
        .eq("auth_user_id", user.id)
        .single();

      if (!userData?.organisation_id) return [];

      const { data } = await supabase
        .from("itam_locations")
        .select("*, itam_sites(name)")
        .eq("organisation_id", userData.organisation_id);

      return data || [];
    }
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["itam-categories"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data: userData } = await supabase
        .from("users")
        .select("organisation_id")
        .eq("auth_user_id", user.id)
        .single();

      if (!userData?.organisation_id) return [];

      const { data } = await supabase
        .from("itam_categories")
        .select("*")
        .eq("organisation_id", userData.organisation_id);

      return data || [];
    }
  });

  const { data: departments = [] } = useQuery({
    queryKey: ["itam-departments"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data: userData } = await supabase
        .from("users")
        .select("organisation_id")
        .eq("auth_user_id", user.id)
        .single();

      if (!userData?.organisation_id) return [];

      const { data } = await supabase
        .from("itam_departments")
        .select("*")
        .eq("organisation_id", userData.organisation_id);

      return data || [];
    }
  });

  const { data: makes = [] } = useQuery({
    queryKey: ["itam-makes"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data: userData } = await supabase
        .from("users")
        .select("organisation_id")
        .eq("auth_user_id", user.id)
        .single();

      if (!userData?.organisation_id) return [];

      const { data } = await supabase
        .from("itam_makes")
        .select("*")
        .eq("organisation_id", userData.organisation_id);

      return data || [];
    }
  });

  const { data: tagFormat } = useQuery({
    queryKey: ["itam-tag-format"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: userData } = await supabase
        .from("users")
        .select("organisation_id")
        .eq("auth_user_id", user.id)
        .single();

      if (!userData?.organisation_id) return null;

      const { data } = await supabase
        .from("itam_tag_format")
        .select("*")
        .eq("organisation_id", userData.organisation_id)
        .maybeSingle();

      return data;
    }
  });

  return {
    sites,
    locations,
    categories,
    departments,
    makes,
    tagFormat
  };
};
