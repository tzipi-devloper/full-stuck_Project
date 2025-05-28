
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
  Modal
} from '@mui/material';
import { Add as AddIcon, School as SchoolIcon } from '@mui/icons-material';
import {
  useGetCompetitionByCategoryQuery,
  useGetLeadCompetitionsByCategoryQuery,
} from '../competitionsAPI';
import CompetitionCard from './CompetitionCard';
import TopCompetitions from './LeadCompetitions';
import UploadCompetitionPopup from './UploadCompetitionPopup';
import { CompetitionItem } from '../competitionsTypes';
import Quiz from '../../quiz/Quiz'; 

const CompetitionList = () => {
  const { competitionID } = useParams();

  const {
    data,
    error,
    isLoading,
    refetch,
  } = useGetCompetitionByCategoryQuery(competitionID || '');
  const {
    data: topCompetitions,
    isLoading: isTopLoading,
  } = useGetLeadCompetitionsByCategoryQuery(competitionID || '');

  const [selectedCompetition, setSelectedCompetition] = useState<CompetitionItem | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false); 
  const handleUploadSuccess = () => {
    setIsPopupOpen(false);
    refetch();
  };

  const handleMouseEnter = (competition: CompetitionItem) => {
    setSelectedCompetition(competition);
  };

  const handleMouseLeave = () => {
    setSelectedCompetition(null);
  };

  if (isLoading || isTopLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
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
          zIndex: 1000
        }}
      >
        {competitionID === 'exams' ? (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SchoolIcon />}
            onClick={() => setIsQuizOpen(true)} 
            sx={{
              background: 'linear-gradient(45deg, #4caf50, #2196f3)',
              borderRadius: 8,
              px: 3,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 20px rgba(33, 150, 243, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976d2, #1565c0)',
                boxShadow: '0 6px 25px rgba(33, 150, 243, 0.4)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            התחל חידון
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsPopupOpen(true)}
            sx={{
              background: 'linear-gradient(45deg, #e91e63, #ff5722)',
              borderRadius: 8,
              px: 3,
              py: 1.5,
              fontSize: '1.1rem',
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
        )}
      </Box>

      <TopCompetitions
        topCompetitions={topCompetitions || []}
        onSelect={(competition) => setSelectedCompetition(competition)}
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
          {data?.map((competitionItem: CompetitionItem) => (
            <Grid  item xs={12} sm={6} md={4} lg={3} key={competitionItem._id}>
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

      {/* ✅ פופאפ Quiz */}
      <Modal open={isQuizOpen} onClose={() => setIsQuizOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            p: 4,
            width: '90%',
            maxWidth: 800,
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <Quiz />
        </Box>
      </Modal>
    </Container>
  );
};

export default CompetitionList;
