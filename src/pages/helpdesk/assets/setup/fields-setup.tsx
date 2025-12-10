import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FieldsSetupPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-2xl font-bold">Fields Setup</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Asset Configuration</CardTitle>
            <CardDescription>Configure sites, locations, categories, departments, and makes</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Fields setup - coming soon
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
