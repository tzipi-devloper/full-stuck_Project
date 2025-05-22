// import { CompetitionItem } from '../competitionsTypes';

// interface Props {
//   topCompetitions: CompetitionItem[];
//   onSelect: (competition: CompetitionItem) => void;
//   onMouseEnter: (competition: CompetitionItem) => void;
//   onMouseLeave: () => void;
// }

// const TopCompetitions = ({ topCompetitions, onSelect, onMouseEnter, onMouseLeave }: Props) => {
//   return (
//     <div>
//       <div>המובילים שלנו</div>
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
//         {topCompetitions.map((competition, index) => (
//           <div
//             key={competition._id}
//             onClick={() => onSelect(competition)}
//             onMouseEnter={() => onMouseEnter(competition)}
//             onMouseLeave={onMouseLeave}
//             style={{
//               width: 100,
//               height: 100,
//               borderRadius: '50%',
//               backgroundImage: `url(${competition.fileUrl})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//               border: '3px solid gold',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontWeight: 'bold',
//               color: '#fff',
//               fontSize: 18,
//               position: 'relative',
//               transition: 'transform 0.3s ease',
//             }}
//           >
//             {index + 1}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopCompetitions;


import { Box, Typography, Avatar, Chip } from '@mui/material';
import { EmojiEvents as TrophyIcon } from '@mui/icons-material';
import { CompetitionItem } from '../competitionsTypes';

interface Props {
  topCompetitions: CompetitionItem[];
  onSelect: (competition: CompetitionItem) => void;
  onMouseEnter: (competition: CompetitionItem) => void;
  onMouseLeave: () => void;
}

const TopCompetitions = ({ topCompetitions, onSelect, onMouseEnter, onMouseLeave }: Props) => {
  const gradients = [
    'linear-gradient(45deg, #e91e63, #ff5722)', // 1st place
    'linear-gradient(45deg, #ff5722, #ff9800)', // 2nd place
    'linear-gradient(45deg, #ff9800, #4caf50)', // 3rd place
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
        mb={3}
      >
        <TrophyIcon sx={{ color: '#ff9800', fontSize: 32 }} />
        <Typography
          variant="h5"
          sx={{
            background: 'linear-gradient(45deg, #e91e63, #2196f3)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          המובילים שלנו
        </Typography>
        <TrophyIcon sx={{ color: '#ff9800', fontSize: 32 }} />
      </Box>
      
      <Box
        display="flex"
        justifyContent="center"
        gap={3}
        flexWrap="wrap"
      >
        {topCompetitions.slice(0, 3).map((competition, index) => (
          <Box
            key={competition._id}
            onClick={() => onSelect(competition)}
            onMouseEnter={() => onMouseEnter(competition)}
            onMouseLeave={onMouseLeave}
            sx={{
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.05)',
              }
            }}
          >
            <Avatar
              src={competition.fileUrl}
              sx={{
                width: 120,
                height: 120,
                border: `4px solid transparent`,
                background: gradients[index] || gradients[2],
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box',
                boxShadow: `0 8px 32px rgba(233, 30, 99, 0.3)`,
                '&:hover': {
                  boxShadow: `0 12px 40px rgba(233, 30, 99, 0.4)`,
                }
              }}
            />
            
            <Chip
              label={index + 1}
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                background: gradients[index] || gradients[2],
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                width: 32,
                height: 32,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TopCompetitions;
