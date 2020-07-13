import { Button, Segment, Divider } from 'semantic-ui-react'
import calculateCartTotal from '../../utils/calculateCartTotal'
import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
function CartSummary({products,handleCheckOut,success}) {
  const [cartAmount,setCartAmount] = React.useState(0)
  const [stripeAmount,setStripeAmount] = React.useState(0)
  const[isCartEmpty,setCartEmpty] = React.useState(false)



  React.useEffect(() => {
    const {cartTotal,stripeTotal} = calculateCartTotal(products)
    setCartAmount(cartTotal)
    setStripeAmount(stripeTotal)
    setCartEmpty(products.length === 0)
  },[products])

  return <>
    <Divider />
    <Segment clearing size="large">
      <strong>Sub total:</strong> Php {cartAmount}
      <StripeCheckout
        name="Glori React"
        amount={stripeAmount}
        image={products.length > 0 ? products[0].product.mediaUrl : ""}
        currency="PHP"
        shippingAddress= {true}
        billingAddress={true}
        zipcode={true}
        stripeKey="pk_test_l4r4qjqtHvZ7EKEQ6iqnlIWO0054FlBQMg"
        token={handleCheckOut}
        triggerEvent="onClick"
      >
      <Button icon="cart" color="teal" floated="right" disabled={isCartEmpty || success} content="Checkout" />

      </StripeCheckout>
     
    </Segment>
  </>;
}

export default CartSummary;
