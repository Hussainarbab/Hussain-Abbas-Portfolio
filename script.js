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
  // 8. PORTFOLIO CHAT ASSISTANT
  // =========================================================

  const chatTrigger = document.getElementById("portfolioChatTrigger");
  const chatPanel = document.getElementById("portfolioChatPanel");
  const chatClose = document.getElementById("portfolioChatClose");
  const chatForm = document.getElementById("portfolioChatForm");
  const chatInput = document.getElementById("portfolioChatInput");
  const chatMessages = document.getElementById("portfolioChatMessages");

  if (chatTrigger && chatPanel && chatClose && chatForm && chatInput && chatMessages) {
    const portfolioAnswers = [
      {
        keywords: ["good developer", "great developer", "professional developer", "skilled developer", "developer or not", "developer hain", "developer hai", "acha developer", "achha developer", "achay developer", "ache developer", "اچھے ڈویلپر", "اچھا ڈویلپر", "پروفیشنل ڈویلپر", "اچھا ڈیولپر", "پروفیشنل"],
        answer: {
          en: "Yes—Hussain is a professional web developer. His portfolio shows experience building responsive websites and modern interfaces, with skills in frontend development, React, Next.js, WordPress, and custom themes.",
          roman: "Jee haan, Hussain ek professional web developer hain. Unke portfolio mein responsive websites aur modern interfaces ka kaam, aur frontend development, React, Next.js, WordPress aur custom themes ki skills shamil hain.",
          ur: "جی ہاں، حسین ایک پروفیشنل ویب ڈویلپر ہیں۔ ان کے پورٹ فولیو میں ریسپانسیو ویب سائٹس اور جدید انٹرفیس بنانے کا تجربہ، اور فرنٹ اینڈ ڈیولپمنٹ، React، Next.js، WordPress اور کسٹم تھیمز کی مہارت شامل ہے۔"
        }
      },
      {
        keywords: ["skill", "skills", "hunr", "maharat", "tech", "stack", "language", "html", "css", "javascript", "react", "next", "tailwind", "bootstrap", "git", "github", "مہارت", "مہارتیں", "ہنر", "اسکل"],
        answer: {
          en: "Hussain's skills include HTML5, CSS3, JavaScript, React.js, Next.js, Tailwind CSS, Bootstrap, WordPress and theme development, Git and GitHub, and prompt engineering.",
          roman: "Hussain ki skills mein HTML5, CSS3, JavaScript, React.js, Next.js, Tailwind CSS, Bootstrap, WordPress aur theme development, Git, GitHub, aur prompt engineering shamil hain.",
          ur: "حسین کی مہارتوں میں HTML5، CSS3، JavaScript، React.js، Next.js، Tailwind CSS، Bootstrap، WordPress اور تھیم ڈیولپمنٹ، Git، GitHub، اور پرامپٹ انجینئرنگ شامل ہیں۔"
        }
      },
      {
        keywords: ["experience", "tajurba", "tajurbe", "job", "career", "company", "worked", "works at", "work at", "naukri", "تجربہ", "نوکری", "کام کیا"],
        answer: {
          en: "Hussain worked as a Web Developer at TechEver Solutions from March 2023 to 2024, and at Murazoid from 2025 to 2026, contributing to responsive interfaces, frontend, and WordPress projects.",
          roman: "Hussain ne March 2023 se 2024 tak TechEver Solutions mein aur 2025 se 2026 tak Murazoid mein Web Developer ke taur par kaam kiya. Unka kaam responsive interfaces, frontend aur WordPress projects par raha.",
          ur: "حسین نے مارچ 2023 سے 2024 تک TechEver Solutions اور 2025 سے 2026 تک Murazoid میں Web Developer کے طور پر کام کیا۔ ان کا کام ریسپانسیو انٹرفیسز، فرنٹ اینڈ اور WordPress پروجیکٹس پر رہا۔"
        }
      },
      {
        keywords: ["service", "services", "offer", "build", "what do", "what does", "can you", "kaam", "karte", "banate", "hire", "help", "خدمات", "کیا کرتے", "کیا بناتے"],
        answer: {
          en: "Hussain offers frontend development, React.js and Next.js interfaces, WordPress websites and themes, responsive web design, and prompt engineering.",
          roman: "Hussain frontend development, React.js aur Next.js interfaces, WordPress websites aur themes, responsive web design, aur prompt engineering ke kaam karte hain.",
          ur: "حسین فرنٹ اینڈ ڈیولپمنٹ، React.js اور Next.js انٹرفیسز، WordPress ویب سائٹس اور تھیمز، ریسپانسیو ویب ڈیزائن، اور پرامپٹ انجینئرنگ کی خدمات فراہم کرتے ہیں۔"
        }
      },
      {
        keywords: ["wordpress", "theme", "cms", "ورڈپریس", "تھیم"],
        answer: {
          en: "Hussain builds WordPress websites and custom themes, with tailored styling and flexible content experiences.",
          roman: "Hussain WordPress websites aur custom themes banate hain, jin mein tailored styling aur content manage karne ki flexibility hoti hai.",
          ur: "حسین WordPress ویب سائٹس اور کسٹم تھیمز بناتے ہیں، جن میں ضرورت کے مطابق اسٹائلنگ اور مواد کو آسانی سے منظم کرنے کی سہولت ہوتی ہے۔"
        }
      },
      {
        keywords: ["where", "kahan", "location", "live", "based", "country", "city", "rehta", "کہاں", "رہتے", "شہر", "ملک"],
        answer: {
          en: "Hussain is based in Gilgit, Pakistan.",
          roman: "Hussain Gilgit, Pakistan mein rehte hain.",
          ur: "حسین گلگت، پاکستان میں رہتے ہیں۔"
        }
      },
      {
        keywords: ["available", "availability", "freelance", "full-time", "full time", "opportunity", "maujood", "دستیاب", "فری لانس", "ملازمت"],
        answer: {
          en: "Hussain is available for freelance and full-time opportunities. Use the contact form on this page to discuss a project.",
          roman: "Hussain freelance aur full-time opportunities ke liye available hain. Project discuss karne ke liye page par contact form use karein.",
          ur: "حسین فری لانس اور فل ٹائم مواقع کے لیے دستیاب ہیں۔ پروجیکٹ پر بات کرنے کے لیے اس صفحے کا contact form استعمال کریں۔"
        }
      },
      {
        keywords: ["contact", "rabta", "email", "phone", "whatsapp", "reach", "message", "رابطہ", "ای میل", "فون", "واٹس ایپ"],
        answer: {
          en: "You can reach Hussain through the contact form on this page, by email at arbabhussan63@gmail.com, or on WhatsApp at +92 316 844 0875.",
          roman: "Aap Hussain se is page ke contact form, arbabhussan63@gmail.com par email, ya WhatsApp +92 316 844 0875 par rabta kar sakte hain.",
          ur: "آپ اس صفحے کے contact form، arbabhussan63@gmail.com پر ای میل، یا WhatsApp نمبر +92 316 844 0875 پر حسین سے رابطہ کر سکتے ہیں۔"
        }
      },
      {
        keywords: ["project", "portfolio", "website", "design", "example", "پروجیکٹ", "پورٹ فولیو", "ویب سائٹ"],
        answer: {
          en: "Hussain's portfolio includes business websites, modern web interfaces, WordPress websites and themes, and personal portfolios. Browse the Projects section to learn more.",
          roman: "Hussain ke portfolio mein business websites, modern web interfaces, WordPress websites aur themes, aur personal portfolios shamil hain. Mazeed dekhne ke liye Projects section dekhein.",
          ur: "حسین کے پورٹ فولیو میں بزنس ویب سائٹس، جدید ویب انٹرفیسز، WordPress ویب سائٹس اور تھیمز، اور ذاتی پورٹ فولیوز شامل ہیں۔ مزید دیکھنے کے لیے Projects سیکشن دیکھیں۔"
        }
      },
      {
        keywords: ["about", "who", "kon", "kaun", "hussain", "yourself", "name", "naam", "کون", "حسین", "نام", "بارے میں"],
        answer: {
          en: "Hussain Abbas is a frontend and WordPress developer based in Gilgit, Pakistan. He enjoys turning complex ideas into clear, responsive digital experiences with thoughtful design and clean code.",
          roman: "Hussain Abbas Gilgit, Pakistan ke frontend aur WordPress developer hain. Woh complex ideas ko saaf, responsive digital experiences mein badalne aur clean code likhne ko ahmiyat dete hain.",
          ur: "حسین عباس گلگت، پاکستان سے تعلق رکھنے والے فرنٹ اینڈ اور WordPress ڈویلپر ہیں۔ وہ پیچیدہ خیالات کو سادہ، ریسپانسیو ڈیجیٹل تجربات میں ڈھالنے اور صاف کوڈ لکھنے کو اہمیت دیتے ہیں۔"
        }
      },
      {
        keywords: ["process", "approach", "how does he work", "workflow", "عمل", "طریقہ"],
        answer: {
          en: "Hussain's process moves from understanding the idea and planning, through design and development, to testing, polishing, and launch.",
          roman: "Hussain pehle idea samajh kar planning karte hain, phir design aur development ke baad testing, final polish aur launch karte hain.",
          ur: "حسین پہلے خیال کو سمجھ کر منصوبہ بندی کرتے ہیں، پھر ڈیزائن اور ڈیولپمنٹ کے بعد ٹیسٹنگ، بہتری اور لانچ کرتے ہیں۔"
        }
      }
    ];

    function setChatOpen(open) {
      chatPanel.hidden = !open;
      chatPanel.setAttribute("aria-hidden", String(!open));
      chatTrigger.setAttribute("aria-expanded", String(open));

      if (open) {
        chatInput.focus();
      } else {
        chatTrigger.focus();
      }
    }

    function addChatMessage(text, sender) {
      const message = document.createElement("div");
      message.className = "portfolio-chat-message " + sender;
      message.textContent = text;
      chatMessages.appendChild(message);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getPortfolioAnswer(question) {
      const hasUrduScript = /[\u0600-\u06FF]/.test(question);
      const normalizedQuestion = question.toLowerCase().replace(/[^\p{L}\p{N}\s+#.-]/gu, " ").replace(/\s+/g, " ").trim();
      const romanUrdu = /\b(kya|hai|hain|ka|ki|ke|ko|mein|ma|mera|meri|mere|batao|btao|karo|kro|acha|achha|achay|ache|nahi|nahin|kaun|kon|kahan|kyun|aur|aap|mujhe|chahiye|kar|sakte|sakta|sakti|rehta|rehte|hun|ho)\b/i.test(normalizedQuestion);
      const searchableQuestion = " " + normalizedQuestion + " ";
      const answer = portfolioAnswers.find(function (entry) {
        return entry.keywords.some(function (keyword) {
          return searchableQuestion.includes(" " + keyword.toLowerCase() + " ");
        });
      });

      if (answer) {
        return answer.answer[hasUrduScript ? "ur" : romanUrdu ? "roman" : "en"];
      }

      if (hasUrduScript) {
        return "میں حسین کے پورٹ فولیو کے بارے میں جواب دے سکتا ہوں، مثلاً ان کی مہارتیں، خدمات، تجربہ، پروجیکٹس اور رابطے کی معلومات۔ اس سوال کی معلومات پورٹ فولیو میں موجود نہیں ہیں۔";
      }

      if (romanUrdu) {
        return "Main Hussain ke portfolio ke mutaliq sawalon ka jawab de sakta hoon, jaise unki skills, services, experience, projects aur contact details. Is sawal ki maloomat portfolio mein nahi hai.";
      }

      return "I can answer questions about Hussain's portfolio, including his skills, services, experience, projects, and contact details. This information isn't available in the portfolio.";
    }

    chatTrigger.addEventListener("click", function () {
      setChatOpen(chatPanel.hidden);
    });

    chatClose.addEventListener("click", function () {
      setChatOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !chatPanel.hidden) {
        setChatOpen(false);
      }
    });

    chatForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const question = chatInput.value.trim();

      if (!question) return;

      addChatMessage(question, "user");
      chatInput.value = "";
      addChatMessage(getPortfolioAnswer(question), "assistant");
      chatInput.focus();
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
