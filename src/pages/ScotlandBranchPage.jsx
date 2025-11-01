import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaUsers, FaHeart, FaShieldAlt, FaBrain, FaCheckCircle } from "react-icons/fa";
// icons
import ScotlandImg from "../assets/scotland-banner.svg"; // 🖼️ replace with your image
import Logo from "../assets/qt=q_95.webp"; // 🏷️ your logo
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { FaHandsHelping, FaGlobe, FaBolt} from "react-icons/fa"; // icons
import ServiceCards from "../components/serviceCards";
import Contactus from "../components/Contactus";




const ScotlandBranch = () => {

  const principles = [
    { label: "Dignity & Respect", icon: <FaHandsHelping /> },
    { label: "Compassion", icon: <FaHeart /> },
    { label: "Inclusion", icon: <FaGlobe /> },
    { label: "Responsive Care", icon: <FaBolt /> },
    { label: "Wellbeing", icon: <FaUsers /> },
    { label: "Empowerment", icon: <FaShieldAlt /> },
  ];

  return (
    <div>
    <Navbar />
    <div className="text-gray-800 mt-8">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex rounded-[3rem] items-center justify-center bg-cover  bg-center"
        style={{ backgroundImage: `url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmF5ZTllcmp0YnZvOGIya2lta25vc2dvb3VlamE5aHVxaDQwZzhsOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/J8bmJxUfTjfTumBh7u/giphy.gif)` }}>
        <div className="absolute inset-0 bg-black rounded-[3rem] bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <img src={Logo} alt="Vybrant Care Logo" className="mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Home Care Services for Scotland
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Supporting independence and wellbeing for individuals and families across West Lothian and surrounding areas.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg text-gray-700 leading-relaxed mb-10"
        >
          Our services are designed to align with the priorities of the Care Inspectorate and the Health and Social Care Partnership (HSCP), ensuring care that is sustainable, compliant, and truly impactful. Explore the key areas where we provide meaningful, person-centred support. 
        </motion.p>

        {/* Service Sections */}
        <div className="grid md:grid-cols-2 gap-10">
          {[
  {
    icon: FaHome,
    title: "Core Care at Home (Personal Support)",
    points: [
      "Personal care – washing, dressing, toileting",
      "Medication support and prompting",
      "Meal preparation and hydration monitoring",
      "Companionship and emotional support",
      "Light domestic help to maintain independence",
    ],
  },
  {
    icon: FaBrain,
    title: "Elderly & Dementia Support",
    points: [
      "Dementia-friendly home support with structured routines",
      "Night or waking watch care",
      "Respite care for family carers",
      "All staff trained in dementia awareness",
    ],
  },
  {
    icon: FaCheckCircle,
    title: "Reablement and Recovery Support",
    points: [
      "Goal-focused care after hospital discharge",
      "Recovery support after illness or injury",
      "Collaboration with occupational therapists and nurses",
    ],
  },
  {
    icon: FaUsers,
    title: "Family and Carer Relief Services",
    points: [
      "Respite care at home (hourly, overnight, or weekend)",
      "Sitting services for families",
      "Emergency carer replacement for short notice needs",
    ],
  },
  {
    icon: FaShieldAlt,
    title: "Learning Disabilities & Autism Support",
    points: [
      "Daily living and community inclusion support",
      "Life skills training – cooking, money management, communication",
      "Structured plans for independence",
    ],
  },
  {
    icon: FaHeart,
    title: "Mental Health & Wellbeing Support",
    points: [
      "Low-level routine building and motivation",
      "Medication adherence assistance",
      "Collaboration with community psychiatric nurses (CPNs)",
    ],
  },
].map(({ icon: Icon, title, points }, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: i * 0.1 }}
    viewport={{ once: true }}
    className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition"
  >
    <Icon className="text-blue-600 w-10 h-10 mb-4" />
    <h3 className="text-xl font-semibold text-blue-700 mb-3">{title}</h3>
    <ul className="list-disc list-inside text-gray-700 space-y-1">
      {points.map((p, j) => (
        <li key={j}>{p}</li>
      ))}
    </ul>
  </motion.div>
))}

        </div>

        {/* Additional Services */}
        <ServiceCards />

        {/* Strategic Vision */}
        <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      viewport={{ once: true }}
      className="mt-20 text-center bg-gray-50 py-16 rounded-3xl"
    >
      <h2 className="text-4xl font-extrabold text-blue-700 mb-6">
        Our Strategic Vision
      </h2>

      <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed mb-12 px-4">
        Vybrant Care Services <strong>Scotland</strong> is committed to empowering individuals
        in and <strong>West Lothian and surrounding areas</strong> to live independently,
        safely, and with dignity in their own homes. Our mission is guided by the
        principles of Scotland’s <strong>Health and Social Care Standards</strong>.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        {principles.map(({ label, icon }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-white border border-blue-100 shadow-md rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-lg hover:scale-[1.03] transition-transform duration-300"
          >
            <div className="text-blue-600 text-4xl mb-4">{icon}</div>
            <p className="text-blue-700 font-semibold text-lg">{label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>

      </section>
    </div>
    <Contactus />
    <Footer />
    </div>
  );
};

export default ScotlandBranch;
