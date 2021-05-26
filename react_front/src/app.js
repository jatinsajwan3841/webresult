import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem"
import Load from "./Load";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import About from "./about";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

const useStyles = makeStyles((theme) => ({
    beg:{
      marginTop: theme.spacing(10),
    },
    form: {
      width: '100%', 
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
    const [response, setresponse] = React.useState(0);
    const [load, setload] = React.useState(false);

    
    const handleBranch = (event) => {
        setbranch(event.target.value);
        if (event.target.value === 'Choose') setbrer(true); else setbrer(false);
    };

    const handleNaam = (event) => {
        setname(event.target.value)
    };

    const Response = () =>{
      let url = 'https://result1822.herokuapp.com/about?name=' + name + '&branch=' + branch;
            fetch(url)
            .then(response => response.json())
            .then(data => setresponse(data));
            
    };

    useEffect(() => {
      if(response == 0){}
      else if(response === "nf") {
        setload(false);
        setTimeout(() => setresponse(0), 4000);
      }
  },[response]
  );

  const fvalidate = (event) => {
        event.preventDefault();
        if (branch === 'Choose'){
            setbrer(true)
        }
        else{
          setload(true)
          Response();
        }
    }

    return (<>
      {response === 0 || response === "nf" ? 
        <>
        {load ? <Load/> : null}
        <Container maxWidth="sm" >
              <Snackbar
                  anchorOrigin = {{vertical : 'top', horizontal: 'center' }}
                  open={response === "nf" ? true : false}>
                    <SnackbarContent style={{ backgroundColor: 'rgba(255,0,0,0.7)' }} 
                        message="The entered data didn't matched, please try again !" />
              </Snackbar>
            <h2 className={classes.beg}> Hello {name}</h2>
            <p>This is a Django - Reactjs based project where anyone from the batch 2018-22 can have a quick reference of their performance
                 in different semesters by a table indicating minimal necessary things and a graph.</p>
            <form className={classes.form} onSubmit={fvalidate}>
                <TextField name="branch"
                          id="branch" 
                          error={brer}
                          select
                          label="branch"
                          fullWidth
                          helperText= {brer ? 'please choose correct branch' : 'please choose your branch' }
                          value = {branch}
                          onChange={handleBranch} >
                          {branches.map ((option) =>(
                              <MenuItem key={option.value} value={option.value}>
                              {option.label}
                              </MenuItem>
                          ))}
                </TextField>

                {branch !== 'Choose' ? <TextField style={{marginTop: "10px"}} type={branch === 'CE' ? "number" : "text"}
                          required 
                          fullWidth 
                          id="name" 
                          name="name"
                          label={branch === 'CE' ? "College-ID" :  "Name"}
                          helperText={branch === 'CE' ? "Please enter your College-ID" :  "Please enter your full name" }
                          onInput={handleNaam} />
                        :
                        null}

                <center>
                  <Button className={classes.submit} type="submit" variant="contained" color="primary" id="smb" startIcon={<DoubleArrowIcon/>} >
                    {load ? "loading..." : "Submit" }
                  </Button></center>                  
            </form>
        </Container></>
        :
        <About data={response} name={name}/>
      }
      </>
    )
}
