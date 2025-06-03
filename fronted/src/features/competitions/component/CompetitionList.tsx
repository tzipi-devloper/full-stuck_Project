import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  useGetCompetitionByCategoryQuery,
  useGetLeadCompetitionsByCategoryQuery,
} from '../competitionsAPI';
import CompetitionCard from './CompetitionCard';
import TopCompetitions from './LeadCompetitions';
import { CompetitionItem } from '../competitionsTypes';
import Grid from '@mui/material/Grid';
function CompetitionList() {
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
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <Box
        sx={{
          position: 'fixed',
          left: 20,
          top: 20,
          zIndex: 100,
          background: 'linear-gradient(135deg, #4caf50, #e91e63, #ff5722)',
          color: 'white',
          padding: '16px 28px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '12px',
            zIndex: -1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: -1,
            left: -1,
            right: -1,
            bottom: -1,
            borderRadius: '13px',
            background: 'linear-gradient(135deg, #e91e63, #ff5722)',
            zIndex: -2,
            filter: 'blur(1px)',
          }
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mt: 6.5,
            fontWeight: 700,
            fontSize: '15px',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap',
            background: 'white',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
          }}
        >
          {competitionID}
        </Typography>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <TopCompetitions
          topCompetitions={topCompetitions || []}
          onSelect={(competition: CompetitionItem) => setSelectedCompetition(competition)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        <Box sx={{ mt: 4 }}>
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
    </Box>
  );
}

export default CompetitionList;
