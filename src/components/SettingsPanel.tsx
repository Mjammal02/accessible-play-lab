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
        {/* Antal pusselbitar */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">Antal pusselbitar</Label>
          <Tabs
            value={config.pieces.toString()}
            onValueChange={(value) =>
              onConfigChange({ ...config, pieces: parseInt(value) })
            }
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="4">4 bitar</TabsTrigger>
              <TabsTrigger value="6">6 bitar</TabsTrigger>
              <TabsTrigger value="9">9 bitar</TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-sm text-muted-foreground">
            Färre bitar = enklare pussel för kognitiv tillgänglighet
          </p>
        </div>

        {/* Färgkontrast */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">Färgkontrast</Label>
          <Tabs
            value={config.contrastLevel}
            onValueChange={(value) =>
              onConfigChange({ ...config, contrastLevel: value as "AA" | "AAA" })
            }
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="AA">
                WCAG AA
                <Badge variant="outline" className="ml-2">Normal</Badge>
              </TabsTrigger>
              <TabsTrigger value="AAA">
                WCAG AAA
                <Badge variant="outline" className="ml-2">Hög</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-sm text-muted-foreground">
            AAA ger högre kontrast för bättre synlighet
          </p>
        </div>

        {/* Form på pusselbitar */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">Form på pusselbitar</Label>
          <Tabs
            value={config.pieceShape}
            onValueChange={(value) =>
              onConfigChange({ ...config, pieceShape: value as "standard" | "geometric" })
            }
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="geometric">Geometrisk</TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-sm text-muted-foreground">
            Geometriska former kan vara tydligare att skilja åt
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
