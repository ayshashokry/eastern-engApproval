import React from "react";

//Packages
import { Container } from "react-bootstrap";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toArabic } from "arabic-digits";

import {
  faEdgeLegacy,
  faFirefoxBrowser,
  faChrome,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { connect } from "react-redux";

//Images
import Logo from "../assets/images/logo.png";
function Footer(props) {
  return (
    <div className="footer ">
      <Container fluid className="px-lg-5 ">
        <Row className="mb-4 pt-3 pr-lg-4">
          <Col xs={{ span: 12 }} style={{ textAlign: "right" }}>
            <img
              src={Logo}
              alt="portalLogo"
              style={{
                width: "auto",
                height: "70px",
              }}
            />
          </Col>
          <Col
            xs={{ span: 12 }}
            style={{ textAlign: "center" }}
            className="footerTopI pt-4"
          >
            <span>
              <a
                className="iconLink"
                href="https://www.youtube.com/channel/UC5k-pTxG2WTlj0Bbzcmk6RA"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="fa-2x youtubeIcon"
                />
              </a>
            </span>
            <span className="mx-5">
              <a
                className="iconLink"
                href="https://twitter.com/easterneamana/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="fa-2x twitterIcon"
                />
              </a>
            </span>
          </Col>
        </Row>
        <Row>
          <Col
            sm={{ span: 12 }}
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <h4>روابـط هـامـة</h4>
            <ul>
              <li>
                <a
                  href=" http://www.eamana.gov.sa/"
                  rel="noreferrer"
                  target="_blank"
                >
                  مـوقع الأمـانة
                </a>
              </li>
              <li>
                
                <a
                  href="https://www.eamana.gov.sa/E-services/Individuals"
                  rel="noreferrer"
                  target="_blank"
                >
                  الخـدمـات الالكـترونيـة
                </a>
              </li>
              <li>
                <a
                  href="https://www.momra.gov.sa/"
                  rel="noreferrer"
                  target="_blank"
                >
                  وزارة الشـؤون البلـدية والقرويـة
                </a>
              </li>
              <li>
                
                <a
                  href=" https://balady.gov.sa/"
                  rel="noreferrer"
                  target="_blank"
                >
                  بـوابـة بـلدي
                </a>
              </li>
              <li>
                
                <a
                  href="http://www.yesser.gov.sa/ar/Pages/default.aspx"
                  rel="noreferrer"
                  target="_blank"
                >
                  برنامـج التعـاملات الإلكـترونية الحـكـومية - يسـر
                </a>
              </li>
            </ul>
          </Col>
          <Col
            sm={{ span: 12 }}
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <h4>البوابة الجغرافية</h4>
            <ul>
              <li>
                
                <Link to="/Vision">رؤيـة الأمـانـة</Link>
              </li>
              <li>
                <Link to="/Goals">الأهـداف</Link>
              </li>
              <li>
                
                <Link to="/Organization"> الهـيكـل التنـظـيـمي</Link>
              </li>
            </ul>
          </Col>
          <Col
            sm={{ span: 12 }}
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <h4>الإتصال بنا</h4>
            <ul>
              <li>
                <Link to="/ContactUs"> تواصل معنا</Link>
              </li>
              <li>
                <Link to="/Questions">الأسئلة الشائعة </Link>
              </li>
              {props.isAuth ? (
                <li>
                  <Link to="/Apps">تطبيـقاتي</Link>
                </li>
              ) : (
                <li>
                  <Link to="/Booking"> حجـز مـوعد</Link>
                </li>
              )}
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="conditions">
        <Row className="pr-lg-5">
          <Col
            xs={{ span: 24 }}
            sm={{ span: 6 }}
            md={{ span: 2 }}
            className="footerBottomIcons"
          >
            <FontAwesomeIcon className=" footIcon" icon={faEdgeLegacy} />
            <FontAwesomeIcon className=" footIcon" icon={faFirefoxBrowser} />
            <FontAwesomeIcon className=" footIcon" icon={faChrome} />
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 19 }}>
            <h6>الشروط اللازمة التى يجب توافرها فى البيئة المشغلة للموقع </h6>
            <p>
              مقاس الشاشة لا تقل عن 600 يدعم متصفحات جوجل كروم, فيرفوكس, سفاري,و
              ايدج بالإضافة إلى جميع الأجهزة الذكية
            </p>
          </Col>
        </Row>
      </div>
      <Container>
        <p className="footerYear pt-4 pb-2">
          جميع الحقوق محفوظة - لأمانة المنطقة الشرقية
          {toArabic(new Date().getFullYear())}
        </p>
      </Container>
    </div>
  );
}
const mapStateToProps = function (state) {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps)(Footer);
