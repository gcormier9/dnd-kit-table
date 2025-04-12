const Item = ({ data, isDragging, isOverlay, isOver }) => {
  if (!data) return <></>;
  const { row, column, value } = data;
  return (
    <div
      className={`item ${isDragging && "item-dragging"} ${
        isOverlay && !isOver && "item-over"
      }`}
    >
      <span>
        <i className="bi bi-grip-vertical"></i>
        {data.value}
      </span>
    </div>
  );
};

export default Item;
