import GradientText from "../components/GradientText.jsx";
import { useRef } from "react";
import VariableProximity from "../components/VariableProximity.jsx";
import TiltedCard from "../components/TiltedCard.jsx";
import UCOBronchos from "../assets/appleicon.png";
import Merge from "../assets/googleicon.png";

const Home = () => {
  const containerRef = useRef(null);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <GradientText
        colors={["#1628b1", "#eee617", "#1628b1", "#eee617", "#1628b1"]}
        animationSpeed={7}
        showBorder={false}
        className="custom-class"
      >
        Welcome To UCO Exam Scheduler!
      </GradientText>
      <div ref={containerRef} style={{ position: "relative", margin: "24px 0" }}>
        <VariableProximity
          label={
            "Schedule your exams with ease! Seamless exports to any Calendar."
          }
          className={"variable-proximity-demo"}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        />
      </div>
      {/* Tilted cards in a row */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "32px",
          justifyContent: "center",
        }}
      >
        <TiltedCard
          imageSrc={UCOBronchos}
          altText="UCO Bronchos Logo"
          captionText="UCO Bronchos"
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={25}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent={false}
          overlayContent={
            <p className="tilted-card-demo-text">UCO Bronchos</p>
          }
        />
        <TiltedCard
          imageSrc={Merge}
          altText="Merge Icon"
          captionText="Merge"
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={25}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent={false}
          overlayContent={
            <p className="tilted-card-demo-text">Merge</p>
          }
        />
      </div>
    </div>
  );
};

export default Home;