import logo from "./logo.svg";
import "./App.css";

import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from "./utils/firebase";
import { CARS } from "./utils/data";
import { useEffect, useRef, useState } from "react";
import { CheckCheck } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [selectedCar, setSelectedCar] = useState(CARS[0]);
  const [isLoading, setIsLoading] = useState(false);

  const [appointments, setAppointments] = useState([]);

  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    try {
      event.preventDefault();
      console.log(event.target);

      const formData = new FormData(event.target);
      console.log(formData);
      const fullname = formData.get("fullname");
      const email = formData.get("email");
      const message = formData.get("message");

      if (fullname && email && message) {
        const appointmentData = {
          fullname,
          email,
          message,
          car: selectedCar,
        };

        const docRef = await addDoc(
          collection(database, "appointment"),
          appointmentData
        );
        console.log(docRef);
        toast("Successfully Added to the firebase");

        // TO reset form data
        if (formRef && formRef.current) {
          formRef.current.reset();
          setSelectedCar(CARS[0]);
          setAppointments([appointmentData, ...appointments]);
        }
      } else {
        toast("Please fill the form");
      }
    } catch (error) {
      toast(
        "Error during data store to firebase. check the firebase config file in utils"
      );
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDataFromFirebase = async () => {
    const docSnap = await getDocs(collection(database, "appointment"));
    const data = docSnap.docs.map((doc) => doc.data());
    console.log("🚀 ~ getDataFromFirebase ~ data:", data);
    setAppointments(data);
  };

  useEffect(() => {
    try {
      getDataFromFirebase();
    } catch (error) {
      toast("Error Fetching data");
    }
  }, []);

  const changeSelectedCar = (car) => {
    setSelectedCar(car);
  };

  return (
    <main>
      <header>
        <a href="/">
          <img src={"./images/logo.jpg"} height={"100px"} alt="logo" />
        </a>
      </header>
      <div className="body-container">
        <div className="left-body-container">
          <img
            style={{
              width: "100%",
              height: "100%",
            }}
            src={selectedCar.src}
            alt={`car ${selectedCar.name}`}
          />
        </div>
        <form
          className="right-body-container"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <h2>Book Now</h2>

          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input name="fullname" id="fullname" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input name="email" id="email" />
          </div>

          <div className="car-container">
            {CARS.map((car) => {
              return (
                <div
                  key={car.name}
                  onClick={() => {
                    changeSelectedCar(car);
                  }}
                  className="single-car-container"
                >
                  {car.name === selectedCar.name && (
                    <CheckCheck className="active" />
                  )}
                  <img src={car.src} alt={car.name} height={"100px"} />
                </div>
              );
            })}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              rows={4}
              id="message"
              style={{
                resize: "none",
              }}
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting ..." : "Submit"}
          </button>
        </form>
      </div>

      <table
        style={{
          width: "100%",
          marginTop: "50px",
          border: "1px solid green",
        }}
        className="table"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Car</th>
            <th>Image</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length < 1 && (
            <tr>
              <td
                colSpan={5}
                style={{
                  textAlign: "center",
                }}
              >
                No Data Found !
              </td>
            </tr>
          )}
          {appointments.length > 0 &&
            appointments.map((appointment) => {
              return (
                <tr key={appointment.fullname + appointment.email}>
                  <td>{appointment.fullname}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.car.name}</td>
                  <td>
                    {" "}
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "200px",
                        objectFit: "contain",
                      }}
                      src={appointment.car.src}
                      alt={`car ${appointment.car.name}`}
                    />
                  </td>
                  <td>{appointment.message}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
        // transition="Zoom"
      />
    </main>
  );
}

export default App;
