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
  Rating,
  IconButton,
  Button
} from "@mui/material";
import {
  Person as PersonIcon,
  Star as StarIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/currentUserSlice";
import {
  useUpdateCompetitionRatingMutation,
  useDeleteCompetitionMutation
} from "../competitionsAPI";
import { CompetitionItem } from "../competitionsTypes";

interface Props {
  competitionItem: CompetitionItem;
  onDelete?: (id: string) => void;
}

const CompetitionCard = ({ competitionItem, onDelete }: Props) => {
  const [value, setValue] = useState<number | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "warning" | "error">("success");

  const currentUser = useSelector(selectCurrentUser);
  const [updateCompetitionRating] = useUpdateCompetitionRatingMutation();
  const [deleteCompetition] = useDeleteCompetitionMutation();

  const showSnackbar = (message: string, severity: "success" | "warning" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleRatingChange = async (_: React.SyntheticEvent, newValue: number | null) => {
    if (!newValue) return;

    if (!currentUser) {
      showSnackbar("You must be logged in to rate", "warning");
      return;
    }

    if (currentUser._id === competitionItem.ownerId) {
      showSnackbar("The owner of the competition cannot rank himself", "warning");
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

      showSnackbar("Rating updated successfully", "success");
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Error updating rating";
      if (errorMessage === "User has already rated this competition") {
        showSnackbar("You have already rated this contest. You cannot rate it twice.", "warning");
      } else {
        showSnackbar("Error updating rating. Please try again later.", "error");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCompetition(competitionItem._id).unwrap();
      showSnackbar("התחרות נמחקה בהצלחה", "success");
      onDelete?.(competitionItem._id);
    } catch {
      showSnackbar("שגיאה במחיקת התחרות", "error");
    }
  };

  const renderCommonInfo = () => (
    <>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <PersonIcon sx={{ color: "#4caf50", fontSize: 20 }} />
        <Typography variant="body2" sx={{ color: "#ccc", fontSize: 14 }}>
          {competitionItem.ownerEmail}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <StarIcon sx={{ color: "#ff9800", fontSize: 20 }} />
        <Chip
          label={`ציון: ${competitionItem.rating}`}
          size="small"
          sx={{
            background: "linear-gradient(45deg, #ff9800, #4caf50)",
            color: "white",
            fontWeight: "bold"
          }}
        />
      </Box>
    </>
  );

  if (competitionItem.category === "exams") {
    return (
      <>
        <Card
          sx={{
            maxWidth: 360,
            borderRadius: 4,
            overflow: "hidden",
            background: "rgba(17, 17, 17, 0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 16px 48px rgba(233, 30, 99, 0.2)",
              border: "1px solid rgba(233, 30, 99, 0.3)"
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {renderCommonInfo()}
      {currentUser && currentUser._id === competitionItem.ownerId && (
  <IconButton
    onClick={handleDelete}
    sx={{
      position: "absolute",
      top: 12,
      right: 12, // <-- החלפנו מ-left: 12
      background: "rgba(255,255,255,0.1)",
      "&:hover": {
        background: "rgba(255,255,255,0.2)"
      },
      color: "#f44336"
    }}
  >
    <DeleteIcon />
  </IconButton>
)}

          </CardContent>
        </Card>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ borderRadius: 3, backdropFilter: "blur(10px)" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <>
      <Card
        sx={{
          width: 360,
          height: 500,
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
          overflow: "hidden",
          background: "rgba(17, 17, 17, 0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 16px 48px rgba(233, 30, 99, 0.2)",
            border: "1px solid rgba(233, 30, 99, 0.3)"
          }
        }}
      >
        <Box sx={{ position: "relative", height: 200 }}>
          <CardMedia
            component="img"
            alt="תמונה לתחרות"
            image={competitionItem.fileUrl}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Chip
            label={competitionItem.category}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "linear-gradient(45deg, #e91e63, #ff5722)",
              color: "white",
              fontWeight: "bold",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)"
            }}
          />
          {currentUser && currentUser._id === competitionItem.ownerId && (
            <IconButton
              onClick={handleDelete}
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                background: "rgba(255,255,255,0.1)",
                "&:hover": {
                  background: "rgba(255,255,255,0.2)"
                },
                color: "#f44336"
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>

        <CardContent
          sx={{
            p: 3,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Box>{renderCommonInfo()}</Box>

          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              mt: "auto"
            }}
          >
            <Typography variant="body2" sx={{ color: "#ccc", mb: 1 }}>
              דרג את התחרות:
            </Typography>
            <Rating
              value={value ?? competitionItem.rating ?? 0}
              onChange={handleRatingChange}
              precision={0.5}
              sx={{ color: "#ffd700" }}
            />
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ borderRadius: 3, backdropFilter: "blur(10px)" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CompetitionCard;
