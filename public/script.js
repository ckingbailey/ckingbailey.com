const onProjectBtnClick = (function() {
  const pd = document.getElementById("projectDisplayArea");
  const heading = pd.children.projectHeading;
  const img = pd.children.projectView;
  const description = pd.children.projectDescription;
  const contribution = pd.children.projectContribution;
  const stack = pd.children.projectTech;
  const link = pd.children.projectLink;
  const projectInfo = {
    bisbeevacationrental: {
      name: "Bisbee Vacation Rental",
      description: "Marketing page for a mountain cottage in Bisbee, AZ",
      stack: ["HTML", "CSS", "jQuery"],
      link: "http://bisbeevacationrental.com"
    },
    chinguprojectshowcase: {
      name: "Chingu Project Showcase",
      description: "See and edit data for projects completed by Chingu Build-To-Learn remote teams",
      stack: ["React", "Node", "Express", "MongoDB", "Mongoose"],
      link: "http://geckos-05-winter17.herokuapp.com"
    },
    localweatherapp: {
      name: "Local Weather App",
      description: "See a charming css animation for the weather in your area",
      stack: ["jQuery", "CSS"],
      link: "http://ckingbailey.com/weather"
    },
    opendisclosure: {
      name: "Open Disclosure",
      description: "Track campaign finance in Oakland, San Francisco, and Berkeley elections",
      contribution: "Implemented visual design update, contributed interactive React components, removed vestigial backend endpoints",
      stack: ["Ruby", "Jekyll", "React"],
      link: "https://www.opendisclosure.io/"
    },
    svbx: {
      "name": "svbx.org",
      "description": "Database and web interface for tracking commissioning of Silicon Valley BART Extension",
      "stack": ["PHP", "MySQL", "JavaScript DOM APIs", "D3.js"],
      "link": "https://svbx.org"
    },
    turtrello: {
      name: "Turtrello",
      description: "Trello clone",
      stack: ["React", "Firebase"],
      link: "http://ckingbailey.github.io"
    }
  }

  return function handleProjectBtnClick(event) {
    event.preventDefault();
    // get the <a> tag with the data attr on it
    const target = event.target;
    const btn = target.dataset.targetfor ?
      target :
      target.tagName === "IMG" ?
        target.parentElement :
        target.tagName === "LI" ?
          target.querySelector("[data-targetfor]") :
          null;
    const targetProject = btn && btn.dataset.targetfor;
    const curProject = pd.children.projectView.dataset && pd.children.projectView.dataset.displayfor;
    if (Array.from(pd.classList).includes("empty-display") ||
      targetProject !== curProject) {
      // if display is empty
      // or if btn for project other than currently loaded project is clicked
      // load project view
      pd.classList.remove("empty-display");
      // load content into element, top to bottom:
      heading.innerText = projectInfo[targetProject].name;
      img.setAttribute("src", `img/${targetProject}.png`);
      img.setAttribute("data-displayfor", targetProject);
      description.innerText = projectInfo[targetProject].description;
      contribution.innerText = projectInfo[targetProject].contribution || "";
      stack.innerText = projectInfo[targetProject].stack.join(", ");
      link.innerText = projectInfo[targetProject].link;
      link.setAttribute("href", projectInfo[targetProject].link);
    }
    // if btn for currently loaded project is clicked, close it
    else {
      pd.classList.add("empty-display");
      // unload content, top to bottom:
      heading.innerText = "";
      img.removeAttribute("src");
      img.removeAttribute("data-displayfor");
      description.innerText = "";
      stack.innerText = "";
      contribution.innerText = "";
      link.innerText = "";
      link.removeAttribute("href");
    }
  }
})();
