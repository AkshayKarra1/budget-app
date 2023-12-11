import Head from "next/head";
import Script from "next/script";
import Login from "../../components/Login/Login";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Budget Tracker - Login</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
        <meta name="keywords" content="Budget-Login" />
        <meta name="description" content="Login to the Budget App."></meta>
      </Head>
      <div style={{ margin: "2rem" }} className={"container"}>
        <h3>Personal Budget App</h3>
        <Login></Login>
      </div>
    </>
  );
};

export default LoginPage;
