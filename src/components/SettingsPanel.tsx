import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PuzzleConfig } from "./PuzzleGame";

interface SettingsPanelProps {
  config: PuzzleConfig;
  onConfigChange: (config: PuzzleConfig) => void;
}

export const SettingsPanel = ({ config, onConfigChange }: SettingsPanelProps) => {
  return (
    <Card className="p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-foreground mb-4">Inställningar</h2>
      
      <div className="space-y-6">
        {/* Grid-storlek */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">Antal bitar</Label>
          <Tabs
            value={config.gridType}
            onValueChange={(value) =>
              onConfigChange({ ...config, gridType: value as "1x2" | "2x2" | "2x3" | "3x2" | "2x4" | "3x3" })
            }
          >
            <TabsList className="grid grid-cols-3 w-full gap-2">
              <TabsTrigger value="1x2">2 bitar</TabsTrigger>
              <TabsTrigger value="2x2">4 bitar</TabsTrigger>
              <TabsTrigger value="2x3">6 bitar</TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-3 w-full gap-2 mt-2">
              <TabsTrigger value="3x2">6 bitar (bred)</TabsTrigger>
              <TabsTrigger value="2x4">8 bitar</TabsTrigger>
              <TabsTrigger value="3x3">9 bitar</TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-sm text-muted-foreground">
            Färre bitar = enklare pussel för kognitiv tillgänglighet
          </p>
        </div>
      </div>
    </Card>
  );
};
