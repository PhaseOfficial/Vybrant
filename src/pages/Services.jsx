import React from "react";
import {
  FaHome,
  FaHospitalUser,
  FaHeartbeat,
  FaHandsHelping,
  FaSmile,
  FaUserFriends,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import image1 from "../assets/qt=q_95.webp";
import emergencyImage from "../assets/emergency.png";
import { Link } from "react-router-dom";
import Contactus from "../components/Contactus";
import OnlineAssessmentBooking from "../components/OnlineAssessmentBooking";

const services = [
  {
    title: "Home Care Service",
    icon: <FaHome className="text-blue-600 w-10 h-10" />,
    description:
      "Our Home Care Services offer a range of in-home care and support tailored to your daily needs.",
    listTitle: "Support will include:",
    items: [
      "Personal care support",
      "Medication administration",
      "Meal preparation",
      "Light housework",
      "Support with transfers",
    ],
  },
  {
    title: "After Hospital Care",
    icon: <FaHospitalUser className="text-blue-600 w-10 h-10" />,
    description:
      "Support offered on a short-term basis to help you manage at home after being in hospital.",
    listTitle: "When to consider it:",
    items: [
      "After having surgery",
      "Lost mobility / stroke",
      "When prescribed bed rest",
      "Increased falls risk",
      "When feeling weak",
    ],
  },
  {
    title: "Specialist Care",
    icon: <FaHeartbeat className="text-blue-600 w-10 h-10" />,
    description:
      "Helping people with physical, mental, or chronic illnesses live independently and with dignity.",
    listTitle: "Our areas of speciality:",
    items: [
      "Diabetes management",
      "Multiple sclerosis (MS)",
      "Dementia & Alzheimer’s",
      "Parkinson’s",
      "End-of-Life care",
    ],
  },
  {
    title: "Respite Care",
    icon: <FaHandsHelping className="text-blue-600 w-10 h-10" />,
    description:
      "Temporary relief for a primary caregiver, allowing them to rest while we provide quality care.",
    listTitle: "Where this can happen:",
    items: [
      "In the individual's home",
      "In a care/residential home",
      "In temporary accommodation",
      "In our respite living facility",
      "On vacation",
    ],
  },
  {
    title: "Companionship Service",
    icon: <FaUserFriends className="text-blue-600 w-10 h-10" />,
    description:
      "Reducing loneliness and promoting social connection. We keep you company and support your wellbeing.",
    listTitle: "Things we can do:",
    items: [
      "Doing activities/going out",
      "Escorting to coffee groups",
      "Assisting with routines",
      "Visiting friends or family",
      "Befriending",
    ],
  },
  {
    title: "Live-in Care",
    icon: <FaSmile className="text-blue-600 w-10 h-10" />,
    description:
      "Round-the-clock care from a dedicated live-in carer, ensuring safety, comfort, and companionship.",
    listTitle: "What is included:",
    items: [
      "Support with personal care",
      "Household chores",
      "Meal preparation",
      "Companionship",
      "Support with safe living",
    ],
  },
];

const Services = () => {
  return (
    <div>
    <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
        </div>
    <section className="max-w-7xl mx-auto px-6 md:px-12 mt-20 mb-20 text-gray-800">
    
      {/* Page Header */}
      <div className="text-center mt-20 mb-16">
       <img
      src={image1}
      alt="Company Logo"
      className="h-40 w-auto center mx-auto mb-6"
    />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Trusted Home Care Provider
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Vybrant Care Services is dedicated to enhancing the quality of life
          for our clients. Learn more about our skilled home care solutions
          designed for your comfort.
        </p>
      </div>

      {/* Services Grid */}
      <h2 className="text-3xl font-semibold text-center mb-10 text-blue-700">
        Our Services
      </h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              {service.icon}
              <h3 className="text-2xl font-semibold text-gray-900">
                {service.title}
              </h3>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {service.description}
            </p>
            <h4 className="text-blue-700 font-semibold mb-2">
              {service.listTitle}
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {service.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
<section className="mx-auto mt-20 mb-20 bg-red-200 text-gray-800 py-16 px-6 md:px-12">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Left: Image */}
        <div className="flex-1">
          <img
            src={emergencyImage}
            alt="Emergency Care"
            className="w-full h-80 md:h-[28rem] object-cover rounded-3xl shadow-lg"
          />
        </div>

        {/* Right: Content */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-center md:text-left mb-6 text-white-700">
            Emergency Care
          </h2>
          <p className="text-center md:text-left text-white-600 leading-relaxed text-lg">
            Our emergency care service is designed to respond quickly to urgent
            needs, supporting daily living tasks and helping individuals remain
            as independent as possible at home. Whether for older adults or
            those with complex health needs, this service provides fast access
            to experienced carers when immediate support is required.
          </p>
        </div>
        <div>
        <Link to="tel:+447828402043">
                    <button
                    className="
                      relative overflow-hidden
                      rounded-full border-2 border-gray-600 text-white-500 
                      px-6 py-3 mt-8 font-semibold
                      transition-all duration-300 ease-in-out
                      group
                    "
                  >
                    <span
                      className="
                        relative z-10 transition-colors duration-300 ease-in-out
                        group-hover:text-white
                      "
                    >
                      Contact us
                    </span>
                    <span
                      className="
                        absolute inset-0 bg-pink-500 
                        translate-x-[-100%] 
                        group-hover:translate-x-0
                        transition-transform duration-300 ease-in-out
                        z-0
                      "
                    ></span>
                  </button>
                  
                  </Link>
                  </div>
      </div>
    </section>
    <OnlineAssessmentBooking />
    <Contactus />
<Footer/>
    </div>
  );
};

export default Services;
