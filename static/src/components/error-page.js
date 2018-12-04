import React, { Component } from "react";

import { withStyles } from '@material-ui/core/styles';
import { fade } from "@material-ui/core/styles/colorManipulator";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Header from "./Header/header";
import Footer from "./Footer/footer";

const styles = theme => ({
    body: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        paddingTop: "30vh",
        paddingBottom: "30vh",
        backgroundColor: fade(theme.palette.common.black, 0.80),
    },
    title: {
        marginBottom: theme.spacing.unit * 3,
        color: "white",
        textAlign: "center",
    },
}); 

class ErrorPage extends Component {
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
                404: Resource Not Found :(
                </Typography>
            </Paper>
            <Footer />
        </div>
        );
    }
}

export default withStyles(styles)(ErrorPage);
