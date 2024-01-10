const express = require('express')
const categoryRoute = require('./routes/category.route.js')
const bodyparser = require('body-parser')
const env = require('./config/env.config.js')
const productRoute = require('./routes/product.route.js')
const userRoute = require('./routes/user.route.js')
const authRoute = require('./routes/auth.route.js')
const addressRoute = require('./routes/address.route.js')
const attributeRoute = require('./routes/attributes.route.js')
const eventsRoute = require('./routes/events.route.js')
const favoritesRoute = require('./routes/favorites.route.js')
const reviewsRoute = require('./routes/reviews.route.js')
const cartsRoute = require('./routes/carts.route.js')


const app = express()
app.use(bodyparser.json())
app.use('/product', productRoute)
app.use('/category', categoryRoute)
app.use('/user', userRoute)
app.use('/auth',authRoute)
app.use('/address',addressRoute)
app.use('/attribute',attributeRoute)
app.use('/events',eventsRoute)
app.use('/favorites', favoritesRoute)
app.use('/reviews', reviewsRoute)
app.use('/carts', cartsRoute)




const port = env.PORT
app.listen(port, () => console.log(` ${port} port working`))