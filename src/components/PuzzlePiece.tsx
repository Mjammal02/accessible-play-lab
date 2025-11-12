import { cn } from "@/lib/utils";

interface PieceData {
  id: number;
  currentPosition: number;
  correctPosition: number;
  row: number;
  col: number;
}

interface GridDimensions {
  cols: number;
  rows: number;
  total: number;
}

interface PuzzlePieceProps {
  piece: PieceData;
  isSelected: boolean;
  isDragged: boolean;
  isComplete: boolean;
  onClick: () => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  onDragEnd: () => void;
  imageUrl: string;
  gridDims: GridDimensions;
  visualFeedback: "none" | "border" | "checkmark";
}

export const PuzzlePiece = ({ 
  piece, 
  isSelected,
  isDragged,
  isComplete, 
  onClick,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  imageUrl,
  gridDims,
  visualFeedback
}: PuzzlePieceProps) => {
  // Calculate current position's row and col for correct background display
  const currentRow = Math.floor(piece.currentPosition / gridDims.cols);
  const currentCol = piece.currentPosition % gridDims.cols;
  
  // Calculate background position based on the piece's original position (row/col)
  const percentageX = gridDims.cols > 1 ? (piece.col / (gridDims.cols - 1)) * 100 : 0;
  const percentageY = gridDims.rows > 1 ? (piece.row / (gridDims.rows - 1)) * 100 : 0;
  
  // Check if piece is correctly placed
  const isCorrectlyPlaced = piece.currentPosition === piece.correctPosition;

  return (
    <button
      onClick={onClick}
      draggable={!isComplete}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      disabled={isComplete}
      className={cn(
        "w-full h-full transition-all duration-300 relative overflow-hidden rounded-sm",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring",
        "disabled:cursor-not-allowed",
        isSelected && "ring-4 ring-primary scale-95",
        isDragged && "opacity-50 scale-95",
        isComplete && "animate-scale-in cursor-default",
        !isComplete && "hover:scale-105 active:scale-95 cursor-grab active:cursor-grabbing",
        isCorrectlyPlaced && visualFeedback === "border" && "ring-4 ring-green-500"
      )}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: `${percentageX}% ${percentageY}%`,
        backgroundSize: `${gridDims.cols * 100}% ${gridDims.rows * 100}%`,
        backgroundRepeat: "no-repeat",
      }}
      aria-label={`Pusselbit ${piece.id + 1}`}
      aria-pressed={isSelected}
    >
      {isCorrectlyPlaced && visualFeedback === "checkmark" && (
        <div 
          className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full shadow-lg"
          style={{ backgroundColor: '#4CAF50' }}
        >
          <span className="text-white text-lg font-bold leading-none">✓</span>
        </div>
      )}
    </button>
  );
};
