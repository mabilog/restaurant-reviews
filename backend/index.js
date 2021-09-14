import app from "./server.js";
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import RestaurantsDAO from './dao/restaurantsDAO'

dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000

MongoClient.connect(
  process.env.RESTREVIEWS_DB_URI,
  {
    maxPoolSize: 50,
    // writeConcern:{
    //   wtimeout: 2500
    // },
    wtimeoutMS: 2500,
    useNewUrlParser: true,
    // useUnifiedTopology: true
  }
)
.catch (err => {
  console.log(err)
  process.exit(1)
})
.then(async client => {
  await RestaurantsDAO.injectDB(client)
  app.listen(port, () => 
  console.log(`listening on port ${port}`))
})

