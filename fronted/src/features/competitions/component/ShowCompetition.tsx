import { Box, Button, IconButton, Paper } from "@mui/material"
import CompetitionList from "./CompetitionList"
import { Add as AddIcon, Chat as ChatIcon, Close as CloseIcon } from '@mui/icons-material';
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/currentUserSlice";
import { useGetCompetitionByCategoryQuery } from "../competitionsAPI";
import { useParams } from "react-router-dom";
import UploadCompetitionPopup from "./UploadCompetitionPopup";
import Chat from '../../chat/Chat';
const ShowCompetition = () => {
  const { competitionID } = useParams<{ competitionID: string }>(); 
  const user = useSelector(selectCurrentUser);
    const {
      refetch,
    } = useGetCompetitionByCategoryQuery(competitionID || ''); 
  
   const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [showChatPopup, setShowChatPopup] = useState<boolean>(false);
    const handleUploadSuccess = (): void => {
      setIsPopupOpen(false);
      refetch();
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
  return (
    <div>
      <CompetitionList/>
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
    </div>
  )
}

export default ShowCompetition
