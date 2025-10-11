import BlurText from "./BlurText";
import RotatingText from './RotatingText';
import Particles from './Particles';

const Exploreprod = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black">
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
        <BlurText
          text="I excel at being a"
          className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6"
        />
        <RotatingText
          texts={['Data Scientist', 'Graphic Designer', 'Developer', 'Digital Marketer!']}
          mainClassName="px-4 sm:px-6 md:px-8 bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 text-white text-4xl sm:text-6xl md:text-8xl overflow-hidden py-1 sm:py-2 md:py-3 justify-center rounded-lg inline-block font-black font-montserrat-bold"
          staggerFrom="last"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-120%' }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </div>
    </section>
  );
}

export default Exploreprod;
