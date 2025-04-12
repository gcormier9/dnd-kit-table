import { useDraggable } from "@dnd-kit/core";

const Draggable = ({ id, data, isOverlay, isOver, children }) => {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id,
    data,
  });

  return (
    <div
      className={`item ${isDragging && "item-dragging"} ${
        isOverlay && !isOver && "item-over"
      }`}
    >
      <span ref={setNodeRef} {...listeners} {...attributes}>
        <i className="bi bi-grip-vertical"></i>
        {data.value}
      </span>
    </div>
  );
};

export default Draggable;
