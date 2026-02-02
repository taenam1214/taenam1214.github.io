export const experiences = [
  {
    id: 1,
    type: 'work',
    company: 'Forbes',
    role: 'Software Engineer',
    location: 'Remote',
    period: '2023 - Present',
    startDate: '2023-01',
    description: 'Leading development of modern web applications for Forbes digital platforms.',
    achievements: [
      'Architected and deployed scalable microservices infrastructure',
      'Improved page load times by 40% through optimization',
      'Mentored junior developers in modern React practices',
      'Implemented CI/CD pipelines reducing deployment time by 60%'
    ],
    technologies: ['React', 'Node.js', 'AWS', 'Docker', 'TypeScript', 'GraphQL'],
    logo: null, // Add logo path if available
  },
  {
    id: 2,
    type: 'work',
    company: 'People and Robotics',
    role: 'Full Stack Developer',
    location: 'Seoul, South Korea',
    period: '2022 - 2023',
    startDate: '2022-01',
    description: 'Developed full-stack solutions for robotics control systems and data visualization.',
    achievements: [
      'Built real-time monitoring dashboard for robot fleet management',
      'Integrated third-party APIs for enhanced functionality',
      'Reduced server costs by 30% through infrastructure optimization',
      'Implemented automated testing reducing bugs by 45%'
    ],
    technologies: ['React', 'Python', 'Django', 'PostgreSQL', 'Redis', 'WebSockets'],
    logo: null,
  },
  {
    id: 3,
    type: 'work',
    company: 'Societe Generale',
    role: 'Data Analyst',
    location: 'Paris, France',
    period: '2020 - 2022',
    startDate: '2020-06',
    description: 'Analyzed financial data and created automated reporting systems for risk management.',
    achievements: [
      'Developed automated reporting system saving 20 hours/week',
      'Created interactive dashboards for executive decision-making',
      'Improved data accuracy by implementing validation frameworks',
      'Led data migration project for legacy systems'
    ],
    technologies: ['Python', 'SQL', 'Power BI', 'Excel VBA', 'Azure'],
    logo: null,
  },
  {
    id: 4,
    type: 'education',
    company: 'Seoul National University',
    role: 'Bachelor of Science in Computer Science',
    location: 'Seoul, South Korea',
    period: '2016 - 2020',
    startDate: '2016-03',
    description: 'Focused on software engineering, algorithms, and data structures.',
    achievements: [
      'GPA: 3.8/4.0',
      'Dean\'s List all semesters',
      'President of Computer Science Club',
      'Published research paper on machine learning optimization'
    ],
    technologies: ['Java', 'C++', 'Python', 'Data Structures', 'Algorithms', 'Machine Learning'],
    logo: null,
  },
];

export const experienceCategories = [
  { id: 'all', label: 'All' },
  { id: 'work', label: 'Work Experience' },
  { id: 'education', label: 'Education' },
];
