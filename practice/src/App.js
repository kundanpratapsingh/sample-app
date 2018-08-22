import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TextField } from 'react-md'; 
import { Button } from 'react-md';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TablePagination,
} from 'react-md';
class App extends Component {
constructor(){
super();
this.state={
  users:[]
} 
this.onAdd=this.onAdd.bind(this); 
}

componentDidMount(){
  var that=this;
 fetch("http://localhost:8001/api",{
      method: 'get', // or 'PUT'
    // data can be `string` or {object}!  
      headers: {
      'Content-Type': 'application/json'
      }
    })
      .then((res) => {
         return res.json();
      })   
      .then((user)=>
      {
         that.setState({users:user});
      })
      .catch((err) => {

        console.log("AXIOS ERROR: ", err);
})
}
onAdd(){
    let data={
       username:this.username.value,  
        email:this.email.value,
          mobile:this.mobile.value  
         };
console.log(data);
fetch("http://localhost:8001/api/forms",{
      method: 'post', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
         'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
      }
    })
        .then((res)  =>  {
    let newValue = [...this.state.users, data];
    this.setState({ users: newValue });
            console.log("hello");
        })
        .catch((err)  =>  {
     console.log("AXIOS ERROR: ",  err);
  })
}  
     render() {
    
    return ( 
      <div className="App">
      <div className="md-grid">
       <div className="md-grid md-cell--6">
       
  <TextField
      id="floating-center-title"
      label="Username"
     ref={TextField => this.username = TextField}
      lineDirection="center"
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="floating-center-title"
      label="Email"
      lineDirection="center"
       ref={TextField => this.email = TextField}
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="floating-center-title"
      label="Mobile"
      lineDirection="center"
       ref={TextField => this.mobile= TextField}
      className="md-cell md-cell--bottom"
    />
 <Button flat onClick={this.onAdd.bind(this)}>Add</Button>
    </div>
    <div className="md-grid md-cell--6">
          <DataTable baseId="simple-pagination">
        <TableHeader>
          <TableRow selectable={false}>
           <TableColumn>Username</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Mobile</TableColumn>
               
          </TableRow>
        </TableHeader>
        <TableBody> 
          {this.state.users.map((dat,key) => (
            <TableRow key={key} selectable={false}>
              <TableColumn>{dat.username}</TableColumn>
              <TableColumn>{dat.email}</TableColumn>
              <TableColumn>{dat.mobile}</TableColumn>
              </TableRow>
          ))}
        </TableBody>
         </DataTable>       
    </div>
      </div>
      </div>
    );
  }
}

export default App ;
