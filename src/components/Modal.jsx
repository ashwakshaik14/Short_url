import { useState } from "react";
import styles from "../style/Modal.module.css";

export default function Modal({ closeModal }) {
  const [url, setUrl] = useState("");
  const [remarks, setRemarks] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [useExpiration, setUseExpiration] = useState(false);

  // Get email from localStorage
  const email = localStorage.getItem("userEmail");

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url || !remarks) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/url/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: url,
          remarks,
          email, // Include email in the body
          expirationDate: useExpiration ? expirationDate : null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Shortened URL: ${data.data.shortUrl}`);
        closeModal();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error connecting to the server:", error);
      alert("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.upper}>
          <p>New Link</p>
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
              <label
                htmlFor="useExpiration"
                style={{ margin: "0", fontWeight: "bold" }}
              >
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
              setUrl("");
              setRemarks("");
              setExpirationDate("");
              setUseExpiration(false);
            }}
          >
            Clear
          </button>
            <button type="submit" className={styles.btnm} disabled={loading}>
              {loading ? "Creating..." : "Create New"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
