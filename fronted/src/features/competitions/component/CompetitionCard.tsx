// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Snackbar,
//   Alert
// } from "@mui/material";
// import { Rate, Tag } from "antd";
// import { CompetitionItem } from "../competitionsTypes";
// import { useUpdateCompetitionRatingMutation } from "../competitionsAPI";
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "../../auth/currentUserSlice";

// interface Props {
//   competitionItem: CompetitionItem;
// }

// const CompetitionCard = ({ competitionItem }: Props) => {
//   const [value, setValue] = useState<number | null>(null);
//   const [updateCompetitionRating] = useUpdateCompetitionRatingMutation();
//   const currentUser = useSelector(selectCurrentUser);

//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState<
//     "success" | "warning" | "error"
//   >("success");

//   const handleRatingChange = async (newValue: number) => {
//     if (!currentUser) {
//       setSnackbarMessage("עליך להתחבר כדי לדרג");
//       setSnackbarSeverity("warning");
//       setOpenSnackbar(true);
//       return;
//     }

//     if (currentUser._id === competitionItem.ownerId) {
//       setSnackbarMessage("בעל התחרות לא יכול לדרג את עצמו");
//       setSnackbarSeverity("warning");
//       setOpenSnackbar(true);
//       return;
//     }

//     setValue(newValue);

//     try {
//       await updateCompetitionRating({
//         competitionId: competitionItem._id,
//         rating: newValue,
//         userId: currentUser._id,
//         category: competitionItem.category // ✅ הכרחי כדי ש-invalidatesTags יעבוד
//       }).unwrap();

//       setSnackbarMessage("הדירוג עודכן בהצלחה");
//       setSnackbarSeverity("success");
//       setOpenSnackbar(true);
//     } catch (error: any) {
//       const errorMessage = error?.data?.message || "שגיאה בעדכון הדירוג";

//       if (errorMessage === "User has already rated this competition") {
//         setSnackbarMessage("כבר דירגת את התחרות הזו. לא ניתן לדרג פעמיים.");
//         setSnackbarSeverity("warning");
//       } else {
//         setSnackbarMessage("שגיאה בעדכון הדירוג. אנא נסה שוב מאוחר יותר.");
//         setSnackbarSeverity("error");
//       }
//       setOpenSnackbar(true);
//     }
//   };

//   return (
//     <>
//       <Card
//         style={{
//           width: 320,
//           borderRadius: 16,
//           overflow: "hidden",
//           background: "#1f1f1f",
//           border: "1px solid #ffc107",
//           boxShadow: "0 6px 24px rgba(0,0,0,0.4)"
//         }}
//       >
//         <CardMedia
//           component="img"
//           alt="תמונה לתחרות"
//           image={competitionItem.fileUrl}
//           style={{ height: 200, objectFit: "cover" }}
//         />
//         <CardContent>
//           <Typography
//             variant="h6"
//             style={{ color: "#ffc107", fontWeight: "bold", fontSize: "18px" }}
//           >
//             קטגוריה: {competitionItem.category}
//           </Typography>
//           <Typography
//             variant="body2"
//             color="textSecondary"
//             style={{ color: "#ccc", fontSize: "14px" }}
//           >
//             הועלה על ידי: {competitionItem.ownerEmail}
//           </Typography>
//           <br />
//           <Tag color="gold" style={{ marginTop: 8, fontSize: 14 }}>
//             ציון: {competitionItem.rating}
//           </Tag>

//           <div
//             style={{
//               marginTop: 12,
//               backgroundColor: "#2a2a2a",
//               padding: "8px 12px",
//               borderRadius: "8px",
//               display: "inline-block"
//             }}
//           >
//             <Rate
//               allowClear
//               value={value ?? competitionItem.rating ?? 0}
//               onChange={handleRatingChange}
//               style={{ color: "#ffca28", fontSize: 24 }}
//             />
//           </div>
//         </CardContent>
//       </Card>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={() => setOpenSnackbar(false)}
//       >
//         <Alert
//           onClose={() => setOpenSnackbar(false)}
//           severity={snackbarSeverity}
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default CompetitionCard;






import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Snackbar,
  Alert,
  Box,
  Chip,
  Rating
} from "@mui/material";
import { Person as PersonIcon, Star as StarIcon } from '@mui/icons-material';
import { CompetitionItem } from "../competitionsTypes";
import { useUpdateCompetitionRatingMutation } from "../competitionsAPI";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/currentUserSlice";

interface Props {
  competitionItem: CompetitionItem;
}

const CompetitionCard = ({ competitionItem }: Props) => {
  const [value, setValue] = useState<number | null>(null);
  const [updateCompetitionRating] = useUpdateCompetitionRatingMutation();
  const currentUser = useSelector(selectCurrentUser);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "warning" | "error"
  >("success");

  const handleRatingChange = async (event: React.SyntheticEvent, newValue: number | null) => {
    if (!newValue) return;
    
    if (!currentUser) {
      setSnackbarMessage("עליך להתחבר כדי לדרג");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    if (currentUser._id === competitionItem.ownerId) {
      setSnackbarMessage("בעל התחרות לא יכול לדרג את עצמו");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    setValue(newValue);

    try {
      await updateCompetitionRating({
        competitionId: competitionItem._id,
        rating: newValue,
        userId: currentUser._id,
        category: competitionItem.category
      }).unwrap();

      setSnackbarMessage("הדירוג עודכן בהצלחה");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error: any) {
      const errorMessage = error?.data?.message || "שגיאה בעדכון הדירוג";

      if (errorMessage === "User has already rated this competition") {
        setSnackbarMessage("כבר דירגת את התחרות הזו. לא ניתן לדרג פעמיים.");
        setSnackbarSeverity("warning");
      } else {
        setSnackbarMessage("שגיאה בעדכון הדירוג. אנא נסה שוב מאוחר יותר.");
        setSnackbarSeverity("error");
      }
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 360,
          borderRadius: 4,
          overflow: "hidden",
          background: 'rgba(17, 17, 17, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 16px 48px rgba(233, 30, 99, 0.2)',
            border: '1px solid rgba(233, 30, 99, 0.3)'
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            alt="תמונה לתחרות"
            image={competitionItem.fileUrl}
            sx={{ 
              height: 240, 
              objectFit: "cover",
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))'
              }
            }}
          />
          
          <Chip
            label={competitionItem.category}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'linear-gradient(45deg, #e91e63, #ff5722)',
              color: 'white',
              fontWeight: 'bold',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
            }}
          />
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <PersonIcon sx={{ color: '#4caf50', fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{ 
                color: '#ccc',
                fontSize: 14
              }}
            >
              {competitionItem.ownerEmail}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <StarIcon sx={{ color: '#ff9800', fontSize: 20 }} />
              <Chip
                label={`ציון: ${competitionItem.rating}`}
                size="small"
                sx={{
                  background: 'linear-gradient(45deg, #ff9800, #4caf50)',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
              דרג את התחרות:
            </Typography>
            <Rating
              value={value ?? competitionItem.rating ?? 0}
              onChange={handleRatingChange}
              precision={1}
              size="large"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#ff9800',
                },
                '& .MuiRating-iconHover': {
                  color: '#ff6f00',
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ 
            borderRadius: 3,
            backdropFilter: 'blur(10px)'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CompetitionCard;
