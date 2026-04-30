const sidebarSections = [
  {
    title: 'About Me',
    body: 'Results-driven software engineer with experience building scalable web apps, automation tools, and customer-focused digital products.',
  },
  {
    title: 'Contact',
    items: ['450 Sunrise Avenue, Solaris City', '+1 234 567 8900', 'emily.carter@email.com', 'linkedin.com/in/emily-carter'],
  },
  {
    title: 'Objective',
    body: 'Seeking a challenging engineering role where I can deliver reliable products, mentor teams, and solve meaningful business problems.',
  },
  {
    title: 'Education',
    items: ['M.S. Computer Science', 'Mars University, Solaris City', 'Graduated: 2064'],
  },
  {
    title: 'Language',
    items: ['English: Fluent', 'Spanish: Basic'],
  },
];

const resumeSections = [
  {
    title: 'Experience',
    entries: [
      {
        role: 'Senior Software Engineer',
        meta: 'Innovatech Solutions · July 2065 – Present',
        body: 'Led a team of engineers delivering AI-powered workflow tools. Improved application reliability by 40% and reduced onboarding time for new users.',
      },
      {
        role: 'Software Engineer',
        meta: 'TechPioneers · June 2064 – June 2065',
        body: 'Built responsive dashboards, optimized APIs, and collaborated with designers to ship polished customer-facing features.',
      },
    ],
  },
  {
    title: 'Skills',
    bullets: ['JavaScript, React, Node.js, Python', 'REST APIs, Automation, Cloud Deployment', 'Leadership, Communication, Product Thinking'],
  },
  {
    title: 'Projects',
    entries: [
      {
        role: 'LinkedIn Profile Optimizer',
        body: 'Created an assistant that analyzes profile content and recommends stronger headlines, summaries, and experience bullets.',
      },
    ],
  },
  {
    title: 'Certifications',
    bullets: ['Certified AI Professional', 'Cloud Application Developer'],
  },
  {
    title: 'Interests',
    body: 'Mentoring developers, writing technical guides, and exploring practical AI tools.',
  },
];

export function ResumeTemplate() {
  return (
    <section className="resume-preview" aria-label="Resume template preview">
      <aside className="resume-sidebar">
        <div className="resume-photo" aria-hidden="true">
          <span>EC</span>
        </div>
        {sidebarSections.map((section) => (
          <div className="resume-side-section" key={section.title}>
            <h3>{section.title}</h3>
            {section.body && <p>{section.body}</p>}
            {section.items && (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </aside>

      <article className="resume-main">
        <header className="resume-title">
          <h1>Emily Carter</h1>
          <h2>Software Engineer</h2>
        </header>

        {resumeSections.map((section) => (
          <section className="resume-section" key={section.title}>
            <div className="resume-section-heading">
              <h3>{section.title}</h3>
              <span />
            </div>
            {section.entries?.map((entry) => (
              <div className="resume-entry" key={`${section.title}-${entry.role}`}>
                <h4>{entry.role}</h4>
                {entry.meta && <strong>{entry.meta}</strong>}
                <p>{entry.body}</p>
              </div>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
            {section.body && <p>{section.body}</p>}
          </section>
        ))}
      </article>
    </section>
  );
}
