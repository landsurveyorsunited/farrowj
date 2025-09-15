import React from 'react';
import { resumeData } from './data/resumeData';
import type { Experience, Project, Education, Expertise, Award, Publication, Innovation, Language } from './types';

// This is needed because html2pdf is loaded from a script tag
declare const html2pdf: any;

const ResumeSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8 print:mb-4 print-section">
    <h2 className="text-sm font-bold tracking-widest uppercase pb-1 border-b border-gray-500 mb-4 print:text-xs">{title}</h2>
    {children}
  </section>
);

const ExperienceItem: React.FC<{ item: Experience }> = ({ item }) => (
  <div className="group cursor-pointer border border-gray-500 p-4 mb-4 print:p-2 print:mb-2 hover:border-custom-orange transition-colors duration-300 print-item">
    <div className="flex justify-between items-start mb-1">
      <h3 className="font-bold text-white uppercase text-sm print:text-xs group-hover:text-custom-orange transition-colors duration-300">{item.role} - {item.company}</h3>
      <span className="text-xs text-gray-400 border border-gray-600 px-2 py-1 flex-shrink-0 print:text-xs print:px-1 print:py-0.5">{item.period}</span>
    </div>
    <p className="text-gray-300 text-sm leading-snug print:text-xs print:text-gray-700">{item.description}</p>
  </div>
);

const ProjectItem: React.FC<{ item: Project }> = ({ item }) => (
    <div className="group cursor-pointer border border-gray-500 p-4 mb-4 print:p-2 print:mb-2 hover:border-custom-orange transition-colors duration-300 print-item">
        <h3 className="font-bold text-white uppercase text-sm mb-1 print:text-xs group-hover:text-custom-orange transition-colors duration-300">{item.title}</h3>
        <p className="text-gray-300 text-sm leading-snug print:text-xs print:text-gray-700">{item.description}</p>
    </div>
);

const EducationItem: React.FC<{ item: Education }> = ({ item }) => (
    <div className="group cursor-pointer border border-gray-500 p-4 mb-4 print:p-2 print:mb-2 hover:border-custom-orange transition-colors duration-300 print-item">
        <h3 className="font-bold text-white uppercase text-sm print:text-xs group-hover:text-custom-orange transition-colors duration-300">{item.degree}</h3>
        <p className="text-gray-300 font-medium text-sm print:text-xs print:text-gray-800">{item.institution}</p>
        <p className="text-gray-400 text-xs mt-1 print:text-xxs print:text-gray-600">{item.details}</p>
    </div>
);

const ExpertiseItem: React.FC<{ item: Expertise }> = ({ item }) => (
    <div className="flex items-start mb-2 print:mb-1">
        <span className="w-2 h-2 bg-gray-400 mr-3 mt-1.5 flex-shrink-0 print:w-1.5 print:h-1.5 print:mt-1 print:mr-2"></span>
        <p className="text-sm text-gray-300 print:text-xs print:text-gray-800">{item.area}</p>
    </div>
);

const AwardItem: React.FC<{ item: Award }> = ({ item }) => (
    <div className="group cursor-pointer flex mb-4 print:mb-2">
        <div className="w-px bg-gray-500 mr-4 group-hover:bg-custom-orange transition-colors duration-300"></div>
        <div>
            <h3 className="font-bold text-white uppercase text-sm print:text-xs group-hover:text-custom-orange transition-colors duration-300">{item.title}</h3>
            <p className="text-gray-400 text-xs mb-1 print:text-xxs">{item.year}</p>
            <p className="text-gray-300 text-sm print:text-xs print:text-gray-700">{item.description}</p>
        </div>
    </div>
);

const PublicationItem: React.FC<{ item: Publication }> = ({ item }) => (
     <div className="group cursor-pointer border border-gray-500 p-4 mb-4 print:p-2 print:mb-2 hover:border-custom-orange transition-colors duration-300 print-item">
        <h3 className="font-bold text-white uppercase text-sm mb-1 print:text-xs group-hover:text-custom-orange transition-colors duration-300">{item.title}</h3>
        <p className="text-gray-300 text-sm leading-snug print:text-xs print:text-gray-700">{item.description}</p>
    </div>
);

const PrintIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);


export default function App() {
  const { header, lately, experience, education, coreExpertise, awards, languages, aiInnovations, publications, footer } = resumeData;

  const handlePrint = () => {
    if (window.confirm('Are you sure you want to print this resume?')) {
      window.print();
    }
  };

  const handleDownload = () => {
    const element = document.getElementById('resume-content');
    if (element) {
        const opt = {
          margin:       0.5,
          filename:     'Justin_Farrow_Resume.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 print:bg-white print:p-0 print:text-black">
      <main id="resume-content" className="max-w-7xl mx-auto border border-gray-500 p-4 sm:p-6 md:p-8 print:border-none print:p-4">
        {/* Header */}
        <header className="flex justify-between items-start mb-8 print:mb-4">
            <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-wider text-white print:text-black print:text-3xl">{header.name}</h1>
                <div className="mt-2 text-center text-xs sm:text-sm font-semibold border border-gray-500 inline-block px-4 py-2 print:border-black print:px-2 print:py-1 print:text-xs">
                    {header.tags.join(' x ')}
                </div>
            </div>
            <div className="text-right flex flex-col items-end">
                <div className="flex gap-2 mb-2 print:hidden">
                    <button onClick={handleDownload} title="Download PDF" className="text-gray-400 hover:text-white transition-colors border border-gray-600 p-2">
                        <DownloadIcon />
                    </button>
                    <button onClick={handlePrint} title="Print" className="text-gray-400 hover:text-white transition-colors border border-gray-600 p-2">
                        <PrintIcon />
                    </button>
                </div>
                 <p className="text-xs text-gray-400 print:text-xs print:text-gray-600">{header.contact.address}</p>
                 <p className="text-xs text-gray-400 print:text-xs print:text-gray-600">{header.contact.phone}</p>
                 <p className="text-xs text-gray-400 print:text-xs print:text-gray-600">{header.contact.email}</p>
            </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 print:flex-row print:gap-8 print-columns">
            {/* Left Column */}
            <div className="w-full lg:w-1/3 print:w-1/3">
                <ResumeSection title="Lately">
                    {lately.map((item: Project) => <ProjectItem key={item.title} item={item} />)}
                </ResumeSection>
                <ResumeSection title="Education">
                    {education.map((item: Education) => <EducationItem key={item.degree} item={item} />)}
                </ResumeSection>
                <ResumeSection title="Core Expertise">
                    {coreExpertise.map((item: Expertise) => <ExpertiseItem key={item.area} item={item} />)}
                </ResumeSection>
                {awards.map((item: Award) => <AwardItem key={item.title} item={item} />)}
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-2/3 print:w-2/3">
                 <ResumeSection title="Experience">
                    {experience.map((item: Experience) => <ExperienceItem key={item.role + item.company} item={item} />)}
                </ResumeSection>
                 <ResumeSection title="Languages">
                    <div className="flex flex-wrap gap-2">
                        {languages.map((lang: Language) => (
                            <span key={lang.name} className="cursor-pointer text-xs text-gray-300 border border-gray-600 px-3 py-1 print:text-xs print:px-2 print:py-0.5 hover:border-custom-orange hover:text-custom-orange transition-colors duration-300">{lang.name}</span>
                        ))}
                    </div>
                </ResumeSection>
                 <ResumeSection title="AI Innovations">
                    <p className="text-gray-300 text-sm mb-4 print:text-xs print:text-gray-700">{aiInnovations.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {aiInnovations.frameworks.map((fw: Innovation) => (
                            <span key={fw.name} className="cursor-pointer text-xs text-gray-300 border border-gray-600 px-3 py-1 print:text-xs print:px-2 print:py-0.5 hover:border-custom-orange hover:text-custom-orange transition-colors duration-300">{fw.name}</span>
                        ))}
                    </div>
                </ResumeSection>
                <ResumeSection title="Publications & Media">
                    {publications.map((item: Publication) => <PublicationItem key={item.title} item={item} />)}
                </ResumeSection>
            </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-gray-500 print:mt-4 print:pt-2">
            <div className="group cursor-pointer border border-gray-500 p-4 text-center print:border-black print:p-2 hover:border-custom-orange transition-colors duration-300">
                <p className="uppercase text-xs sm:text-sm font-semibold tracking-wider text-gray-300 print:text-black print:text-xs group-hover:text-custom-orange transition-colors duration-300">{footer.tagline}</p>
            </div>
        </footer>
      </main>
    </div>
  );
}