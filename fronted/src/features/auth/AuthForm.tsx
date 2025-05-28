// // import { useState } from 'react';
// // import { TextField, Button, Typography, Paper, Snackbar, Alert, Link } from '@mui/material';
// // import { useForm, SubmitHandler } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { signUpSchema, signInSchema } from './AuthSchema';
// // import type { SignInInput, User, userInfo } from './authTypes';
// // import { useCreateUserMutation, useSignInMutation } from './authAPI';
// // import { setCookie } from 'typescript-cookie';
// // import { useDispatch } from 'react-redux';
// // import { setUser } from './currentUserSlice';

// // const AuthForm = () => {
// //   const dispatch = useDispatch();
// //   const [createUser] = useCreateUserMutation();
// //   const [signIn] = useSignInMutation();
// //   const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
// //   const [openSnackbar, setOpenSnackbar] = useState(false);
// //   const [errorSnackbar, setErrorSnackbar] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState('');
// //   const signUpForm = useForm<User>({
// //     mode: 'onChange',
// //     resolver: zodResolver(signUpSchema),
// //   });

// //   const signInForm = useForm<SignInInput>({
// //     mode: 'onChange',
// //     resolver: zodResolver(signInSchema),
// //   });

// //   const isSignUp = mode === 'signUp';

// //   const onSubmit: SubmitHandler<User | SignInInput> = async (data: User | SignInInput) => {
// //     try {
// //       let response: { token: string, userInfo: userInfo } | undefined;

// //       if (isSignUp) {
// //         response = await createUser(data).unwrap();
// //       } else {
// //         const { email, password } = data as SignInInput;
// //         response = await signIn({ email, password }).unwrap();
// //       }
// //       const token: string | undefined = response?.token;
// //       if (!token) throw new Error("Token is undefined");
// //       setCookie('token', token, { expires: 1, path: '/' });
// //       localStorage.setItem('user', JSON.stringify(response?.userInfo));
// //       if (response?.userInfo) {
// //         dispatch(setUser(response.userInfo));
// //       }

// //       setOpenSnackbar(true);
// //       isSignUp ? signUpForm.reset() : signInForm.reset();
// //     } catch (error: any) {
// //       console.error("Error:", error);
// //       setErrorMessage(error?.data?.message || error?.message || "משהו השתבש, נסה שוב.");
// //       setErrorSnackbar(true);
// //     }
// //   };


// //   const toggleMode = () => {
// //     setMode(prev => (prev === 'signUp' ? 'signIn' : 'signUp'));
// //     signUpForm.reset();
// //     signInForm.reset();
// //   };

// //   return (
// //     <div>
// //       <Paper elevation={3} sx={{ padding: 3, width: '400px' }}>
// //         <Typography variant="h5" component="h1" gutterBottom>
// //           {isSignUp ? 'Sign Up' : 'Sign In'}
// //         </Typography>

// //         {isSignUp ? (
// //           <form onSubmit={signUpForm.handleSubmit(onSubmit)}>
// //             <TextField fullWidth label="Name" margin="normal" {...signUpForm.register("name")} error={!!signUpForm.formState.errors.name} helperText={signUpForm.formState.errors.name?.message} />
// //             <TextField fullWidth label="Email" margin="normal" type="email" {...signUpForm.register("email")} error={!!signUpForm.formState.errors.email} helperText={signUpForm.formState.errors.email?.message} />
// //             <TextField fullWidth label="Phone" margin="normal" {...signUpForm.register("phone")} error={!!signUpForm.formState.errors.phone} helperText={signUpForm.formState.errors.phone?.message} />
// //             <TextField fullWidth label="Password" margin="normal" type="password" {...signUpForm.register("password")} error={!!signUpForm.formState.errors.password} helperText={signUpForm.formState.errors.password?.message} autoComplete="new-password" />
// //             <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Register</Button>
// //           </form>
// //         ) : (
// //           <form onSubmit={signInForm.handleSubmit(onSubmit)}>
// //             <TextField fullWidth label="Email" margin="normal" type="email" {...signInForm.register("email")} error={!!signInForm.formState.errors.email} helperText={signInForm.formState.errors.email?.message} />
// //             <TextField fullWidth label="Password" margin="normal" type="password" {...signInForm.register("password")} error={!!signInForm.formState.errors.password} helperText={signInForm.formState.errors.password?.message} autoComplete="current-password" />
// //             <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Sign In</Button>
// //           </form>
// //         )}
// //         <Typography variant="body2" align="center" sx={{ mt: 2 }}>
// //           {isSignUp ? "Already have an account?" : "Don't have an account?"}
// //           <Link onClick={toggleMode} sx={{ cursor: 'pointer', ml: 1 }}>
// //             {isSignUp ? "Sign In" : "Sign Up"}
// //           </Link>
// //         </Typography>
// //       </Paper>

// //       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
// //         <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
// //           {isSignUp ? 'User registered successfully!' : 'Signed in successfully!'}
// //         </Alert>
// //       </Snackbar>

// //       <Snackbar open={errorSnackbar} autoHideDuration={6000} onClose={() => setErrorSnackbar(false)}>
// //         <Alert onClose={() => setErrorSnackbar(false)} severity="error" sx={{ width: '100%' }}>
// //           {errorMessage}
// //         </Alert>
// //       </Snackbar>
// //     </div>
// //   );
// // };

// // export default AuthForm;
// import { useState } from 'react';
// import { TextField, Button, Typography, Paper, Snackbar, Alert, Link } from '@mui/material';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { signUpSchema, signInSchema } from './AuthSchema'; // ודא שהנתיבים נכונים
// import type { SignInInput, User, userInfo } from './authTypes'; // ודא שהנתיבים נכונים
// import { useCreateUserMutation, useSignInMutation } from './authAPI'; // ודא שהנתיבים נכונים
// import { setCookie } from 'typescript-cookie';
// import { useDispatch } from 'react-redux';
// import { setUser } from './currentUserSlice'; // ודא שהנתיבים נכונים

// // הגדרת ה-props שהקומפוננטה מקבלת
// interface AuthFormProps {
//   onSuccess?: () => void; // פונקציה שתקרא לאחר הצלחה לסגירת הפופאפ
// }

// const AuthForm = ({ onSuccess }: AuthFormProps) => {
//   const dispatch = useDispatch();
//   const [createUser] = useCreateUserMutation();
//   const [signIn] = useSignInMutation();
//   const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [errorSnackbar, setErrorSnackbar] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const signUpForm = useForm<User>({
//     mode: 'onChange',
//     resolver: zodResolver(signUpSchema),
//   });

//   const signInForm = useForm<SignInInput>({
//     mode: 'onChange',
//     resolver: zodResolver(signInSchema),
//   });

//   const isSignUp = mode === 'signUp';

//   const onSubmit: SubmitHandler<User | SignInInput> = async (data: User | SignInInput) => {
//     try {
//       let response: { token: string, userInfo: userInfo } | undefined;

//       if (isSignUp) {
//         response = await createUser(data as User).unwrap(); // יש לוודא שהנתונים המועברים הם מסוג User
//       } else {
//         const { email, password } = data as SignInInput;
//         response = await signIn({ email, password }).unwrap();
//       }

//       const token: string | undefined = response?.token;
//       if (!token) {
//         throw new Error("Token is undefined");
//       }

//       setCookie('token', token, { expires: 1, path: '/' });
//       localStorage.setItem('user', JSON.stringify(response?.userInfo));

//       if (response?.userInfo) {
//         dispatch(setUser(response.userInfo));
//       }

//       setOpenSnackbar(true);
//       isSignUp ? signUpForm.reset() : signInForm.reset();


//       if (onSuccess) {
//         onSuccess();
//       }

//     } catch (error: any) {
//       console.error("Error:", error);
//       setErrorMessage(error?.data?.message || error?.message || "משהו השתבש, נסה שוב.");
//       setErrorSnackbar(true);
//     }
//   };

//   const toggleMode = () => {
//     setMode(prev => (prev === 'signUp' ? 'signIn' : 'signUp'));
//     signUpForm.reset(); // איפוס טופס הרשמה
//     signInForm.reset(); // איפוס טופס התחברות
//     setErrorMessage(''); // איפוס הודעת שגיאה
//     setErrorSnackbar(false); // סגירת סנקבר שגיאה
//   };

//   return (
//     <div>
//       <Paper elevation={3} sx={{ padding: 3, width: '400px', margin: 'auto' }}>
//         <Typography variant="h5" component="h1" gutterBottom align="center">
//           {isSignUp ? 'הרשמה' : 'התחברות'}
//         </Typography>

//         {isSignUp ? (
//           <form onSubmit={signUpForm.handleSubmit(onSubmit)}>
//             <TextField
//               fullWidth
//               label="שם מלא"
//               margin="normal"
//               {...signUpForm.register("name")}
//               error={!!signUpForm.formState.errors.name}
//               helperText={signUpForm.formState.errors.name?.message}
//             />
//             <TextField
//               fullWidth
//               label="אימייל"
//               margin="normal"
//               type="email"
//               {...signUpForm.register("email")}
//               error={!!signUpForm.formState.errors.email}
//               helperText={signUpForm.formState.errors.email?.message}
//             />
//             <TextField
//               fullWidth
//               label="טלפון"
//               margin="normal"
//               {...signUpForm.register("phone")}
//               error={!!signUpForm.formState.errors.phone}
//               helperText={signUpForm.formState.errors.phone?.message}
//             />
//             <TextField
//               fullWidth
//               label="סיסמה"
//               margin="normal"
//               type="password"
//               {...signUpForm.register("password")}
//               error={!!signUpForm.formState.errors.password}
//               helperText={signUpForm.formState.errors.password?.message}
//               autoComplete="new-password"
//             />
//             <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 2 }}>
//               הרשם
//             </Button>
//           </form>
//         ) : (
//           <form onSubmit={signInForm.handleSubmit(onSubmit)}>
//             <TextField
//               fullWidth
//               label="אימייל"
//               margin="normal"
//               type="email"
//               {...signInForm.register("email")}
//               error={!!signInForm.formState.errors.email}
//               helperText={signInForm.formState.errors.email?.message}
//             />
//             <TextField
//               fullWidth
//               label="סיסמה"
//               margin="normal"
//               type="password"
//               {...signInForm.register("password")}
//               error={!!signInForm.formState.errors.password}
//               helperText={signInForm.formState.errors.password?.message}
//               autoComplete="current-password"
//             />
//             <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 2 }}>
//               התחבר
//             </Button>
//           </form>
//         )}
//         <Typography variant="body2" align="center" sx={{ mt: 2 }}>
//           {isSignUp ? "כבר יש לך חשבון?" : "אין לך חשבון?"}
//           <Link onClick={toggleMode} sx={{ cursor: 'pointer', ml: 1, fontWeight: 'medium' }}>
//             {isSignUp ? "התחבר" : "הירשם"}
//           </Link>
//         </Typography>
//       </Paper>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={() => setOpenSnackbar(false)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
//           {isSignUp ? 'ההרשמה בוצעה בהצלחה!' : 'התחברת בהצלחה!'}
//         </Alert>
//       </Snackbar>

//       <Snackbar
//         open={errorSnackbar}
//         autoHideDuration={6000}
//         onClose={() => setErrorSnackbar(false)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setErrorSnackbar(false)} severity="error" sx={{ width: '100%' }}>
//           {errorMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default AuthForm;
import { useState } from 'react';
import { TextField, Button, Typography, Paper, Snackbar, Alert, Link } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; // ייבוא של Zod להגדרת טיפוסים מהסכמות

// ודא שהנתיבים לקבצים הבאים נכונים בפרויקט שלך
import { signUpSchema, signInSchema } from './AuthSchema';
import type { User as BackendUserType, userInfo } from './authTypes'; // שנה שם ל-User המקורי אם הוא משמש למבנה משתמש מהשרת
import { useCreateUserMutation, useSignInMutation } from './authAPI';
import { setCookie } from 'typescript-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from './currentUserSlice';

// =======================================================================
// 1. הגדרת טיפוסי נתונים לטפסים באמצעות z.infer מהסכמות
// =======================================================================
type SignUpFormData = z.infer<typeof signUpSchema>;
type SignInFormData = z.infer<typeof signInSchema>;

interface AuthFormProps {
  onSuccess?: () => void; // פונקציה שתקרא לאחר הצלחה לסגירת הפופאפ
}

const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const dispatch = useDispatch();
  const [createUser] = useCreateUserMutation();
  const [signIn] = useSignInMutation();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // =======================================================================
  // 2. שימוש בטיפוסים הנגזרים מהסכמות עבור useForm
  // =======================================================================
  const signUpForm = useForm<SignUpFormData>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  const signInForm = useForm<SignInFormData>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  });

  const isSignUp = mode === 'signUp';

  // =======================================================================
  // 3. עדכון החתימה של onSubmit והטיפול בנתונים
  // =======================================================================
  const onSubmit: SubmitHandler<SignUpFormData | SignInFormData> = async (data) => {
    try {
      let response: { token: string, userInfo: userInfo } | undefined;

      if (isSignUp) {
        // 'data' כאן הוא בוודאות SignUpFormData
        // ודא שהמוטציה createUser מצפה לקבל אובייקט מסוג SignUpFormData
        // או טיפוס תואם.
        response = await createUser(data).unwrap();
      } else {
        // 'data' כאן הוא בוודאות SignInFormData (אמור להכיל email ו-password)
        // ודא שהמוטציה signIn מצפה לקבל אובייקט מסוג SignInFormData
        // או טיפוס תואם (כמו { email: string, password: string }).
        response = await signIn(data).unwrap();
      }

      const token: string | undefined = response?.token;
      if (!token) {
        throw new Error("Token is undefined");
      }

      setCookie('token', token, { expires: 1, path: '/' });
      localStorage.setItem('user', JSON.stringify(response?.userInfo)); // userInfo נשאר כפי שהיה

      if (response?.userInfo) {
        // ודא שהפונקציה setUser מצפה לקבל טיפוס userInfo
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
          // טופס הרשמה
          // שדות הטופס נרשמים באמצעות signUpForm.register
          // והטיפוסים שלהם יתאימו ל-SignUpFormData
          <form onSubmit={signUpForm.handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="שם מלא"
              margin="normal"
              {...signUpForm.register("name")} // 'name' הוא מפתח ב-SignUpFormData
              error={!!signUpForm.formState.errors.name}
              helperText={signUpForm.formState.errors.name?.message}
            />
            <TextField
              fullWidth
              label="אימייל"
              margin="normal"
              type="email"
              {...signUpForm.register("email")} // 'email' הוא מפתח ב-SignUpFormData
              error={!!signUpForm.formState.errors.email}
              helperText={signUpForm.formState.errors.email?.message}
            />
            <TextField
              fullWidth
              label="טלפון"
              margin="normal"
              {...signUpForm.register("phone")} // 'phone' הוא מפתח ב-SignUpFormData
              error={!!signUpForm.formState.errors.phone}
              helperText={signUpForm.formState.errors.phone?.message}
            />
            <TextField
              fullWidth
              label="סיסמה"
              margin="normal"
              type="password"
              {...signUpForm.register("password")} // 'password' הוא מפתח ב-SignUpFormData
              error={!!signUpForm.formState.errors.password}
              helperText={signUpForm.formState.errors.password?.message}
              autoComplete="new-password"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 2 }}>
              הרשם
            </Button>
          </form>
        ) : (
          // טופס התחברות
          // שדות הטופס נרשמים באמצעות signInForm.register
          // והטיפוסים שלהם יתאימו ל-SignInFormData
          <form onSubmit={signInForm.handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="אימייל"
              margin="normal"
              type="email"
              {...signInForm.register("email")} // 'email' הוא מפתח ב-SignInFormData
              error={!!signInForm.formState.errors.email}
              helperText={signInForm.formState.errors.email?.message}
            />
            <TextField
              fullWidth
              label="סיסמה"
              margin="normal"
              type="password"
              {...signInForm.register("password")} // 'password' הוא מפתח ב-SignInFormData
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