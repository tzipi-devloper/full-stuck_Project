import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  useGetCompetitionByCategoryQuery,
  useGetLeadCompetitionsByCategoryQuery,
} from '../competitionsAPI'; 
import CompetitionCard from './CompetitionCard';
import TopCompetitions from './LeadCompetitions';
import { CompetitionItem } from '../competitionsTypes'; 
const CompetitionList: React.FC = () => {
  const { competitionID } = useParams<{ competitionID: string }>(); 
  const {
    data, 
    error, 
    isLoading,
  } = useGetCompetitionByCategoryQuery(competitionID || '');

  const {
    data: topCompetitions, 
    isLoading: isTopLoading,
  } = useGetLeadCompetitionsByCategoryQuery(competitionID || '');

  const [selectedCompetition, setSelectedCompetition] = useState<CompetitionItem | null>(null);
 
  const handleMouseEnter = (competition: CompetitionItem): void => {
    setSelectedCompetition(competition);
  };

  const handleMouseLeave = (): void => {
    setSelectedCompetition(null);
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
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          שגיאה בשליפת נתונים
        </Alert>
      </Container>
    );
  }
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      
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
        topCompetitions={topCompetitions || []} 
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
          {data?.map((competitionItem: CompetitionItem) => ( 
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
    </Container>
  );
};
export default CompetitionList;