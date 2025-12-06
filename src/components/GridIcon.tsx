interface GridIconProps {
  cols: number;
  rows: number;
  className?: string;
}

export const GridIcon = ({ cols, rows, className = "" }: GridIconProps) => {
  const cells = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      cells.push(
        <div
          key={`${i}-${j}`}
          className="bg-primary/60 rounded-sm"
        />
      );
    }
  }

  return (
    <div 
      className={`grid gap-0.5 ${className}`}
      style={{ 
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`
      }}
    >
      {cells}
    </div>
  );
};
