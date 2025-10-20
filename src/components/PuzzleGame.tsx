import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { PuzzlePiece } from "./PuzzlePiece";
import { FeedbackSystem } from "./FeedbackSystem";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export interface PuzzleConfig {
  pieces: number;
  contrastLevel: "AA" | "AAA";
  pieceShape: "standard" | "geometric";
  feedbackType: "visual" | "audio" | "both";
}

interface PieceData {
  id: number;
  currentPosition: number;
  correctPosition: number;
  color: string;
}

export const PuzzleGame = ({ config }: { config: PuzzleConfig }) => {
  const [pieces, setPieces] = useState<PieceData[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"success" | "error">("success");

  const colors = config.contrastLevel === "AAA"
    ? ["hsl(142, 76%, 36%)", "hsl(199, 89%, 48%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)", 
       "hsl(271, 76%, 53%)", "hsl(142, 70%, 45%)", "hsl(199, 89%, 58%)", "hsl(38, 90%, 55%)", "hsl(0, 62%, 30%)"]
    : ["hsl(142, 70%, 45%)", "hsl(199, 89%, 58%)", "hsl(38, 90%, 55%)", "hsl(0, 62%, 30%)", 
       "hsl(271, 70%, 60%)", "hsl(142, 65%, 50%)", "hsl(199, 85%, 65%)", "hsl(38, 85%, 60%)", "hsl(0, 60%, 40%)"];

  useEffect(() => {
    initializePuzzle();
  }, [config.pieces]);

  const initializePuzzle = () => {
    const newPieces: PieceData[] = Array.from({ length: config.pieces }, (_, i) => ({
      id: i,
      currentPosition: i,
      correctPosition: i,
      color: colors[i % colors.length],
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

  const gridCols = config.pieces === 4 ? "grid-cols-2" : config.pieces === 6 ? "grid-cols-3" : "grid-cols-3";
  const gridRows = config.pieces === 4 ? "grid-rows-2" : config.pieces === 6 ? "grid-rows-2" : "grid-rows-3";

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <Card className="p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold text-foreground">
            Drag: {moves}
          </div>
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
        </div>

        <div className={`grid ${gridCols} ${gridRows} gap-3 aspect-square w-full max-w-md mx-auto`}>
          {pieces
            .sort((a, b) => a.currentPosition - b.currentPosition)
            .map((piece) => (
              <PuzzlePiece
                key={piece.id}
                piece={piece}
                isSelected={selectedPiece === piece.id}
                isCorrect={piece.currentPosition === piece.correctPosition}
                isComplete={isComplete}
                onClick={() => handlePieceClick(piece.id)}
                shape={config.pieceShape}
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
      </Card>

      <FeedbackSystem
        show={showFeedback}
        type={feedbackType}
        feedbackMode={config.feedbackType}
      />
    </div>
  );
};
