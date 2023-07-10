//Stripe payment gateway with react.js and express
require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
}))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
    [1, { priceInCents: 10000, name: 'Phone case 1' }],
    [2, { priceInCents: 20000, name: 'Phone case 2' }]
])

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: req.body.items.map((item) => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            mode: 'payment', // one time payments
            success_url: `http://localhost:3000/success`,
            cancel_url: 'http://localhost:3000/error'
        })
        res.json({ url: session.url })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

app.listen(4000)