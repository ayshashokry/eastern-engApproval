import React from "react";
import logo from "../assets/images/amanaLogo.png";
//Packages
import { Navbar, Button, Nav, Container } from "react-bootstrap";
import { Dropdown, Menu, notification } from "antd";
import Media from "react-media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faChevronDown,
  faHome,
  faPhone,
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import {Link} from 'react-router-dom'
export default function SmallNavbar() {
  const SignOut = (e) => {
    const args = {
      description: "تم تسجيل الخروج بنجاح",
      duration: 5,
      placement: "bottomLeft",
      bottom: 5,
    };
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    notification.open(args);
  };

  return (
    <Navbar expand="lg" className="portalNavbar1 " fixed="top">
      <Container fluid>
        <Nav>
          <ul className=" leftUl">
            <li>
              {localStorage.getItem("token") !== null ? (
                <>
                  <Dropdown
                    getPopupContainer={(trigger) => trigger.parentNode}
                    trigger={["click"]}
                    overlay={
                      <Menu>
                        <Media query="(max-width: 768px)">
                          {(matches) =>
                            matches ? (
                              <>
                                <Menu.Item>
                                  <a
                                    href={`${
                                      window.hostTest + "/home/UserProfile"
                                    }`}
                                    className="navitem">
                                    <FontAwesomeIcon
                                      style={{ fontSize: "18px" }}
                                      icon={faUser}
                                      className="fa-x ml-2"
                                    />
                                    الصفحة الشخصية
                                  </a>
                                </Menu.Item>
                                <hr />
                                {localStorage.getItem("user")?.engcompany_id !== null ? (
                                  <Menu.Item>
                                    <Link
                                      to="/EditEngCompany"
                                      className="navitem">
                                      <FontAwesomeIcon
                                        style={{ fontSize: "18px" }}
                                        icon={faUser}
                                        className="fa-x ml-2"
                                      />
                                      ملف المكتب الهندسي
                                    </Link>
                                  </Menu.Item>
                                ) : null}
                                <Menu.Item>
                                  <a
                                    href={`${window.hostTest + "/home"}`}
                                    className="navitem">
                                    <FontAwesomeIcon
                                      style={{ fontSize: "18px" }}
                                      icon={faHome}
                                      className="fa-x ml-2"
                                    />
                                    الرئيـسية
                                  </a>
                                </Menu.Item>
                                {localStorage.getItem("token") ? (
                                  <>
                                    <hr />
                                    <Menu.Item>
                                      <a
                                        href={`${
                                          window.hostTest + "/home/Apps"
                                        }`}
                                        className="navitem">
                                        <FontAwesomeIcon
                                          style={{ fontSize: "18px" }}
                                          icon={faCalendarCheck}
                                          className="fa-x ml-2"
                                        />
                                        تطبيقاتي
                                      </a>
                                    </Menu.Item>
                                  </>
                                ) : (
                                  <>
                                    <hr />
                                    <Menu.Item>
                                      <a
                                        href={`${
                                          window.hostTest + "/home/Booking"
                                        }`}
                                        className="navitem">
                                        <FontAwesomeIcon
                                          style={{ fontSize: "18px" }}
                                          icon={faCalendarCheck}
                                          className="fa-x ml-2"
                                        />
                                        حجـز مـوعد
                                      </a>
                                    </Menu.Item>
                                  </>
                                )}
                                <hr />
                                <Menu.Item
                                  style={{ cursor: "pointer" }}
                                  className="navitem ">
                                  <FontAwesomeIcon
                                    style={{ fontSize: "18px" }}
                                    icon={faPhone}
                                    className="fa-x ml-2"
                                  />
                                  <a
                                    href={`${
                                      window.hostTest + "/home/ContactUs"
                                    }`}
                                    className="navitem">
                                    تواصل معنا
                                  </a>
                                </Menu.Item>
                                <hr />
                                <Menu.Item
                                  style={{ cursor: "pointer" }}
                                  className="navitem "
                                  onClick={SignOut}>
                                  <FontAwesomeIcon
                                    style={{ fontSize: "18px" }}
                                    icon={faSignOutAlt}
                                    className="fa-x ml-2"
                                  />
                                  تسجيل خروج
                                </Menu.Item>
                              </>
                            ) : (
                              <>
                                <Menu.Item>
                                  <a
                                    href={`${
                                      window.hostTest + "/home/UserProfile"
                                    }`}
                                    className="navitem">
                                    <FontAwesomeIcon
                                      style={{ fontSize: "18px" }}
                                      icon={faUser}
                                      className="fa-x ml-2"
                                    />
                                    الصفحة الشخصية
                                  </a>
                                </Menu.Item>
                                <hr />
                                {localStorage.getItem("user")?.engcompany_id !== null ? (
                                 <> <Menu.Item>
                                    <Link
                                      to="/EditEngCompany"
                                      className="navitem">
                                      <FontAwesomeIcon
                                        style={{ fontSize: "18px" }}
                                        icon={faUser}
                                        className="fa-x ml-2"
                                      />
                                      ملف المكتب الهندسي
                                    </Link>
                                  </Menu.Item><hr/></>
                                ) : null}
                                <Menu.Item
                                  style={{ cursor: "pointer" }}
                                  className="navitem "
                                  onClick={SignOut}>
                                  <FontAwesomeIcon
                                    style={{ fontSize: "18px" }}
                                    icon={faSignOutAlt}
                                    className="fa-x ml-2"
                                  />
                                  تسجيل خروج
                                </Menu.Item>
                              </>
                            )
                          }
                        </Media>
                      </Menu>
                    }
                    placement="bottomLeft"
                    arrow>
                    <Button>
                      <span className="navitem px-2">
                        {JSON.parse(localStorage.getItem("user"))?.name}
                      </span>
                      <FontAwesomeIcon className="mx-1" icon={faChevronDown} />
                    </Button>
                  </Dropdown>
                </>
              ) : null}
            </li>

            <Media query="(max-width: 768px)">
              {(matches) =>
                matches ? (
                  <>
                    {localStorage.getItem("token") ? null : (
                      <Dropdown
                        getPopupContainer={(trigger) => trigger.parentNode}
                        trigger={["click"]}
                        overlay={
                          <Menu>
                            <Menu.Item>
                              <a
                                href={`${window.hostTest + "/home"}`}
                                className="navitem">
                                <FontAwesomeIcon
                                  style={{ fontSize: "18px" }}
                                  icon={faHome}
                                  className="fa-x ml-2"
                                />
                                الرئيسية
                              </a>
                            </Menu.Item>
                            <hr />
                            <Menu.Item>
                              <a
                                href={`${window.hostTest + "/home/Login"}`}
                                className="navitem">
                                <FontAwesomeIcon
                                  style={{ fontSize: "18px" }}
                                  icon={faSignInAlt}
                                  className="fa-x ml-2"
                                />
                                الدخول
                              </a>
                            </Menu.Item>
                            <hr />

                            {localStorage.getItem("token") ? (
                              <>
                                <hr />
                                <Menu.Item>
                                  <a
                                    href={`${window.hostTest + "/home/Apps"}`}
                                    className="navitem">
                                    <FontAwesomeIcon
                                      style={{ fontSize: "18px" }}
                                      icon={faCalendarCheck}
                                      className="fa-x ml-2"
                                    />
                                    تطبيقاتي
                                  </a>
                                </Menu.Item>
                              </>
                            ) : null}
                            <hr />
                            <Menu.Item>
                              <a
                                href={`${window.hostTest + "/home/Booking"}`}
                                className="navitem">
                                <FontAwesomeIcon
                                  style={{ fontSize: "18px" }}
                                  icon={faCalendarCheck}
                                  className="fa-x ml-2"
                                />
                                حجز موعد
                              </a>
                            </Menu.Item>
                          </Menu>
                        }
                        placement="bottomLeft"
                        arrow>
                        <Button>
                          <FontAwesomeIcon
                            className=" mr-2 "
                            icon={faChevronDown}
                            style={{ fontSize: "15px" }}
                          />
                        </Button>
                      </Dropdown>
                    )}
                  </>
                ) : localStorage.getItem("token") === undefined ? (
                  <>
                    <li>
                      <a
                        href={`${window.hostTest + "/home/"}`}
                        className="navitem">
                        الرئيـسية
                      </a>
                    </li>
                    <span className="navitemBorder"></span>
                    <li>
                      <a
                        href={`${window.hostTest + "/home/Login"}`}
                        className="navitem">
                        الدخول
                      </a>
                    </li>
                    <span className="navitemBorder"></span>

                    <li>
                      <a
                        href={`${window.hostTest + "/home/Booking"}`}
                        className="navitem">
                        حجز موعد
                      </a>
                    </li>
                  </>
                ) : localStorage.getItem("token") ? (
                  <>
                    <span className="navitemBorder"></span>
                    <li>
                      <a
                        href={`${window.hostTest + "/home/Apps"}`}
                        className="navitem">
                        تطبيقاتي
                      </a>
                    </li>
                    <span className="navitemBorder"></span>
                    <li>
                      <a
                        href={`${window.hostTest + "/home"}`}
                        className="navitem">
                        الرئيـسية
                      </a>
                    </li>
                  </>
                ) : null
              }
            </Media>
          </ul>
          <ul className="rightUl">
            <Media query="(max-width: 768px)">
              {(matches) =>
                matches ? (
                  <>
                    {localStorage.getItem("token") === undefined ? (
                      <>
                        <a
                          href={`${window.hostTest + "/home/ContactUs"}`}
                          className="navitem">
                          تواصل معنا
                        </a>
                        <span className="navitemBorder"></span>
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    <a
                      href={`${window.hostTest + "/home/ContactUs"}`}
                      className="navitem">
                      تواصل معنا
                    </a>
                    <span className="navitemBorder"></span>
                  </>
                )
              }
            </Media>
            <li className="centerLi">
              <a
                className="iconLink"
                href="https://twitter.com/easterneamana/"
                target="_blank"
                rel="noreferrer">
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ fontSize: "20px" }}
                  className="twitterIcon"
                />
              </a>
            </li>
            <span className="navitemBorder"></span>
            <li>
              <a
                className="iconLink"
                href="https://www.youtube.com/channel/UC5k-pTxG2WTlj0Bbzcmk6RA"
                target="_blank"
                rel="noreferrer">
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="youtubeIcon"
                  style={{ fontSize: "20px" }}
                />
              </a>
            </li>
          </ul>
        </Nav>
        <img
          className="ml-2"
          alt="logo"
          src={logo}
          style={{ width: "auto", height: "50px" }}
        />
      </Container>
    </Navbar>
  );
}
