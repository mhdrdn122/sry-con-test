import './Login.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/logo.png"
// import { Spinner } from "react-bootstrap";
// import { Col, Spinner ,Form ,Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import notify from "../../../utils/useNotification"
// import Col from "react-bootstrap/Col";
import { ToastContainer } from "react-toastify";
import { loginSuperAdminAction } from '../../../redux/slice/super_admin/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import baseURL, { baseURLTest } from '../../../Api/baseURL';
import { Spinner } from 'react-bootstrap';
import adv_syrian from "../../../assets/adv_syrian.png"

const Login = () => {
  
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPress, setIsPress] = useState(false);
 //select store data
 const { loading, superAdminAuth, status } = useSelector(
    (state) => state.authSuper
  );
  const navigate = useNavigate();
    const dispatch = useDispatch()
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (!isPress && loading === false) {
      console.log("inside useEffect");
        if (
          superAdminAuth?.superAdminInfo &&
          Object.keys(superAdminAuth?.superAdminInfo).length > 0
        ) {
          localStorage.setItem(
            "superAdminInfo",
            JSON.stringify(superAdminAuth?.superAdminInfo)
          );
          notify("تم تسجيل الدخول بنجاح", "success");
          setUsername("");
          setPassword("");
        } 
       
      else {
        notify(superAdminAuth?.error?.message, "error");
        console.log("error error error ")
      }

      if (superAdminAuth?.superAdminInfo?.token) {
        setTimeout(() => {
          navigate("/super_admin");
        }, 1000);
      }
    }
  }, [loading, isPress]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (user_name === "") {
      notify("Please Enter username", "error");
      return;
    } else if (!password) {
      notify("Please Enter Password", "error");
      return;
    } else if (password.length < 8) {
      notify("Password must be at least 8 characters long", "error");
      return false;
    }
    setIsPress(true);
    await dispatch(
        loginSuperAdminAction({
          username:user_name,
          password,
        })
      );
    setIsPress(false);  
    
};

  console.log('loading : ',loading)
  console.log('superAdminAuth : ',superAdminAuth)
  console.log('superAdminInfo : ',superAdminAuth?.superAdminInfo)
  return (
   <div className="login_container container-fluid">
      <div className="login_row row" style={{ minHeight:"100vh",display:'flex',justifyContent:'space-around' }}>
        <div
          className="d-flex align-items-center justify-content-center col-2"
        >
          <img src={adv_syrian} alt="logo" className="logo_left"/>
        </div>
        <div
          className="d-flex align-items-center justify-content-around"
        >
          <Form className="form_login" onSubmit={onSubmit}>
            <h3 className="mb-5">
              {"تسجيل الدخول"}
            </h3>
           <div>
           <Form.Group as={Row} className="mb-3 justify-content-center w-75">
              <div>
                <Form.Control
                  type="text"
                  placeholder={"اسم المستخدم"}
                  value={user_name}
                  onChange={onChangeUsername}
                  dir={"rtl"}
                />
              </div>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 justify-content-center w-100">
              <div>
                <Form.Control
                  type="password"
                  placeholder={ "كلمة المرور"}
                  value={password}
                  onChange={onChangePassword}
                  lang="ar"
                  dir={ "rtl"}
                />
              </div>
            </Form.Group>
           </div>
            {isPress ? (
              <button className="mt-5 text-white bg-white" type="button">
                <Spinner
                  className="m-auto"
                  animation="border"
                  role="status"
                ></Spinner>
              </button>
            ) : (
              <button className="" type="submit">
                    تسجيل الدخول
              </button>
            )}
          </Form>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default Login