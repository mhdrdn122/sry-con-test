import React, { useEffect, useState, useRef } from 'react';
import './signin.css';
import { Row, Col, Form, Button, Spinner, Image } from 'react-bootstrap';
import { Button as btn } from '@mui/material';

import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VanillaTilt from 'vanilla-tilt';
import logoImage from '../../../assets/adv_syrian.png';
import notify from '../../../utils/useNotification';
import { loginSuperAdminAction } from '../../../redux/slice/super_admin/auth/authSlice';

const SignInPage = () => {
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPress, setIsPress] = useState(false);
  const [theme, setTheme] = useState('light'); // light or dark

  const { loading, superAdminAuth } = useSelector(s => s.authSuper);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tiltRef = useRef(null);

  // Login effect
  useEffect(() => {
    if (!isPress && loading === false) {
      if (superAdminAuth?.superAdminInfo?.token) {
        localStorage.setItem(
          'superAdminInfo',
          JSON.stringify(superAdminAuth.superAdminInfo)
        );
        notify('تم تسجيل الدخول بنجاح', 'success');
        setUsername(''); setPassword('');
        setTimeout(() => navigate('/super_admin'), 1000);
      } else if (superAdminAuth?.error) {
        notify(superAdminAuth.error.message, 'error');
      }
    }
  }, [loading, isPress, superAdminAuth, navigate]);

  // Init VanillaTilt
  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
      });
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!user_name) return notify('الرجاء إدخال اسم المستخدم', 'error');
    if (!password) return notify('الرجاء إدخال كلمة المرور', 'error');
    if (password.length < 8)
      return notify('كلمة المرور يجب أن تكون 8 محارف على الأقل', 'error');

    setIsPress(true);
    await dispatch(loginSuperAdminAction({ username: user_name, password }));
    setIsPress(false);
  };

  return (
    <div className={`${theme}-theme`}>
      <div className="container-fluid p-0 m-0">
        <Row className="g-0 vh-100">
          {/* Image + backlight + tilt (md+) */}
          <Col
            md={8}
            className="d-none d-md-flex align-items-center justify-content-center p-0"
          >
            <div className="backlight-container tilt-card">
              <div className="backlight-overlay"></div>
              <Image
                src={logoImage}
                ref={tiltRef}
                alt="logo"
                className="backlight-image"
                fluid
              />
            </div>
          </Col>

          {/* Form (xs full, md=4) */}
          <Col
            xs={12}
            md={4}
            style={{borderRadius:0}}

            className="d-flex flex-column align-items-center justify-content-center form-panel position-relative"
          >
            {/* Theme toggle */}
            <Button
              variant="outline-secondary"
              size="sm"
              className="theme-toggle-btn"
              onClick={toggleTheme}
            >
              {theme === 'light' ? '🌑 الوضع الغامق' : '☀️ الوضع الفاتح'}
            </Button>

            <div className="w-75">
              {/* Small-screen logo */}
              <div className="d-block d-md-none text-center mb-4">
                <Image src={logoImage}   style={{margin:"0 auto" , background:"#fff" , borderRadius:"10px"}}  alt="logo" width={80} />
              </div>

              <h2 className="text-center mb-4 fw-bold">تسجيل الدخول</h2>

              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label className="fw-semibold">اسم المستخدم</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ادخل اسم المستخدم"
                    value={user_name}
                    onChange={e => setUsername(e.target.value)}
                    dir="rtl"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label className="fw-semibold">كلمة المرور</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="ادخل كلمة المرور"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    dir="rtl"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" variant="primary" disabled={isPress}>
                    {isPress ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        جاري الدخول...
                      </>
                    ) : (
                      'تسجيل الدخول'
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignInPage;