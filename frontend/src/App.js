import React from 'react';
import './App.css';
import Card from './Card';
import {useState,useEffect} from "react";
import Header from './Header';
import Modal from 'react-modal';
import axios from 'axios';
Modal.setAppElement('#root')
function App() {
   const products=[{
    id:1,
    title:"samsung",
    price:2500,
    img:'https://images-na.ssl-images-amazon.com/images/I/71yXShgxvpL._SX425_.jpg'
  },
  {
    id:2,
    title:"Nokia",
    price:1500,
    img:'https://www.slashgear.com/wp-content/uploads/2018/10/samsung-galaxy-a6s-2.jpg'
 },
 {
   id:3,
   title:"vivo",
    price:11500,
    img:'https://cdn.vox-cdn.com/thumbor/v97OD-MBgNjw8p5crApucVs9RB8=/0x0:2050x1367/1800x1800/filters:focal(1025x684:1026x685)/cdn.vox-cdn.com/uploads/chorus_asset/file/22022572/bfarsace_201106_4269_012.0.jpg'
 },
  {
    id:4,
    title:"Redmi",
    price:1500,
    img:'https://www.slashgear.com/wp-content/uploads/2018/10/samsung-galaxy-a6s-2.jpg'
 },
 {
   id:5,
    title:"xiaomi",
    price:2500,
    img:'https://images-na.ssl-images-amazon.com/images/I/71yXShgxvpL._SX425_.jpg'
  },
  {
   id:6,
   title:"onePlus",
    price:11500,
    img:'https://cdn.vox-cdn.com/thumbor/v97OD-MBgNjw8p5crApucVs9RB8=/0x0:2050x1367/1800x1800/filters:focal(1025x684:1026x685)/cdn.vox-cdn.com/uploads/chorus_asset/file/22022572/bfarsace_201106_4269_012.0.jpg'
 }
 ]
 
  const [cartlist,setcartlist]=useState([]);
  const [total,settotal]=useState(0);
  const [showCheckout,setShow]=useState(false);
  const [userdata,setUserdata]=useState({
    name: '',email:'',address:''
  });
  const [isShow,showModal]=useState(false);
  const [order,setOrder]=useState('')
  const [product,setProducts]=useState(products)
  
  let name,value;
  const changeHandler=(e)=>{
    name=e.target.name
    value=e.target.value
    setUserdata({...userdata,[name]:value});
  }
  const submitHandler=(e)=>{
    e.preventDefault();
    /*const {name,email,address}=userdata;
    const cart=cartlist.map((res)=>{return res.title})*/
    const order={
     name:userdata.name,
     email:userdata.email,
     address:userdata.address,
     Items:cartlist.map((res)=>{return res.title}),
     total:total,
     orderAt:new Date()
    }
   //alert('ORDER PLACED SUCCESSFULLY'+"\n__________________\n"+'Name:-  '+name+"\r\n"+'Email:-  '+email+"\r\n"+'Address:-  '+address+"\r\n"+'Products:-  '+JSON.stringify(cart)+"\r\n"+'Items:-  '+cart.length+"\r\n"+'Amount:-  '+total+"\r\n"+orderAt);
   

   axios.post("http://localhost:5000/api/order",order)
   .then((res)=>setOrder(res.data)).catch((err)=>{console.log(err.message)})
   setUserdata({name: '',email:'',address:''})
   localStorage.clear()
  }

  let searchFilter=(e)=>{
    console.log(e.target.value)
    if(e.target.value===""){
      setProducts(products)
    }
    else{
    setProducts(product.filter(
    (prd)=>prd.title.toLowerCase().indexOf(e.target.value)>=0))
    }
  }

  let buttonclick=(obj)=>{
    setcartlist([...cartlist,obj]);
    settotal(total+obj.price);
 //   localStorage.setItem('cartlist', JSON.stringify(cartlist));
  }

  let removecart=(obj)=>{
    let newcart=cartlist.filter(ob=>ob.id!==obj.id)
    setcartlist([...newcart])
    settotal(total-obj.price);
  }

  useEffect(() => {
    const cartlist = JSON.parse(localStorage.getItem('cartlist'));
    const total = JSON.parse(localStorage.getItem('total'));
    if (cartlist&&total) {
      setcartlist(cartlist);
      settotal(total);
    }
  }, []);
  
    useEffect(() => {
    localStorage.setItem('cartlist', JSON.stringify(cartlist));
    localStorage.setItem('total', JSON.stringify(total));
  }, [cartlist,total]);
    
    useEffect(()=>{   
    setcartlist([]);
    settotal(0)
    },[order])

  return (        
    <div className="container-fluid">
    <Header onSearch={searchFilter}/>
    <div class="form-inline" style={{display:"flex",justifyContent:"space-around",padding:"1rem"}}>
    <h3 style={{marginTop:"0.5rem",fontSize:"2rem",alignText:"center"}}>stock:{product.length}</h3>
    <div><label class="mt-sm-2" style={{marginTop:"0.5rem",fontSize:"1.5rem"}}>SEARCH:</label>
    <input class="form-control mr-sm-2" type="search"
     placeholder="Search" aria-label="Search" onChange={searchFilter} /></div>
   </div> 
      <div className="container-fluid" style={{width:"110rem",float:"left",flexWrap:"no-wrap"}}>
      <div className="row">
      {product.map((product)=>{
        return <Card productdata={product} handleclick={buttonclick}></Card>
      })}
      </div>
      </div>
       
      <div className="col-lg-2" style={{width:"19rem",float:"right"}}>
      <div className="row">
      <h1 style={{backgroundColor:"orange"}}>Cart<i className="fas faShoppingCart"></i><sup style={{borderRadius:"50%",backgroundColor:"white"}}>{cartlist.length}</sup></h1>
    {cartlist.length===0?(<div><h3>cart is empty</h3></div>):(<ul class="list-group">
      {cartlist.map((item)=>{
   return <li class="list-group-item d-flex justify-content-between align-items-center">
    {item.title}
    <span class="badge badge-primary badge-pill">{item.price}</span>
    <span>
    <button class="btn btn-xs btn-danger" onClick={()=>removecart(item)}>x</button>
      </span>
    </li>})
     }
 </ul>)}
<h3 style={{backgroundColor:"white"}}>Total-${total}</h3>
<div>
<button type="button" class="btn btn-warning btn-block" onClick={()=>setShow(true)}>PROCEED</button>
</div>
<hr/>
{order&&(<Modal isOpen={isShow}>
<button type="submit" class="btn btn-warning" onClick={()=>showModal(false)}>close</button>
<div style={{display:"flex",flexDirection:"column",paddingLeft:"35rem"}}>
<h1 style={{color:"green"}}>Order placed succesfully</h1>
<h3>Name:- {order.name}</h3>
<h3>Email:- {order.email}</h3>
<h3>Address:-{order.address}</h3>
<h3>Items:- {order.Items.map((data)=><li style={{listStyle:"none",display:"inline"}}>{data},</li>)}</h3>
<h3>Amount:${order.total}</h3>
<h3>OrderAt:- {order.orderAt}</h3>
</div>
</Modal>)}

{showCheckout&&(
<div>
  <h3 style={{backgroundColor:"orange"}}>Checkout Form</h3>
<form onSubmit={submitHandler}>
  <label>Name</label>
  <input type="text" name="name" value={userdata.name} onChange={changeHandler}/>
  <label>Email</label>
  <input type="text" name="email" value={userdata.email} onChange={changeHandler}/>
  <label>Address</label>
  <input type="text" name="address" value={userdata.address} onChange={changeHandler}/>

  <button type="submit" class="btn btn-warning btn-block" onClick={()=>showModal(true)}>CheckOut</button></form>
</div>)
}
      </div>
      </div>
     
    </div>
  );
}

export default App;
