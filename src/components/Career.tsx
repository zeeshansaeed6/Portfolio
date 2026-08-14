import "./styles/Career.css";
import { FaCertificate } from "react-icons/fa6";

const certifications = [
  "Oracle Cloud Infrastructure Certified AI Foundation Associate",
  "AWS Certified Machine Learning",
  "Google Cloud AI",
  "Microsoft Azure AI Essentials Professional Certificate (Microsoft & LinkedIn)",
  "Generative AI Professional Certificate (Snowflake)",
  "Generative AI Foundation Certificate (Microsoft)",
  "Deloitte Australia Data Analytics Job Simulation Certificate",
  "AWS Cloud Practitioner Essentials",
  "Generative AI Foundations Certificate (upGrad)",
  "NPTEL Certifications",
  "MERN Full-Stack Course (AccioJob)",
];

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> Experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full-Stack & AI Developer</h4>
                <h5>Production Projects & AccioJob</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Engineered and shipped 5+ production-style full-stack and ML applications, including a multi-user food delivery platform with synchronized split billing, an MRI brain tumor CNN classifier with OpenCV, and CollegeERP with Twilio API.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Analytics Intern</h4>
                <h5>Deloitte Australia (Internship)</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Applied data analytics, visualization, and cloud solution architecture methodologies through production simulations. Analyzed complex datasets and engineered insightful dashboards to drive strategic decisions.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor's Degree</h4>
                <h5>Osmania University (Sem 5)</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Pursuing undergraduate degree in engineering at Osmania University, Hyderabad (Started 2024). Deepening expertise in Data Structures & Algorithms (DSA), Generative AI, full-stack systems, and scalable backend architecture.
            </p>
          </div>
        </div>

        <div className="certifications-container">
          <h3 className="certifications-title">Licenses & Certifications</h3>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div className="cert-card" key={index}>
                <span className="cert-icon">
                  <FaCertificate />
                </span>
                <span className="cert-name">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

