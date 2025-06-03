
import { useState } from 'react';
import { TextField, Button, Typography, Paper, Snackbar, Alert, Link } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; 
import { signUpSchema, signInSchema } from './AuthSchema';
import type { User as BackendUserType, userInfo } from './authTypes'; 
import { useCreateUserMutation, useSignInMutation } from './authAPI';
import { setCookie } from 'typescript-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from './currentUserSlice';

type SignUpFormData = z.infer<typeof signUpSchema>;
type SignInFormData = z.infer<typeof signInSchema>;

interface AuthFormProps {
  onSuccess?: () => void; 
}

const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const dispatch = useDispatch();
  const [createUser] = useCreateUserMutation();
  const [signIn] = useSignInMutation();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const signUpForm = useForm<SignUpFormData>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  const signInForm = useForm<SignInFormData>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  });

  const isSignUp = mode === 'signUp';
  const onSubmit: SubmitHandler<SignUpFormData | SignInFormData> = async (data) => {
    try {
      let response: { token: string, userInfo: userInfo } | undefined;

      if (isSignUp) {
        response = await createUser(data).unwrap();
      } else {
        response = await signIn(data).unwrap();
      }

      const token: string | undefined = response?.token;
      if (!token) {
        throw new Error("Token is undefined");
      }

      setCookie('token', token, { expires: 1, path: '/' });
      localStorage.setItem('user', JSON.stringify(response?.userInfo)); 

      if (response?.userInfo) {
        dispatch(setUser(response.userInfo));
      }

      setOpenSnackbar(true);
      isSignUp ? signUpForm.reset() : signInForm.reset();

      if (onSuccess) {
        onSuccess();
      }

    } catch (error: any) {
      console.error("Error:", error);
      setErrorMessage(error?.data?.message || error?.message || "משהו השתבש, נסה שוב.");
      setErrorSnackbar(true);
    }
  };

  const toggleMode = () => {
    setMode(prev => (prev === 'signUp' ? 'signIn' : 'signUp'));
    signUpForm.reset();
    signInForm.reset();
    setErrorMessage('');
    setErrorSnackbar(false);
  };

  return (
    <div>
      <Paper elevation={3} sx={{ padding: 3, width: '400px', margin: 'auto' }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          {isSignUp ? 'הרשמה' : 'התחברות'}
        </Typography>

        {isSignUp ? (
          <form onSubmit={signUpForm.handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="שם מלא"
              margin="normal"
              {...signUpForm.register("name")} 
              error={!!signUpForm.formState.errors.name}
              helperText={signUpForm.formState.errors.name?.message}
            />
            <TextField
              fullWidth
              label="אימייל"
              margin="normal"
              type="email"
              {...signUpForm.register("email")}
              error={!!signUpForm.formState.errors.email}
              helperText={signUpForm.formState.errors.email?.message}
            />
            <TextField
              fullWidth
              label="טלפון"
              margin="normal"
              {...signUpForm.register("phone")} 
              error={!!signUpForm.formState.errors.phone}
              helperText={signUpForm.formState.errors.phone?.message}
            />
            <TextField
              fullWidth
              label="סיסמה"
              margin="normal"
              type="password"
              {...signUpForm.register("password")} 
              error={!!signUpForm.formState.errors.password}
              helperText={signUpForm.formState.errors.password?.message}
              autoComplete="new-password"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 2 }}>
              הרשם
            </Button>
          </form>
        ) : (
          <form onSubmit={signInForm.handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="אימייל"
              margin="normal"
              type="email"
              {...signInForm.register("email")} 
              error={!!signInForm.formState.errors.email}
              helperText={signInForm.formState.errors.email?.message}
            />
            <TextField
              fullWidth
              label="סיסמה"
              margin="normal"
              type="password"
              {...signInForm.register("password")} 
              error={!!signInForm.formState.errors.password}
              helperText={signInForm.formState.errors.password?.message}
              autoComplete="current-password"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 2 }}>
              התחבר
            </Button>
          </form>
        )}
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          {isSignUp ? "כבר יש לך חשבון?" : "אין לך חשבון?"}
          <Link onClick={toggleMode} sx={{ cursor: 'pointer', ml: 1, fontWeight: 'medium' }}>
            {isSignUp ? "התחבר" : "הירשם"}
          </Link>
        </Typography>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {isSignUp ? 'ההרשמה בוצעה בהצלחה!' : 'התחברת בהצלחה!'}
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorSnackbar}
        autoHideDuration={6000}
        onClose={() => setErrorSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AuthForm;