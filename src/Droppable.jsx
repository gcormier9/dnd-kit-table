import { useDroppable } from "@dnd-kit/core";

const Droppable = ({ id, data, children, className }) => {
  const { isOver, setNodeRef } = useDroppable({ id, data });

  const style = {
    boxShadow: isOver
      ? "inset rgba(201, 211, 219) 0 0 0 3px, rgba(201, 211, 219, 0.5) 20px 14px 24px"
      : undefined,
    backgroundColor: isOver ? "rgba(201, 211, 219, 0.5)" : undefined,
  };

  return (
    <td ref={setNodeRef} className={className} style={style}>
      {children}
    </td>
  );
};

export default Droppable;
