import React, { useState, useEffect } from 'react';
import { useGenerateQuestionMutation } from '../features/competitions/competitionsAPI';

const MAX_QUESTIONS = 10;

const Quiz: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [questionText, setQuestionText] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [questionsAsked, setQuestionsAsked] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);

  const [generateQuestion, { isLoading, data, error, reset }] = useGenerateQuestionMutation();

  const normalize = (str: string) => str.trim().toLowerCase().replace(/\s+/g, ' ');


  useEffect(() => {
    if (!data) return;

 
    if (askedQuestions.some(q => normalize(q) === normalize(data.question))) {
      return;
    }

    setQuestionText(data.question);
    setOptions(data.options);
    setCorrectAnswer(data.correctAnswer);
    setAskedQuestions(prev => [...prev, data.question]);
    setQuestionsAsked(prev => prev + 1);
    setSelectedAnswer('');
    setResult('');
  }, [data, askedQuestions]);

  const handleGenerateQuestion = async () => {
    if (quizFinished || isLoading) return;

    if (!topic.trim()) {
      setResult('אנא הזן נושא לחידון');
      return;
    }
    if (questionsAsked >= MAX_QUESTIONS) {
      setResult('הגעת למספר השאלות המקסימלי');
      setQuizFinished(true);
      return;
    }

    try {
      await generateQuestion({ topic }).unwrap();
    } catch {
      setResult('לא ניתן לקבל שאלה חדשה. נסה שוב מאוחר יותר.');
    }
  };

  const handleAnswer = (key: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(key);

    if (key === correctAnswer) {
      setScore(prev => prev + 0.5);
      setResult('נכון! ⭐');
    } else {
      setResult(`לא נכון. התשובה הנכונה היא: ${correctAnswer}`);
    }

    if (questionsAsked >= MAX_QUESTIONS) {
      setQuizFinished(true);
    } else {
      setTimeout(() => {
        setSelectedAnswer('');
        setResult('');
        setQuestionText('');
        setOptions([]);
        setCorrectAnswer('');
        handleGenerateQuestion();
      }, 700);
    }
  };

  const resetQuiz = () => {
    setTopic('');
    setQuestionText('');
    setOptions([]);
    setCorrectAnswer('');
    setSelectedAnswer('');
    setResult('');
    setQuestionsAsked(0);
    setScore(0);
    setQuizFinished(false);
    setAskedQuestions([]);
    reset(); 
  };

  const renderStars = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const halfStar = score % 1 >= 0.5;
    const emptyStars = MAX_QUESTIONS - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} style={{ color: 'gold', fontSize: 24, marginRight: 4 }}>
          ★
        </span>
      );
    }
    if (halfStar) {
      stars.push(
        <span
          key={`half`}
          style={{
            color: 'gold',
            fontSize: 24,
            marginRight: 4,
            position: 'relative',
            display: 'inline-block',
            width: 24,
          }}
        >
          <span
            style={{
              position: 'absolute',
              overflow: 'hidden',
              width: '50%',
              display: 'inline-block',
              color: 'gold',
            }}
          >
            ★
          </span>
          <span style={{ color: '#ccc' }}>★</span>
        </span>
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} style={{ color: '#ccc', fontSize: 24, marginRight: 4 }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: 20,
        direction: 'rtl',
        fontFamily: 'Segoe UI',
      }}
    >
      {!quizFinished && (
        <>
          <input
            type="text"
            placeholder="הזן נושא לחידון"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{
              fontSize: 16,
              padding: 10,
              width: '100%',
              marginBottom: 15,
              borderRadius: 5,
              border: '1px solid #ccc',
            }}
            disabled={questionsAsked > 0}
          />

          <button
            onClick={handleGenerateQuestion}
            disabled={isLoading || !topic.trim() || questionsAsked > 0}
            style={{
              padding: '10px 20px',
              fontSize: 16,
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              cursor: isLoading ? 'wait' : 'pointer',
              marginBottom: 20,
            }}
          >
            {isLoading ? 'טוען...' : 'התחל חידון'}
          </button>
        </>
      )}

      {questionText && (
        <div
          style={{
            marginBottom: 20,
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          {questionText}
        </div>
      )}

      {options.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          {options.map((option) => {
            const key = option[0];
            const isSelected = selectedAnswer === key;
            const isCorrect = correctAnswer === key;

            let background = 'white';
            let color = '#333';
            if (selectedAnswer) {
              if (isSelected && isCorrect) {
                background = 'lightgreen';
                color = 'darkgreen';
              } else if (isSelected && !isCorrect) {
                background = '#f8d7da';
                color = '#721c24';
              } else if (isCorrect) {
                background = 'lightgreen';
                color = 'darkgreen';
              }
            }

            return (
              <button
                key={key}
                disabled={!!selectedAnswer}
                onClick={() => handleAnswer(key)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: 10,
                  marginBottom: 8,
                  textAlign: 'right',
                  fontSize: 18,
                  borderRadius: 5,
                  border: '1px solid #ccc',
                  backgroundColor: background,
                  color: color,
                  cursor: selectedAnswer ? 'default' : 'pointer',
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      {result && (
        <div
          style={{
            marginBottom: 20,
            fontSize: 18,
            color: result.includes('נכון') ? 'green' : 'red',
          }}
        >
          {result}
        </div>
      )}

      {!quizFinished && (
        <div style={{ marginBottom: 20, fontSize: 18 }}>
          כוכבים: {renderStars(score)} | שאלות שנותרו: {MAX_QUESTIONS - questionsAsked} / {MAX_QUESTIONS}
        </div>
      )}

      {quizFinished && (
        <div style={{ textAlign: 'center' }}>
          <h2>החידון נגמר!</h2>
          <p>צברת {score} כוכבים מתוך {MAX_QUESTIONS}.</p>
          <div>{renderStars(score)}</div>
          <button
            onClick={resetQuiz}
            style={{
              marginTop: 20,
              padding: '10px 30px',
              fontSize: 18,
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
            }}
          >
            התחל מחדש
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
