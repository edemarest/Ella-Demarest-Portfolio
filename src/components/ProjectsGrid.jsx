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
    <div className="projects-container md:pl-8 sm:pl-0 pt-8">
      <SectionHeader
        icon={<FaCode />}
        title="Projects"
        titleColor="text-neonCyan"
        miniButtons={miniButtons}
        buttonColor="greenLabel"
        description="Throughout the years I have worked on dozens of programming projects for school, work, and myself. I have a strong design background and extensive front end experience, but I also love the problem solving and data science knowledge that comes with developing the back end. Though I cannot make some of my best projects public since they are for work, here are a few that I can share. Lately I have been developing in React and am hoping to add more projects soon!"
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
