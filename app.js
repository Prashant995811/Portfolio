(function () {
  const config = window.PORTFOLIO_CONFIG;

  if (!config) {
    throw new Error("PORTFOLIO_CONFIG is missing. Please check config.js.");
  }

  const text = (id, value) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  };

  const createNode = (tag, className, textValue) => {
    const element = document.createElement(tag);
    if (className) {
      element.className = className;
    }
    if (typeof textValue === "string") {
      element.textContent = textValue;
    }
    return element;
  };

  const renderHero = () => {
    text("heroEyebrow", config.site.eyebrow);
    text("heroTitle", config.site.headline);
    text("heroSubtitle", config.site.subtitle);
    text("statusLabel", config.site.statusLabel);
    text("footerText", config.site.footer);
    document.title = `${config.site.title} | Prashant Sharma`;

    const brand = document.querySelector(".brand");
    if (brand) {
      brand.textContent = config.site.title;
    }

    const resumeLink = document.getElementById("resumeLink");
    if (resumeLink) {
      resumeLink.href = config.resume.href;
      resumeLink.textContent = config.resume.label;
    }
  };

  const renderStats = () => {
    const statsGrid = document.getElementById("statsGrid");
    if (!statsGrid) {
      return;
    }

    config.stats.forEach((stat) => {
      const card = createNode("article", "stat-card");
      card.append(createNode("span", "", stat.label));
      card.append(createNode("strong", "", stat.value));
      statsGrid.append(card);
    });
  };

  const renderNetwork = () => {
    const networkGrid = document.getElementById("networkGrid");
    if (!networkGrid) {
      return;
    }

    config.network.forEach((item) => {
      const node = createNode("article", "network-node");
      node.append(createNode("h3", "node-label", item.label));
      node.append(createNode("p", "node-role", item.role));
      networkGrid.append(node);
    });
  };

  const renderProjects = () => {
    const projectGrid = document.getElementById("projectGrid");
    if (!projectGrid) {
      return;
    }

    config.projects.forEach((project) => {
      const card = createNode("article", "project-card");
      card.append(createNode("h3", "", project.title));
      card.append(createNode("p", "", project.description));

      const tags = createNode("div", "project-tags");
      project.tags.forEach((tag) => {
        tags.append(createNode("span", "", tag));
      });

      card.append(tags);
      projectGrid.append(card);
    });
  };

  const renderContactMeta = () => {
    const contactMeta = document.getElementById("contactMeta");
    if (!contactMeta) {
      return;
    }

    const items = [
      { title: "Email", value: config.contact.email, href: `mailto:${config.contact.email}` },
      { title: "Phone", value: config.contact.phone, href: `tel:${config.contact.phone.replace(/\s+/g, "")}` },
      { title: "Location", value: config.contact.location },
      { title: "Availability", value: config.contact.availability }
    ];

    items.forEach((item) => {
      const block = createNode("div", "meta-item");
      block.append(createNode("strong", "", item.title));

      if (item.href) {
        const link = createNode("a", "", item.value);
        link.href = item.href;
        block.append(link);
      } else {
        block.append(createNode("p", "", item.value));
      }

      contactMeta.append(block);
    });
  };

  const animateLog = (elementId, messages, delay) => {
    const container = document.getElementById(elementId);
    if (!container) {
      return;
    }

    container.textContent = "";
    messages.forEach((message, index) => {
      window.setTimeout(() => {
        const line = createNode("span", "log-entry", message);
        container.append(line);
        container.scrollTop = container.scrollHeight;
      }, delay * index);
    });
  };

  const renderChart = () => {
    const canvas = document.getElementById("skillsChart");
    if (!canvas || typeof window.Chart === "undefined") {
      return;
    }

    new window.Chart(canvas, {
      type: "radar",
      data: {
        labels: config.skills.labels,
        datasets: [
          {
            label: "Skill level",
            data: config.skills.values,
            borderColor: "#69e2ff",
            backgroundColor: "rgba(105, 226, 255, 0.18)",
            pointBackgroundColor: "#89f7b1",
            pointBorderColor: "#07111f",
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: {
              color: "#eef6ff"
            }
          }
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              display: false
            },
            angleLines: {
              color: "rgba(255, 255, 255, 0.08)"
            },
            grid: {
              color: "rgba(255, 255, 255, 0.08)"
            },
            pointLabels: {
              color: "#d7e6f8",
              font: {
                size: 12
              }
            }
          }
        }
      }
    });
  };

  const setupScrollButtons = () => {
    document.querySelectorAll("[data-scroll-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-scroll-target");
        const target = targetId ? document.getElementById(targetId) : null;
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  };

  const setupForm = () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    const modal = document.getElementById("successModal");
    const modalTitle = document.getElementById("successModalTitle");
    const modalMessage = document.getElementById("successModalMessage");
    const closeModalButton = document.getElementById("closeSuccessModal");

    if (!form || !status) {
      return;
    }

    const closeModal = () => {
      if (modal) {
        modal.hidden = true;
      }
    };

    const openModal = () => {
      if (!modal || !modalTitle || !modalMessage) {
        return;
      }

      modalTitle.textContent = config.messages.successTitle;
      modalMessage.textContent = config.messages.successBody;
      modal.hidden = false;
    };

    if (config.forms && config.forms.endpoint) {
      form.action = config.forms.endpoint;
    }

    if (closeModalButton) {
      closeModalButton.addEventListener("click", closeModal);
    }

    if (modal) {
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeModal();
        }
      });
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.reportValidity()) {
        status.textContent = "Please complete all required fields before sending.";
        return;
      }

      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      formData.set("_subject", `Portfolio inquiry from ${name || "Website Visitor"}`);

      status.textContent = "Sending your message...";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Form submission failed.");
        }

        status.textContent = "Message sent successfully. It has been delivered to the inbox.";
        form.reset();
        openModal();
      } catch (error) {
        status.textContent = "Message could not be sent right now. Please try again in a moment.";
      }
    });

    window.addEventListener("pageshow", () => form.reset());
  };

  renderHero();
  renderStats();
  renderNetwork();
  renderProjects();
  renderContactMeta();
  renderChart();
  setupScrollButtons();
  setupForm();
  animateLog("bootLog", config.bootMessages, 700);
  animateLog("botLog", config.botMessages, 900);
})();
