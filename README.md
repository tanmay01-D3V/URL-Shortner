# URL Shortener

A fast and efficient URL shortening service built with Node.js, Express, and MongoDB. This application allows users to create short, memorable links that redirect to longer URLs, with analytics tracking for each shortened link.

## Features

- **URL Shortening**: Convert long URLs into short, unique identifiers
- **URL Redirection**: Automatically redirect short links to their original URLs
- **Visit Analytics**: Track the number of visits and visit history for each shortened URL
- **RESTful API**: Easy-to-use endpoints for creating, accessing, and analyzing shortened URLs
- **MongoDB Integration**: Persistent data storage with MongoDB
- **Lightweight**: Built with Express.js for optimal performance

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ID Generation**: shortid library
- **Port**: 8003

## Project Structure

```
URL-Shortner/
├── connection.js          # MongoDB connection configuration
├── index.js               # Main Express server file
├── package.json           # Project dependencies
├── controllers/
│   └── Url.js            # Business logic for URL operations
├── models/
│   └── url.js            # MongoDB URL schema model
└── Routes/
    └── Url.js            # API endpoint definitions
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/tanmay01-D3V/URL-Shortner.git
cd URL-Shortner
```

2. Install dependencies:
```bash
npm install
```

3. Ensure MongoDB is running on your local machine:
```bash
# MongoDB should be running on mongodb://localhost:27017/
```

4. Start the server:
```bash
npm start
```

The server will start on `http://localhost:8003`

## API Endpoints

### 1. Create a Shortened URL
**POST** `/`

Request body:
```json
{
  "url": "https://www.example.com/very/long/url/path"
}
```

Response:
```json
{
  "id": "abc123xyz"
}
```

### 2. Redirect to Original URL
**GET** `/:shortId`

- Redirects to the original URL stored in the database
- Automatically increments the visit counter
- Records visit timestamp in the analytics

Example: `GET /abc123xyz` → Redirects to the original URL

### 3. Get Analytics for a Short URL
**GET** `/analytics/:shortId`

Response:
```json
{
  "TotalClicks": 5,
  "analytics": [
    {
      "timestamp": 1674432000000
    },
    {
      "timestamp": 1674432015000
    }
    // ... more visit records
  ]
}
```

## Database Schema

### URL Model

```javascript
{
  shortID: String,           // Unique short identifier
  redirectURL: String,       // Original long URL
  visitHistory: [{
    timestamp: Date          // Timestamp of each visit
  }]
}
```

## Usage Examples

### Create a Short URL
```bash
curl -X POST http://localhost:8003/ \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.google.com"}'
```

### Access the Short URL (Redirect)
```bash
curl -L http://localhost:8003/abc123xyz
# Will redirect to https://www.google.com
```

### Get Analytics
```bash
curl http://localhost:8003/analytics/abc123xyz
```

## Dependencies

- **express**: Web framework for Node.js
- **shortid**: Unique ID generator for short URLs
- **mongoose**: MongoDB object modeling

Install dependencies with:
```bash
npm install express shortid mongoose
```

## Error Handling

- **Missing URL**: Returns `400 Bad Request` if URL is not provided when creating a short link
- **Invalid Short ID**: Returns `404 Not Found` if the short ID doesn't exist in the database

## Future Enhancements

- User authentication and authorization
- Custom short URL slugs
- URL expiration/TTL
- Rate limiting
- Admin dashboard for statistics
- QR code generation
- Link preview before redirect
- Database persistence optimization

## Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

## License

This project is open source and available under the MIT License.

## Author

Created by [tanmay01-D3V](https://github.com/tanmay01-D3V)

## Support

For issues or questions, please create an issue on the [GitHub repository](https://github.com/tanmay01-D3V/URL-Shortner).
