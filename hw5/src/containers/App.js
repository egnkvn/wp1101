import React, { Component } from "react";
import Container from '@mui/material/Container';
import { makeStyles } from '@material-ui/styles';
import { Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";

const usestyle = makeStyles({
    root: {
        marginTop: 60,
    },
    button: {
        width: 130,
        height: 130,
        fontSize: 50,
    },
    INPUT: {
        height: 60,
        width: 130 * 4,
        fontSize: 50,
        textAlign: "right"
    }
});

function App() {

    const classes = usestyle();

    const [Result, setResult] = useState("");
    const [Done, setDone] = useState(0);
    const inputRef = useRef(null);

    function Click(x) {
        if (Done == 1)
            setResult("" + x.target.name);
        else
            setResult(Result + x.target.name);
        setDone(0);
    }

    function Clear() {
        setResult("");
    }

    function DEL() {
        setResult(Result.slice(0, Result.length - 1));
    }

    function calculate() {
        if (Result == "Error")
            setResult("");
        else {
            try {
                let x = eval(Result).toString();
                if (x == "Infinity")
                    setResult("Error");
                else
                    setResult(x);
            } catch (error) {
                setResult("Error");
            }
        }
        setDone(1);
    }

    function Percent() {
        if (Result == "Error")
            setResult("");
        else {
            try {
                let x = eval(Result).toString();
                if (x == "Infinity")
                    setResult("Error");
                else {
                    x = x + "*100";
                    setResult(eval(x).toString());
                }
            } catch (error) {
                setResult("Error");
            }
        }
        setDone(1);
    }

    function change() {
        if (Result == "Error")
            setResult("");
        else {
            try {
                let x = eval(Result).toString();
                if (x == "Infinity")
                    setResult("Error");
                else {
                    x = eval(x);
                    x = -(x);
                    setResult(eval(x).toString());
                }
            } catch (error) {
                setResult("Error");
            }
        }
        setDone(1);
    }

    return (
        <Container maxWidth="sm" className={classes.root}>
            <form >
                <input type="text" className={classes.INPUT} value={Result} ref={inputRef}></input>
            </form>

            <Button onClick={Clear} className={classes.button} variant="contained" >C</Button>
            <Button onClick={change} className={classes.button}>+/-</Button>
            <Button onClick={Percent} className={classes.button}>%</Button>
            <Button onClick={DEL} className={classes.button} variant="outlined">DEL</Button>

            <Button name="7" onClick={Click} className={classes.button}>7</Button>
            <Button name="8" onClick={Click} className={classes.button}>8</Button>
            <Button name="9" onClick={Click} className={classes.button}>9</Button>
            <Button name="/" onClick={Click} className={classes.button}>/</Button>

            <Button name="4" onClick={Click} className={classes.button}>4</Button>
            <Button name="5" onClick={Click} className={classes.button}>5</Button>
            <Button name="6" onClick={Click} className={classes.button}>6</Button>
            <Button name="*" onClick={Click} className={classes.button}>*</Button>

            <Button name="1" onClick={Click} className={classes.button}>1</Button>
            <Button name="2" onClick={Click} className={classes.button}>2</Button>
            <Button name="3" onClick={Click} className={classes.button}>3</Button>
            <Button name="-" onClick={Click} className={classes.button}>-</Button>

            <Button name="0" onClick={Click} className={classes.button}>0</Button>
            <Button name="." onClick={Click} className={classes.button}>.</Button>
            <Button onClick={calculate} className={classes.button}>=</Button>
            <Button name="+" onClick={Click} className={classes.button}>+</Button>

        </Container >
    )
}

export default App;