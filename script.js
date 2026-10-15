(function () {
  // =========================================================
  // WEBORA STUDIO
  // Main JavaScript
  // =========================================================


  // =========================================================
  // 1. HEADER SCROLL STATE
  // =========================================================

  const header = document.getElementById("siteHeader");

  function onScroll() {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, {
    passive: true,
  });

  onScroll();


  // =========================================================
  // 2. MOBILE MENU
  // =========================================================

  const hamburger = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      const open = mobileMenu.classList.toggle("open");

      hamburger.classList.toggle("open", open);

      hamburger.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );

      document.body.style.overflow = open ? "hidden" : "";
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        hamburger.classList.remove("open");

        hamburger.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.style.overflow = "";
      });
    });
  }


  // =========================================================
  // 3. REVEAL ON SCROLL
  // =========================================================

  const revealEls = document.querySelectorAll(".reveal");

  const io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealEls.forEach(function (element) {
    io.observe(element);
  });


  // =========================================================
  // 4. PROCESS LINE ANIMATION
  // =========================================================

  const processTrack = document.getElementById("processTrack");
  const processFill = document.getElementById("processFill");

  if (processTrack && processFill) {
    const procIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            processFill.style.width = "88%";
            procIo.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    procIo.observe(processTrack);
  }


  // =========================================================
  // 5. TERMINAL TYPING EFFECT
  // =========================================================

  const terminalEl = document.getElementById("typedTerminal");

  if (terminalEl) {
    const lines = [
      'const studio = {',
      '  name: <span class="c3">"WEBORA STUDIO"</span>,',
      '  founder: <span class="c3">"Hussain Abbas"</span>,',
      '  stack: [<span class="c3">"Next.js"</span>, <span class="c3">"React"</span>, <span class="c3">"WordPress"</span>],',
      '  location: <span class="c3">"Gilgit, Pakistan"</span>',
      '};',
      '',
      '<span class="c1">// We Design. We Develop. We Deliver.</span>',
      'studio.<span class="c2">deliver</span>();',
    ];

    function typeTerminal() {
      let html = "";
      let lineIndex = 0;

      terminalEl.innerHTML = "";

      function step() {
        if (lineIndex >= lines.length) {
          terminalEl.innerHTML =
            html + '<span class="cursor"></span>';

          return;
        }

        const raw = lines[lineIndex];

        html +=
          (lineIndex > 0 ? "\n" : "") +
          raw;

        terminalEl.innerHTML =
          html.replace(/\n/g, "<br>") +
          '<span class="cursor"></span>';

        lineIndex++;

        setTimeout(
          step,
          raw === "" ? 120 : 220
        );
      }

      step();
    }

    typeTerminal();
  }


  // =========================================================
  // 6. PROJECT DATA
  // =========================================================

  const projects = [
    {
      name: "Business Websites",
      desc: "A distinctive, responsive online home that introduces your business clearly and helps visitors take the next step.",
      tags: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    },

    {
      name: "Modern Web Interfaces",
      desc: "Fast, engaging product and application experiences made with reusable components and thoughtful interactions.",
      tags: ["React.js", "Next.js", "JavaScript"],
    },

    {
      name: "WordPress Websites & Themes",
      desc: "Flexible WordPress experiences with custom styling and themes that make it easier to manage your content.",
      tags: ["WordPress", "Theme Development"],
    },

    {
      name: "Personal Portfolios",
      desc: "A polished portfolio that tells your story, showcases your work and makes it easy for people to reach you.",
      tags: ["Responsive Design", "UI", "Prompt Engineering"],
    },
  ];


  // =========================================================
  // 7. RENDER PROJECTS
  // =========================================================

  const grid = document.getElementById("projectGrid");

  if (grid) {
    grid.innerHTML = projects
      .map(function (project, index) {
        return `
          <div
            class="project-card reveal"
            style="transition-delay:${(index % 2) * 0.08}s;"
          >

            <div class="project-thumb">
              <span class="ph-code">
                &lt;/&gt; ${project.name}
              </span>
            </div>

            <div class="project-body">

              <h3>${project.name}</h3>

              <p>${project.desc}</p>

              <div class="project-tags">
                ${project.tags
                  .map(function (tag) {
                    return `<span class="tag">${tag}</span>`;
                  })
                  .join("")}
              </div>

              <div class="project-actions">

                <a
                  href="#contact"
                  class="btn btn-ghost btn-sm"
                >
                  Discuss a similar project
                </a>

              </div>

            </div>

          </div>
        `;
      })
      .join("");

    grid.querySelectorAll(".reveal").forEach(function (element) {
      io.observe(element);
    });
  }


  // =========================================================
  // 8. CONTACT FORM
  // =========================================================

  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");

  if (!form) {
    console.warn("Contact form not found.");
    return;
  }


  // =========================================================
  // 9. FIELD ERROR FUNCTION
  // =========================================================

  function setError(fieldId, message) {
    const field = document.getElementById(fieldId);

    if (!field) return;

    field.classList.toggle(
      "error",
      Boolean(message)
    );

    const errorElement =
      field.querySelector(".field-error");

    if (errorElement) {
      errorElement.textContent =
        message || "";
    }
  }


  // =========================================================
  // 10. FORM VALIDATION
  // =========================================================

  function validate() {
    let valid = true;

    const name =
      form.fullName
        ? form.fullName.value.trim()
        : "";

    const email =
      form.email
        ? form.email.value.trim()
        : "";

    const phone =
      form.phone
        ? form.phone.value.trim()
        : "";

    const projectType =
      form.projectType
        ? form.projectType.value
        : "";

    const message =
      form.message
        ? form.message.value.trim()
        : "";


    // NAME
    if (name.length < 2) {
      setError(
        "field-name",
        "Please enter your full name."
      );

      valid = false;
    } else {
      setError("field-name", "");
    }


    // EMAIL
    const emailOk =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      );

    if (!emailOk) {
      setError(
        "field-email",
        "Please enter a valid email address."
      );

      valid = false;
    } else {
      setError("field-email", "");
    }


    // PHONE
    const phoneOk =
      /^[0-9+\-\s()]{7,20}$/.test(
        phone
      );

    if (!phoneOk) {
      setError(
        "field-phone",
        "Please enter a valid phone number."
      );

      valid = false;
    } else {
      setError("field-phone", "");
    }


    // PROJECT TYPE
    if (!projectType) {
      setError(
        "field-projectType",
        "Please select a project type."
      );

      valid = false;
    } else {
      setError(
        "field-projectType",
        ""
      );
    }


    // MESSAGE
    if (message.length < 10) {
      setError(
        "field-message",
        "Please add a few details (10+ characters)."
      );

      valid = false;
    } else {
      setError(
        "field-message",
        ""
      );
    }


    return valid;
  }


  // =========================================================
  // 11. CONTACT FORM SUBMISSION
  // =========================================================

  form.addEventListener(
    "submit",
    async function (event) {
      event.preventDefault();


      // Clear previous status
      if (statusEl) {
        statusEl.classList.remove(
          "show",
          "success",
          "fail"
        );

        statusEl.textContent = "";
      }


      // Validate
      if (!validate()) {
        if (statusEl) {
          statusEl.textContent =
            "Please fix the highlighted fields and try again.";

          statusEl.classList.add(
            "show",
            "fail"
          );
        }

        return;
      }


      // Disable button
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }


      // =====================================================
      // WEB3FORMS
      // =====================================================

      const formData = new FormData(form);

      // IMPORTANT:
      // Make sure your HTML form contains:
      //
      // <input
      //   type="hidden"
      //   name="access_key"
      //   value="YOUR_WEB3FORMS_ACCESS_KEY"
      // >
      //
      // Replace YOUR_WEB3FORMS_ACCESS_KEY
      // with your real Web3Forms access key.


      try {
        const response = await fetch(
          "https://api.web3forms.com/submit",
          {
            method: "POST",
            body: formData,
          }
        );

        const data =
          await response.json();


        // SUCCESS
        if (response.ok && data.success) {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent =
              "Send Project Inquiry";
          }

          if (statusEl) {
            statusEl.textContent =
              "Thanks! Your project inquiry has been received. We'll get back to you within 24 hours.";

            statusEl.classList.add(
              "show",
              "success"
            );
          }

          form.reset();

          return;
        }


        // API ERROR
        throw new Error(
          data.message ||
            "Unable to send your message."
        );
      }


      // =====================================================
      // ERROR
      // =====================================================

      catch (error) {
        console.error(
          "Contact form error:",
          error
        );

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent =
            "Send Project Inquiry";
        }

        if (statusEl) {
          statusEl.textContent =
            "Sorry, your message could not be sent. Please try again or contact us directly.";

          statusEl.classList.add(
            "show",
            "fail"
          );
        }
      }
    }
  );

})();
