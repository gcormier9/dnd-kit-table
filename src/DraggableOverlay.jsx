import { DragOverlay, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

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

const dropAnimation2 = {
  duration: 250,
  easing: "ease",
  //keyframes: defaultDropAnimationKeyframes,
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0",
      },
    },
  }),
};

const dropAnimation3 = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
      { opacity: 0, transform: CSS.Transform.toString(transform.final) },
    ];
  },
};

const DraggableOverlay = ({ children }) => {
  return (
    <DragOverlay style={{ width: "2.6em" }} dropAnimation={dropAnimation3}>
      {children}
    </DragOverlay>
  );
};

export default DraggableOverlay;
