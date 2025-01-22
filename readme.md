# Talent Hub Project

## Overview
**Talent Hub** is a platform designed to streamline the hiring process by connecting job seekers and employers in a centralized space. It provides tools for managing talent and hire requests efficiently.

Demo Video Link : (https://drive.google.com/file/d/1qZz5L6oeI_aXGrX5qmyh2zRQB4Gx25xi/view?usp=sharing)

---

## Core Features

1. **User Profiles**
   - Job seekers can create profiles that include their skills.

2. **Hire Requests**
   - Employers can submit hire requests for specific talents.
   - Admins can view and manage all pending hire requests, with the ability to approve or reject them.

3. **Admin Dashboard**
   - A dedicated admin panel for viewing and managing platform activities, such as pending hire requests.
   - Secure authentication using JWT.

4. **Cloudinary Integration**
   - Storage and management of user media files, such as resumes and certificates, using **Cloudinary**.

5. **Communication Tools**
   - Integration with **Twilio WhatsApp API** to send real-time notifications and updates for hire requests.

---

## Setting Up Environment Variables
To run the **Talent Hub** project, you'll need to set up a `.env` file with the necessary environment variables.

### Steps to Set Up

1. **Create a `.env` File**
   In the root directory of the project, create a file named `.env`.

2. **Add the Following Environment Variables**
   ```plaintext
   PORT=3000
   MONGO_URL=<your-mongodb-url>
   CLOUDINARY_NAME=<your-cloudinary-account-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   CLOUDINARY_API_ENVIRONMENT_VAR=<your-cloudinary-environment-variable>
   TWILIO_ACCOUNT_SID=<your-twilio-account-sid>
   TWILIO_AUTH_TOKEN=<your-twilio-auth-token>
   TWILIO_WHATSAPP_NUMBER=<your-twilio-whatsapp-enabled-number>
   TWILIO_ADMIN_NUMBER=<your-admin-phone-number>
   EMAIL=<your-email-address>
   EMAIL_PASSWORD=<your-email-app-password>
   JWT_SECRET=<your-jwt-secret>
   ```

3. **Where to Obtain These Values**

   - **`PORT`**: Specify the port number for the application (default is `3000`).

   - **`MONGO_URL`**: Obtain the MongoDB connection string from your [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account. Create a cluster if not already created.

   - **Cloudinary Credentials**:
     - Log in to [Cloudinary](https://cloudinary.com).
     - Navigate to the **Dashboard** to get your `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.

   - **Twilio Credentials**:
     - Log in to [Twilio](https://www.twilio.com).
     - From the **Console Dashboard**, copy the `ACCOUNT_SID` and `AUTH_TOKEN`.
     - Enable WhatsApp in Twilio to get a WhatsApp-enabled number.

   - **Email Credentials**:
     - Use a Gmail account or another provider.
     - For Gmail, set up an **App Password** by enabling **2-Step Verification** and creating an app-specific password from your account settings.

   - **`JWT_SECRET`**: Generate a secure random string using a tool like [RandomKeyGen](https://randomkeygen.com).

4. **Install `dotenv` (If Required)**
   If using Node.js, install the `dotenv` package to load the environment variables:
   ```bash
   npm install dotenv
   ```

5. **Use Environment Variables in Code**
   Import and configure `dotenv` at the top of your main file (e.g., `app.js`):
   ```javascript
   require('dotenv').config();
   ```

6. **Secure `.env`**
   - Add `.env` to your `.gitignore` file to ensure sensitive information is not pushed to version control:
     ```plaintext
     .env
     ```

7. **Verify the Setup**
   Test your environment variables by logging them in your code:
   ```javascript
   console.log(process.env.MONGO_URL);
   ```

---

## Running the Backend
After setting up the environment variables, start the backend using the following command:
```bash
npm start
```
## Running the Frontend 
start the frontend using the following command:
```bash
npm run dev
```
## Running the Admin Panel
start the frontend using the following command:
```bash
npm run panel 
```

Use ports only localhost:5173 and localhost:5174 for Frontend and Admin Panel as in CORS only those two ports are allowed.

Thank You!
