import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCompetitionByCategoryQuery, useGetLeadCompetitionsByCategoryQuery } from '../competitionsAPI';
import CompetitionCard from './CompetitionCard';
import TopCompetitions from './LeadCompetitions';
import { CompetitionItem } from '../competitionsTypes';

const CompetitionList = () => {
  const { competitionID } = useParams();
  const { data, error, isLoading } = useGetCompetitionByCategoryQuery(competitionID || "");
  const { data: topCompetitions, isLoading: isTopLoading } = useGetLeadCompetitionsByCategoryQuery(competitionID || "");

  const [selectedCompetition, setSelectedCompetition] = useState<CompetitionItem | null>(null);

  if (isLoading || isTopLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>שגיאה בשליפת נתונים</p>;

  const handleMouseEnter = (competition: CompetitionItem) => {
    setSelectedCompetition(competition);
  };

  const handleMouseLeave = () => {
    setSelectedCompetition(null)
  };

  return (
    <div style={{ padding: '24px' }}>
      <TopCompetitions
        topCompetitions={topCompetitions || []}
        onSelect={(competition) => setSelectedCompetition(competition)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'center',
        }}
      >
        {data?.map((competitionItem: CompetitionItem) => (
          <CompetitionCard key={competitionItem._id} competitionItem={competitionItem} />
        ))}
      </div>

      {selectedCompetition && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <CompetitionCard competitionItem={selectedCompetition} />
        </div>
      )}
    </div>
  );
};

export default CompetitionList;
