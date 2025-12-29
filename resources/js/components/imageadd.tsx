import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageAdd: React.FC = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<{ id: number; title: string; fileName: string; fileUrl: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingImageId, setEditingImageId] = useState<number | null>(null); // Track the image being edited
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Track the image to display in full screen

  // Fetch images from the database when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/images', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if using API authentication
        },
      });
        setImages(response.data.images); // Assuming the API returns an array of images
      } catch (error) {
        console.error('Error fetching images:', error);
        alert('Failed to load images.');
      }
    };

    fetchImages();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAddOrUpdateImage = async () => {
    if (!title) {
      alert('Please provide a title.');
      return;
    }

    if (!file && editingImageId === null) {
      alert('Please provide a file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    if (file) {
      formData.append('file', file);
    }

    try {
      setIsLoading(true);

      if (editingImageId !== null) {
        // Update existing image
        const response = await axios.post(`/api/images/${editingImageId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setImages((prevImages) =>
          prevImages.map((img) =>
            img.id === editingImageId
              ? {
                  ...img,
                  title: response.data.image.title,
                  fileUrl: response.data.image.file_url,
                }
              : img
          )
        );
        // alert('Image updated successfully!');
      } else {
        // Add new image
        const response = await axios.post('/api/images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const newImage = response.data.image;
        setImages((prevImages) => [
          ...prevImages,
          {
            id: newImage.id,
            title: newImage.title,
            fileName: newImage.file_name,
            fileUrl: newImage.file_url,
          },
        ]);
        // alert('Image uploaded successfully!');
      }

      setTitle('');
      setFile(null);
      setEditingImageId(null); // Reset editing state
    } catch (error) {
      console.error('Error uploading/updating image:', error);
      alert('Failed to upload/update image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async (id: number) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this image?');
      if (!confirmDelete) return;

      await axios.delete(`/api/images/${id}`); // Send DELETE request to the backend
      setImages((prevImages) => prevImages.filter((img) => img.id !== id)); // Remove the image from state
      // alert('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image.');
    }
  };

  const handleEditImage = (id: number) => {
    const imageToEdit = images.find((img) => img.id === id);
    if (imageToEdit) {
      setTitle(imageToEdit.title); // Populate the title input with the image's title
      setEditingImageId(id); // Set the editing image ID
    }
  };

  const handleCancelEdit = () => {
    setTitle('');
    setFile(null);
    setEditingImageId(null); // Reset editing state
  };

  const handleImageClick = (fileUrl: string) => {
    setSelectedImage(fileUrl); // Set the selected image for full-screen view
  };

  const closeFullScreen = () => {
    setSelectedImage(null); // Close the full-screen view
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Image Upload</h1>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />
      <input type="file" onChange={handleFileChange} style={styles.input} />
      <button onClick={handleAddOrUpdateImage} disabled={isLoading} style={styles.button}>
        {isLoading ? 'Processing...' : editingImageId !== null ? 'Update Image' : 'Upload Image'}
      </button>
      {editingImageId !== null && (
        <button onClick={handleCancelEdit} style={styles.cancelButton}>
          Cancel Edit
        </button>
      )}

      {/* Display uploaded images */}
      <div style={styles.imagePreviewContainer}>
        {images.map((img) => (
          <div key={img.id} style={styles.imagePreviewItem}>
            <div style={styles.imageWrapper}>
              <img
                src={img.fileUrl}
                alt={img.title}
                style={styles.imagePreview}
                onClick={() => handleImageClick(img.fileUrl)} // Open full-screen view on click
              />
              <button
                onClick={() => handleEditImage(img.id)}
                style={styles.editButton}
                title="Edit Image"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDeleteImage(img.id)}
                style={styles.deleteButton}
                title="Delete Image"
              >
                🗑️
              </button>
            </div>
            <p style={styles.imageTitle}>{img.title}</p>
          </div>
        ))}
      </div>

      {/* Full-screen image view */}
      {selectedImage && (
        <div style={styles.fullScreenOverlay} onClick={closeFullScreen}>
          <img src={selectedImage} alt="Full Screen" style={styles.fullScreenImage} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '760px',
    margin: '60px auto',
    padding: '40px',
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    borderRadius: '24px',
    border: '1px solid rgba(255,255,255,0.15)',
    boxShadow:
      '0 30px 80px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.1)',
    fontFamily: 'Inter, system-ui, sans-serif',
    color: '#e5e7eb',
  },

  heading: {
    fontSize: '36px',
    fontWeight: 800,
    marginBottom: '32px',
    textAlign: 'center' as const,
    background:
      'linear-gradient(90deg, #8b5cf6, #22d3ee, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.03em',
  },

  input: {
    width: '100%',
    padding: '14px 16px',
    marginBottom: '14px',
    borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(0,0,0,0.35)',
    color: '#f9fafb',
    fontSize: '14px',
    outline: 'none',
    backdropFilter: 'blur(10px)',
    transition: 'border 0.2s ease, box-shadow 0.2s ease',
  },

  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '14px',
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    background:
      'linear-gradient(135deg, #6366f1, #22d3ee)',
    color: '#020617',
    boxShadow:
      '0 0 0 rgba(0,0,0,0), 0 10px 40px rgba(34,211,238,0.45)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },

  cancelButton: {
    width: '100%',
    padding: '14px',
    marginTop: '10px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'transparent',
    color: '#f87171',
    fontWeight: 600,
    cursor: 'pointer',
  },

  imagePreviewContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '20px',
    marginTop: '40px',
  },

  imagePreviewItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },

  imageWrapper: {
    position: 'relative' as const,
    width: '100%',
    aspectRatio: '1 / 1',
    borderRadius: '20px',
    overflow: 'hidden',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(0,0,0,0.4))',
    boxShadow:
      '0 20px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.1)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  },

  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    cursor: 'pointer',
    transition: 'transform 0.4s ease',
  },

  editButton: {
    position: 'absolute' as const,
    top: '10px',
    right: '44px',
    background: 'rgba(99,102,241,0.9)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    width: '34px',
    height: '34px',
    cursor: 'pointer',
    fontSize: '14px',
    boxShadow: '0 8px 20px rgba(99,102,241,0.6)',
  },

  deleteButton: {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    background: 'rgba(239,68,68,0.9)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    width: '34px',
    height: '34px',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(239,68,68,0.6)',
  },

  imageTitle: {
    marginTop: '10px',
    fontSize: '13px',
    fontWeight: 500,
    textAlign: 'center' as const,
    color: '#d1d5db',
  },

  fullScreenOverlay: {
    position: 'fixed' as const,
    inset: 0,
    background:
      'radial-gradient(circle at center, rgba(0,0,0,0.6), rgba(0,0,0,0.95))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
  },

  fullScreenImage: {
    maxWidth: '88%',
    maxHeight: '88%',
    borderRadius: '24px',
    boxShadow:
      '0 30px 100px rgba(0,0,0,0.8)',
  },
};

export default ImageAdd;