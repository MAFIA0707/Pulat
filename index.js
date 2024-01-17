const express = require('express')
const categoryRoute = require('./routes/category.route.js')
const bodyparser = require('body-parser')
const env = require('./config/env.config.js')
const productRoute = require('./routes/product.route.js')
const userRoute = require('./routes/user.route.js')
const authRoute = require('./routes/auth.route.js')
const addressesRoute = require('./routes/address.route.js')
const attributesRoute = require('./routes/attributes.route.js')
const eventsRoute = require('./routes/events.route.js')
const favoritesRoute = require('./routes/favorites.route.js')
const reviewsRoute = require('./routes/reviews.route.js')
const cartsRoute = require('./routes/carts.route.js')
const products_attribute_valueRoute = require('./routes/products_attribute_value.route.js')
const products_events = require('./routes/products_events.route.js')


const app = express()
app.use(bodyparser.json())
app.use('/product', productRoute)
app.use('/category', categoryRoute)
app.use('/user', userRoute)
app.use('/auth',authRoute)
app.use('/addresses',addressesRoute)
app.use('/attributes',attributesRoute)
app.use('/events',eventsRoute)
app.use('/favorites', favoritesRoute)
app.use('/reviews', reviewsRoute)
app.use('/carts', cartsRoute)
app.use('/product_attribute_value', products_attribute_valueRoute)
app.use('/products_events', products_events)






const port = env.PORT
app.listen(port, () => console.log(` ${port} port working`))