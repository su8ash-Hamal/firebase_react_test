# Simple Car Booking App with firebase
 
## Overview

This project is a Car Booking App that demonstrates how to store and fetch data using Firebase Firestore in a React application. The app allows users to book a car by submitting their details through a form, and it fetches and displays the booking data in a table.

## What You Will Learn

In this repository, you will learn how to:
- **Integrate Firebase Firestore with React**: Set up Firebase Firestore to store and retrieve data in a React application.
- **Handle Form Submissions**: Use the `FormData` API to extract and manage user input from a form.
- **Store Data in Firestore**: Utilize Firestore's `addDoc` and `collection` functions to save form data to a Firestore collection.
- **Fetch Data from Firestore**: Retrieve and display stored data using Firestore's `getDocs` function.
- **State Management with React Hooks**: Manage form data and application state using `useState` and `useEffect`.
- **User Feedback with React Toastify**: Provide user feedback on form submission using the `react-toastify` library.

## Technologies Used

- **React.js**: Frontend library for building the user interface.
- **Firebase Firestore**: NoSQL cloud database for storing booking details.
- **React Toastify**: For displaying toast notifications.
- **JavaScript (ES6+)**: For managing form submissions, Firestore interactions, and state management.

## Project Structure

- **`src/App.js`**: Main application component containing the form, Firestore integration, and table to display booking data.
- **`src/utils/firebase.js`**: Contains the Firebase configuration and Firestore initialization.
- **`src/utils/data.js`**: Contains a list of available cars for booking.

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- A Firebase account with Firestore set up.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
