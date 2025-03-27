import { useDraggable } from "@dnd-kit/core";

const Draggable = ({ id, data, children }) => {
  const { attributes, isDragging, listeners, over, setNodeRef } = useDraggable({
    id,
    data,
  });

  return (
    <div className={`item ${isDragging && "item-dragging"}`}>
      <span ref={setNodeRef} {...listeners} {...attributes}>
        <i className="bi bi-grip-vertical"></i>
        {children}
      </span>
    </div>
  );
};

export default Draggable;
