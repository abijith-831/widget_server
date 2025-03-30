import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import widgetRoutes from './routes/widgetRoutes'
import authRoutes from './routes/authRoutes'

dotenv.config()
const app = express()

const corsOptions = {
    origin: ['http://localhost:5173'],
    optionsSuccessStatus: 200,
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json())

app.use('/',authRoutes)
app.use('/widget/',widgetRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));