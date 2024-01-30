import {StatusCodes} from 'http-status-codes'
const notFound = (req, res) => {
    res.status(StatusCodes.BAD_REQUEST).send('Route does not exist')
}

export default notFound;