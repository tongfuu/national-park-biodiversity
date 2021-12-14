import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import Login from "./components/login";

import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

import useToken from './useToken';

import ReactFacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  const { token, setToken } = useToken();

  const responseFacebook = (response) => {
    setToken("token123");
  }

  const responseGoogle = (response) => {
    setToken("token123");
  }

  const responseFailureGoogle = (response) => {
  }

  if(!token) {
    return (
      <div>
        
      <Login setToken={setToken} />

      <div className='text-center'  style={{ marginTop: "5vh" }}>
        <ReactFacebookLogin
          appId="654307538902644"
          fields="name,email,picture"
          callback={responseFacebook}
          size="small"
        />

        <GoogleLogin
          clientId="1085616960134-4ua4h5udtk5svdkkau1ir658ogm25f5a.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseFailureGoogle}
          style={{ marginLeft: "5vh"}}
        />

        </div>

      </div>
      
    )
  }

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
    </div>
  );
};

export default App;
