
import './App.css'
import axios from 'axios' 
import { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'

function App() { 
  const handleOpenRazorpay = (data)=>{
    const option = {
      key:"rzp_test_EOldoKUrvfFCY4" ,
      amount:Number(data.amount),
      currency:data.currency,
      name:"My company name",
      order_id:data.id,
      handler:function(response){
        console.log(response,"agr success ho jae tb ta hai");
        axios.post('http://localhost:5500/check/verify',{response:response}).then(res=>{
          console.log(res,"verify alai");
        }).catch(err=>{
          console.log(err,"verify wala");
        })
      }

    }
    const rzp = new window.Razorpay(option)
    rzp.open()
  }
  const handlePayment = async(amount)=>{
    const _data = {amount:amount}
    axios.post('http://localhost:5500/check/orders',_data).then(res=>{
      handleOpenRazorpay(res.data.data)
    }).catch(err=>{
      console.log(err);
    })
  }

  const [product] = useState({
    name:'rohit thakur',
    price:200,
    description:'stripe method'
  })
 
  const handeltoken = async(token, address) =>{ 
    const response = await axios.post('http://localhost:5500/stripe/checkout',{token, address})
     alert(response.status);
      }

  return (
    <>
      <button onClick={()=> handlePayment(100)}>Pay kro bro</button>
  <div>
    <button onClick ={ ()=>{handeltoken()}}></button>
  </div>
   <div>
        <StripeCheckout 
        stripeKey='pk_test_51NIp51SAEEUorj2F56X7LpMYwp63x9pZyekcYl2BdKUuzw8YTalnFXMYz9mC2rNf3ZC8qtXqsVHYRHHeR41SKwmg00lw276SpU'
        token={handeltoken}
        ammount={product.price * 100}
        name={product.name}
        billingAddress
        shippingAddress
        />
      </div>
    </>
  )
}

export default App
