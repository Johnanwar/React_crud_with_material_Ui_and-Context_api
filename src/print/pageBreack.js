import React from 'react'
// import { makeStyles } from "@material-ui/core";


// const useStyles = makeStyles(theme => ({
//     root: {
//         width:"100%",
//         direction:"rtl"
//     }
// }))
export class ComponentpageBreack extends React.PureComponent {

    render() {
    // const classes = useStyles();
    console.log(this.props.title)

      return (
<div className="print-container" style={{ margin: "0", padding: "0" }}>
  {/* {listOfContent.map(yourContent => ( */}
    <>
      <div className="page-break" />
      <div> gggggggggggggggg</div>
    </>
  {/* )} */}
</div>
      );
    }
  }
