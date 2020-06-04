import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo200Image from "assets/img/logo/logo_200.png";

import { register } from "../actions/user";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        LAMISPlus
      </Link>{" "}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  let history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState("");
  const [helperEmailText, setHelperEmailText] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (
      firstName.trim() &&
      lastName.trim() &&
      password.trim() &&
      confirmPassword.trim()
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [firstName, lastName, email, password]);

  function ValidateEmail(email) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  }
  const registerUser = () => {
    let validEmail = ValidateEmail(email);
    if (!validEmail) {
      setEmailError(true);
      setHelperEmailText("You have entred an invalid email address");
    } else if (password !== confirmPassword) {
      setEmailError(false);
      setPasswordError(true);
      setHelperEmailText("");
      setHelperText("Passwords do not match");
    } else {
      setEmailError(false);
      setPasswordError(false);
      setHelperEmailText("");
      setHelperText("");
      register(firstName, lastName, email, password).then(
        (user) => {
          setError(false);
          setHelperText("User registered successfully");
          history.push("/");
        },
        (error) => {
          setError(true);
          setEmailError(true);
          setPasswordError(true);
          setHelperText("Something went wrong");
        }
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || registerUser();
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#fff",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        height: "100%",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img
            src={logo200Image}
            className="rounded"
            style={{ cursor: "pointer" }}
            alt="logo"
          />
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              error={error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              type="text"
              label="First Name"
              placeholder="First Name"
              name="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
            />
            <TextField
              error={error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              type="text"
              label="Last Name"
              placeholder="Last Name"
              name="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
            />
            <TextField
              error={emailError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="email"
              placeholder="your@email.com"
              name="email"
              helperText={helperEmailText}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
            />
            <TextField
              error={passwordError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
            />
            <TextField
              error={passwordError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              helperText={helperText}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => registerUser()}
              disabled={isButtonDisabled}
            >
              Register
            </Button>
            <Grid container>
              <Grid item></Grid>
            </Grid>
            {/* <Box mt={5}>
              <Copyright />
            </Box> */}
          </form>
        </div>
      </Container>
    </div>
  );
}
