import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import TitleIcon from "@material-ui/icons/Title";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

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
    search: {
        display: "flex",
        margin: "auto",
        width: "90%",
        backgroundColor: fade(theme.palette.common.white, 0.80),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.90),
        },
        borderRadius: theme.shape.borderRadius,
    },
    iconDiv: {
        width: theme.spacing.unit * 9,
        display: "flex",
    },
    icon: {
        margin: "auto",
    },
    input: {
        width: "100%",
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    genre: {
        display: "inline-block",
        margin: theme.spacing.unit,
        width: "40%",
        background: theme.palette.secondary.main,
        textCAlign: "center",
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            backgroundColor: fade(theme.palette.secondary.dark, 1.0),
        },
    },
    genreText: {
        textAlign: "center",
        color: "white"
    },
    buttonDiv: {
        display: "block",
        textAlign: "center",
    },
    button: {
        display: "inline-block",
        margin: theme.spacing.unit,
        width: "40%",
    },
    fileInput: {
        display: "none",
    }
});

const genres = [
    'Rock',
    'Country',
    'Metal',
]

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listAnchor: null,
            listIndex: 0,
        };
    }

    clickedList(e) {
        this.setState({listAnchor: e.currentTarget});
    }

    closeMenu() {
        this.setState({listAnchor: null});
    }

    clickedMenu(e, index) {
        this.setState({listIndex: index, listAnchor: null}); 
    }

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
                Post a Song
                </Typography>
                <div className={classes.search}>
                    <div className={classes.iconDiv}>
                        <TitleIcon className={classes.icon}/>
                    </div>
                    <InputBase
                        color="inherit"
                        placeholder="Title of song..."
                        className={classes.input}
                    />
                </div>
                <div className={classes.buttonDiv}>
                    <List component="nav">
                        <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="lock-menu"
                            aria-label="Genre"
                            onClick={(e) => this.clickedList(e)}
                            className={classes.genre}
                        >
                            <ListItemText
                                disableTypography
                                primary={<Typography 
                                            variant="body2"
                                            className={classes.genreText}
                                         >
                                         GENRE
                                         </Typography>}
                                secondary={<Typography
                                            variant="body1"
                                            className={classes.genreText}
                                           >
                                           {genres[this.state.listIndex]}
                                           </Typography>} 
                            />
                        </ListItem>
                    </List>
                    <Menu
                        id="lock-menu"
                        anchorEl={this.state.listAnchor}
                        open={Boolean(this.state.listAnchor)}
                        onClose={(e) => this.closeMenu()}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                    >

                        {genres.map((genre, index) => (
                            <MenuItem
                                key={genre}
                                selected={index === this.state.listIndex}
                                onClick={(e) => this.clickedMenu(e, index)}
                            >
                                {genre}
                            </MenuItem>
                        ))}
                    </Menu>
                    <input
                        accept=".mp3"
                        className={classes.fileInput}
                        id="upload-button"
                        type="file"
                    />
                    <label htmlFor="upload-button">
                        <Button variant="contained" component="span" color="secondary" className={classes.button}>
                            File Upload
                        </Button>
                    </label>
                </div>
                <div className={classes.buttonDiv}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </div>
            </Paper>
            <Footer />
        </div>
        );
    }
}

export default withStyles(styles)(PostPage);
