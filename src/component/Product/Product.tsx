import React, { useState, useRef } from "react";
import { Box, Typography, IconButton, Grid } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import completeBodyIcon from "../../assets/prod1.png";
import engineIcon from "../../assets/prod2.png";
import cabinIcon from "../../assets/prod3.png";
import trunkIcon from "../../assets/prod4.png";
import vid1 from "../../assets/vid1.mp4";
import vid2 from "../../assets/vid2.mp4";
import vid3 from "../../assets/vid3.mp4";
import vid4 from "../../assets/vid4.mp4";
import vid5 from "../../assets/vid5.mp4";
import vid6 from "../../assets/vid6.mp4";

interface TabItem {
  id: number;
  label: string;
  icon: string;
  video: string;
}

const passengerTabs: TabItem[] = [
  { id: 1, label: "Complete Body", icon: completeBodyIcon, video: vid1 },
  { id: 2, label: "Engine", icon: engineIcon, video: vid3 },
  { id: 3, label: "Cabin", icon: cabinIcon, video: vid4 },
  { id: 4, label: "Trunk", icon: trunkIcon, video: vid5 },
];

const commercialTabs: TabItem[] = [
  { id: 1, label: "Complete Body", icon: completeBodyIcon, video: vid2 },
  { id: 2, label: "Engine", icon: engineIcon, video: vid5 },
  { id: 3, label: "Cabin", icon: cabinIcon, video: vid6 },
];

const Product: React.FC = () => {
  const [category, setCategory] = useState<"passenger" | "commercial">("passenger");
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const tabs = category === "passenger" ? passengerTabs : commercialTabs;
  const selectedVideo = tabs[selectedTab]?.video;

  const handleCategoryChange = (newCategory: "passenger" | "commercial") => {
    setCategory(newCategory);
    setSelectedTab(0);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
    setIsPlaying(true);
  };

  return (
    <Box sx={{ backgroundColor: "black", color: "white", minHeight: {xs: "80vh", md: "100vh"}, p: { xs: 4, md: 5 } }}>
      
      {/* Heading */}
      <Typography variant="h3" sx={{ textAlign: "center", mb: 5, fontWeight: "bold", fontSize: { xs: "28px", md: "40px" }, fontFamily: ' "Poppins", sans-serif'}} >
        Evolving the drive with <span style={{ color: "#ffffffcc" }}>360-degree</span> comprehensive solutions
      </Typography>

      <Grid container spacing={5} alignItems="center">
        
        {/* Left Section - Category */}
        <Grid item xs={12} md={3} sx={{ position: "relative" }}>
          {/* Vertical Line */}
          <Box sx={{ position: "absolute", top: 0, bottom: 0, left: '50px', width: "2px", backgroundColor: "#555",}}>
            <Box sx={{ height: "50%", backgroundColor: category === "passenger" ? "#fff" : "#555", transition: "background-color 0.3s"}} />
            <Box sx={{ height: "50%", backgroundColor: category === "commercial" ? "#fff" : "#555", transition: "background-color 0.3s", }} />
          </Box>
          {/* Categories */}
          <Box sx={{ pl: 5, display: "flex", flexDirection: "column", gap: 5 }}>
            <Box onClick={() => handleCategoryChange("passenger")} sx={{ cursor: "pointer" }}>
              <Typography variant="h5" sx={{ fontWeight: category === "passenger" ? "bold" : "normal", color: category === "passenger" ? "white" : "gray", mb: 1, fontFamily: ' "Poppins", sans-serif', }}> Passenger vehicles </Typography>
              <Typography variant="body2" sx={{ color: "#888", fontSize: "14px", color: category === "passenger" ? "white" : "gray", fontFamily: ' "Poppins", sans-serif',}}>
                Revving up innovation from interior to exterior.
              </Typography>
            </Box>
            <Box onClick={() => handleCategoryChange("commercial")} sx={{ cursor: "pointer" }}>
              <Typography variant="h5" sx={{ fontWeight: category === "commercial" ? "bold" : "normal", color: category === "commercial" ? "white" : "gray", mb: 1, fontFamily: ' "Poppins", sans-serif', }}>
                Commercial vehicles
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: ' "Poppins", sans-serif', color: "#888", fontSize: "14px", color: category === "commercial" ? "white" : "gray", }} >
                Advancing engineering for heavy-duty vehicles.
              </Typography>
            </Box>
          </Box>
        </Grid>


        {/* Right Section - Video */}
        <Grid item xs={12} md={9}>
          <Box sx={{ position: "relative", display: "flex", justifyContent: "center", height: {sm: '500px', md: '600px'}}}>
            <video ref={videoRef} key={selectedVideo} autoPlay muted playsInline loop width="100%" style={{ borderRadius: "12px", maxHeight: {sm: "500px", md: "600px"}, objectFit: "contain" }}>
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>

          {/* Bottom Tabs */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 5, mt: -2, flexWrap: "wrap", }}>
            {tabs.map((tab, index) => (
              <Box key={tab.id} onClick={() => handleTabChange(index)} sx={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", opacity: selectedTab === index ? 1 : 0.5, transition: "0.3s", }} >
                <img src={tab.icon} alt={tab.label} style={{ width: "50px", height: "50px", objectFit: "contain", marginBottom: "10px" }}/>
                <Typography variant="body2">{tab.label}</Typography>
              </Box>
            ))}
          </Box>

          {/* Play/Pause Button */}
{/*           <Box sx={{position: 'relative'}}>
            <IconButton onClick={togglePlayPause} sx={{position: 'absolute', right: '50px', bottom: '5px',border: '3px solid #fff', color: "#fff", width: "60px", height: "60px", "&:hover": { backgroundColor: "#000" }, borderRadius: "50%", display: {xs: 'none', md: 'flex'}}}>
              {isPlaying ? <PauseCircleOutlineIcon fontSize="large" /> : <PlayCircleOutlineIcon fontSize="large" />}
            </IconButton>
          </Box> */}
          <Box sx={{position: 'relative'}}>
            <IconButton onClick={togglePlayPause} sx={{position: 'absolute', right: '50px', bottom: '5px',border: '3px solid #fff', color: "#fff", width: "60px", height: "60px", "&:hover": { backgroundColor: "#000" }, borderRadius: "50%", display: {xs: 'none', md: 'flex'}}}>
              {isPlaying ? <PauseCircleOutlineIcon fontSize="large" /> : <PlayCircleOutlineIcon fontSize="large" />}
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
