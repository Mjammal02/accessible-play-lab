import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PuzzleConfig } from "./PuzzleGame";
import { GridIcon } from "./GridIcon";

interface SettingsPanelProps {
  config: PuzzleConfig;
  onConfigChange: (config: PuzzleConfig) => void;
}

export const SettingsPanel = ({ config, onConfigChange }: SettingsPanelProps) => {
  return (
    <Card className="p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-foreground mb-4">Inställningar</h2>
      
      <div className="space-y-6">
        {/* Antal bitar */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">Antal bitar</Label>
          <Tabs
            value={config.gridType}
            onValueChange={(value) =>
              onConfigChange({ ...config, gridType: value as "2x2" | "3x2" | "4x2" | "3x3" })
            }
          >
            <TabsList className="grid grid-cols-4 w-full gap-2 h-auto p-2">
              <TabsTrigger value="2x2" className="flex flex-col items-center gap-1 py-2">
                <GridIcon cols={2} rows={2} className="w-6 h-6" />
                <span className="text-xs">4</span>
              </TabsTrigger>
              <TabsTrigger value="3x2" className="flex flex-col items-center gap-1 py-2">
                <GridIcon cols={3} rows={2} className="w-6 h-5" />
                <span className="text-xs">6</span>
              </TabsTrigger>
              <TabsTrigger value="4x2" className="flex flex-col items-center gap-1 py-2">
                <GridIcon cols={4} rows={2} className="w-8 h-5" />
                <span className="text-xs">8</span>
              </TabsTrigger>
              <TabsTrigger value="3x3" className="flex flex-col items-center gap-1 py-2">
                <GridIcon cols={3} rows={3} className="w-6 h-6" />
                <span className="text-xs">9</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Hjälp vid rätt svar */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">Hjälp vid rätt svar</Label>
          <RadioGroup
            value={config.visualFeedback}
            onValueChange={(value) =>
              onConfigChange({ ...config, visualFeedback: value as "none" | "border" | "checkmark" })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none" className="cursor-pointer font-normal">
                Ingen hjälp
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="border" id="border" />
              <Label htmlFor="border" className="cursor-pointer font-normal">
                Grön ram
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="checkmark" id="checkmark" />
              <Label htmlFor="checkmark" className="cursor-pointer font-normal">
                Grön bock ✓
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Ljud */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">Ljud</Label>
          <RadioGroup
            value={config.soundEnabled ? "on" : "off"}
            onValueChange={(value) =>
              onConfigChange({ ...config, soundEnabled: value === "on" })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="off" id="sound-off" />
              <Label htmlFor="sound-off" className="cursor-pointer font-normal">
                Av
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="on" id="sound-on" />
              <Label htmlFor="sound-on" className="cursor-pointer font-normal">
                På - plingljud vid rätt 🔔
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
};
