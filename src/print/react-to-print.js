import React from 'react'
// import { makeStyles } from "@material-ui/core";


// const useStyles = makeStyles(theme => ({
//     root: {
//         width:"100%",
//         direction:"rtl"
//     }
// }))
export class ComponentToPrint extends React.PureComponent {

    render() {
    // const classes = useStyles();
 
      return (
        <div
        // className={classes.root}
        style={{width:'100%' , direction:"rtl"}}
        >
        <h3
        style={{color:"#000" ,  fontSize:"25px" , margin:"20px "}}
        > {this.props.title} </h3> 

{this.props.code!==null?(
  <h3
        style={{color:"#000" ,  fontSize:"25px" , margin:"20px "}}
        >   كود الموظف :  {this.props.code}</h3> 
):("")}
    


<div style={{color:"#1c538c" ,  fontSize:"17px" , margin:"20px "}}>
       {this.props.values && this.props.values.EmployeeName !== "" ? (<h3> الاسم :        {this.props.values.EmployeeName}</h3>):("")}
       <div style={{margin:"20px 0"}} className="d-flex">

       {this.props.values && this.props.values.FormYearFrom != 0   ? <h3> من تاريخ :     {this.props.values.FormYearFrom}</h3>:("")}
        {this.props.values  && this.props.values.FormYearTo  !=0    ? ( <h3
        style={{padding:"0 20px"}}
        > الى تاريخ :  {this.props.values.FormYearTo}</h3>):("")}
       </div>
    
        {this.props.Dep && this.props.Dep !==0   ? ( <h3> الاداره :     {this.props.Dep}</h3>):("")}
</div>
          <this.props.Table
           customers={this.props.customers}
           SetCustomers = {this.props.SetCustomers}
           remove={this.props.remove}
           id={this.props.id}
           type={this.props.type}
          />
        </div>
      );
    }
  }
