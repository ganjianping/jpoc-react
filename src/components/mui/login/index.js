import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Link, Grid, Box, Typography, Paper, FormControlLabel,Checkbox } from '@mui/material';
import backgroundImg from './background-image.jpeg';

const Login = () => {
  const [values, setValues] = useState({
    email: 'demo',
    password: '123456',
    rememberMe: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked  } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values.email + ' ' + values.password + ' ' + values.rememberMe);
    navigate('/mui/header/dashboard');
  };

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="User ID / Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  name="rememberMe"
                  checked={values.rememberMe}
                  onChange={handleChange}
                  color="primary" />
              }
              label="Remember me"
              sx={{ mt: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              sx={{ mt: 2, mb: 4 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    margin: 0,
  },
  image: {
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    animation: '$slideBg 200s ease infinite',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  '@keyframes slideBg': {
    '0%': {
      backgroundPosition: '0 0',
    },
    '50%': {
      backgroundPosition: '100% 0',
    },
    '100%': {
      backgroundPosition: '0 0',
    },
  },
}));