import { useState } from "react";
import { CompetitionItem } from "../competitionsTypes";

interface Props {
  competitionItem: CompetitionItem;
}
const CompetitionCard = ({ competitionItem }: Props) => {
  const [value, setValue] = useState<number | null>(null);
  const handleRatingChange = (newValue: number) => {
    setValue(newValue);
  };
  return (
    <div
      style={{
        width: 300,
        backgroundColor: "#1f1f1f",
        color: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        border: "1px solid #ffc107",
        transition: "transform 0.3s",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={competitionItem.file}
          alt="תמונה לתחרות"
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
          }}
        />
      </div>

      <div style={{ padding: 16 }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "#ffc107",
            marginBottom: 4,
          }}
        >
          קטגוריה: {competitionItem.category}
        </div>
        <div style={{ fontSize: "14px", color: "#ccc" }}>
          הועלה על ידי: {competitionItem.ownerEmail}
        </div>
        <div style={{ fontSize: "16px", marginTop: 8, color: "#ffeb3b" }}>
          ציון: {competitionItem.score}
        </div>

        <div style={{ marginTop: 12 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRatingChange(star)}
              style={{
                cursor: "pointer",
                fontSize: 20,
                marginRight: 4,
                color: value && value >= star ? "#ff9800" : "#777",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitionCard;
