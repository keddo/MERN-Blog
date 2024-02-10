import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import connectDB from './db/connection.js'

// Routes
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.route.js'
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'

// Custom Middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

const app = express()

// Add builtin middleware
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(morgan('dev'))

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
// Connect to Database

// Handle not found and Error
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

connectDB(process.env.MONGO_URI)
.then(() => console.log(`Successfully connected to DB`))
.catch(err => console.log(err.message))

app.listen(3000, () => {
    console.log(`Server running on ${3000}`)
});