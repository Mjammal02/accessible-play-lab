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
  imageUrl: string;
  gridDims: GridDimensions;
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
  imageUrl,
  gridDims
}: PuzzlePieceProps) => {
  const percentageX = (piece.col / gridDims.cols) * 100;
  const percentageY = (piece.row / gridDims.rows) * 100;

  return (
    <button
      onClick={onClick}
      draggable={!isComplete}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      disabled={isComplete}
      className={cn(
        "w-full h-full transition-all duration-300 relative overflow-hidden rounded-sm",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring",
        "disabled:cursor-not-allowed",
        isSelected && "ring-4 ring-primary scale-95",
        isDragged && "opacity-50 scale-95",
        isComplete && "animate-scale-in cursor-default",
        !isComplete && "hover:scale-105 active:scale-95 cursor-grab active:cursor-grabbing"
      )}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: `${percentageX}% ${percentageY}%`,
        backgroundSize: `${gridDims.cols * 100}% ${gridDims.rows * 100}%`,
        backgroundRepeat: "no-repeat",
      }}
      aria-label={`Pusselbit ${piece.id + 1}`}
      aria-pressed={isSelected}
    />
  );
};
