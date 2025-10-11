import SplitText from "./SplitText";
import RippleGrid from "./RippleGrid";

export default function HeroSection() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "600px",
        overflow: "hidden",
      }}
    >
      {/* Ripple background */}
      <div
        style={{
          position: "absolute",
          inset: 0, // fill parent
          zIndex: 2, // behind everything
        }}
      >
        <RippleGrid
          enableRainbow={true}
          gridColor="#ffffff"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.8}
        />
      </div>

      {/* Foreground Hero Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "white",
        }}
      >
        <SplitText
  text={`Hi, I'm Arthur`}
  className="text-5xl font-black font-montserrat text-center md:text-8xl whitespace-pre-line"
  delay={100}
  duration={0.6}
  zIndex={6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  onLetterAnimationComplete={handleAnimationComplete}
/>

      </div>
    </section>
  );
}
