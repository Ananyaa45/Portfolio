import CinematicLayer from "@/components/CinematicLayer";
import VideoIntro from "@/components/VideoIntro";
import PortfolioContent from "@/components/PortfolioContent";

export default function Home() {
  return (
    <>
      {/* Floating Three.js particle layer covering the viewport background */}
      <CinematicLayer />

      <main style={{ position: "relative", zIndex: 2 }}>
        {/* Fullscreen Video Sticky Hero Section */}
        <VideoIntro />

        {/* Scrollable Sections: About, Services, Work, and Contact */}
        <PortfolioContent />
      </main>
    </>
  );
}
