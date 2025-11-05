import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
          <Label className="text-lg font-semibold">Pussel-storlek</Label>
          <Tabs
            value={config.gridType}
            onValueChange={(value) =>
              onConfigChange({ ...config, gridType: value as "2x2" | "3x3" | "3x2" })
            }
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="2x2">2×2</TabsTrigger>
              <TabsTrigger value="3x2">3×2</TabsTrigger>
              <TabsTrigger value="3x3">3×3</TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-sm text-muted-foreground">
            Färre bitar = enklare pussel för kognitiv tillgänglighet
          </p>
        </div>

        {/* Återkoppling */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">Återkoppling</Label>
          <Tabs
            value={config.feedbackType}
            onValueChange={(value) =>
              onConfigChange({ ...config, feedbackType: value as "visual" | "audio" | "both" })
            }
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="visual">Visuell</TabsTrigger>
              <TabsTrigger value="audio">Ljud</TabsTrigger>
              <TabsTrigger value="both">Båda</TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-sm text-muted-foreground">
            Multimodal återkoppling stärker motivationen
          </p>
        </div>
      </div>
    </Card>
  );
};
