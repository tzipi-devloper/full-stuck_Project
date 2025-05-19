// import { useState } from "react";
// import { CompetitionItem } from "../competitionsTypes";

// interface Props {
//   competitionItem: CompetitionItem;
// }
// const CompetitionCard = ({ competitionItem }: Props) => {
//   const [value, setValue] = useState<number | null>(null);
//   const handleRatingChange = (newValue: number) => {
//     setValue(newValue);
//   };
//   return (
//     <div
//       style={{
//         width: 300,
//         backgroundColor: "#1f1f1f",
//         color: "#fff",
//         borderRadius: 16,
//         overflow: "hidden",
//         boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
//         border: "1px solid #ffc107",
//         transition: "transform 0.3s",
//       }}
//     >
//       <div style={{ position: "relative" }}>
//         <img
//           src={competitionItem.file}
//           alt="תמונה לתחרות"
//           style={{
//             width: "100%",
//             height: 200,
//             objectFit: "cover",
//           }}
//         />
//       </div>

//       <div style={{ padding: 16 }}>
//         <div
//           style={{
//             fontWeight: "bold",
//             fontSize: "18px",
//             color: "#ffc107",
//             marginBottom: 4,
//           }}
//         >
//           קטגוריה: {competitionItem.category}
//         </div>
//         <div style={{ fontSize: "14px", color: "#ccc" }}>
//           הועלה על ידי: {competitionItem.ownerEmail}
//         </div>
//         <div style={{ fontSize: "16px", marginTop: 8, color: "#ffeb3b" }}>
//           ציון: {competitionItem.score}
//         </div>

//         <div style={{ marginTop: 12 }}>
//           {[1, 2, 3, 4, 5].map((star) => (
//             <span
//               key={star}
//               onClick={() => handleRatingChange(star)}
//               style={{
//                 cursor: "pointer",
//                 fontSize: 20,
//                 marginRight: 4,
//                 color: value && value >= star ? "#ff9800" : "#777",
//               }}
//             >
//               ★
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompetitionCard;


// import { useState } from "react";
// import { CompetitionItem } from "../competitionsTypes";
// import { useUpdateCompetitionRatingMutation } from '../competitionsAPI';
// interface Props {
//   competitionItem: CompetitionItem;
// }
// const CompetitionCard = ({ competitionItem }: Props) => {
//   const [value, setValue] = useState<number | null>(null);
//   const [isRated, setIsRated] = useState(false); // מצב חדש כדי לבדוק אם הציון שונה
//   const [updateCompetitionRating] = useUpdateCompetitionRatingMutation();
//   const handleRatingChange = (newValue: number) => {
//     if (!isRated) { 
//       setValue(newValue);
//       setIsRated(true); // עדכון המצב לדירוג
//     }
//   };

//   return (
//     <div
//       style={{
//         width: 300,
//         backgroundColor: "#1f1f1f",
//         color: "#fff",
//         borderRadius: 16,
//         overflow: "hidden",
//         boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
//         border: "1px solid #ffc107",
//         transition: "transform 0.3s",
//       }}
//     >
//       <div style={{ position: "relative" }}>
//         <img
//           src={competitionItem.file}
//           alt="תמונה לתחרות"
//           style={{
//             width: "100%",
//             height: 200,
//             objectFit: "cover",
//           }}
//         />
//       </div>

//       <div style={{ padding: 16 }}>
//         <div
//           style={{
//             fontWeight: "bold",
//             fontSize: "18px",
//             color: "#ffc107",
//             marginBottom: 4,
//           }}
//         >
//           קטגוריה: {competitionItem.category}
//         </div>
//         <div style={{ fontSize: "14px", color: "#ccc" }}>
//           הועלה על ידי: {competitionItem.ownerEmail}
//         </div>
//         <div style={{ fontSize: "16px", marginTop: 8, color: "#ffeb3b" }}>
//           ציון: {value !== null ? value : competitionItem.score}
//         </div>

//         <div style={{ marginTop: 12 }}>
//           {[1, 2, 3, 4, 5].map((star) => (
//             <span
//               key={star}
//               onClick={() => handleRatingChange(star)}
//               style={{
//                 cursor: isRated ? "not-allowed" : "pointer", 
//                 fontSize: 20,
//                 marginRight: 4,
//                 color: value && value >= star ? "#ff9800" : "#777",
//               }}
//             >
//               ★
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompetitionCard;
// import { useState } from "react";
// import { CompetitionItem } from "../competitionsTypes";
// import { useUpdateCompetitionRatingMutation } from '../competitionsAPI';
// import { useSelector } from 'react-redux';
// import { selectCurrentUser } from '../../auth/currentUserSlice'; // עדכן את הנתיב לפי הצורך

// interface Props {
//   competitionItem: CompetitionItem;
// }

// const CompetitionCard = ({ competitionItem }: Props) => {
//   const [value, setValue] = useState<number | null>(null);
//   const currentUser = useSelector(selectCurrentUser);
//   const [updateCompetitionRating] = useUpdateCompetitionRatingMutation();

//   const handleRatingChange = async (newValue: number) => {
//     if (currentUser?._id === competitionItem.ownerId) {
//       alert('לא ניתן לעדכן דירוג, כמשתמש הבעלים של התמונה, אינך יכול לעדכן את הדירוג.');
//       return;
//     }

//     setValue(newValue);
//     try {
//       await updateCompetitionRating({ competitionId: competitionItem._id, rating: newValue });
//       alert(`הדירוג שלך לתחרות "${competitionItem._id}" עודכן ל-${newValue}.`);
//     } catch (error) {
//       console.error('Error updating rating:', error);
//       alert('שגיאה בעדכון הדירוג. אנא נסה שוב מאוחר יותר.');
//     }
//   };

//   return (
//     <div
//       style={{
//         width: 300,
//         backgroundColor: "#1f1f1f",
//         color: "#fff",
//         borderRadius: 16,
//         overflow: "hidden",
//         boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
//         border: "1px solid #ffc107",
//         transition: "transform 0.3s",
//       }}
//     >
//       <div style={{ position: "relative" }}>
//         <img
//           src={competitionItem.file}
//           alt="תמונה לתחרות"
//           style={{
//             width: "100%",
//             height: 200,
//             objectFit: "cover",
//           }}
//         />
//       </div>

//       <div style={{ padding: 16 }}>
//         <div
//           style={{
//             fontWeight: "bold",
//             fontSize: "18px",
//             color: "#ffc107",
//             marginBottom: 4,
//           }}
//         >
//           קטגוריה: {competitionItem.category}
//         </div>
//         <div style={{ fontSize: "14px", color: "#ccc" }}>
//           הועלה על ידי: {competitionItem.ownerEmail}
//         </div>
//         <div style={{ fontSize: "16px", marginTop: 8, color: "#ffeb3b" }}>
//           ציון: {value !== null ? value : competitionItem.rating}
//         </div>

//         <div style={{ marginTop: 12 }}>
//           {[1, 2, 3, 4, 5].map((star) => (
//             <span
//               key={star}
//               onClick={() => handleRatingChange(star)}
//               style={{
//                 cursor: currentUser?._id === competitionItem.ownerId ? "not-allowed" : "pointer",
//                 fontSize: 20,
//                 marginRight: 4,
//                 color: value && value >= star ? "#ff9800" : "#777",
//               }}
//             >
//               ★
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompetitionCard;
import { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Snackbar, Alert } from "@mui/material";
import { Rate, Tag } from "antd"; 
import { CompetitionItem } from "../competitionsTypes";
import { useUpdateCompetitionRatingMutation } from '../competitionsAPI';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../auth/currentUserSlice';

interface Props {
  competitionItem: CompetitionItem;
}

const CompetitionCard = ({ competitionItem }: Props) => {
  const [value, setValue] = useState<number | null>(null);
  const [updateCompetitionRating] = useUpdateCompetitionRatingMutation();
  const currentUser = useSelector(selectCurrentUser);
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'warning' | 'error'>('success');

  const handleRatingChange = async (newValue: number) => {
    if (!currentUser) {
      setSnackbarMessage('עליך להתחבר כדי לדרג');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    if (currentUser._id === competitionItem.ownerId) {
      setSnackbarMessage('בעל התחרות לא יכול לדרג את עצמו');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    setValue(newValue);
    try {
      await updateCompetitionRating({ competitionId: competitionItem._id, rating: newValue });
    } catch (error) {
      console.error('Error updating rating:', error);
      setSnackbarMessage('שגיאה בעדכון הדירוג. אנא נסה שוב מאוחר יותר.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Card
        style={{
          width: 320,
          borderRadius: 16,
          overflow: "hidden",
          background: "#1f1f1f",
          border: "1px solid #ffc107",
          boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
        }}
      >
        <CardMedia
          component="img"
          alt="תמונה לתחרות"
          image={competitionItem.file}
          style={{
            height: 200,
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography variant="h6" style={{ color: "#ffc107", fontWeight: "bold", fontSize: "18px" }}>
            קטגוריה: {competitionItem.category}
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ color: "#ccc", fontSize: "14px" }}>
            הועלה על ידי: {competitionItem.ownerEmail}
          </Typography>
          <br />
          <Tag color="gold" style={{ marginTop: 8, fontSize: 14 }}>
            ציון: {competitionItem.rating}
          </Tag>

          <div
            style={{
              marginTop: 12,
              backgroundColor: "#2a2a2a",
              padding: "8px 12px",
              borderRadius: "8px",
              display: "inline-block",
            }}
          >
            <Rate
              allowClear
              value={value ?? competitionItem.rating ?? 0}
              onChange={handleRatingChange}
              style={{
                color: "#ffca28",
                fontSize: 24,
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CompetitionCard;