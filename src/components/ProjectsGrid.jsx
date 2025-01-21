import React, { useState, useEffect } from "react";
import { FaCode } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import "../styles/projects/project-card.css";

const ProjectsGrid = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [projectList, setProjectList] = useState([]);

  // Fetch project data from public/data/projects.json
  useEffect(() => {
    fetch("assets/data/projects.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProjectList(data);
        console.log("Fetched Projects:", data);
      })
      .catch((error) => console.error("Error loading project data:", error));
  }, []);

  // Handle expanding a project and moving it to the top
  const handleExpand = (id) => {
    console.log("Expanding Project ID:", id);

    setProjectList((prevProjects) => {
      const selectedProject = prevProjects.find((p) => p.id === id);
      const otherProjects = prevProjects.filter((p) => p.id !== id);

      if (selectedProject) {
        const newProjectList = [selectedProject, ...otherProjects];
        console.log("New Project List Order:", newProjectList.map((p) => p.id));
        return newProjectList;
      }

      console.warn("Project not found in list!");
      return prevProjects;
    });

    setExpandedProject(id);
  };

  // Handle collapsing a project
  const handleCollapse = () => {
    console.log("Collapsing Project ID:", expandedProject);
    setExpandedProject(null);
  };

  return (
    <div className="projects-container">
      {/* Title with React Code Icon */}
      <div className="projects-header">
        <FaCode className="projects-icon" />
        <h2 className="projects-title">My Projects</h2>
      </div>

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
