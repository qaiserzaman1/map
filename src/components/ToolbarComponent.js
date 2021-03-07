// Import React
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Slide from '@material-ui/core/Slide';

// Import retract button custom component
import RetractButton from './RetractButton.js';

const useStyles = makeStyles((theme) => ({
    toolbarContainer: {
        position: "absolute",
        top: 102,
        right: "50%",
        marginRight: -210 / 2,
        height: 30,
        width: 190,
        zIndex: 1,
        display: "flex",
        flexFlow: "row",
        justifyContent: "flex-end",
        borderStyle: "ridge",
        borderColor: theme.palette.border,
        backgroundImage: theme.palette.backgroundImage.main,
        WebkitBorderImage: theme.palette.borderImage
    },
    toolbarButton: {
        fontSize: 12,
        margin: 0,
        padding: 0,
        height: "100%",
    }
}));

function ToolbarComponent(props) {
    const classes = useStyles();
    const lassoButtonText = props.lassoSelecting ? "Cancel" : "Lasso"; // TODO: using switches might be better in these situations
    const lassoButtonColor = props.lassoSelecting ? "secondary" : "default";
    const eraserButtonText = props.erasing ? "Cancel" : "Erase";
    const eraserButtonColor = props.erasing ? "secondary" : "default";
    const pickingButtonText = props.picking ? "Cancel" : "Pick";
    const pickingButtonColor = props.picking ? "secondary" : "default";
    const [display, setDisplay] = React.useState(true);
    return (
        <Slide direction="down" in={display} unmountOnExit={false} mountOnEnter={false}>
            <div className={classes.toolbarContainer} id="toolbar">
                <Button
                    color={eraserButtonColor}
                    className={classes.toolbarButton}
                    onClick={() => {
                        props.updatePicking(false, () => {
                            props.updateErasing(!props.erasing);
                        })
                    }}
                >
                    {eraserButtonText}
                </Button>
                <Button
                    color={lassoButtonColor}
                    className={classes.toolbarButton}
                    onClick={() => {
                        props.updatePicking(false, () => {
                            props.updateLassoSelecting(!props.lassoSelecting);
                        })
                    }}
                >
                    {lassoButtonText}
                </Button>
                <Button
                    color={pickingButtonColor}
                    className={classes.toolbarButton}
                    onClick={() => {
                        props.updateLassoSelecting(false, () => {
                            props.updateErasing(false, () => {
                                props.updatePicking(!props.picking);
                            });
                        });
                    }}
                >
                    {pickingButtonText}
                </Button>
                <RetractButton direction="up" top={36} left={"50%"} checked={display} onClick={() => setDisplay(!display)} />
            </div>
        </Slide>
    );
}

export default React.memo(ToolbarComponent);