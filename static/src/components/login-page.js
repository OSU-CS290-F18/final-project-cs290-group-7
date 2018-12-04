import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withStyles } from '@material-ui/core/styles';
import { fade } from "@material-ui/core/styles/colorManipulator";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

import Header from "./Header/header";
import Footer from "./Footer/footer";

import * as actionCreators from "../actions/authentication";

const styles = theme => ({
    body: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        paddingTop: "15vh",
        paddingBottom: "15vh",
        backgroundColor: fade(theme.palette.common.black, 0.80),
    },
    title: {
        marginBottom: theme.spacing.unit * 3,
        color: "white",
        textAlign: "center",
    },
    form: {
        textAlign: "center",
    },
    textField: {
        background: fade(theme.palette.common.white, 0.80),
        margin: theme.spacing.unit,
        borderRadius: theme.shape.borderRadius,
        width: "30%",
    }, 
    buttonDiv: {
        display: "block",
        textAlign: "center",
    },
    button: {
        display: "inline-block",
        margin: theme.spacing.unit,
        width: "30%",
        height: theme.spacing.unit * 7,

        '&:disabled': {
            background: fade(theme.palette.common.white, 0.30),
        }
    },
    error: {
        color: "red",
        textAlign: "center",
    }
}); 

function mapStateToProps(state) {
    return {status: state.authentication.status};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isFilled: false,
            error: null,
        };
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter' && this.state.isFilled) {
            this.props.login(this.state.username, this.state.password);
        }
    }

    update(e, field) {
        const nextState = {};
        nextState[field] = e.target.value;
        this.setState(nextState, () => {
            this.isFilled(); 
        });
    }

    isFilled() {
        let valid = false;

        if (this.state.username === "" || !this.state.username) {
            this.setState({error: "Please enter a username."});
        } else if (this.state.password === "" || !this.state.password) {
            this.setState({error: "Please enter a password."});
        } else {
            this.setState({error: null});
            valid = true;
        }

        this.setState({isFilled: valid});
    }

    login(e) {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        const { classes } = this.props;
        return (
        <div onKeyPress={(e) => this._handleKeyPress(e)}>
            <Header /> 
            <Paper elevation={1} className={classes.body}>
                <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.title}
                >
                {this.props.status}
                </Typography>
                <Typography
                    variant="h2"
                    color="inherit"
                    className={classes.title}
                >
                Login Page
                </Typography>
                <form className={classes.form} autoComplete="off">
                    <div>
                        <TextField
                            required
                            id="username"
                            name="username"
                            label="Username"
                            onChange={(e) => this.update(e, "username")}
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            onChange={(e) => this.update(e, "password")}
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                        />
                    </div>
                    <div className={classes.buttonDiv}>
                        <Button 
                            disabled={!this.state.isFilled}
                            variant="contained" 
                            color="primary" 
                            onClick={(e) => this.login(e)}
                            className={classes.button}>
                            Login
                        </Button>
                    </div>
                </form>
                <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.error}
                >
                {this.state.error}
                </Typography>
            </Paper>
            <Footer />
        </div>
        );
    }
}

LoginPage.propTypes = {
    login: PropTypes.func,
}

export default withStyles(styles)(LoginPage);
