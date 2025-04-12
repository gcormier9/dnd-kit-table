import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./Droppable";
import Draggable from "./Draggable";

import "./styles.css";
import DraggableOverlay from "./DraggableOverlay";
import Item from "./Item";

export default function App() {
  const [items, setItems] = useState([
    [{ value: "A" }, { value: "B" }, { value: "C" }],
    [{ value: "D" }, { value: "E" }, { value: "F" }],
    [{ value: "G" }, { value: "H" }, { value: "I" }],
  ]);
  const [dragItem, setDragItem] = useState();
  const [isOver, setIsOver] = useState(true);

  const handleDragStart = (event) => {
    setIsOver(true);
    const dragItem = event.active.data.current;
    setDragItem(dragItem);
  };

  const handleDragEnd = (event) => {
    setDragItem(null);
    //const dragItem = event.active.data.current.value;
    //const hoverItem = event.over?.data?.current.value;
    //console.log("handleDragEnd", { dragItem, hoverItem });

    const { active, over } = event;
    if (!active || !over) return;

    if (active.id !== over.id) {
      /*
      console.log("handleDragEnd", {
        active: active.data.current,
        hover: over.data.current,
      });
      */

      const newItems = items.map((row) => row.map((item) => ({ ...item })));
      newItems[over.data.current.row][over.data.current.column] = {
        value: active.data.current.value,
      };
      newItems[active.data.current.row][active.data.current.column] = {
        value: over.data.current.value,
      };
      setItems(newItems);
    }
  };

  const handleDragOver = (event) => {
    //console.log("handleDragOver", event);
    setIsOver(!!event.over);
  };

  const DroppableItem = ({ data }) => {
    if (!data) return <></>;
    const { row, column, value } = data;
    const dragId = column === 0 ? Math.floor(Math.random() * 1000) : value;
    return (
      <Droppable id={value} data={{ row, column, value }}>
        <Draggable id={dragId} data={data} />
      </Droppable>
    );
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <DraggableOverlay>
        <Item
          id={dragItem?.value}
          data={dragItem}
          isOverlay={true}
          isOver={isOver}
        />
      </DraggableOverlay>
      <div>
        <table>
          <thead>
            <tr>
              <th>H1</th>
              <th>H2</th>
              <th>H3</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((item, columnIndex) => (
                  <DroppableItem
                    key={`${rowIndex}-${columnIndex}`}
                    data={{
                      row: rowIndex,
                      column: columnIndex,
                      value: item.value,
                    }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DndContext>
  );
}
