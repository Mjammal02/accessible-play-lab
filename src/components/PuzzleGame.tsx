import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { PuzzlePiece } from "./PuzzlePiece";
import { Button } from "@/components/ui/button";
import { RotateCcw, Upload } from "lucide-react";
import defaultImage1 from "@/assets/puzzle-default-1.jpg";
import defaultImage2 from "@/assets/puzzle-default-2.jpg";
import defaultImage3 from "@/assets/puzzle-default-3.jpg";

export interface PuzzleConfig {
  gridType: "2x2" | "3x3" | "3x2";
}

interface GridDimensions {
  cols: number;
  rows: number;
  total: number;
}

interface PieceData {
  id: number;
  currentPosition: number;
  correctPosition: number;
  row: number;
  col: number;
}

export const PuzzleGame = ({ config }: { config: PuzzleConfig }) => {
  const [pieces, setPieces] = useState<PieceData[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [moves, setMoves] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showImageSelect, setShowImageSelect] = useState(true);

  const getGridDimensions = (gridType: string): GridDimensions => {
    switch (gridType) {
      case "2x2": return { cols: 2, rows: 2, total: 4 };
      case "3x3": return { cols: 3, rows: 3, total: 9 };
      case "3x2": return { cols: 3, rows: 2, total: 6 };
      default: return { cols: 2, rows: 2, total: 4 };
    }
  };

  const gridDims = getGridDimensions(config.gridType);

  useEffect(() => {
    if (uploadedImage) {
      initializePuzzle();
    }
  }, [config.gridType, uploadedImage]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setShowImageSelect(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDefaultImageSelect = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setShowImageSelect(false);
  };

  const initializePuzzle = () => {
    if (!uploadedImage) return;

    const newPieces: PieceData[] = Array.from({ length: gridDims.total }, (_, i) => ({
      id: i,
      currentPosition: i,
      correctPosition: i,
      row: Math.floor(i / gridDims.cols),
      col: i % gridDims.cols,
    }));

    // Shuffle pieces
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPieces[i].currentPosition, newPieces[j].currentPosition] = 
        [newPieces[j].currentPosition, newPieces[i].currentPosition];
    }

    setPieces(newPieces);
    setIsComplete(false);
    setMoves(0);
    setSelectedPiece(null);
  };

  const handlePieceClick = (pieceId: number) => {
    if (isComplete) return;

    if (selectedPiece === null) {
      setSelectedPiece(pieceId);
    } else if (selectedPiece === pieceId) {
      setSelectedPiece(null);
    } else {
      swapPieces(selectedPiece, pieceId);
    }
  };

  const swapPieces = (piece1Id: number, piece2Id: number) => {
    const newPieces = [...pieces];
    const piece1 = newPieces.find(p => p.id === piece1Id)!;
    const piece2 = newPieces.find(p => p.id === piece2Id)!;
    
    [piece1.currentPosition, piece2.currentPosition] = 
      [piece2.currentPosition, piece1.currentPosition];
    
    setPieces(newPieces);
    setMoves(moves + 1);
    setSelectedPiece(null);

    // Check if puzzle is complete
    const complete = newPieces.every(p => p.currentPosition === p.correctPosition);
    if (complete) {
      setIsComplete(true);
    }
  };

  const handleDragStart = (pieceId: number) => {
    if (isComplete) return;
    setDraggedPiece(pieceId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (pieceId: number) => {
    if (draggedPiece !== null && draggedPiece !== pieceId) {
      swapPieces(draggedPiece, pieceId);
    }
    setDraggedPiece(null);
  };

  const gridCols = `grid-cols-${gridDims.cols}`;
  const gridRows = `grid-rows-${gridDims.rows}`;

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <Card className="p-6 w-full max-w-2xl">
        {showImageSelect ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Välj en bild för ditt pussel</h3>
              <p className="text-muted-foreground">Välj en av bilderna nedan eller ladda upp din egen</p>
            </div>
            
            {/* Default images */}
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handleDefaultImageSelect(defaultImage1)}
                className="aspect-video rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-colors"
              >
                <img src={defaultImage1} alt="Landskap med solnedgång" className="w-full h-full object-cover" />
              </button>
              <button
                onClick={() => handleDefaultImageSelect(defaultImage2)}
                className="aspect-video rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-colors"
              >
                <img src={defaultImage2} alt="Färgglad trädgård" className="w-full h-full object-cover" />
              </button>
              <button
                onClick={() => handleDefaultImageSelect(defaultImage3)}
                className="aspect-video rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-colors"
              >
                <img src={defaultImage3} alt="Söt katt" className="w-full h-full object-cover" />
              </button>
            </div>

            {/* Upload custom image */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">eller</span>
              </div>
            </div>

            <label className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Ladda upp din egen bild</span>
              <span className="text-xs text-muted-foreground">Klicka för att välja en bild</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold text-foreground">
                Drag: {moves}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={initializePuzzle}
                  className="gap-2"
                  aria-label="Återställ pusselspel"
                >
                  <RotateCcw className="h-4 w-4" />
                  Börja om
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setUploadedImage(null);
                    setPieces([]);
                  }}
                  aria-label="Ny bild"
                >
                  Ny bild
                </Button>
              </div>
            </div>

            <div className={`grid ${gridCols} ${gridRows} gap-2 w-full max-w-md mx-auto`} style={{ aspectRatio: `${gridDims.cols}/${gridDims.rows}` }}>
              {pieces
                .sort((a, b) => a.currentPosition - b.currentPosition)
                .map((piece) => (
                  <PuzzlePiece
                    key={piece.id}
                    piece={piece}
                    isSelected={selectedPiece === piece.id}
                    isDragged={draggedPiece === piece.id}
                    isComplete={isComplete}
                    onClick={() => handlePieceClick(piece.id)}
                    onDragStart={() => handleDragStart(piece.id)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(piece.id)}
                    imageUrl={uploadedImage}
                    gridDims={gridDims}
                  />
                ))}
            </div>

            {isComplete && (
              <div className="mt-6 text-center">
                <p className="text-xl font-bold text-success animate-fade-in">
                  🎉 Grattis! Du klarade pusslet på {moves} drag!
                </p>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};
