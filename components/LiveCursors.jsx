import { shallow } from "@liveblocks/client";
import { useOthersMapped, useUpdateMyPresence } from "@/liveblocks.config";
import { useBoundingClientRectRef } from "@/customHooks/useBoundingClientRectRef";
const LiveCursors = ({cursorPanel}) => {
const updateMyPresence = useUpdateMyPresence();

const others = useOthersMapped(
    (other) => ({
      cursor: other.presence.cursor,
      info: other.info,
    }),
    shallow
  );


  const rectRef = useBoundingClientRectRef(cursorPanel);
    

  useEffect(() => {
    if (!(cursorPanel?.current)) {
      console.warn(
        'Ref not found'
      );
      return;
    }

    // If cursorPanel, add live cursor listeners
    const updateCursor = (event) => {
      if (!cursorPanel?.current) {
        return;
      }

      // (Viewport position) - (element position) + (element scroll amount)
      const x =
        event.clientX - rectRef.current.x + cursorPanel.current.scrollLeft;
      const y =
        event.clientY - rectRef.current.y + cursorPanel.current.scrollTop;

      updateMyPresence({
        cursor: {
          x: Math.round(x),
          y: Math.round(y),
        },
      });
    };

    const removeCursor = () => {
      updateMyPresence({
        cursor: null,
      });
    };

    cursorPanel.current.addEventListener("pointermove", updateCursor);
    cursorPanel.current.addEventListener("pointerleave", removeCursor);

    // Clean up event listeners
    const oldRef = cursorPanel.current;
    return () => {
      if (!oldRef) {
        return;
      }
      oldRef.removeEventListener("pointermove", updateCursor);
      oldRef.removeEventListener("pointerleave", removeCursor);
    };
  }, [updateMyPresence, cursorPanel]);



  return (
    <>
      {
        others.map(([id, other]) => {
          if (other.cursor == null) {
            return null;
          }

          return (
            <Cursor
              variant="name"
              name={other.info.name}
              key={id}
              color={other.info.color}
              x={other.cursor.x}
              y={other.cursor.y}
            />
          );
        })
      }
    </>
  );
}

export default LiveCursors