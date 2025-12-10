import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface AssetsListProps {
  filters?: Record<string, any>;
  onSelectionChange?: (selectedIds: number[], actions: any) => void;
}

export const AssetsList = ({ filters = {}, onSelectionChange }: AssetsListProps) => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["itam-assets", filters],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

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

      let query = supabase
        .from("itam_assets")
        .select("*")
        .eq("is_deleted", false)
        .order("created_at", { ascending: false });

      if (orgId) {
        query = query.eq("organisation_id", orgId);
      } else {
        query = query.eq("tenant_id", tenantId);
      }

      if (filters.status) {
        query = query.eq("status", filters.status);
      }

      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,asset_id.ilike.%${filters.search}%`);
      }

      const { data } = await query;
      return data || [];
    }
  });

  const handleSelectAll = (checked: boolean) => {
    const newSelectedIds = checked ? assets.map((a: any) => a.id) : [];
    setSelectedIds(newSelectedIds);
    onSelectionChange?.(newSelectedIds, {});
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    const newSelectedIds = checked
      ? [...selectedIds, id]
      : selectedIds.filter(i => i !== id);
    setSelectedIds(newSelectedIds);
    onSelectionChange?.(newSelectedIds, {});
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      available: "default",
      assigned: "secondary",
      in_repair: "destructive",
      retired: "outline"
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No assets found. Create your first asset to get started.
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={selectedIds.length === assets.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Asset ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Assigned To</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset: any) => (
            <TableRow
              key={asset.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => navigate(`/helpdesk/assets/detail/${asset.id}`)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedIds.includes(asset.id)}
                  onCheckedChange={(checked) => handleSelectOne(asset.id, !!checked)}
                />
              </TableCell>
              <TableCell className="font-mono text-sm">{asset.asset_id || asset.id}</TableCell>
              <TableCell className="font-medium">{asset.name}</TableCell>
              <TableCell>{asset.category || "—"}</TableCell>
              <TableCell>{getStatusBadge(asset.status || "available")}</TableCell>
              <TableCell>{asset.location || "—"}</TableCell>
              <TableCell>{asset.assigned_to || "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
