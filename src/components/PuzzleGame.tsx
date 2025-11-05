import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { PuzzlePiece } from "./PuzzlePiece";
import { FeedbackSystem } from "./FeedbackSystem";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export interface PuzzleConfig {
  gridType: "2x2" | "3x3" | "3x2";
  feedbackType: "visual" | "audio" | "both";
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
  const [isComplete, setIsComplete] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"success" | "error">("success");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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
      };
      reader.readAsDataURL(file);
    }
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
      // Swap pieces
      const newPieces = [...pieces];
      const piece1 = newPieces.find(p => p.id === selectedPiece)!;
      const piece2 = newPieces.find(p => p.id === pieceId)!;
      
      [piece1.currentPosition, piece2.currentPosition] = 
        [piece2.currentPosition, piece1.currentPosition];
      
      setPieces(newPieces);
      setMoves(moves + 1);
      setSelectedPiece(null);

      // Check if puzzle is complete
      const complete = newPieces.every(p => p.currentPosition === p.correctPosition);
      if (complete) {
        setIsComplete(true);
        setFeedbackType("success");
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 3000);
      }
    }
  };

  const gridCols = `grid-cols-${gridDims.cols}`;
  const gridRows = `grid-rows-${gridDims.rows}`;

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <Card className="p-6 w-full max-w-2xl">
        {!uploadedImage ? (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Ladda upp en bild</h3>
            <p className="text-muted-foreground">Välj en bild som ska bli ett pussel</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-foreground
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-primary-foreground
                hover:file:bg-primary/90 cursor-pointer"
            />
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
                    isComplete={isComplete}
                    onClick={() => handlePieceClick(piece.id)}
                    imageUrl={uploadedImage}
                    gridDims={gridDims}
                  />
                ))}
            </div>
          </>
        )}

        {isComplete && (
          <div className="mt-6 text-center">
            <p className="text-xl font-bold text-success animate-fade-in">
              🎉 Grattis! Du klarade pusslet på {moves} drag!
            </p>
          </div>
        )}
      </Card>

      <FeedbackSystem
        show={showFeedback}
        type={feedbackType}
        feedbackMode={config.feedbackType}
      />
    </div>
  );
};
