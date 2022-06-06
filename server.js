const http = require('http')

const requestListener = (request, response) => {
    response.setHeader('content-type', 'application/json')
    response.setHeader('X-Powered-By', 'NodeJS')

    const { method, url } = request

    if (url === '/') {
        if (method === 'GET') {
            response.statusCode = 200
            response.end(JSON.stringify({
                message: 'Hallo HTTP Server!',
            }))
        } else {
            response.statusCode = 400
            response.end(JSON.stringify({
                message: '400 Bad Request',
            }))
        }
    } else if (url === '/about') {
        if (method === 'GET') {
            response.statusCode = 200
            response.end(JSON.stringify({
                message: 'About Page',
            }))
        } else if (method === 'POST') {
            let body = []

            request.on('data', (chunk) => {
                body.push(chunk)
            })

            request.on('end', () => {
                body = Buffer.concat(body).toString()
                const { name } = JSON.parse(body)
                response.statusCode = 200
                response.end(JSON.stringify({
                    message: `Hallo, ${name}! this is about page`,
                }))
            })
        } else {
            response.statusCode = 400
            response.end(JSON.stringify({
                message: '400 Bad Request',
            }))
        }
    } else {
        response.statusCode = 400
        response.end(JSON.stringify({
            message: '400 Bad Request',
        }))
    }

    // if (method === 'GET') {
    //     response.end('<h1>Hallo HTTP Server!</h1>')
    // }

    // if (method === 'POST') {
    //     let body = []

    //     request.on('data', (chunk) => {
    //         body.push(chunk)
    //     })

    //     request.on('end', () => {
    //         body = Buffer.concat(body).toString()
    //         const { name } = JSON.parse(body)
    //         response.end(`<h1>Hai, ${name}!</h1>`)
    //     })
    // }

}

const server = http.createServer(requestListener)

const port = 5000
const host = 'localhost'

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
})