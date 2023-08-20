import { CSSProperties, useState } from "react";
import ImageMapper from "react-img-mapper";
import { imageMapJson } from "./image-map";

export const ImageMap = () => {
  const URL =
    "https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.jpg";
  const MAP = {
    name: "my-map",
    // GET JSON FROM BELOW URL AS AN EXAMPLE
    areas: imageMapJson,
  };

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleClick = (area: any) => {
    setPopupContent(area.title);

    let x = 0;
    let y = 0;

    if (area.shape === "poly") {
      for (let i = 0; i < area.coords.length; i += 2) {
        x += area.coords[i];
        y += area.coords[i + 1];
      }
      x /= area.coords.length / 2; // average x
      y /= area.coords.length / 2; // average y
    }

    // Handle other shapes if needed

    setPopupPosition({ x, y });
    setPopupVisible(true);
  };

  return (
    <div style={{ position: "relative" }}>
      {popupVisible && (
        <div
          style={{
            ...styles.popup,
            top: `${popupPosition.y}px`,
            left: `${popupPosition.x}px`,
          }}
        >
          <div style={styles.closeBtnWrap}>
            <button
              style={styles.closeBtn}
              onClick={() => setPopupVisible(false)}
            >
              X
            </button>
          </div>
          <div style={styles.popupContent}>{popupContent}</div>
        </div>
      )}
      <ImageMapper onClick={handleClick} src={URL} map={MAP as any} />
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  popup: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "5px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    zIndex: 1000,
    color: "black",
    maxWidth: "300px",
    display: "flex",
    flexDirection: "column",
    height: "50px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeBtn: {
    position: "absolute",
    right: "5px",
    top: "5px",
    background: "transparent",
    border: "none",

    cursor: "pointer",
    outline: "none",
    color: "black",
  },
  closeBtnWrap: {
    display: "flex",
    justifyContent: "flex-end",
  },

  popupContent: {
    fontSize: "1rem",
  },
};
