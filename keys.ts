import dotenv from 'dotenv'

dotenv.config()

interface Keys {
  MONGO_URI: string
  JWT: string
}

const devKeys: Keys = {
  MONGO_URI: process.env.MONGO_URI as string,
  JWT: 'jwt-dev-key'
}

const prodKey: Keys = {
  MONGO_URI: process.env.MONGO_URI as string,
  JWT: process.env.JWT as string
}

const keys = process.env.NODE_ENV === 'development' ? devKeys : prodKey

export default keys
