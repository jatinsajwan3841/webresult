import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import HomeIcon from '@material-ui/icons/Home';
import LineGraph from "./lchart";


export default function About(props) {

    const json = props.data.map(function(x) {
      return {    
          "sem": x[0],
          "marks": x[1],
          "percentage": x[2]
      }
  })

  return (
      <Container maxWidth="md">
          <Button variant="contained" color="primary" startIcon={<HomeIcon/>} href="/webresult/">Home</Button>
          <h2 style={{marginTop:6}}> Hello {props.name}</h2>
            <TableContainer component={Container}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><b>Sem</b></TableCell>
                    <TableCell align="center"><b>Marks</b></TableCell>
                    <TableCell align="center"><b>Percentage</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {json.map((row) => (
                    <TableRow key={row.sem}>
                      <TableCell component="th" scope="row" align="center">
                        {row.sem}
                      </TableCell>
                      <TableCell align="center">{row.marks}</TableCell>
                      <TableCell align="center">{row.percentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          <LineGraph data={json}/>
    </Container>
  );
}
