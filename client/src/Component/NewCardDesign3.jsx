import React, { useRef, useEffect, useState } from "react";
import "./NewCardDesign3.scss";
import banner_img from "../assets/background2.jpg";
import avatar from "../assets/profile.png";
import shape from "../assets/g4.png";
import graph from "../assets/graph5.png";
import graph2 from "../assets/g5.png";
import title_graph from "../assets/title2.png";
import social_graph from "../assets/graph5.png";
import sgraph from "../assets/graph6.png";
import sgraph1 from "../assets/graph6.png";
import { Link, useParams } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import axios from "axios";
import emailjs from "@emailjs/browser";
//Product
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

// import Carousel1 from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
//Carousel Testimonial
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
//QRCODE:

import qrcode from "../assets/qr.svg";
//Testimonial
import { useContext } from "react";


// ProductSlider
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";

import product1 from "../assets/1.jpg";
import product2 from "../assets/2.jpg";
import product3 from "../assets/3.jpg";
import product4 from "../assets/4.jpg";
import product5 from "../assets/5.jpg";
const NewCardDesign3 = () => {
  let [serviceLoad, setServiceLoad] = useState(false);

  const buttonStyle = {
    width: "0px",
    background: "none",
    opacity: 0,
    border: "0px",
    padding: "0px",
  };
  const properties = {
    prevArrow: (
      <button style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </button>
    ),
    nextArrow: (
      <button style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </button>
    ),
  };
  let id = useParams();
  let [formData, setFormData] = useState({
    clientFullName1: "",
    clientEmail1: "",
    clientMobileNumber1: "",
    clientInquiries1: "",
  });
  //Popup show :
  let [popup, setPopup] = useState(false);
  //Form Submit loader :
  let [loading, setLoading] = useState(false);
  //Collect form data by using useRef:
  let form = useRef();
  let popUp_open = {
    hide: { opacity: 0, scale: 0.2 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring" },
    },
  };
  //recieve email and send email to user by  emailJS:
  const sendEmail = (e) => {
    // e.preventDefault();

    emailjs
      .sendForm(
        "service_8jjtsu7",
        "template_5ro61jb",
        form.current,
        "6JJQhAKoQ9fGApzig"
      )
      .then(
        (result) => {
          // console.log(result.text);
          // console.log('message sent success')
        },
        (error) => {
          // console.log(error.text);
        }
      );
  };
  //Form Logic :
  let formik = useFormik({
    initialValues: {
      clientFullName1: "",
      clientEmail1: "",
      clientMobileNumber1: "",
      clientInquiries1: "",
    },

    //Validation :
    validationSchema: Yup.object({
      clientFullName1: Yup.string()
        .min(3, "Min 3 char required")
        .max(20, "Name must be 20 character or less")
        .required("Name is required"),
      clientEmail1: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      clientMobileNumber1: Yup.string()
        .min(10, "Invalid Mobile number")
        .max(10, "Invalid Mobile number")
        .required("MobileNumber is required"),
      clientInquiries1: Yup.string()
        .min(10, "Minimum 10 character required")
        .max(100, "Inquiries must be 100 character or less")
        .required("Inquiries is required"),
    }),
    //Form Submit :
    onSubmit: (values) => {
      setFormData({
        clientFullName1: values.clientFullName1,
        clientEmail1: values.clientEmail1,
        clientMobileNumber1: values.clientMobileNumber1,
        clientInquiries1: values.clientInquiries1,
      });

      sendEmail();
      setLoading(!loading);
      setConfetti(true);
      setTimeout(() => {
        setPopup(!popup);
        setLoading(false);
        setConfetti(!confetti);
        formik.values.clientFullName1 = "";
        formik.values.clientEmail1 = "";
        formik.values.clientMobileNumber1 = "";
        formik.values.clientInquiries1 = "";
      }, 4000);

      setTimeout(() => {
        setPopup(false);
      }, 7000);
      StopConfetti();
    },
  });
  let [feedbackForm, setFeedbackForm] = useState({
    userName: "",
    userFeedback: "",
    currentRatting: 0,
  });
  let [feedbackLoader, setFeedbackLoader] = useState(false);
  let [commentOpen, setCommentOpen] = useState(false);
  let [AllFeedBacks, setAllFeedBacks] = useState([]);
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  //Form Logic :
  let feedbackFormik = useFormik({
    initialValues: {
      userName: "",
      userFeedback: "",
      currentRatting: 0,
    },

    //Validation :
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(3, "Min 3 char required")
        .max(50, "Name must be 20 character or less")
        .required("Name is required"),
      userFeedback: Yup.string()
        .min(10, "Minimum 10 character required")
        .max(400, "Feedback must be 100 character or less")
        .required("Feedback is required"),
    }),
    //Form Submit :
    onSubmit: async (values) => {
      setFeedbackForm({
        userName: values.userName,
        userFeedback: values.userFeedback,
        currentRatting: values.currentRatting,
      });
      feedBackSubmit();
      setTimeout(() => {
        feedbackFormik.values.userName = "";
        feedbackFormik.values.userFeedback = "";
        feedbackFormik.values.currentRatting = 0;
      }, 4000);
    },
  });
  //Start Ratting:
  // let currentRatting=0;
  function handleRatting(e) {
    let star = e.target;
    // console.log(star,star.classList);
    if (star.classList.contains("star")) {
      let ratting = parseInt(star.dataset.rating, 10);
      highlightStar(ratting);
    }
  }
  //Remove Ratting:
  function removeRatting() {
    highlightStar(feedbackForm.currentRatting);
  }
  //Staring Setted
  function RattingSetted(e) {
    let starRating = document.querySelector(".ratting_container");
    let star = e.target;
    // console.log(star,star.classList);
    if (star.classList.contains("star")) {
      feedbackForm.currentRatting = parseInt(star.dataset.rating, 10);
      starRating.setAttribute("data-rating", feedbackForm.currentRatting);
      highlightStar(feedbackForm.currentRatting);
    }
  }

  //Highlight star color:
  function highlightStar(ratting) {
    let stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      if (index < ratting) {
        star.classList.add("highlight");
      } else {
        star.classList.remove("highlight");
      }
    });
  }
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  //openFullImage preview:
  function openFullImage(pic) {
    let fullImageBox = document.getElementById("fullImageBox");
    let fullImage = document.getElementById("fullImage");
    fullImageBox.style.display = "block";
    fullImage.src = pic;
  }

  //Close FullImage Preview
  function closeFullImage() {
    let fullImageBox = document.getElementById("fullImageBox");

    fullImageBox.style.display = "none";
  };
    // Create a ref for the element you want to scroll to
    const targetRef = useRef(null);

    // Function to handle image click
    const handleImageClick = () => {
      // Scroll to the target element
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    };
  return (
    <>
      <div className="newCard_design_container">
        <div className="card_design_box1">
          <div>
            {/* Banner*/}
            <div className="card3_box-1">
              <div className="banner">
                <div className="banner_image">
                  <img src={banner_img} alt="banner" />
                </div>

                <div className="svg_bottom">
                
              
               
                  <svg  className="svg_top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#18e065" fill-opacity="1" d="M0,64L60,101.3C120,139,240,213,360,250.7C480,288,600,288,720,282.7C840,277,960,267,1080,266.7C1200,267,1320,277,1380,282.7L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                </div>
              </div>
            </div>
            {/* ,logo,userName  */}
            <div className="card3_box-2">
              <div className="user_details">
                <div className="logo">
                  <img src='https://img.freepik.com/free-photo/3d-cartoon-portrait-person-practicing-law-related-profession_23-2151419524.jpg?t=st=1714389694~exp=1714393294~hmac=0bc8ca78f8ca9b587854690fdc38466aad642af8c89580da671bec6334c91a8c&w=900' alt="logo" />
                  <div className="graph">
                    <img src={graph} alt="shape" />
                    <img src={shape} alt="layer" />
                  </div>
{/* 
                  <div className="alphabet">
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/a-cute.png"
                      alt="a-cute"
                    />
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/s-cute.png"
                      alt="s-cute"
                    />
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/t-cute.png"
                      alt="t-cute"
                    />
                  </div> */}
                </div>
                <div className="details">
                  <p>Jayakumar C</p>
                  <small>Principal</small>
                  <div className="summary">
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Fugit adipisci, id unde dolorum non accusantium.
                    </p>

                    <div className="social_media">
                      <a href="#">
                        <div className="icon">
                          <i className="bx bxl-facebook"></i>
                          <img src={social_graph} alt="graph" />
                        </div>
                      </a>
                      <a href="#">
                        <div className="icon">
                          <i className="bx bxl-whatsapp"></i>
                          <img src={social_graph} alt="graph" />
                        </div>
                      </a>
                      <a href="#">
                        <div className="icon">
                          <i className="bx bxl-instagram"></i>
                          <img src={social_graph} alt="graph" />
                        </div>
                      </a>
                      <a href="#">
                        <div className="icon">
                          <i className="bx bxl-linkedin"></i>
                          <img src={social_graph} alt="graph" />
                        </div>
                      </a>
                      <a href="#">
                        <div className="icon">
                          <i className="bx bxl-twitter"></i>
                          <img src={social_graph} alt="graph" />
                        </div>
                      </a>
                      <a href="#">
                        <div className="icon">
                          <i className="bx bxl-github"></i>
                          <img src={social_graph} alt="graph" />
                        </div>
                      </a>
                      {/* <a href="#">
                        <div className="icon">
                        <i className='bx bxl-youtube' ></i>
                          <img src={social_graph} alt="graph" />
                        </div>
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact */}
            <div className="card3_box_3">
              <div className="contact_title">
                <h4>Contact</h4>
                {/*<img src={title_graph} alt="title" />*/}
              </div>

              <div className="contact_container">
                <div className="box">
                  <div className="icons">
                    <img
                      width="100"
                      height="100"
                      src="https://img.icons8.com/keek/100/experimental-new-post-keek.png"
                      alt="experimental-new-post-keek"
                    />

                    <img src={graph2} alt="graph" />
                  </div>
                  <div className="detail">
                    <p>kodiyarasu01@gmail.com</p>
                    <small>Email</small>
                  </div>
                </div>
                <div className="box">
                  <div className="icons">
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/pulsar-gradient/48/apple-phone.png"
                      alt="apple-phone"
                    />

                    <img src={graph2} alt="graph" />
                  </div>
                  <div className="detail">
                    <p>+91 9865346435</p>
                    <small>Mobile Number</small>
                  </div>
                </div>
                <div className="box">
                  <div className="icons">
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency/48/birthday.png"
                      alt="birthday"
                    />

                    <img src={graph2} alt="graph" />
                  </div>
                  <div className="detail">
                    <p>26-Jan-2000</p>
                    <small>Date of Birth</small>
                  </div>
                </div>
                <div className="box">
                  <div className="icons">
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/pulsar-gradient/48/location.png"
                      alt="location"
                    />

                    <img src={graph2} alt="graph" />
                  </div>
                  <div className="detail">
                    <p>Chennai,T-Nagar</p>
                    <small>Address</small>
                  </div>
                </div>
              </div>
            </div>
            {/* Service */}
            <div className="card3_box_4">
              <div className="service_title">
                <h4>Services</h4>
                {/* <img src={title_graph} alt="title" /> */}
              </div>

              <div className="service_container">
                <div className="box">
                  <div className="icons">
                    <img
                      width="64"
                      height="64"
                      src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-teachers-professions-woman-diversity-flaticons-lineal-color-flat-icons.png"
                      alt="external-teachers-professions-woman-diversity-flaticons-lineal-color-flat-icons"
                    />
                    <img src={sgraph1} alt="sgraph" />
                  </div>
                  <h5>Qualified Staffs</h5>
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis, aliquid! A voluptate quod autem ratione, doloribus
                    eos repudiandae beatae dicta!
                  </small>
                </div>
                <div className="box">
                  <div className="icons">
                    <img
                      width="100"
                      height="100"
                      src="https://img.icons8.com/matisse/100/running.png"
                      alt="running"
                    />
                    <img src={sgraph} alt="sgraph" />
                  </div>
                  <h5>Play-Based_Learning</h5>
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis, aliquid! A voluptate quod autem ratione, doloribus
                    eos repudiandae beatae dicta!
                  </small>
                </div>

                {serviceLoad ? (
                  <>
                    <div className="box">
                      <div className="icons">
                        <img
                          width="48"
                          height="48"
                          src="https://img.icons8.com/color/48/abc.png"
                          alt="abc"
                        />
                        <img src={sgraph} alt="sgraph" />
                      </div>
                      <h5>Fluent English Speak</h5>
                      <small>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis, aliquid! A voluptate quod autem ratione,
                        doloribus eos repudiandae beatae dicta!
                      </small>
                    </div>
                    <div className="box">
                      <div className="icons">
                        <img
                          width="64"
                          height="64"
                          src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-discipline-achievements-flaticons-flat-flat-icons-2.png"
                          alt="external-discipline-achievements-flaticons-flat-flat-icons-2"
                        />
                        <img src={sgraph1} alt="sgraph" />
                      </div>
                      <h5>Dicipline Teaching</h5>
                      <small>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis, aliquid! A voluptate quod autem ratione,
                        doloribus eos repudiandae beatae dicta!
                      </small>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>

              <div
                className="more_servies"
                onClick={() => setServiceLoad((pre) => !pre)}
              >
                {serviceLoad ? (
                  <>
                    <i className="bx bxs-hand-up bx-flashing"></i>
                    <small>Show Less</small>

                    <i className="bx bx-x" style={{ color: "red" }}></i>
                  </>
                ) : (
                  <>
                    <i className="bx bxs-hand-right bx-flashing"></i>
                    <small>Load more</small>
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color-glass/48/connection-status-off.png"
                      alt="connection-status-off"
                    />
                  </>
                )}
              </div>
            </div>
            {/* Appoiment */}
            <div className="card3_box_5">
              <div className="appoinment_title">
                <h4>Make an Appoinment</h4>
                {/* <img src={title_graph} alt="title" /> */}
              </div>
              <div className="appoinment_container">
                <form action="">
                  <div className="form_group">
                    <label htmlFor="">
                    <img width="48" height="48" src="https://img.icons8.com/pulsar-gradient/48/time.png" alt="time"/>
                    </label>
                    <input className="setTime" type="text" placeholder="Enter your Visiting Time" />

                    <div className="default_time">
                      <div>
                        <input type="text" readOnly value='10.00 AM to 11.00 AM' />
                      </div>
                      <div>
                        <input type="text" readOnly value='12.00 PM to 1.00 PM' />
                      </div>
                      <div>
                        <input type="text" readOnly value='1.00 PM to 2.00 PM' />
                      </div>
                      <div>
                        <input type="text" readOnly value='4.00 PM to 5.00 PM' />
                      </div>
                    </div>

                    <div className="form_submit">
                      <button type="submit"><img width="100" height="100" src="https://img.icons8.com/keek/100/experimental-speech-bubble-keek.png" alt="experimental-speech-bubble-keek"/>Fix Your Appoinment </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* Gallery */}
            <div className="card3_box_6">
            <div className="gallery_title">
                <h4>Gallery</h4>
                {/* <img src={title_graph} alt="title" /> */}
              </div>
              <div className="gallery_container">
              <div className="full_image" id="fullImageBox">
                <div className="close_Full_Image_gallery">
                  <i
                    class="bx bxs-message-square-x"
                    onClick={closeFullImage}
                  ></i>
                </div>
                <img src={banner_img} alt="gallery" id="fullImage" />
              </div>
              <div className="col_1">
                <img
                  src="https://img.freepik.com/free-photo/strict-male-teacher-wearing-glasses-holding-points-mini-blackboard-sitting-table-with-school-tools-classroom_141793-114681.jpg?t=st=1714389401~exp=1714393001~hmac=0079fd411b20c268e819b2f1f0064951062160a7ba5148f353da5183f6792eab&w=900"
                  alt="gall"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/scared-covered-mouth-with-hand-male-teacher-wearing-glasses-sitting-table-with-school-tools-classroom_141793-114269.jpg?t=st=1714389421~exp=1714393021~hmac=4a9bc8ca2d0542d7c27df80e6cb5ab821e1300ba38d6b399a334e2f5da356f13&w=900"
                  alt=""
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/scared-male-teacher-wearing-glasses-holding-reading-book-sitting-table-with-school-tools-classroom_141793-114055.jpg?t=st=1714389443~exp=1714393043~hmac=4bb7b5aa350f82a47d4929abff9379dbc2ddd44d42df9f3c9452910d658b25e3&w=900"
                  alt=""
                  onClick={(e) => openFullImage(e.target.src)}
                />
                    <img
                  src="https://img.freepik.com/free-photo/unpleased-male-teacher-wearing-glasses-points-with-pointer-stick-blackboard-sitting-table-with-school-tools-classroom_141793-114329.jpg?t=st=1714389461~exp=1714393061~hmac=a216ff1f7099d1e4154e8a4f187abd4aadcba25d76d5f8cad622b77b0cd6b716&w=900"
                  alt="gall"
                  onClick={(e) => openFullImage(e.target.src)}
                />
              </div>
          

              <div className="col_3">
                <img
                  src="https://img.freepik.com/free-photo/strict-points-side-male-teacher-wearing-glasses-sitting-table-with-school-tools-classroom_141793-114345.jpg?t=st=1714389501~exp=1714393101~hmac=55ef07c4175b2d16bf7383357c8b18d58b6e63f839f0dadc9b6d8f1fc08f162f&w=900"
                  alt=""
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/teacher-brunette-instructor-with-computer-suit-whiteboard-classroom-holding-pen_140725-163263.jpg?t=st=1714389519~exp=1714393119~hmac=c87ac7d259c48b0edc1c98bae5b02006004e14ccf50eec5972e373111065df1e&w=900"
                  alt=""
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/male-teacher-wearing-glasses-holding-abacus-sitting-table-with-school-tools-classroom_141793-114123.jpg?t=st=1714389536~exp=1714393136~hmac=deb14a1594b933e9c959a87a6240a1c8d020ae7a4a1233e36201d44cd6b8fc09&w=900"
                  alt=""
                  onClick={(e) => openFullImage(e.target.src)}
                />
                    <img
                  src="https://img.freepik.com/free-photo/teacher-smart-instructor-grey-suit-classroom-with-computer-whiteboard-showing-silence-sign_140725-163421.jpg?t=st=1714389554~exp=1714393154~hmac=1ec1430ab8bdd87ca1f9dad44eb44021a215dc27883aeb8e46e4cc1b6f6065f7&w=900"
                  alt="gall"
                  onClick={(e) => openFullImage(e.target.src)}
                />
              </div>
            </div>
            </div>
     {/* Testimonial */}
     <div className="card3_box_7">
      <div className="testimonial_title">
        <h4>Testimonial</h4>
        {/* <img src={title_graph} alt="title" /> */}
      </div>

      <div className="Testimonial">
                    <div className="testimonial_box">
                      <Carousel autoPlay="true">
                     
                            <div className="content" >
                              <div className="user_Detail">
                                <img
                                  src={avatar}
                                  alt="logo"
                                />

                            
                              </div>
                             
                              <div className="name">
                                  <p>
                                    { "Dummy Name"}{" "}
                                    <i className="bx bxs-heart"></i>
                                  </p>

                                  <span>
                                    <i className="bx bxs-star bx-flashing"></i>
                                    <i className="bx bxs-star bx-flashing"></i>
                                    <i className="bx bxs-star bx-flashing"></i>
                                    <i className="bx bxs-star bx-flashing"></i>
                                    <i className="bx bxs-star bx-flashing"></i>
                                  </span>
                                </div>
                           
                              <div className="feedbacks">
                                <p>
                                  <i className="uil uil-comment-alt-heart"></i>
                                
                                    Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Sunt dolores maiores.
                                </p>
                              </div>
                              <div className="feedback_date">
                              <img width="64" height="64" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-experience-lifestyles-flaticons-flat-flat-icons-2.png" alt="external-experience-lifestyles-flaticons-flat-flat-icons-2"/>
                                <small>
                                  { "__/_/____"}
                                </small>
                              </div>
                            </div>
                       
                      </Carousel>
                    </div>

                
            
                    <svg   className="qrsvg_top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,32L120,37.3C240,43,480,53,720,48C960,43,1200,21,1320,10.7L1440,0L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
                 
                 
                    <svg className="qrsvg_bottom"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,288L40,288C80,288,160,288,240,250.7C320,213,400,139,480,122.7C560,107,640,149,720,149.3C800,149,880,107,960,106.7C1040,107,1120,149,1200,186.7C1280,224,1360,256,1400,272L1440,288L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
                  </div>
     </div>
     {/* Enquiries */}

     <div className="card3_box_8">
     <div className="inquries_title">
        <h4>Make Your Inquiry</h4>
        {/* <img src={title_graph} alt="title" /> */}
      </div>
      <div className="equiry_container">
                  <div className="enquiry_heading">
                    <h5> Be in Touch </h5>
                    <img width="64" height="64" src="https://img.icons8.com/external-flat-geotatah/64/external-collaborate-gamification-flat-flat-geotatah.png" alt="external-collaborate-gamification-flat-flat-geotatah"/>
                  </div>
                  <form action="" ref={form} onSubmit={formik.handleSubmit}>
                    {/* //First Name */}
                    <div className="form_group">
                      <label
                        htmlFor="clientFullName1"
                        className={`${
                          formik.errors.clientFullName1 ? "error" : ""
                        } `}
                      >
                        {formik.touched.clientFullName1 &&
                        formik.errors.clientFullName1
                          ? formik.errors.clientFullName1
                          : "FullName"}
                        <span>
                          <sup>*</sup>
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your Fullname "
                        name="clientFullName1"
                        id="clientFullName1"
                        value={formik.values.clientFullName1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div className="icon">
                      <img width="48" height="48" src="https://img.icons8.com/pulsar-gradient/48/user.png" alt="user"/>
                      </div>
                    </div>
                    {/* //Last Name */}
                    <div className="form_group">
                      <label
                        htmlFor="clientEmail1"
                        className={`${
                          formik.errors.clientEmail1 ? "error" : ""
                        } `}
                      >
                        {formik.touched.clientEmail1 &&
                        formik.errors.clientEmail1
                          ? formik.errors.clientEmail1
                          : "Email"}

                        <span>
                          <sup>*</sup>
                        </span>
                      </label>
                      <input
                        type="email"
                        placeholder="Eg : abc@gmail.com"
                        name="clientEmail1"
                        id="clientEmail1"
                        value={formik.values.clientEmail1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div className="icon">
                      <img width="48" height="48" src="https://img.icons8.com/pulsar-gradient/48/secured-letter.png" alt="secured-letter"/>
                      </div>
                    </div>
                    <div className="form_group">
                      <label
                        htmlFor="clientMobileNumber1"
                        className={`${
                          formik.errors.clientMobileNumber1 ? "error" : ""
                        } `}
                      >
                        {formik.touched.clientMobileNumber1 &&
                        formik.errors.clientMobileNumber1
                          ? formik.errors.clientMobileNumber1
                          : "Mobile Number"}
                        <span>
                          <sup>*</sup>
                        </span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Eg : +91 456789714"
                        name="clientMobileNumber1"
                        id="clientMobileNumber1"
                        value={formik.values.clientMobileNumber1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div className="icon">
                      <img width="48" height="48" src="https://img.icons8.com/pulsar-gradient/48/outgoing-call.png" alt="outgoing-call"/>
                      </div>
                    </div>
                    <div className="form_group">
                      <label
                        htmlFor="clientInquiries1"
                        className={`${
                          formik.errors.clientInquiries1 ? "error" : ""
                        } `}
                      >
                        {formik.touched.clientInquiries1 &&
                        formik.errors.clientInquiries1
                          ? formik.errors.clientInquiries1
                          : "Fill your Quiries"}
                        <span>
                          <sup>*</sup>
                        </span>
                      </label>
                      <textarea
                        id="clientInquiries1"
                        name="clientInquiries1"
                        cols="30"
                        rows="7"
                        placeholder="Enter your Quiries"
                        value={formik.values.clientInquiries1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></textarea>
                      <div className="icon">
                      <img width="48" height="48" src="https://img.icons8.com/pulsar-gradient/48/speech-bubble-with-dots.png" alt="speech-bubble-with-dots"/>
                      </div>
                    </div>

                    <div className="form_actions">
                      <button type="submit">
                      <img width="48" height="48" src="https://img.icons8.com/pulsar-gradient/48/sent.png" alt="sent"/>
                        Send Message{" "}
                        {loading ? <span className="form_loader"></span> : ""}
                      </button>
                    </div>

                    <motion.div className="popup_container">
                      {popup ? (
                        <motion.div
                          className="popup"
                          variants={popUp_open}
                          initial="hide"
                          animate="show"
                        >
                          <motion.i
                            onClick={() => setPopup(false)}
                            className="uil uil-times"
                          ></motion.i>
                          <h4>Thanks for your responce!</h4>
                          <small>{formData.name}</small>
                          <p>Your email successfully received </p>
                          <small>{formData.email}</small>
                          <small>Will let you know shortly...</small>
                        </motion.div>
                      ) : (
                        ""
                      )}
                    </motion.div>
                  </form>
                </div>
     </div>
     {/* footer */}
     <div className="card3_box_9">
     <img width="48" height="48" src="https://img.icons8.com/pulsar-gradient/48/check-all.png" alt="check-all"/>
        <small>All Copyright Reserved &copy; 2024 myvirtualcard.in</small>
     </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCardDesign3;
