import React from 'react';
//import {Link} from 'react-router-dom'
function Header(props){
  return (
<div>  
<div style={{backgroundColor:"orange"}}>
  <nav class="navbar navbar-light bg-light justify-content-between">
    <h3 class="navbar-brand" style={{padding:"15px",margin:"0",fontSize:"3rem"}}>MINIcart</h3>
  
   <div class="form-inline" style={{display:"flex",justifyContent:"flex-end",padding:"1rem"}}>
    <label style={{marginTop:"0.5rem",fontSize:"1.5rem"}}>Search</label>
    <input class="form-control mr-sm-2" type="search"
     placeholder="Search" aria-label="Search" onChange={props.onSearch} />
   </div>
  </nav>
</div>
<div style={{backgroundColor:"black",display:"flex",justifyContent:"center"}}>
<h3 style={{textDecoration:"underline",color:"white"}}>HAPPY SHOPPING</h3>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRufWnuvTfIXpd8ZngKyXTXTdJc7duE1DgMKg&usqp=CAU" style={{width:"4rem",height:"5rem",paddingTop:"1rem"}}/></div>
</div>

  );
}
export default Header;