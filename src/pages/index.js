import Image from 'next/image'
import { Inter } from 'next/font/google'
import CheckoutForm from '../components/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const inter = Inter({ subsets: ['latin'] })

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_fcVKPD8ANNM5smvKiTbabAOm');

export default function Home() {
  const options = {
    // passing the client secret obtained from the server
    // clientSecret: '${fcVKPD8ANNM5smvKiTbabAOm}_secret_${51ANKmSJWfY4ioR79pG3ioIufGAoUWwhjOQq9ho769QG6oLruTRWmTCtWe1uab5YYzKgYu9ALkyvypy7BLKlLO77q00RhdLX2ZY}',
    clientSecret: 'sk_test_51ANKmSJWfY4ioR79pG3ioIufGAoUWwhjOQq9ho769QG6oLruTRWmTCtWe1uab5YYzKgYu9ALkyvypy7BLKlLO77q00RhdLX2ZY'
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {/* <Elements stripe={stripePromise} options={options}> */}
        <CheckoutForm />
      {/* </Elements> */}
    </main>
  )
}
