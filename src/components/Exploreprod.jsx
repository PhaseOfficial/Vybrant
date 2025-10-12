import BlurText from "./BlurText";
import RotatingText from './RotatingText';
import Particles from './Particles';
import VisionImage from "../assets/vision.png";

const Exploreprod = () => {
  return (
    <section className="relative rounded-[3rem] bg-gray-100 flex items-center justify-center min-h-screen overflow-hidden bg-black">
      {/* Particles background */}
      <div className="absolute inset-0">
        <Particles
          particleColors={['#660761ff', '#f00909ff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-1 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
        About Vybrant Care Services
        </h2>
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center">

      {/* Image */}
      <div className="w-full md:w-1/2 h-64 md:h-auto">
        <img
          src={VisionImage}
          alt="Our Vision"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Content */}
      <div className="p-8 md:w-1/2">
        <h2 className="text-3xl font-bold text-pink-500 mb-4">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed">
          To become the UK’s leading home care provider, expanding our trusted and
          respected services from Yorkshire to every major city in the nation, while
          setting new standards for personalised home care and becoming the first
          choice for both service users and care professionals.
        </p>
      </div>

    </div>
      </div>
    </section>
  );
}

export default Exploreprod;
