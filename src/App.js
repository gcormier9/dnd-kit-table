import { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Droppable from "./Droppable";
import Draggable from "./Draggable";

import "./styles.css";

export default function App() {
  const [items, setItems] = useState([
    [{ value: "A" }, { value: "B" }, { value: "C" }],
    [{ value: "D" }, { value: "E" }, { value: "F" }],
    [{ value: "G" }, { value: "H" }, { value: "I" }],
  ]);
  const [dragItem, setDragItem] = useState();

  const dropAnimation = {
    keyframes({ transform }) {
      return [
        { transform: CSS.Transform.toString(transform.initial) },
        {
          transform: CSS.Transform.toString({
            ...transform.final,
            scaleX: 0.94,
            scaleY: 0.94,
          }),
        },
      ];
    },
    sideEffects({ active, dragOverlay }) {
      active.node.style.opacity = "0";

      const button = dragOverlay.node.querySelector("button");

      if (button) {
        button.animate(
          [
            {
              boxShadow:
                "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)",
            },
            {
              boxShadow:
                "-1px 0 15px 0 rgba(34, 33, 81, 0), 0px 15px 15px 0 rgba(34, 33, 81, 0)",
            },
          ],
          {
            duration: 250,
            easing: "ease",
            fill: "forwards",
          }
        );
      }

      return () => {
        active.node.style.opacity = "";
      };
    },
  };

  const handleDragStart = (event) => {
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

  const DroppableItem = ({ data }) => {
    if (!data) return <></>;
    const { row, column, value } = data;
    return (
      <Droppable id={value} data={{ row, column, value }}>
        <Item data={data} />
      </Droppable>
    );
  };

  const Item = ({ data }) => {
    if (!data) return <></>;
    const { row, column, value } = data;
    return (
      <Draggable id={value} data={{ row, column, value }}>
        {value}
      </Draggable>
    );
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <DragOverlay style={{ width: "2.6em" }}>
        {dragItem && <Item data={dragItem} />}
      </DragOverlay>
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
