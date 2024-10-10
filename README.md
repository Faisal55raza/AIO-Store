
# AIO Store

## Overview

AIO Store is a fully functional e-commerce website designed to be responsive and fast-loading. The website implements various features such as product browsing, user accounts, shopping carts, and secure payment gateways. It also includes user authentication and authorization mechanisms to ensure a secure platform.

## Features

- **Responsive Design**: Optimized for various devices, ensuring a seamless user experience.
- **Fast Loading Times**: Enhanced performance with up to 15% faster loading times using Redux.
- **Product Browsing**: Allows users to browse products efficiently.
- **User Accounts**: Includes functionalities for user registration and login.
- **Shopping Carts**: Users can add items to their cart and proceed to checkout.
- **Secure Payment Gateways**: Implemented secure payment processing.
- **User Authentication**: Secure user authentication using JWT.
- **Data Management**: Utilized MongoDB for managing data related to customers, sellers, products, and orders.

## Tech Stack

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Installation

Follow these steps to set up the project locally.

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Clone the Repository

```bash
git clone https://github.com/Faisal55raza/AIO-Store.git
cd AIO-Store
```

### Backend Setup

1. Navigate to the backend directory and install dependencies.

    ```bash
    cd backend
    npm install
    ```

2. Create a `.env` file and add your MongoDB URI and other environment variables.

    ```env
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

3. Start the backend server.

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory and install dependencies.

    ```bash
    cd frontend
    npm install
    ```

2. Start the frontend server.

    ```bash
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` for the frontend.
2. The backend server runs on `http://localhost:4000`.

## Contributing

We welcome contributions to enhance the project. Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Special thanks to all contributors for their hard work and dedication.
-Harsh Raj
-Param Sharma
---

Feel free to customize the sections to better fit your project's specifics.
