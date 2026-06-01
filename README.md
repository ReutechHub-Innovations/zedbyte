# ZEDBYTES SOLUTIONS

ZEDBYTES SOLUTIONS is a modern IT solutions company dedicated to providing innovative and efficient technology services. Our website is built using the MERN stack (MongoDB, Express, React, Node.js) and features a futuristic design that enhances user experience.

## Features

- **Admin Dashboard**: A comprehensive dashboard for administrators to manage users, services, and content.
- **Authentication System**: Secure login and registration for users and admins, utilizing JWT for session management.
- **Cloudinary Integration**: Seamless media management with Cloudinary for image and video uploads.
- **Responsive Design**: The website is fully responsive, ensuring a great experience on both desktop and mobile devices.
- **Dynamic Content**: Easily manage and update content through the admin panel.

## Project Structure

```
zedbytes-solutions
├── client                # Client-side application
│   ├── package.json      # Client dependencies and scripts
│   ├── public            # Public assets
│   └── src               # Source files for React app
├── server                # Server-side application
│   ├── package.json      # Server dependencies and scripts
│   ├── .env.example      # Environment variables example
│   └── src               # Source files for Node.js server
├── .gitignore            # Files to ignore in version control
├── docker-compose.yml    # Docker configuration
├── package.json          # Main project dependencies and scripts
├── README.md             # Project documentation
└── LICENSE               # Licensing information
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Docker (optional)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/zedbytes-solutions.git
   ```

2. Navigate to the project directory:
   ```
   cd zedbytes-solutions
   ```

3. Install server dependencies:
   ```
   cd server
   npm install
   ```

4. Install client dependencies:
   ```
   cd ../client
   npm install
   ```

### Running the Application

To run the application, you can use Docker or run the client and server separately.

#### Using Docker

1. Build and run the containers:
   ```
   docker-compose up --build
   ```

#### Running Separately

1. Start the server:
   ```
   cd server
   npm start
   ```

2. Start the client:
   ```
   cd ../client
   npm start
   ```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.