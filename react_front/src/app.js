import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem"
import { render } from "react-dom";
import Load from "./Load";
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import About from "./about";

const useStyles = makeStyles((theme) => ({
    beg:{
      marginTop: theme.spacing(10),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3),
    },
  }));

const branches = [
    {
      value: 'Choose',
      label: 'Choose',
    },
    {
      value: 'C S',
      label: 'CSE',
    },
    {
      value: 'EC',
      label: 'ECE',
    },
    {
      value: 'EE',
      label: 'EE',
    },
    {
      value: 'CE',
      label: 'CE'
    },
    {
      value: 'ME',
      label: 'ME',
    },
    {
      value: 'BT',
      label: 'BT',
    },
  ];



export default function App() {
    const classes = useStyles();
    const [branch, setbranch] = React.useState('Choose');
    const [name, setname] = React.useState('')
    const [brer, setbrer] = React.useState(false)
    const [brhelp, setbrhelp] = React.useState('please choose your branch')
    const [response, setresponse] = useState(0);

    
    const handleBranch = (event) => {
        setbranch(event.target.value);
        if (event.target.value == 'CE'){
            render(
                <TextField type="number"
                 required 
                 fullWidth 
                 id="name" 
                 name="name"
                 label="College-ID" 
                 helperText="Please enter your College-ID" 
                 onInput={handleNaam} />,
                 document.getElementById("next")
            )
        }else{
            render(
                <TextField
                 required 
                 fullWidth 
                 id="name" 
                 name="name"
                 label="Name" 
                 helperText="Please enter your full name" 
                 onInput={handleNaam} />,
                 document.getElementById("next")
            )
        }
    };
    const handleNaam = (event) => {
        setname(event.target.value)
    };

    const Response = (name, branch) =>{
      let url = 'https://result1822.herokuapp.com/about?name=' + name + '&branch=' + branch;
            fetch(url)
            .then(response => response.json())
            .then(data => setresponse(data));
            
    };

    useEffect(() => {
      if(response == 0){}
      else if(response == "nf"){
          document.getElementById('smb').innerText = 'Submit';  
          return(
          render(
          "The data didn't matched, please try again",
          document.getElementById("error")
          ))
      }
      else{
        render(
          <About data={response} name={name}/>,
          document.getElementById("new")
        )
      }
  },[response]
  );

  const fvalidate = (event) => {
        if (branch == 'Choose'){
            event.preventDefault();
            setbrhelp ('please choose correct branch');
            setbrer(true)
        }
        else{
          event.preventDefault();
          render(<Load/>,
            document.getElementById('load')
            )
          document.getElementById('smb').innerText = 'loading...';
          Response(name, branch);
        }
    }

    return (
      <div id="new">
        <div id="load" />
        <Container maxWidth="sm" >
            <b id="error"></b>
            <h2 className={classes.beg}> Hello {name}</h2>
            <p>This is a Django - Reactjs based project where anyone from the batch 2018-22 can have a quick reference of their performance
                 in different semesters by a table indicating minimal necessary things and a graph.</p>
            <form className={classes.form} onSubmit={fvalidate} method="GET">
                <TextField name="branch"
                id="branch" 
                error={brer}
                select
                label="branch"
                fullWidth
                helperText= {brhelp}
                value = {branch}
                onChange={handleBranch} >
                {branches.map ((option) =>(
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
                <div id = "next" style={{marginTop: "10px"}}></div>
                <center>
                <Button className={classes.submit} type="submit" variant="contained" color="primary" id="smb" >Submit</Button></center>
            </form>
        </Container>
      </div>
    )
}