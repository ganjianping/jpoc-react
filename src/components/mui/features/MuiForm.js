import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, Typography, Grid } from '@mui/material';

const MuiForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    rememberMe: false,
    multiline: '',
    number: '',
    search: '',
    tel: '',
    url: '',
  });

  const [emailError, setEmailError] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    if (name === 'email') {
      // check for valid email address
      const emailRegex = /^\S+@\S+\.\S+$/;
      setEmailError(!emailRegex.test(value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            variant="outlined"
            autoComplete="email"
            type="email"
            required
            error={emailError}
            helperText={emailError ? 'Please enter a valid email address' : ''}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            variant="filled"
            autoComplete="current-password"
            type="password"
            required
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            fullWidth
            label="Number"
            name="number"
            value={values.number}
            onChange={handleChange}
            variant="standard"
            type="number"
            InputProps={{ inputProps: { min: 0, max: 10 } }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            fullWidth
            label="Search"
            name="search"
            value={values.search}
            onChange={handleChange}
            variant="outlined"
            type="search"
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            fullWidth
            label="Tel"
            name="tel"
            value={values.tel}
            onChange={handleChange}
            variant="outlined"
            type="tel"
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            fullWidth
            label="URL"
            name="url"
            value={values.url}
            onChange={handleChange}
            variant="outlined"
            type="url"
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            fullWidth
            disabled
            label="Disabled"
            name="disabled"
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <TextField
            fullWidth
            label="Read Only"
            defaultValue="Hello World"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Multiline"
            name="multiline"
            value={values.multiline}
            onChange={handleChange}
            variant="outlined"
            multiline
            maxRows={8}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                checked={values.rememberMe}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Remember me"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MuiForm;
