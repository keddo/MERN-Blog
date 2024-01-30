import express from 'express'
import connectDB from './db/connection.js'
// Routes
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

// Add builtin middleware
app.use(express.json())

app.use('/api/users', userRoutes);
app.use('/api/users', authRoutes);
// Connect to Database
connectDB(process.env.MONGO_URI)
.then(() => console.log(`Successfully connected to DB`))
.catch(err => console.log(err.message))

app.listen(3000, () => {
    console.log(`Server running on ${3000}`)
})