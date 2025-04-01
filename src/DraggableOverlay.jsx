import {
  DragOverlay,
  defaultDropAnimation,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const dropAnimation = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
      {
        opacity: 0,
        transform: CSS.Transform.toString({
          ...transform.final,
          x: transform.final.x + 5,
          y: transform.final.y + 5,
        }),
      },
    ];
  },
  easing: "ease-out",
  sideEffects({ active }) {
    active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: defaultDropAnimation.duration,
      easing: defaultDropAnimation.easing,
    });
  },
};

const DraggableOverlay = ({ children }) => {
  return (
    <DragOverlay style={{ width: "2.6em" }} dropAnimation={dropAnimation}>
      {children}
    </DragOverlay>
  );
};

export default DraggableOverlay;
