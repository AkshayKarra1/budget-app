import { useState } from "react";
import style from "./Login.module.css";
import Swal from "sweetalert2";
import Services from "../../util/Services";
import { useRouter } from "next/router";
import Util from "../../util/Util";

const Login = () => {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const showLoginRegister = () => {
    setShowLogin(!showLogin);
  };

  const login = (event) => {
    event.preventDefault();
    router.push("/dashboard");
  };

  const setFieldData = (event, label) => {
    console.log(event.target.value);
    switch (label) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "confirmPassword":
        setConfirmPassword(event.target.value);
        break;
      case "firstName":
        setFirstName(event.target.value);
      case "lastName":
        setLastName(event.target.value);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    let fieldEmptyMessage = "";
    console.log(email, password, confirmPassword);
    if (!firstName) {
      fieldEmptyMessage = "First name can not be empty";
    }
    if (!lastName) {
      fieldEmptyMessage = "Last name can not be empty";
    }
    if (!email) {
      fieldEmptyMessage = "Email can not be empty";
    }
    if (!fieldEmptyMessage && !password) {
      fieldEmptyMessage = "Password can not be empty";
    }
    if (!fieldEmptyMessage && !confirmPassword) {
      fieldEmptyMessage = "Confirm Password can not be empty";
    }
    if (!fieldEmptyMessage && password != confirmPassword) {
      fieldEmptyMessage = "Password and Confirm Password should be same";
    }
    if (fieldEmptyMessage) {
      Swal.fire({
        title: "Error!",
        text: fieldEmptyMessage,
        icon: "error",
        //confirmButtonText: "Cool",
      });
      return;
    }

    let resp = await Services.register({
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
    });

    if (resp && resp.data && resp.data.loginSuccess) {
      Util.setSessionData("userToken", resp.data.userToken);
      // Add timer
      router.push("/dashboard");
    } else if (resp && resp.data.message) {
      Swal.fire({
        title: "Error!",
        text: resp.data.message,
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "User creation failed",
        icon: "error",
      });
    }
  };

  return (
    <>
      {showLogin ? (
        <div>
          <main className={`${style["form-signin"]} "text-center" "mt-5"`}>
            <form onSubmit={login}>
              <h1 className="h3 mb-3 fw-normal">Sign in</h1>

              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(event) => setFieldData(event, "email")}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(event) => setFieldData(event, "password")}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className={`${style.registerNow} mb-3`}>
                <label
                  style={{ cursor: "pointer" }}
                  onClick={() => showLoginRegister("register")}
                >
                  Click here to <span>Sign up</span>
                </label>
              </div>
              <button className="w-100 btn btn-md btn-primary" type="submit">
                Sign in
              </button>
            </form>
          </main>
        </div>
      ) : (
        <div>
          <main className={`${style["form-signin"]} "text-center" "mt-5"`}>
            <form onSubmit={register}>
              <h1 className="h3 mb-3 fw-normal">Sing up</h1>

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="First name"
                  onChange={(event) => setFieldData(event, "firstName")}
                />
                <label htmlFor="floatingInput">First Name</label>
              </div>

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Last name"
                  onChange={(event) => setFieldData(event, "lastName")}
                />
                <label htmlFor="floatingInput">Last Name</label>
              </div>

              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(event) => setFieldData(event, "email")}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(event) => setFieldData(event, "password")}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingConfirmPassword"
                  placeholder="Confirm Password"
                  onChange={(event) => setFieldData(event, "confirmPassword")}
                />
                <label htmlFor="floatingPassword">Confirm Password</label>
              </div>

              <div className={`${style.registerNow} mb-3`}>
                <label
                  style={{ cursor: "pointer" }}
                  onClick={() => showLoginRegister()}
                >
                  <spav style={{ color: "grey" }}>Already have an account</spav>{" "}
                  <span>Login</span>
                </label>
              </div>
              <button className="w-100 btn btn-md btn-primary" type="submit">
                Register
              </button>
            </form>
          </main>
        </div>
      )}
    </>
  );
};

export default Login;
