import { Box, Typography, Avatar, Chip } from '@mui/material';
import { EmojiEvents as TrophyIcon } from '@mui/icons-material';
import { CompetitionItem } from '../competitionsTypes';
import { useParams } from 'react-router-dom';
interface Props {
  topCompetitions: CompetitionItem[];
  onSelect: (competition: CompetitionItem) => void;
  onMouseEnter: (competition: CompetitionItem) => void;
  onMouseLeave: () => void;
}

const TopCompetitions = ({ topCompetitions, onSelect, onMouseEnter, onMouseLeave }: Props) => {
  const gradients = [
    'linear-gradient(45deg, #e91e63, #ff5722)',
    'linear-gradient(45deg, #ff5722, #ff9800)',
    'linear-gradient(45deg, #ff9800, #4caf50)',
  ];
  const { competitionID } = useParams();
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
            fontWeight: 'bold',
          }}
        >
          המובילים שלנו
        </Typography>
        <TrophyIcon sx={{ color: '#ff9800', fontSize: 32 }} />
      </Box>

      <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
        {topCompetitions.slice(0, 3).map((competition, index) => {
          const isExams = competitionID === 'exams';

          if (isExams) {
            return (
              <Box
                key={competition._id}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: gradients[index] || gradients[2],
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: `0 4px 12px rgba(233, 30, 99, 0.3)`,
                  }}
                >
                  <Avatar
                    src={competition.fileUrl}
                    sx={{
                      width: 40,
                      height: 40,
                      border: '2px solid white',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: '#ff9800',
                      border: '2px solid white',
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    color: '#333',
                  }}
                >
                  {competition.rating ?? 'N/A'}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    color: '#777',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                  }}
                >
                  {competition.ownerEmail}
                </Typography>
              </Box>
            );
          }
          return (
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
                },
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
                  },
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
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TopCompetitions;
