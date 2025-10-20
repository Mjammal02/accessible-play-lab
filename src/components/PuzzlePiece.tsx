import { cn } from "@/lib/utils";

interface PieceData {
  id: number;
  currentPosition: number;
  correctPosition: number;
  color: string;
}

interface PuzzlePieceProps {
  piece: PieceData;
  isSelected: boolean;
  isCorrect: boolean;
  isComplete: boolean;
  onClick: () => void;
  shape: "standard" | "geometric";
}

export const PuzzlePiece = ({ 
  piece, 
  isSelected, 
  isCorrect, 
  isComplete, 
  onClick, 
  shape 
}: PuzzlePieceProps) => {
  const shapeClass = shape === "geometric" 
    ? "rounded-lg" 
    : "rounded-md";

  return (
    <button
      onClick={onClick}
      disabled={isComplete}
      className={cn(
        "w-full h-full transition-all duration-300 relative overflow-hidden",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring",
        "disabled:cursor-not-allowed",
        shapeClass,
        isSelected && "ring-4 ring-primary scale-95",
        isCorrect && isComplete && "animate-scale-in",
        !isComplete && "hover:scale-105 active:scale-95 cursor-pointer"
      )}
      style={{
        backgroundColor: piece.color,
      }}
      aria-label={`Pusselbit ${piece.id + 1}`}
      aria-pressed={isSelected}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-bold text-white drop-shadow-lg">
          {piece.id + 1}
        </span>
      </div>
      
      {isCorrect && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center animate-scale-in">
            <span className="text-success-foreground text-sm">✓</span>
          </div>
        </div>
      )}
    </button>
  );
};
