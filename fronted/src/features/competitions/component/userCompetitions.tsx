// import React from "react";
// import { useGetUserCompetitionsByUserIdQuery } from "../competitionsAPI";
// import { CompetitionItem } from "../competitionsTypes";

// interface UserCompetitionsProps {
//   userId: string;
// }

// const UserCompetitions: React.FC<UserCompetitionsProps> = ({ userId }) => {
//   const { data: competitions, error, isLoading } = useGetUserCompetitionsByUserIdQuery(userId);

//   if (isLoading) return <div>Loading competitions...</div>;
//   if (error) return <div>Error loading competitions</div>;
//   if (!competitions || competitions.length === 0) return <div>No competitions found</div>;

//   return (
//     <div>
//       <h2>User Competitions</h2>
//       <ul>
//         {competitions.map((comp: CompetitionItem) => (
//           <li key={comp._id}>
//             <strong>Category:</strong> {comp.category} <br />
//             <strong>Rating:</strong> {comp.rating} <br />
//             {/* אפשר להוסיף עוד פרטים לפי צורך */}
//             {comp.fileUrl && (
//               <div>
//                 <a href={comp.fileUrl} target="_blank" rel="noopener noreferrer">
//                   View File
//                 </a>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserCompetitions;
import React from 'react';
import {
  useGetUserCompetitionsByUserIdQuery
} from '../competitionsAPI';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
  Typography,
} from '@mui/material';

interface UserCompetitionsProps {
  userId: string;
}

function UserCompetitions({ userId }: UserCompetitionsProps) {
  const { data, error, isLoading } = useGetUserCompetitionsByUserIdQuery(userId);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">שגיאה בטעינת התחרויות</Typography>;
  }

  if (!data || data.length === 0) {
    return <Typography>אין תחרויות להצגה.</Typography>;
  }

  return (
    <List>
      {data.map((competition) => (
        <ListItem key={competition._id} divider>
          <ListItemAvatar>
            <Avatar
              src={competition.fileUrl}
              alt={competition.category}
              sx={{ width: 60, height: 60 }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={`קטגוריה: ${competition.category}`}
            secondary={`דירוג: ${competition.rating}`}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default UserCompetitions;
