import { useState } from "react";
import { PuzzleGame, PuzzleConfig } from "@/components/PuzzleGame";
import { SettingsPanel } from "@/components/SettingsPanel";

const Index = () => {
  const [config, setConfig] = useState<PuzzleConfig>({
    gridType: "2x2",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Kognitiv Tillgänglighet i Digitala Pusselspel
          </h1>
          <p className="text-muted-foreground">
            En prototyp för att utvärdera tillgänglighet för personer med måttlig intellektuell funktionsnedsättning
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Settings Panel */}
          <div className="space-y-4">
            <SettingsPanel config={config} onConfigChange={setConfig} />
            
            {/* Info Card */}
            <div className="bg-info/10 border border-info/20 rounded-lg p-4">
              <h3 className="font-semibold text-info mb-2">Om projektet</h3>
              <p className="text-sm text-foreground/80">
                Detta projekt undersöker hur antal pusselbitar påverkar tillgängligheten och 
                användbarheten för användare med kognitiva svårigheter. Välj en av de förvalda 
                bilderna eller ladda upp din egen för att skapa ett personligt pussel.
              </p>
            </div>
          </div>

          {/* Puzzle Game */}
          <div>
            <PuzzleGame config={config} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Projektgrupp 2: Abd Al Salam Abo Taha, Jack Henrikson, Mahmoud Jammal</p>
          <p className="mt-1">Baserat på WCAG 2.1, EN 301 549 och W3C Cognitive Accessibility Guidance</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
