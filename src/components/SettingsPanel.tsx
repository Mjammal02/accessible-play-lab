import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
              onConfigChange({ ...config, gridType: value as "2x2" | "3x2" | "4x2" | "3x3" })
            }
          >
            <TabsList className="grid grid-cols-4 w-full gap-2">
              <TabsTrigger value="2x2">4 bitar</TabsTrigger>
              <TabsTrigger value="3x2">6 bitar</TabsTrigger>
              <TabsTrigger value="4x2">8 bitar</TabsTrigger>
              <TabsTrigger value="3x3">9 bitar</TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-sm text-muted-foreground">
            Färre bitar = enklare pussel för kognitiv tillgänglighet
          </p>
        </div>

        {/* Visuell återkoppling */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">Visuell återkoppling</Label>
          <RadioGroup
            value={config.visualFeedback}
            onValueChange={(value) =>
              onConfigChange({ ...config, visualFeedback: value as "none" | "border" | "checkmark" })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none" className="cursor-pointer font-normal">
                Ingen återkoppling
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="border" id="border" />
              <Label htmlFor="border" className="cursor-pointer font-normal">
                Grön ram vid korrekt placering
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="checkmark" id="checkmark" />
              <Label htmlFor="checkmark" className="cursor-pointer font-normal">
                Grön checkmark vid korrekt placering
              </Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-muted-foreground">
            Visa när en pusselbit är korrekt placerad
          </p>
        </div>
      </div>
    </Card>
  );
};
