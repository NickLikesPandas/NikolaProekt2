import React from "react";
import ImageAdd from "@/components/imageadd";

const ImageAddPage: React.FC = () => {
  return (
    <div style={styles.page}>
      <a href="/dashboard" style={styles.link}>
        ← Back to Dashboard
      </a>

      <ImageAdd />
    </div>
  );
};

const styles = {
  page: {
    width: "100vw",
    height: "100vh",
    margin: 0,
    padding: 0,
    overflow: "hidden",
  },
  link: {
    position: "absolute" as const,
    top: 20,
    left: 20,
    zIndex: 10,
    color: "#007bff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default ImageAddPage;
