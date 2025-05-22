// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "../../auth/currentUserSlice";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
//   Box,
//   Typography,
//   Snackbar,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { useCreateCompetitionMutation } from "../competitionsAPI";

// interface Props {
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const UploadCompetitionPopup = ({ onClose, onSuccess }: Props) => {
//   const { competitionID } = useParams();
//   const [uploadCompetition, { isLoading }] = useCreateCompetitionMutation();
//   const currentUser = useSelector(selectCurrentUser);

//   const [file, setFile] = useState<File | null>(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       setFile(e.target.files[0]);
//       setErrorMessage("");
//     }
//   };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (!file) {
//     setErrorMessage("בחר תמונה");
//     return;
//   }

//   if (!currentUser || !currentUser._id || !currentUser.email) {
//     setErrorMessage("שגיאה: המשתמש לא מחובר.");
//     return;
//   }

//   const data = new FormData();
//   data.append("category", competitionID || "pictures");
//   data.append("image", file);
//   data.append("ownerId", currentUser._id); 
//   data.append("ownerEmail", currentUser.email);

//   try {
//     await uploadCompetition(data).unwrap();
//     setOpenSnackbar(true);
//     onSuccess();
//     setFile(null);
//   } catch (err) {
//     console.error(err);
//     setErrorMessage("שגיאה בהעלאה");
//   }
// };


//   return (
//     <>
//       <Dialog open onClose={onClose} fullWidth maxWidth="sm">
//         <DialogTitle
//           sx={{
//             backgroundColor: "#2d2d2d",
//             textAlign: "center",
//             fontWeight: "bold",
//             color: "#fff",
//             borderRadius: "16px 16px 0 0",
//             padding: 3,
//             boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
//           }}
//         >
//           העלאת תחרות
//         </DialogTitle>

//         <DialogContent
//           sx={{
//             backgroundColor: "#333",
//             borderRadius: "0 0 16px 16px",
//             padding: 4,
//           }}
//         >
//           <Box
//             sx={{
//               backgroundColor: "#444",
//               padding: 3,
//               borderRadius: "12px",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{
//                 color: "#ffca28",
//                 marginBottom: 2,
//                 fontWeight: "bold",
//               }}
//             >
//               בחר תמונה:
//             </Typography>

//             <Box
//               component="label"
//               htmlFor="file-upload"
//               sx={{
//                 display: "inline-block",
//                 backgroundColor: file ? "#777" : "#555",
//                 color: "#fff",
//                 padding: "12px 24px",
//                 borderRadius: "10px",
//                 textAlign: "center",
//                 border: "2px dashed #ffca28",
//                 cursor: file ? "not-allowed" : "pointer",
//                 transition: "0.3s",
//                 fontWeight: "bold",
//                 fontSize: "16px",
//               }}
//             >
//               {file ? "✓ קובץ נבחר" : "לחץ לבחירת קובץ"}
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 disabled={!!file}
//                 style={{ display: "none" }}
//               />
//             </Box>

//             {file && (
//               <Typography
//                 sx={{ color: "#ccc", fontSize: "14px", mt: 1 }}
//               >
//                 {file.name}
//               </Typography>
//             )}

//             {errorMessage && (
//               <Typography sx={{ color: "red", mt: 2, fontSize: "14px" }}>
//                 {errorMessage}
//               </Typography>
//             )}
//           </Box>
//         </DialogContent>

//         <DialogActions sx={{ backgroundColor: "#2d2d2d", padding: 2 }}>
//           <Button
//             onClick={onClose}
//             variant="outlined"
//             color="secondary"
//             sx={{
//               textTransform: "none",
//               color: "#fff",
//               borderColor: "#ffca28",
//               borderRadius: "12px",
//               padding: "8px 16px",
//             }}
//           >
//             ביטול
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             disabled={isLoading || !file}
//             sx={{
//               textTransform: "none",
//               backgroundColor: "#ffca28",
//               color: "#2d2d2d",
//               borderRadius: "12px",
//               padding: "8px 16px",
//               "&:hover": { backgroundColor: "#ffb300" },
//             }}
//           >
//             {isLoading ? <CircularProgress size={24} color="inherit" /> : "שלח"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={() => setOpenSnackbar(false)}
//       >
//         <Alert
//           onClose={() => setOpenSnackbar(false)}
//           severity="success"
//           sx={{ width: "100%", borderRadius: "8px" }}
//         >
//           התחרות הועלתה בהצלחה!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };
// export default UploadCompetitionPopup;




import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/currentUserSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Paper
} from "@mui/material";
import { CloudUpload as UploadIcon, Close as CloseIcon } from '@mui/icons-material';
import { useParams } from "react-router-dom";
import { useCreateCompetitionMutation } from "../competitionsAPI";
import { useState } from "react";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const UploadCompetitionPopup = ({ onClose, onSuccess }: Props) => {
  const { competitionID } = useParams();
  const [uploadCompetition, { isLoading }] = useCreateCompetitionMutation();
  const currentUser = useSelector(selectCurrentUser);

  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage("בחר תמונה");
      return;
    }

    if (!currentUser || !currentUser._id || !currentUser.email) {
      setErrorMessage("שגיאה: המשתמש לא מחובר.");
      return;
    }

    const data = new FormData();
    data.append("category", competitionID || "pictures");
    data.append("image", file);
    data.append("ownerId", currentUser._id);
    data.append("ownerEmail", currentUser.email);

    try {
      await uploadCompetition(data).unwrap();
      setOpenSnackbar(true);
      onSuccess();
      setFile(null);
    } catch (err) {
      console.error(err);
      setErrorMessage("שגיאה בהעלאה");
    }
  };

  return (
    <>
      <Dialog 
        open 
        onClose={onClose} 
        fullWidth 
        maxWidth="sm"
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 4,
            background: 'rgba(17, 17, 17, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
          }
        }}
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, #e91e63, #2196f3)',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            position: 'relative'
          }}
        >
          העלאת תחרות
          <Button
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              minWidth: 'auto',
              p: 1
            }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                background: 'linear-gradient(45deg, #ff9800, #4caf50)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                mb: 3
              }}
            >
              בחר תמונה להעלאה
            </Typography>

            <Box
              component="label"
              htmlFor="file-upload"
              sx={{
                display: 'block',
                p: 4,
                borderRadius: 3,
                border: '2px dashed',
                borderColor: file ? '#4caf50' : 'rgba(255, 255, 255, 0.3)',
                background: file 
                  ? 'linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(33, 150, 243, 0.1))'
                  : 'rgba(255, 255, 255, 0.02)',
                cursor: file ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': !file ? {
                  borderColor: 'rgba(233, 30, 99, 0.5)',
                  background: 'rgba(233, 30, 99, 0.05)'
                } : {}
              }}
            >
              <UploadIcon 
                sx={{ 
                  fontSize: 48, 
                  color: file ? '#4caf50' : '#ccc',
                  mb: 2
                }} 
              />
              <Typography
                variant="h6"
                sx={{
                  color: file ? '#4caf50' : '#ccc',
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                {file ? "✓ קובץ נבחר בהצלחה" : "לחץ לבחירת קובץ"}
              </Typography>
              
              {file && (
                <Typography sx={{ color: '#ccc', fontSize: 14 }}>
                  {file.name}
                </Typography>
              )}
              
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={!!file}
                style={{ display: "none" }}
              />
            </Box>

            {errorMessage && (
              <Alert 
                severity="error" 
                sx={{ 
                  mt: 2, 
                  borderRadius: 2,
                  background: 'rgba(244, 67, 54, 0.1)',
                  border: '1px solid rgba(244, 67, 54, 0.3)'
                }}
              >
                {errorMessage}
              </Alert>
            )}
          </Paper>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1,
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: '#ccc',
              '&:hover': {
                borderColor: 'rgba(244, 67, 54, 0.5)',
                color: '#f44336'
              }
            }}
          >
            ביטול
          </Button>
          
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isLoading || !file}
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1,
              background: 'linear-gradient(45deg, #4caf50, #2196f3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #388e3c, #1976d2)',
              },
              '&:disabled': {
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "שלח"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ 
            borderRadius: 3,
            background: 'rgba(76, 175, 80, 0.9)',
            backdropFilter: 'blur(10px)'
          }}
        >
          התחרות הועלתה בהצלחה!
        </Alert>
      </Snackbar>
    </>
  );
};

export default UploadCompetitionPopup;