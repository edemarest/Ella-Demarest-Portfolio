import React from "react";
import "../styles/projects/project-card.css";

const ProjectCard = ({ project, isExpanded, onExpand, onCollapse }) => {
  const handleCardClick = (e) => {
    // Ensure clicks on the card itself (not buttons/links) trigger expand/collapse
    if (!e.target.closest(".project-action-btn") && !e.target.closest("a") && !e.target.closest(".expand-btn")) {
      if (isExpanded) {
        console.log("Collapsing Project:", project.id);
        onCollapse();
      } else {
        console.log("Expanding Project:", project.id);
        onExpand();
      }
    }
  };

  return (
    <div
      className={`project-card ${isExpanded ? "expanded" : ""}`}
      onClick={handleCardClick} // Makes the entire card clickable
    >
      <div className="project-content">
        {!isExpanded ? (
          <>
            {/* Preview State */}
            <img src={project.image} alt={project.title} className="project-image" />
            <h3 className="project-title">{project.title}</h3>

            {/* ✅ Tags under title */}
            <div className="project-tag-container">
              {project.tags?.map((tag, index) => (
                <span key={index} className="project-tag">{tag}</span>
              ))}
            </div>

            {/* ✅ Subheading turned into paragraph */}
            <p className="project-preview-description">{project.subheading}</p>

            <button
              className="expand-btn"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Expanding Project via Button:", project.id);
                onExpand();
              }}
            >
              Expand
            </button>
          </>
        ) : (
          <>
            {/* Expanded State */}
            <div className="expanded-layout">
              {/* Title and Subheading (Full Width) */}
              <div className="expanded-card-topbar">
                <div className="titles">
                  <h3 className="expanded-title project-title text-3xl">{project.title}</h3>
                  <p className="expanded-subheading">{project.subheading}</p>
                </div>
                <div className="button-container">
                  <button className="project-action-btn close-btn" onClick={(e) => {
                    e.stopPropagation(); // Prevents closing from triggering another expand event
                    console.log("Collapsing Project:", project.id);
                    onCollapse();
                  }}>
                    Close
                  </button>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-action-btn">
                    View Project
                  </a>
                </div>
              </div>

              {/* Content Area: Media + Details */}
              <div className="expanded-content">
                {/* Left Side: Media Embeds */}
                <div className="expanded-media-container">
                  {project.media.map((item, index) => (
                    <div key={index} className="expanded-media">
                      {item.type === "youtube" && (
                        <iframe
                          src={`https://www.youtube.com/embed/${item.id}`}
                          title="YouTube video"
                          allowFullScreen
                        ></iframe>
                      )}
                      {item.type === "slides" && (
                        <iframe
                          src={`https://docs.google.com/presentation/d/${item.id}/embed`}
                          title="Google Slides"
                        ></iframe>
                      )}
                      {item.type === "pdf" && (
                        <iframe
                          src={item.url}
                          title="PDF Document"
                        ></iframe>
                      )}
                      {item.type === "roblox" && (
                        <a href={`https://www.roblox.com/games/${item.id}`} target="_blank" rel="noopener noreferrer" className="roblox-preview">
                          <img src={`https://thumbnails.roblox.com/v1/places/${item.id}/icons?size=512x512&format=png`}
                            alt="Roblox Game Preview"
                            className="roblox-thumbnail" />
                        </a>
                      )}
                      {item.type === "image" && (
                        <img
                          src={item.fileSrc}
                          alt={project.title}
                          className="project-file-image"
                        />
                      )}
                      {item.type === "embed" && (
                        <iframe
                          src={item.url}
                          title="Embedded Site"
                          className="embedded-site"
                          allowFullScreen
                        ></iframe>
                      )}
                    </div>

                  ))}
                </div>

                {/* Right Side: Details */}
                <div className="expanded-details">
                  <div className="expanded-text" dangerouslySetInnerHTML={{ __html: project.description1 }}></div>
                  <div className="expanded-text" dangerouslySetInnerHTML={{ __html: project.description2 }}></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
