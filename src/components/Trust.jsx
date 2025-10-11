import FallingText from './FallingText';

const Trust = () => {
  return (
    <div className="bg-black text-white flex items-center justify-center overflow-hidden relative w-full h-screen p-4 font-montserrat font-black text-4xl sm:text-2xl md:text-4xl">
      <FallingText
        text={`Your Scientific Research. Your Branding Design. Your Data. Your Software and Web Development. Your Brand Identity and Marketing.`}
        highlightWords={["Research", "Design", "Data", "Development", "Brand", "Marketing", "Software", "Web"]}
        highlightClass="highlighted"
        trigger="hover"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.56}
        fontSize="2rem"
        mouseConstraintStiffness={0.5}
      />
    </div>
  );
};

export default Trust;
