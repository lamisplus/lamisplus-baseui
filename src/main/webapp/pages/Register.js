import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import logo200Image from "assets/img/logo/logo_200.png";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "../actions/user";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.firstName && user.lastName && user.userName && user.password) {
      this.props.register(user);
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
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
          <div className={this.props.classes.paper}>
            <img
              src={logo200Image}
              className="rounded"
              style={{ cursor: "pointer" }}
              alt="logo"
            />
            <div className="text-center pt-1">
              <h2>Register</h2>
            </div>
            <form
              className={this.props.classes.form}
              noValidate
              name="form"
              onSubmit={this.handleSubmit}
            >
              <div
                className={
                  "form-group" +
                  (submitted && !user.firstName ? " has-error" : "")
                }
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  type="text"
                  label="First Name"
                  placeholder="First Name"
                  name="firstName"
                  
                  onChange={this.handleChange}
                />
                {submitted && !user.firstName && (
                  <div className="help-block">First Name is required</div>
                )}
              </div>
              <div
                className={
                  "form-group" +
                  (submitted && !user.lastName ? " has-error" : "")
                }
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  type="text"
                  label="Last Name"
                  placeholder="Last Name"
                  name="lastName"
                  
                  onChange={this.handleChange}
                />
                {submitted && !user.lastName && (
                  <div className="help-block">Last Name is required</div>
                )}
              </div>
              <div
                className={
                  "form-group" +
                  (submitted && !user.userName ? " has-error" : "")
                }
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  type="email"
                  label="email"
                  placeholder="your@email.com"
                  name="userName"
                  
                  onChange={this.handleChange}
                />
                {submitted && !user.userName && (
                  <div className="help-block">Username is required</div>
                )}
              </div>
              <div
                className={
                  "form-group" +
                  (submitted && !user.password ? " has-error" : "")
                }
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                />
                {submitted && !user.password && (
                  <div className="help-block">Password is required</div>
                )}
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Register</button>
              </div>
              <div className="text-center pt-1">
                <h6>or</h6>
                <h6>
                  <Link to="/login">Cancel</Link>
                </h6>
              </div>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

function mapState(state) {
  const { registering } = state.registration;
  return { registering };
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

const actionCreators = {
  register: register,
  classes: useStyles,
};

const connectedRegister = connect(mapState, actionCreators)(Register);
export { connectedRegister as Register };
