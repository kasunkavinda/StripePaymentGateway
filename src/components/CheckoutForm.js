import { PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const submitButton = (e) => {
    e.preventDefault();
    console.log("hit submit")
    fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 3 },
          { id: 2, quantity: 1 },
        ]
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      else {
        return res.json().then(json => Promise.reject(json))
      }
    }).then(({ url }) => {
      //console.log(url)
      window.location = url
    }).catch(e => {
      console.error(e.error)
    })
  }
  return (
    <form>
      {/* <PaymentElement /> */}
      <button onClick={(e) => submitButton(e)}>Submit</button>
    </form>
  );
};

export default CheckoutForm;