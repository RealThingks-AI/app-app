import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useUserTools = (userId?: string) => {
  const queryClient = useQueryClient();

  const { data: allTools = [], isLoading: toolsLoading } = useQuery({
    queryKey: ["all-tools"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tools")
        .select("*")
        .eq("active", true)
        .order("name");
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: userTools = [], isLoading: userToolsLoading } = useQuery({
    queryKey: ["user-tools", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("user_tools")
        .select("*, tools(*)")
        .eq("user_id", userId);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!userId
  });

  const assignTool = useMutation({
    mutationFn: async ({ userId, toolId, assignedBy }: { userId: string; toolId: string; assignedBy: string }) => {
      const { error } = await supabase
        .from("user_tools")
        .insert({
          user_id: userId,
          tool_id: toolId,
          assigned_by: assignedBy
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-tools"] });
      toast.success("Tool assigned successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to assign tool: " + error.message);
    }
  });

  const unassignTool = useMutation({
    mutationFn: async ({ userId, toolId }: { userId: string; toolId: string }) => {
      const { error } = await supabase
        .from("user_tools")
        .delete()
        .eq("user_id", userId)
        .eq("tool_id", toolId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-tools"] });
      toast.success("Tool unassigned successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to unassign tool: " + error.message);
    }
  });

  const bulkAssignTools = useMutation({
    mutationFn: async ({ userIds, toolIds, assignedBy }: { userIds: string[]; toolIds: string[]; assignedBy: string }) => {
      const assignments = userIds.flatMap(userId =>
        toolIds.map(toolId => ({
          user_id: userId,
          tool_id: toolId,
          assigned_by: assignedBy
        }))
      );

      const { error } = await supabase
        .from("user_tools")
        .upsert(assignments, { onConflict: "user_id,tool_id" });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-tools"] });
      toast.success("Tools assigned successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to assign tools: " + error.message);
    }
  });

  return {
    allTools,
    userTools,
    isLoading: toolsLoading || userToolsLoading,
    assignTool,
    unassignTool,
    bulkAssignTools
  };
};
