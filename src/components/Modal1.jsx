import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import styles from "../style/Modal.module.css";

export default function Modal1({ closeModal, linkData, onSave }) {
  const [url, setUrl] = useState(linkData.originalUrl);
  const [remarks, setRemarks] = useState(linkData.remarks || "");
  const [expirationDate, setExpirationDate] = useState(linkData.expirationDate || "");
  const [useExpiration, setUseExpiration] = useState(!!linkData.expirationDate);
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const updatedData = {
      originalUrl: url,
      remarks,
      expirationDate: useExpiration ? expirationDate : null,
    };
  
    try {
      const response = await fetch(`https://short-url-back-48bn.onrender.com/api/url/${linkData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating URL:", errorData.error);
        alert(`Error: ${errorData.error}`);
        return;
      }
  
      const data = await response.json();
      console.log("Updated URL:", data);
  
      alert("URL updated successfully!");
      onSave(data); // Pass the updated data to onSave to update the parent component
      closeModal(); // Close the modal
    } catch (error) {
      console.error("Error updating URL:", error);
      alert("Failed to update the URL.");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && closeModal()}>
      <div className={styles.modal}>
        <div className={styles.upper}>
          <p>Edit Link</p>
          <button onClick={closeModal}>X</button>
        </div>
        <form onSubmit={handleSubmit} className={styles["modal-content"]}>
          <div>
            <label htmlFor="url">Destination URL *</label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your long URL"
              required
            />
          </div>
          <div>
            <label htmlFor="remarks">Remarks *</label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add remarks"
              rows="5"
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <label htmlFor="useExpiration" style={{ margin: "0", fontWeight: "bold" }}>
                Link Expiration
              </label>
              <div
                style={{
                  width: "34px",
                  height: "20px",
                  backgroundColor: useExpiration ? "#4A70D1" : "#ccc",
                  borderRadius: "20px",
                  position: "relative",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => setUseExpiration(!useExpiration)}
              >
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "3px",
                    left: useExpiration ? "18px" : "3px",
                    transition: "left 0.3s ease",
                  }}
                ></div>
              </div>
            </div>
            <input
              type="datetime-local"
              id="expiration"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              disabled={!useExpiration} // Disable if toggle is off
              style={{
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "5px",
              }}
            />
          </div>
          <div className={styles.bottom}>
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => {
                setUrl(linkData.originalUrl);
                setRemarks(linkData.remarks || "");
                setExpirationDate(linkData.expirationDate || "");
                setUseExpiration(!!linkData.expirationDate);
              }}
            >
              Reset
            </button>
            <button type="submit" className={styles.btnm} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// PropTypes validation
Modal1.propTypes = {
  closeModal: PropTypes.func.isRequired, // Ensures closeModal is a required function
  linkData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    originalUrl: PropTypes.string.isRequired,
    remarks: PropTypes.string,
    expirationDate: PropTypes.string,
  }).isRequired, // Ensures linkData follows a specific structure
  onSave: PropTypes.func.isRequired, // Ensures onSave is a required function
};
