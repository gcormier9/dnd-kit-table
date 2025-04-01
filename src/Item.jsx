import Draggable from "./Draggable";

const Item = ({ data, isOverlay, isOver }) => {
  if (!data) return <></>;
  const { row, column, value } = data;
  return (
    <Draggable
      id={value}
      data={{ row, column, value }}
      isOverlay={isOverlay}
      isOver={isOver}
    >
      {value}
    </Draggable>
  );
};

export default Item;
