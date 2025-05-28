
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  CircularProgress,
  Alert,
  IconButton,
  Paper,
} from '@mui/material';
import { Add as AddIcon, Chat as ChatIcon, Close as CloseIcon } from '@mui/icons-material';
import {
  useGetCompetitionByCategoryQuery,
  useGetLeadCompetitionsByCategoryQuery,
} from '../competitionsAPI'; // ודא שה-API hooks מחזירים טיפוסים מתאימים או השתמש ב-any לפי הצורך
import CompetitionCard from './CompetitionCard';
import TopCompetitions from './LeadCompetitions';
import UploadCompetitionPopup from './UploadCompetitionPopup';
import Chat from '../../chat/Chat';
import { CompetitionItem } from '../competitionsTypes'; // ודא שטיפוס זה מיובא ומוגדר כראוי
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../auth/currentUserSlice'; // ודא שהסלקטור מחזיר טיפוס מתאים

// הגדרת טיפוס בסיסי למשתמש, התאם אותו למבנה האמיתי בפרויקט שלך
interface CurrentUser {
  id: string; // דוגמה
  name: string; // דוגמה
  rooms?: string[]; // חשוב עבור הלוגיקה של הצ'אט
  // הוסף כאן עוד מאפיינים של המשתמש לפי הצורך
}

// (אופציונלי) טיפוסים לשגיאות מ-RTK Query אם תרצה דיוק גבוה יותר
// import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { SerializedError } from '@reduxjs/toolkit';

const CompetitionList: React.FC = () => {
  const { competitionID } = useParams<{ competitionID: string }>(); // competitionID יהיה string כאן
                                                                  // אם הוא יכול להיות undefined מהראוטר, שקול להשתמש ב:
                                                                  // const { competitionID } = useParams<{ competitionID?: string }>();
                                                                  // ואז להתמודד עם undefined בהתאם. השימוש ב- `competitionID || ''` מטפל בזה.

  const user = useSelector(selectCurrentUser) as CurrentUser | null; // המרה לטיפוס CurrentUser או null

  const {
    data, // הטיפוס יהיה CompetitionItem[] | undefined
    error, // הטיפוס יכול להיות FetchBaseQueryError | SerializedError | any | undefined
    isLoading,
    refetch,
  } = useGetCompetitionByCategoryQuery(competitionID || ''); // competitionID כאן לא יהיה undefined בזכות useParams

  const {
    data: topCompetitions, // הטיפוס יהיה CompetitionItem[] | undefined
    isLoading: isTopLoading,
  } = useGetLeadCompetitionsByCategoryQuery(competitionID || '');

  const [selectedCompetition, setSelectedCompetition] = useState<CompetitionItem | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [showChatPopup, setShowChatPopup] = useState<boolean>(false);

  const handleUploadSuccess = (): void => {
    setIsPopupOpen(false);
    refetch();
  };

  const handleMouseEnter = (competition: CompetitionItem): void => {
    setSelectedCompetition(competition);
  };

  const handleMouseLeave = (): void => {
    setSelectedCompetition(null);
  };

  const handleEnterChat = (): void => {
    if (!user) {
      alert('אנא התחבר כדי להיכנס לצ׳אט');
      return;
    }

    const currentCompetitionID = competitionID || '';
    if (!user.rooms || !user.rooms.includes(currentCompetitionID)) {
      alert('אין לך גישה לחדר הצ׳אט הזה');
      return;
    }
    setShowChatPopup(true);
  };

  if (isLoading || isTopLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress
          size={60}
          sx={{
            color: 'transparent',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #e91e63, #ff5722, #ff9800, #4caf50, #2196f3)',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 4px))',
              animation: 'spin 1s linear infinite'
            }
          }}
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* ניתן להציג הודעת שגיאה מפורטת יותר אם error מכיל מידע כזה */}
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          שגיאה בשליפת נתונים
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          position: 'fixed',
          top: 80,
          right: 20,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsPopupOpen(true)}
          sx={{
            background: 'linear-gradient(45deg, #e91e63, #ff5722)',
            borderRadius: 8,
            px: 3,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 20px rgba(233, 30, 99, 0.3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #ad1457, #d84315)',
              boxShadow: '0 6px 25px rgba(233, 30, 99, 0.4)',
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          הוסף תחרות
        </Button>

        <Button
          variant="contained"
          startIcon={<ChatIcon />}
          onClick={handleEnterChat}
          sx={{
            background: 'linear-gradient(45deg, #4caf50, #2196f3)',
            borderRadius: 8,
            px: 3,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold',
            color: 'white',
            boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #388e3c, #1976d2)',
              boxShadow: '0 6px 25px rgba(76, 175, 80, 0.4)',
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          כניסה לצ׳אט
        </Button>
      </Box>

      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          mb: 4,
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #ffc107, #ff9800)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        תחרויות בקטגוריה: {competitionID}
      </Typography>

      <TopCompetitions
        topCompetitions={topCompetitions || []} // data הוא CompetitionItem[] | undefined
        onSelect={(competition: CompetitionItem) => setSelectedCompetition(competition)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #ff9800, #4caf50)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          כל התחרויות
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {data?.map((competitionItem: CompetitionItem) => ( // data הוא CompetitionItem[] | undefined
            <Grid item xs={12} sm={6} md={4} lg={3} key={competitionItem._id}>
              <CompetitionCard competitionItem={competitionItem} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {selectedCompetition && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            opacity: selectedCompetition ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            '& > div': {
              transform: 'scale(1.05)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }
          }}
        >
          <CompetitionCard competitionItem={selectedCompetition} />
        </Box>
      )}

      {isPopupOpen && (
        <UploadCompetitionPopup
          onClose={() => setIsPopupOpen(false)}
          onSuccess={handleUploadSuccess}
        />
      )}

      {showChatPopup && (
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '450px' },
            height: '600px',
            borderRadius: '12px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={() => setShowChatPopup(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
            <Chat category={competitionID || ''} onClose={() => setShowChatPopup(false)} />
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default CompetitionList;