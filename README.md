### CCIOT_Logistics-Network


# IoT Asset Tracking Dashboard

This project is a web application that tracks IoT asset data and allows users to view and manage the data in real time. The app pulls data from a SQL database, with support for two different versions of the system: **Version 1** (with sleep mode) and **Version 2** (without sleep mode). The data is fed from an IoT core that uses two different **QoS (Quality of Service) levels**.

This application allows for:
- Real-time visualization of asset data
- Switching between different database configurations (with sleep mode or without)
- Resetting the database and observing how data changes based on different backend configurations and QoS levels

## Features
- **Version 1 (v1)**: Includes assets that have sleep mode enabled.
- **Version 2 (v2)**: Assets without sleep mode enabled.
- **IoT Core Integration**: The app pulls real-time data from an IoT core that feeds asset information into a SQL database. The IoT core uses two different **QoS levels** for different real-time behavior.
- **Database Management**: You can reset the database (e.g., clear data, reset values) for both versions and see how changes in the backend affect the data live in the app.
- **Data Filtering**: Easily switch between regions (US, SG) or a centralized database, and filter data to observe the differences.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Running the Application](#running-the-application)
3. [Project Structure](#project-structure)
4. [Resetting Databases](#resetting-databases)
6. [App Workflow](#app-workflow)

---

## Getting Started

To get started with this application locally, follow these steps:

### Prerequisites
Before running the application, make sure you have the following installed:
- **Node.js**: Version 14.x or above.
- **MySQL**: The backend runs on MySQL, so make sure you have access to the database.

### Clone the repository
Clone this repository to your local machine:
```bash
git clone https://github.com/smriti199/CCIOT_Logistics-Network.git
cd cciot-logistics-network
```

### Install dependencies
Run the following command to install the required dependencies:
```bash
npm install
```

### Set up the environment
Ensure that you have a `.env` file in the root of the project directory with the following environment variables configured for the database:
```bash
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
PORT=80
```

### Run the app
Start the application locally:
```bash
npm run dev
```
This will start the app on `http://localhost:3000`. Open it in your browser.

---

## Running the Application

Once the app is running locally, navigate to `http://localhost:3000` in your browser. You will be able to:
1. View asset data in a table format.
2. Select between **Version 1** and **Version 2** using dropdown menus.
3. Reset the database for either the **US**, **SG**, or **Centralized** database.

### Key Pages:
- **Assets Table**: Displays asset details for selected regions and database versions.
- **Stats**: Shows aggregated statistics such as **average latency** and **average duty cycle** for the assets.

---

## Project Structure

The project has the following structure:
```
/pages
  /api
    /assets
      /v1          // API endpoint for Version 1 data
        /assets
            /sg.js          // API to SG database 
            /us.js          // API to US database 
            /centralized.js // API to Centralized database 
        /avg_duty_cycle
            /sg.js          // API to SG data average duty cycle
            /us.js          // API to US data average duty cycle
            /centralized.js // API to Centralized data average duty cycle
        /avg_latency
            /sg.js          // API to SG data average latency
            /us.js          // API to US data average latency
            /centralized.js // API to Centralized data average latency
        /resetAssets
            /sg.js          // API to reset SG database
            /us.js          // API to reset US database
            /centralized.js // API to reset centralized database

      /v2          // API endpoint for Version 2 data with the same subfolders and files as above
  /components
    /Layout.js        // Main layout with sidebar
  /stats.js           // Displays statistics for both v1 and v2 versions
  /tablev1.js           // Displays assets from v1 in a table format
  /tablev2.js         // Displays assets from v2 in a table format
  /centralizedv1.js     // Displays assets from centralized v1 in a table format
  /centralizedv2.js   // Displays assets from centralized v2 in a table format
  /index.js           // Home page
```

---

## Resetting Databases

To reset the databases for different regions, the app exposes 3 API endpoints for each version:

- **Reset US Database**: `api/resetAssets/v#/us`
- **Reset SG Database**: `api/resetAssets/v#/sg`
- **Reset Centralized Database**: `api/resetAssets/v#/centralized`

The v# refers to the version number.

Each of these API endpoints runs a SQL query to either reset or delete the data from the database. After resetting the database, the table view will reflect the changes immediately.



---

## App Workflow

1. **IoT Core Feeding Data**: The IoT core is connected to the database and feeds asset data using two different **QoS levels** for varying levels of data delivery guarantees.
   
2. **Displaying Data**: 
   - The app displays asset data from either the **SG**, **US**, or **Centralized** database.
   - You can switch between databases in the UI to view asset data in real-time.
   
3. **Version Selection**: 
   - Select between **v1 (with sleep mode)** or **v2 (without sleep mode)** to observe different asset behavior.
   
4. **Resetting Data**: 
   - Use the reset buttons to reset the asset data for the selected region and database.

---
