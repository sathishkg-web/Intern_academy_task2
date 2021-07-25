import React from "react";
function Card(props){
return(
<div className="col-lg-4">
 <div class="card" style={{width:"18rem",backgroundColor:"white",margin:"1rem"}}>
    <img class="card-img-top" src={props.productdata.img}
     style={{width:"100%",height:"100%"}} alt="Card image cap"/>
     <div class="card-body">
       <h4 class="card-title" style={{textAlign:"center"}}>{props.productdata.title}</h4>
       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
       <a href="#" class="btn btn-primary">{props.productdata.price}</a>
       <button class="btn btn-danger" onClick={()=>props.handleclick(props.productdata)}>ADD to CART</button>
      </div>
  </div>
  <hr/>
</div>);
}
export default Card;