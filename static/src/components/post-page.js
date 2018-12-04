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

import * as actionCreators from "../actions/post";

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

        '&:disabled': {
            background: fade(theme.palette.common.white, 0.30),
        }
    },
    fileInput: {
        display: "none",
    },
    error: {
        color: "red",
        textAlign: "center",
    },
});

function mapStateToProps(state) {
    return {status: state.post.status,
            token: state.authentication.token};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const genres = [
    'None',
    'Blues',
    'Classical',
    'Country',
    'Rock',
    'Jazz',
    'Metal',
    'Pop',
    'Electronic',
]

@connect(mapStateToProps, mapDispatchToProps)
class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listAnchor: null,
            listIndex: 0,
            title: null,
            file: null,
            isFilled: false,
        };
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter' && this.state.isFilled) {
            this.props.post(this.props.token, 
                            this.state.title, 
                            genres[this.state.listIndex], this.state.file);
        }
    }

    clickList(e) {
        this.setState({listAnchor: e.currentTarget});
    }

    closeMenu() {
        this.setState({listAnchor: null});
    }

    clickMenu(e, index) {
        this.setState({listIndex: index, listAnchor: null}, () => {
            this.isFilled();
        }); 
    }

    uploadFile(file) {
        this.setState({file: file}, () => {
            this.isFilled();
        });
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
        
        if (!this.props.token) {
            this.setState({error: "Please log on."});
        } else if (this.state.title === "" || !this.state.title) {
            this.setState({error: "Please enter a title."});
        } else if (this.state.title.length > 100) {
            this.setState({error: "Title is too long (100 char max)."});
        } else if (genres[this.state.listIndex] === "None") {
            this.setState({error: "Please select a genre."});
        } else if (!this.state.file) {
            this.setState({error: "Please upload a file."});
        } else {
            this.setState({error: null});
            valid = true;
        }

        this.setState({isFilled: valid});
    }

    post(e) {
        e.preventDefault();
        this.props.post(this.props.token, 
                        this.state.title, 
                        genres[this.state.listIndex], this.state.file);
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
                        maxLength="2"
                        onChange={(e) => this.update(e, "title")}
                    />
                </div>
                <div className={classes.buttonDiv}>
                    <List component="nav">
                        <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="lock-menu"
                            aria-label="Genre"
                            onClick={(e) => this.clickList(e)}
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
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: "center",
                            horizontal: "center"
                        }}
                    >
                        {genres.map((genre, index) => (
                            <MenuItem
                                key={genre}
                                selected={index === this.state.listIndex}
                                onClick={(e) => this.clickMenu(e, index)}
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
                        encType="multipart/form-data"
                        onChange={(e) => this.uploadFile(e.target.files[0])}
                    />
                    <label htmlFor="upload-button">
                        <Button variant="contained" component="span" color="secondary" className={classes.button}>
                            File Upload
                        </Button>
                    </label>
                </div>
                <div className={classes.buttonDiv}>
                    <Button 
                        disabled={!this.state.isFilled}
                        variant="contained" 
                        color="primary" 
                        onClick={(e) => this.post(e)}
                        className={classes.button}>
                        Submit
                    </Button>
                </div>
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

PostPage.propTypes = {
    post: PropTypes.func,
}

export default withStyles(styles)(PostPage);
