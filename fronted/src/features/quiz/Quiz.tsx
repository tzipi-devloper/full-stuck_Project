import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Button, TextField, Card, CardContent, LinearProgress, Chip, Fade, Zoom,
    Snackbar, Alert, Paper, CircularProgress
} from '@mui/material';
import {
    PlayArrow as PlayIcon, Star as StarIcon, Quiz as QuizIcon, CheckCircle as CheckIcon, Cancel as CancelIcon,
    Refresh as RefreshIcon, ExitToApp as ExitIcon, Psychology as BrainIcon
} from '@mui/icons-material';
import { useCreateCompetitionMutation, useGenerateQuestionMutation } from '../competitions/competitionsAPI';
import { selectCurrentUser } from "../auth/currentUserSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    setTopic, setQuestionText, setOptions, setCorrectAnswer, setSelectedAnswer, setResult, incrementQuestionsAsked,
    setScore, setQuizFinished, setShowResult, setIsProcessing, resetQuizState, clearCurrentQuestion, selectQuizState
} from './quizSlice';
import { NotificationState } from "./quizTypes";
const MAX_QUESTIONS = 10;


const Quiz = () => {
    const dispatch = useDispatch();
    const {
        topic, questionText, options, correctAnswer, selectedAnswer, result, questionsAsked, score,
        quizFinished, showResult, isProcessing
    } = useSelector(selectQuizState);

    const currentUser = useSelector(selectCurrentUser);
    const [uploadCompetition] = useCreateCompetitionMutation();
    const [generateQuestion, { isLoading, data, error, reset }] = useGenerateQuestionMutation();
    const { competitionID } = useParams<{ competitionID: string }>();

    const [notification, setNotification] = useState<NotificationState>({
        open: false,
        message: '',
        severity: 'info'
    });

    const showNotification = (message: string, severity: NotificationState['severity']) => {
        setNotification({ open: true, message, severity });
    };

    useEffect(() => {
        if (!data) return;
        dispatch(setQuestionText(data.question));
        dispatch(setOptions(data.options));
        dispatch(setCorrectAnswer(data.correctAnswer));
        dispatch(incrementQuestionsAsked());
        dispatch(setSelectedAnswer(''));
        dispatch(setResult(''));
        dispatch(setShowResult(false));
        dispatch(setIsProcessing(false));
    }, [data, dispatch]);

    const createExam = async (): Promise<void> => {
        const formData = new FormData();
        formData.append("category", competitionID ?? "");
        formData.append("ownerId", currentUser?._id ?? "");
        formData.append("ownerEmail", currentUser?.email ?? "");
        formData.append("rating", score.toString());
        try {
            await uploadCompetition(formData).unwrap();
            showNotification("Results saved successfully! 🎉", "success");
        } catch (err) {
            console.error(err);
            showNotification("Error saving results", "error");
        }
    };

    const handleExitAndSave = async (): Promise<void> => {
        try {
            await createExam();
            window.dispatchEvent(new CustomEvent('closeQuizModal'));
            if (window.parent !== window) {
                window.parent.postMessage('closeQuiz', '*');
            }
            const closeEvent = new Event('close');
            window.dispatchEvent(closeEvent);
        } catch (error) {
            console.error('Error during exit:', error);
            showNotification("Error occurred while saving and exiting", "error");
        }
    };

    const handleGenerateQuestion = async (): Promise<void> => {
        if (quizFinished || isLoading) return;

        if (!topic.trim()) {
            showNotification('Please enter a quiz topic', 'warning');
            return;
        }
        if (questionsAsked >= MAX_QUESTIONS) {
            dispatch(setResult('You have reached the maximum number of questions'));
            dispatch(setQuizFinished(true));
            await createExam();
            return;
        }

        try {
            await generateQuestion({ topic }).unwrap();
        } catch {
            showNotification('Cannot get a new question. Please try again later.', 'error');
        }
    };

    const handleAnswer = (key: string): void => {
        if (selectedAnswer) return;

        dispatch(setSelectedAnswer(key));
        dispatch(setShowResult(true));

        const isCorrect = key === correctAnswer;

        if (isCorrect) {
            dispatch(setScore(score + 0.5));
            dispatch(setResult('Correct! Excellent! ⭐'));
            showNotification('Correct answer! 🎯', 'success');
        } else {
            dispatch(setResult(`Incorrect. The correct answer is: ${correctAnswer}`));
            showNotification('Wrong answer 😔', 'error');
        }

        if (questionsAsked >= MAX_QUESTIONS) {
            dispatch(setQuizFinished(true));
        } else {
            dispatch(clearCurrentQuestion());
            handleGenerateQuestion();
        }
    };

    const handleResetQuiz = (): void => {
        dispatch(resetQuizState());
        reset();
        showNotification('Quiz reset! Starting over 🔄', 'info');
    };

    const renderStars = (score: number) => {
        const stars = [];
        const fullStars = Math.floor(score);
        const halfStar = score % 1 >= 0.5;
        const emptyStars = MAX_QUESTIONS - fullStars - (halfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <StarIcon
                    key={`full-${i}`}
                    sx={{
                        color: '#ffd700',
                        fontSize: 28,
                        filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))',
                        animation: 'pulse 2s infinite'
                    }}
                />
            );
        }

        if (halfStar) {
            stars.push(
                <Box key="half" sx={{ position: 'relative', display: 'inline-block' }}>
                    <StarIcon sx={{ color: '#ddd', fontSize: 28 }} />
                    <StarIcon
                        sx={{
                            color: '#ffd700',
                            fontSize: 28,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            clipPath: 'inset(0 50% 0 0)',
                            filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))'
                        }}
                    />
                </Box>
            );
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <StarIcon
                    key={`empty-${i}`}
                    sx={{ color: '#444', fontSize: 28 }}
                />
            );
        }

        return stars;
    };

    const progressPercentage = (questionsAsked / MAX_QUESTIONS) * 100;

    return (
        <Box
            sx={{
                minHeight: '80vh',
                padding: 3,
                direction: 'rtl'
            }}
        >
            <Box
                sx={{
                    maxWidth: 800,
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}
            >
                {questionsAsked > 0 && !quizFinished && (
                    <Card
                        sx={{
                            background: 'rgba(17, 17, 17, 0.9)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 4
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <QuizIcon sx={{ color: '#4caf50' }} />
                                <Typography variant="h6" sx={{ color: 'white' }}>
                                    Progress: {questionsAsked}/{MAX_QUESTIONS}
                                </Typography>
                                <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                                    {renderStars(score)}
                                </Box>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={progressPercentage}
                                sx={{
                                    height: 12,
                                    borderRadius: 6,
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiLinearProgress-bar': {
                                        background: 'linear-gradient(45deg, #e91e63, #ff5722)',
                                        borderRadius: 6
                                    }
                                }}
                            />
                        </CardContent>
                    </Card>
                )}
                {questionsAsked === 0 && !quizFinished && (
                    <Fade in={true}>
                        <Card
                            sx={{
                                background: 'rgba(17, 17, 17, 0.9)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: 4,
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" sx={{ color: 'white', mb: 3, textAlign: 'center' }}>
                                    🎯 Choose a Quiz Topic
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter an interesting quiz topic..."
                                    value={topic}
                                    onChange={(e) => dispatch(setTopic(e.target.value))}
                                    sx={{
                                        mb: 3,
                                        '& .MuiOutlinedInput-root': {
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: 3,
                                            fontSize: 18,
                                            color: 'white',
                                            '& fieldset': {
                                                borderColor: 'rgba(255, 255, 255, 0.2)'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'rgba(233, 30, 99, 0.5)'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#e91e63'
                                            }
                                        },
                                        '& .MuiInputBase-input::placeholder': {
                                            color: 'rgba(255, 255, 255, 0.7)'
                                        }
                                    }}
                                />

                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    onClick={handleGenerateQuestion}
                                    disabled={isLoading || !topic.trim()}
                                    startIcon={isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <PlayIcon />}
                                    sx={{
                                        background: 'linear-gradient(45deg, #e91e63, #ff5722)',
                                        borderRadius: 3,
                                        py: 2,
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        boxShadow: '0 8px 32px rgba(233, 30, 99, 0.3)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #c2185b, #e64a19)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 12px 40px rgba(233, 30, 99, 0.4)'
                                        },
                                        '&:disabled': {
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            transform: 'none'
                                        }
                                    }}
                                >
                                    {isLoading ? 'Loading question...' : 'Start Quiz'}
                                </Button>
                            </CardContent>
                        </Card>
                    </Fade>
                )}

                {isLoading && questionsAsked > 0 && !quizFinished && (
                    <Fade in={true}>
                        <Card
                            sx={{
                                background: 'rgba(17, 17, 17, 0.9)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: 4,
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                textAlign: 'center'
                            }}
                        >
                            <CardContent sx={{ py: 4 }}>
                                <CircularProgress
                                    size={40}
                                    sx={{
                                        color: '#e91e63',
                                        mb: 2
                                    }}
                                />
                                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                                    Loading next question...
                                </Typography>
                            </CardContent>
                        </Card>
                    </Fade>
                )}

                {questionText && !quizFinished && !isLoading && (
                    <Zoom in={true}>
                        <Card
                            sx={{
                                background: 'rgba(17, 17, 17, 0.9)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: 4,
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: 'white',
                                        mb: 3,
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        lineHeight: 1.6
                                    }}
                                >
                                    {questionText}
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {options.map((option, index) => {
                                        const key = option[0];
                                        const isSelected = selectedAnswer === key;
                                        const isCorrect = correctAnswer === key;
                                        const showColors = showResult;

                                        let backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                        let borderColor = 'rgba(255, 255, 255, 0.1)';
                                        let textColor = 'white';
                                        let icon = null;

                                        if (showColors) {
                                            if (isSelected && isCorrect) {
                                                backgroundColor = 'rgba(76, 175, 80, 0.2)';
                                                borderColor = '#4caf50';
                                                textColor = '#4caf50';
                                                icon = <CheckIcon sx={{ color: '#4caf50' }} />;
                                            } else if (isSelected && !isCorrect) {
                                                backgroundColor = 'rgba(244, 67, 54, 0.2)';
                                                borderColor = '#f44336';
                                                textColor = '#f44336';
                                                icon = <CancelIcon sx={{ color: '#f44336' }} />;
                                            } else if (isCorrect) {
                                                backgroundColor = 'rgba(76, 175, 80, 0.2)';
                                                borderColor = '#4caf50';
                                                textColor = '#4caf50';
                                                icon = <CheckIcon sx={{ color: '#4caf50' }} />;
                                            }
                                        }

                                        return (
                                            <Button
                                                key={key}
                                                fullWidth
                                                variant="outlined"
                                                size="large"
                                                disabled={!!selectedAnswer}
                                                onClick={() => handleAnswer(key)}
                                                startIcon={icon}
                                                sx={{
                                                    backgroundColor,
                                                    borderColor,
                                                    color: textColor,
                                                    borderRadius: 3,
                                                    py: 2,
                                                    px: 3,
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                    textAlign: 'right',
                                                    justifyContent: 'flex-start',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': !selectedAnswer ? {
                                                        backgroundColor: 'rgba(233, 30, 99, 0.1)',
                                                        borderColor: '#e91e63',
                                                        transform: 'translateX(-8px)'
                                                    } : {},
                                                    '&:disabled': {
                                                        transform: 'none'
                                                    }
                                                }}
                                            >
                                                {option}
                                            </Button>
                                        );
                                    })}
                                </Box>

                                {result && showResult && (
                                    <Fade in={true}>
                                        <Paper
                                            sx={{
                                                mt: 3,
                                                p: 3,
                                                textAlign: 'center',
                                                background: result.includes('Correct')
                                                    ? 'linear-gradient(45deg, rgba(76, 175, 80, 0.2), rgba(139, 195, 74, 0.2))'
                                                    : 'linear-gradient(45deg, rgba(244, 67, 54, 0.2), rgba(233, 30, 99, 0.2))',
                                                border: `1px solid ${result.includes('Correct') ? '#4caf50' : '#f44336'}`,
                                                borderRadius: 3
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: result.includes('Correct') ? '#4caf50' : '#f44336',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {result}
                                            </Typography>
                                        </Paper>
                                    </Fade>
                                )}
                            </CardContent>
                        </Card>
                    </Zoom>
                )}

                {quizFinished && (
                    <Zoom in={true}>
                        <Card
                            sx={{
                                background: 'rgba(17, 17, 17, 0.9)',
                                backdropFilter: 'blur(20px)',
                                border: '2px solid rgba(233, 30, 99, 0.3)',
                                borderRadius: 4,
                                boxShadow: '0 16px 48px rgba(233, 30, 99, 0.2)',
                                textAlign: 'center'
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        background: 'linear-gradient(45deg, #e91e63, #ff5722)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontWeight: 'bold',
                                        mb: 2
                                    }}
                                >
                                    🎉 Quiz Completed! 🎉
                                </Typography>

                                <Typography variant="h5" sx={{ color: 'white', mb: 3 }}>
                                    You earned {score} stars out of {MAX_QUESTIONS}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 4 }}>
                                    {renderStars(score)}
                                </Box>

                                <Chip
                                    label={`Success Rate: ${Math.round((score / MAX_QUESTIONS) * 100)}%`}
                                    sx={{
                                        background: 'linear-gradient(45deg, #ff9800, #4caf50)',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                        py: 2,
                                        px: 3,
                                        mb: 4
                                    }}
                                />

                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleResetQuiz}
                                        startIcon={<RefreshIcon />}
                                        sx={{
                                            background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                                            borderRadius: 3,
                                            px: 4,
                                            py: 1.5,
                                            fontWeight: 'bold',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #388e3c, #689f38)',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    >
                                        Start Over
                                    </Button>

                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleExitAndSave}
                                        startIcon={<ExitIcon />}
                                        sx={{
                                            background: 'linear-gradient(45deg, #f44336, #e91e63)',
                                            borderRadius: 3,
                                            px: 4,
                                            py: 1.5,
                                            fontWeight: 'bold',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #d32f2f, #c2185b)',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    >
                                        Exit & Save
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Zoom>
                )}
            </Box>

            <Snackbar
                open={notification.open}
                autoHideDuration={3000}
                onClose={() => setNotification(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setNotification(prev => ({ ...prev, open: false }))}
                    severity={notification.severity}
                    sx={{
                        borderRadius: 3,
                        backdropFilter: 'blur(10px)',
                        fontWeight: 'bold'
                    }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
            <Box
                component="style"
                sx={{
                    '& @keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' }
                    },
                    '& @keyframes pulse': {
                        '0%, 100%': { opacity: 1 },
                        '50%': { opacity: 0.7 }
                    }
                }}
            />
        </Box>
    );
};
export default Quiz;