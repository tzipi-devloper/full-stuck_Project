// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   useGetCompetitionByCategoryQuery,
//   useGetLeadCompetitionsByCategoryQuery,
// } from '../competitionsAPI';
// import CompetitionCard from './CompetitionCard';
// import TopCompetitions from './LeadCompetitions';
// import UploadCompetitionPopup from './UploadCompetitionPopup';
// import { CompetitionItem } from '../competitionsTypes';

// const CompetitionList = () => {
//   const { competitionID } = useParams();
//   const {
//     data,
//     error,
//     isLoading,
//     refetch,
//   } = useGetCompetitionByCategoryQuery(competitionID || '');
//   const {
//     data: topCompetitions,
//     isLoading: isTopLoading,
//   } = useGetLeadCompetitionsByCategoryQuery(competitionID || '');

//   const [selectedCompetition, setSelectedCompetition] = useState<CompetitionItem | null>(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const handleUploadSuccess = () => {
//     setIsPopupOpen(false);
//     refetch(); // כדי לטעון מחדש את התחרויות לאחר העלאה מוצלחת
//   };

//   const handleMouseEnter = (competition: CompetitionItem) => {
//     setSelectedCompetition(competition); // עדכון המוביל ברגע של הריחוף
//   };

//   const handleMouseLeave = () => {
//     setSelectedCompetition(null); 
//   };

//   if (isLoading || isTopLoading) return <p>טוען נתונים...</p>;
//   if (error) return <p>שגיאה בשליפת נתונים</p>;

//   return (
//     <div style={{ padding: '24px' }}>
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '24px',
//         }}
//       >
//         <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
//           תחרויות בקטגוריה: {competitionID}
//         </h2>
//         <button
//           onClick={() => setIsPopupOpen(true)}
//           style={{
//             backgroundColor: '#ffc107',
//             color: '#000',
//             fontWeight: 'bold',
//             padding: '10px 20px',
//             borderRadius: '9999px',
//             cursor: 'pointer',
//             transition: 'background-color 0.3s',
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ffca28')}
//           onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffc107')}
//         >
//           הוסף תחרות
//         </button>
//       </div>

//       {/* תחרויות מובילות */}
//       <TopCompetitions
//         topCompetitions={topCompetitions || []}
//         onSelect={(competition) => setSelectedCompetition(competition)}
//         onMouseEnter={handleMouseEnter} // כאשר מרחפים מעל התחרות
//         onMouseLeave={handleMouseLeave} // כאשר עוזבים את הריחוף
//       />

//       {/* כל התחרויות */}
//       <div
//         style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           gap: '24px',
//           justifyContent: 'center',
//         }}
//       >
//         {data?.map((competitionItem: CompetitionItem) => (
//           <CompetitionCard key={competitionItem._id} competitionItem={competitionItem} />
//         ))}
//       </div>

//       {/* תחרות נבחרת מוקפצת */}
//       {selectedCompetition && (
//         <div
//           style={{
//             position: 'absolute', // שינוי מ fixed ל absolute כדי למנוע רעידה
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             zIndex: 1000,
//             opacity: selectedCompetition ? 1 : 0, // בשיטה זו הכרטיס לא רועד
//             transition: 'opacity 0.3s ease',
//             pointerEvents: 'none', // זה מונע שיתפוס את הקלט וייווצר רעש
//           }}
//         >
//           <CompetitionCard competitionItem={selectedCompetition} />
//         </div>
//       )}

//       {isPopupOpen && (
//         <UploadCompetitionPopup
//           onClose={() => setIsPopupOpen(false)}
//           onSuccess={handleUploadSuccess}
//         />
//       )}
//     </div>
//   );
// };

// export default CompetitionList;



// CompetitionList.tsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import {
  useGetCompetitionByCategoryQuery,
  useGetLeadCompetitionsByCategoryQuery,
} from '../competitionsAPI';
import CompetitionCard from './CompetitionCard';
import TopCompetitions from './LeadCompetitions';
import UploadCompetitionPopup from './UploadCompetitionPopup';
import { CompetitionItem } from '../competitionsTypes';

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


      <Box
        sx={{
          position: 'fixed', 
          top: 80,
          right: 20,
          zIndex: 1000 
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
    </Container>
  );
};

export default CompetitionList;

