import express from 'express'
import { authLogin , authSignup} from '../controllers/authController'

const auth = express.Router()

auth.post('/login',authLogin)
auth.post('/signup',authSignup)

export default auth