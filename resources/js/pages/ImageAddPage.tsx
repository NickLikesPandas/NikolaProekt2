import React from "react";
import ImageAdd from "@/components/imageadd";

const ImageAddPage: React.FC = () => {
  return (
    <div>
      <a href="/dashboard" style={styles.link}>← Back to Dashboard</a> 
      <ImageAdd />
    </div>
  );
};

const styles = {
  link: {
    display: 'inline-block',
    marginBottom: '20px',
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default ImageAddPage;