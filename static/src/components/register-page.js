import React, { Component } from "react";

import { withStyles } from '@material-ui/core/styles';
import { fade } from "@material-ui/core/styles/colorManipulator";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

import Header from "./Header/header";
import Footer from "./Footer/footer";

const styles = theme => ({
    body: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        paddingTop: "12vh",
        paddingBottom: "12vh",
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
    }
}); 

class RegisterPage extends Component {
    render() {
        const { classes } = this.props;

        return (
        <div>
            <Header /> 
            <Paper elevation={1} className={classes.body}>
                <Typography
                    variant="h2"
                    color="inherit"
                    className={classes.title}
                >
                Registration Page
                </Typography>
                <form className={classes.form} autoComplete="off">
                    <div>
                        <TextField
                            required
                            id="username"
                            name="username"
                            label="Username"
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
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            id="verify-password"
                            name="verify-password"
                            label="Verify Password"
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                        />
                    </div>
                    <div className={classes.buttonDiv}>
                        <Button variant="contained" color="primary" className={classes.button}>
                            Register
                        </Button>
                    </div>
                </form>
            </Paper>
            <Footer />
        </div>
        );
    }
}

export default withStyles(styles)(RegisterPage);
