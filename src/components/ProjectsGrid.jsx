import React, { useState, useEffect } from "react";
import { FaCode, FaObjectGroup, FaCoffee } from "react-icons/fa";
import { FaPython, FaJs, FaSwift, FaHtml5, FaCss3Alt, FaCuttlefish } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import SectionHeader from "../components/SectionHeader";
import "../styles/projects/project-card.css";
import { SiTypescript } from "react-icons/si";

const ProjectsGrid = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [projectList, setProjectList] = useState([]);

  // Fetch project data from public/data/projects.json
  useEffect(() => {
    fetch("assets/data/projects.json")
      .then((response) => response.json())
      .then((data) => {
        setProjectList(data);
        console.log("Fetched Projects:", data);
      })
      .catch((error) => console.error("Error loading project data:", error));
  }, []);

  // Handle expanding a project and moving it to the top
  const handleExpand = (id) => {
    setProjectList((prevProjects) => {
      const selectedProject = prevProjects.find((p) => p.id === id);
      const otherProjects = prevProjects.filter((p) => p.id !== id);

      return selectedProject ? [selectedProject, ...otherProjects] : prevProjects;
    });

    setExpandedProject(id);
  };

  // Handle collapsing a project
  const handleCollapse = () => {
    setExpandedProject(null);
  };

  // ✅ Mini Labels for Project Categories
    const miniButtons = [
      { id: 1, label: "Python", icon: <FaPython /> },
      { id: 2, label: "Java", icon: <FaCoffee /> },
      { id: 3, label: "JavaScript", icon: <FaJs /> },
      { id: 4, label: "Swift", icon: <FaSwift /> },
      { id: 5, label: "HTML/CSS", icon: <FaHtml5 />, secondIcon: <FaCss3Alt /> }, // Both HTML and CSS
      { id: 6, label: "Lua", icon: <FaObjectGroup /> },
      { id: 7, label: "TypeScript", icon: <SiTypescript /> },
      { id: 8, label: "C/C++", icon: <FaCuttlefish /> },
  ];

  return (
    <div className="projects-container pl-8 pt-8">
      <SectionHeader
        icon={<FaCode />}
        title="Projects"
        titleColor="text-neonCyan"
        miniButtons={miniButtons}
        buttonColor="greenLabel"
        description="I am advanced at modeling and texturing 3D assets and do commissions for them as well as sell wearable assets on the Roblox Marketplace. I have extensive experience creating both stylized and realistic clothing, character accessories, environment assets, vehicles, and more."
      />

      {/* Dynamic Grid Layout */}
      <div className={`projects-grid ${expandedProject ? "expanded-grid" : ""}`}>
        {projectList.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            isExpanded={expandedProject === project.id}
            onExpand={() => handleExpand(project.id)}
            onCollapse={handleCollapse}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;
