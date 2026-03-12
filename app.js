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
      brand.textContent = "";
      const brandText = createNode("span", "brand-text");

      [...config.site.title].forEach((char) => {
        const charSpan = createNode("span", "brand-char", char);
        if (char === " ") {
          charSpan.innerHTML = "&nbsp;";
        }
        brandText.append(charSpan);
      });

      brand.append(brandText);
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

  const setupScrollTopButton = () => {
    const button = document.getElementById("scrollTopButton");
    if (!button) {
      return;
    }

    const toggleVisibility = () => {
      if (window.scrollY > 320) {
        button.classList.add("is-visible");
      } else {
        button.classList.remove("is-visible");
      }
    };

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();
  };

  const setupParticles = () => {
    if (typeof window.particlesJS !== "function") {
      return;
    }

    window.particlesJS("particles-js", {
      particles: {
        number: {
          value: 72,
          density: {
            enable: true,
            value_area: 900
          }
        },
        color: {
          value: ["#69e2ff", "#31c2ff", "#89f7b1"]
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.35,
          random: true
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 130,
          color: "#69e2ff",
          opacity: 0.18,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.4,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 180,
            line_linked: {
              opacity: 0.5
            }
          },
          push: {
            particles_nb: 3
          }
        }
      },
      retina_detect: true
    });
  };

  const setupNetworkHover = () => {
    document.querySelectorAll(".network-node").forEach((node) => {
      node.addEventListener("mousemove", (event) => {
        const rect = node.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        node.style.setProperty("--glow-x", `${x}%`);
        node.style.setProperty("--glow-y", `${y}%`);
      });

      node.addEventListener("mouseleave", () => {
        node.style.removeProperty("--glow-x");
        node.style.removeProperty("--glow-y");
      });
    });
  };

  const setupInteractiveGlow = () => {
    document
      .querySelectorAll(".panel, .stat-card, .project-card, .meta-item")
      .forEach((card) => {
        card.addEventListener("mousemove", (event) => {
          const rect = card.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;

          card.style.setProperty("--glow-x", `${x}%`);
          card.style.setProperty("--glow-y", `${y}%`);
        });

        card.addEventListener("mouseleave", () => {
          card.style.removeProperty("--glow-x");
          card.style.removeProperty("--glow-y");
        });
      });
  };

  const setupBrandInteraction = () => {
    const brand = document.querySelector(".brand");
    if (!brand) {
      return;
    }

    const chars = Array.from(brand.querySelectorAll(".brand-char"));

    brand.addEventListener("mousemove", (event) => {
      const rect = brand.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      brand.style.setProperty("--brand-glow-x", `${x}%`);
      brand.style.setProperty("--brand-glow-y", `${y}%`);

      chars.forEach((char) => {
        const charRect = char.getBoundingClientRect();
        const charCenterX = charRect.left + charRect.width / 2;
        const distance = Math.abs(event.clientX - charCenterX);
        const influence = Math.max(0, 1 - distance / 90);
        char.style.transform = `translateY(${-5 * influence}px)`;
        char.style.opacity = `${0.82 + influence * 0.18}`;
      });
    });

    brand.addEventListener("mouseleave", () => {
      chars.forEach((char) => {
        char.style.transform = "";
        char.style.opacity = "";
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
          headers: {
            Accept: "application/json"
          },
          body: formData
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(result.error || "Form submission failed.");
        }

        status.textContent = "Message sent successfully. It has been delivered to the inbox.";
        form.reset();
        openModal();
      } catch (error) {
        status.textContent = error.message || "Message could not be sent right now. Please try again in a moment.";
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
  setupParticles();
  setupNetworkHover();
  setupInteractiveGlow();
  setupBrandInteraction();
  setupScrollButtons();
  setupScrollTopButton();
  setupForm();
  animateLog("bootLog", config.bootMessages, 700);
  animateLog("botLog", config.botMessages, 900);
})();
