import { College, CutoffData, Branch, EAMCETQuestion, StudyMaterial, PreviousPaper, CounselingEvent, Scholarship } from "../eamcetTypes";

export const MOCK_COLLEGES: College[] = [
  {
    id: "ouce",
    code: "OUCE",
    name: "University College of Engineering, Osmania University",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=100&h=100&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop&q=80"
    ],
    description: "Established in 1929, University College of Engineering (UCE) is the oldest and one of the most prestigious engineering colleges in Hyderabad. It is an autonomous college affiliated with Osmania University.",
    district: "Hyderabad",
    region: "OU",
    type: "Govt",
    feesPerYear: 35000,
    placementPercentage: 92,
    highestPackage: 44.0,
    averagePackage: 8.5,
    facultyCount: 180,
    infrastructure: ["Central Library", "Smart Classrooms", "R&D Labs", "State-of-the-art Gym", "Separate Hostels for Boys & Girls", "Sports Stadium"],
    website: "https://uceou.edu",
    contactEmail: "principal@uceou.edu",
    contactPhone: "+91-40-27098254",
    hostelAvailable: "Yes",
    rating: 4.8
  },
  {
    id: "jnth",
    code: "JNTH",
    name: "JNTUH College of Engineering, Hyderabad",
    logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&h=450&fit=crop&q=80"
    ],
    description: "JNTUH University College of Engineering Science and Technology Hyderabad, established in 1965, is a premier government institution committed to creating technological leaders of tomorrow.",
    district: "Hyderabad",
    region: "OU",
    type: "Govt",
    feesPerYear: 18000,
    placementPercentage: 89,
    highestPackage: 46.5,
    averagePackage: 8.2,
    facultyCount: 210,
    infrastructure: ["Auditorium", "Digital Library", "Maker Space Lab", "Indoor Games Complex", "Hostel Blocks", "Canteen"],
    website: "https://jntuhcest.ac.in",
    contactEmail: "jntuhceh@jntuh.ac.in",
    contactPhone: "+91-40-23158661",
    hostelAvailable: "Yes",
    rating: 4.7
  },
  {
    id: "auce",
    code: "AUCE",
    name: "Andhra University College of Engineering, Visakhapatnam",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=450&fit=crop&q=80"
    ],
    description: "Andhra University College of Engineering (AUCE) is a top-ranked public university engineering college in Visakhapatnam, Andhra Pradesh. Known for excellent research facilities and beachside campus ambiance.",
    district: "Visakhapatnam",
    region: "AU",
    type: "Govt",
    feesPerYear: 50000,
    placementPercentage: 86,
    highestPackage: 32.5,
    averagePackage: 7.0,
    facultyCount: 230,
    infrastructure: ["Maritime Lab", "Wind Tunnel Complex", "Vast Playgrounds", "Auditoriums", "Girls Hostel", "Boys Hostel"],
    website: "https://andhrauniversity.edu.in",
    contactEmail: "auce@andhrauniversity.edu.in",
    contactPhone: "+91-891-2844000",
    hostelAvailable: "Yes",
    rating: 4.6
  },
  {
    id: "cbit",
    code: "CBIT",
    name: "Chaitanya Bharathi Institute of Technology, Hyderabad",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=100&h=100&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&h=450&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop&q=80"
    ],
    description: "Chaitanya Bharathi Institute of Technology (CBIT) is one of the premier private engineering institutes in Telangana, renowned for academic excellence, state-of-the-art campus, and outstanding placements.",
    district: "Hyderabad",
    region: "OU",
    type: "Private Autonomous",
    feesPerYear: 140000,
    placementPercentage: 94,
    highestPackage: 54.0,
    averagePackage: 9.1,
    facultyCount: 320,
    infrastructure: ["Advanced Computer Centre", "Seminar Halls", "Student Innovation Centre", "Cricket Ground", "Hostels", "Gym"],
    website: "https://cbit.ac.in",
    contactEmail: "principal@cbit.ac.in",
    contactPhone: "+91-40-24193276",
    hostelAvailable: "Yes",
    rating: 4.7
  },
  {
    id: "vnrv",
    code: "VNRV",
    name: "VNR Vignana Jyothi Institute of Engineering and Technology",
    logo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&h=100&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=450&fit=crop&q=80",
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop&q=80"
    ],
    description: "VNRVJIET was established in 1995. Styled as a premium autonomous institution, it is highly valued for student-centric initiatives, sports amenities, and high placements with MNCs.",
    district: "Hyderabad",
    region: "OU",
    type: "Private Autonomous",
    feesPerYear: 135000,
    placementPercentage: 91,
    highestPackage: 48.0,
    averagePackage: 7.8,
    facultyCount: 290,
    infrastructure: ["Virtual Reality Lab", "Acoustically Treated Seminar Rooms", "Sports Fields", "Hostels", "Library Network"],
    website: "https://vnrvjiet.ac.in",
    contactEmail: "postbox@vnrvjiet.ac.in",
    contactPhone: "+91-40-23042758",
    hostelAvailable: "Yes",
    rating: 4.6
  },
  {
    id: "gvp",
    code: "GVP",
    name: "Gayatri Vidya Parishad College of Engineering, Visakhapatnam",
    logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop&q=80"
    ],
    description: "Gayatri Vidya Parishad College of Engineering (GVP) was started in 1996 and has quickly emerged as one of the most preferred autonomous engineering colleges in Andhra Pradesh.",
    district: "Visakhapatnam",
    region: "AU",
    type: "Private Autonomous",
    feesPerYear: 69000,
    placementPercentage: 88,
    highestPackage: 31.2,
    averagePackage: 6.2,
    facultyCount: 240,
    infrastructure: ["Modern Computer Center", "Mechanical Workshops", "Language Labs", "Canteen", "Girls Hostel"],
    website: "https://gvpce.ac.in",
    contactEmail: "gvpce@gvpce.ac.in",
    contactPhone: "+91-891-2739507",
    hostelAvailable: "Girls Only",
    rating: 4.4
  },
  {
    id: "svuc",
    code: "SVUC",
    name: "SVU College of Engineering, Tirupati",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=100&h=100&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&h=450&fit=crop&q=80",
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop&q=80"
    ],
    description: "Sri Venkateswara University College of Engineering (SVUCE) was established in 1959. Located under the foothills of Tirumala, it has produced numerous visionaries and provides excellent state facilities.",
    district: "Chittoor",
    region: "SVU",
    type: "Govt",
    feesPerYear: 28000,
    placementPercentage: 83,
    highestPackage: 28.0,
    averagePackage: 6.4,
    facultyCount: 150,
    infrastructure: ["Huge Campus Greenery", "Central Workshops", "Hostel Complex", "Tennis & Basketball Courts", "Library"],
    website: "https://svuce.edu.in",
    contactEmail: "principal@svuce.edu.in",
    contactPhone: "+91-877-2289561",
    hostelAvailable: "Yes",
    rating: 4.5
  },
  {
    id: "vrsec",
    code: "VRSEC",
    name: "VR Siddhartha Engineering College, Vijayawada",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=450&fit=crop&q=80"
    ],
    description: "Velagapudi Ramakrishna Siddhartha Engineering College (VRSEC) is the first private engineering college in Andhra Pradesh, established in 1977. It is highly ranked for industry collaboration.",
    district: "Vijayawada",
    region: "AU",
    type: "Private Autonomous",
    feesPerYear: 75000,
    placementPercentage: 87,
    highestPackage: 34.0,
    averagePackage: 6.5,
    facultyCount: 220,
    infrastructure: ["Siemens COE Labs", "E-Yantra Robotics Lab", "Centralized Digital AC Library", "Sports Courts", "Hostels"],
    website: "https://vrsiddhartha.ac.in",
    contactEmail: "principal@vrsiddhartha.ac.in",
    contactPhone: "+91-866-2582333",
    hostelAvailable: "Yes",
    rating: 4.5
  }
];

export const MOCK_CUTOFFS: CutoffData[] = [
  // OUCE cutoffs (Super highly competitive)
  { id: "c1", collegeId: "ouce", collegeCode: "OUCE", branchCode: "CSE", category: "OC_GEN", cutoffRank: 850, year: 2025 },
  { id: "c2", collegeId: "ouce", collegeCode: "OUCE", branchCode: "CSE", category: "OC_GIRLS", cutoffRank: 1100, year: 2025 },
  { id: "c3", collegeId: "ouce", collegeCode: "OUCE", branchCode: "CSE", category: "BC_A_GEN", cutoffRank: 2200, year: 2025 },
  { id: "c4", collegeId: "ouce", collegeCode: "OUCE", branchCode: "CSE", category: "SC_GEN", cutoffRank: 5500, year: 2025 },
  { id: "c5", collegeId: "ouce", collegeCode: "OUCE", branchCode: "CSE", category: "ST_GEN", cutoffRank: 7800, year: 2025 },
  { id: "c6", collegeId: "ouce", collegeCode: "OUCE", branchCode: "ECE", category: "OC_GEN", cutoffRank: 1800, year: 2025 },
  { id: "c7", collegeId: "ouce", collegeCode: "OUCE", branchCode: "ECE", category: "BC_A_GEN", cutoffRank: 3800, year: 2025 },
  { id: "c8", collegeId: "ouce", collegeCode: "OUCE", branchCode: "INF", category: "OC_GEN", cutoffRank: 1300, year: 2025 },

  // JNTH cutoffs
  { id: "c9", collegeId: "jnth", collegeCode: "JNTH", branchCode: "CSE", category: "OC_GEN", cutoffRank: 600, year: 2025 },
  { id: "c10", collegeId: "jnth", collegeCode: "JNTH", branchCode: "CSE", category: "OC_GIRLS", cutoffRank: 850, year: 2025 },
  { id: "c11", collegeId: "jnth", collegeCode: "JNTH", branchCode: "CSE", category: "BC_A_GEN", cutoffRank: 1700, year: 2025 },
  { id: "c12", collegeId: "jnth", collegeCode: "JNTH", branchCode: "CSE", category: "SC_GEN", cutoffRank: 4800, year: 2025 },
  { id: "c13", collegeId: "jnth", collegeCode: "JNTH", branchCode: "ECE", category: "OC_GEN", cutoffRank: 1400, year: 2025 },
  { id: "c14", collegeId: "jnth", collegeCode: "JNTH", branchCode: "INF", category: "OC_GEN", cutoffRank: 1050, year: 2025 },

  // AUCE cutoffs
  { id: "c15", collegeId: "auce", collegeCode: "AUCE", branchCode: "CSE", category: "OC_GEN", cutoffRank: 1200, year: 2025 },
  { id: "c16", collegeId: "auce", collegeCode: "AUCE", branchCode: "CSE", category: "OC_GIRLS", cutoffRank: 1550, year: 2025 },
  { id: "c17", collegeId: "auce", collegeCode: "AUCE", branchCode: "CSE", category: "BC_A_GEN", cutoffRank: 3400, year: 2025 },
  { id: "c18", collegeId: "auce", collegeCode: "AUCE", branchCode: "CSE", category: "SC_GEN", cutoffRank: 8200, year: 2025 },
  { id: "c19", collegeId: "auce", collegeCode: "AUCE", branchCode: "ECE", category: "OC_GEN", cutoffRank: 2400, year: 2025 },

  // CBIT cutoffs
  { id: "c20", collegeId: "cbit", collegeCode: "CBIT", branchCode: "CSE", category: "OC_GEN", cutoffRank: 1100, year: 2025 },
  { id: "c21", collegeId: "cbit", collegeCode: "CBIT", branchCode: "CSE", category: "BC_A_GEN", cutoffRank: 2900, year: 2025 },
  { id: "c22", collegeId: "cbit", collegeCode: "CBIT", branchCode: "ECE", category: "OC_GEN", cutoffRank: 2300, year: 2025 },
  { id: "c23", collegeId: "cbit", collegeCode: "CBIT", branchCode: "INF", category: "OC_GEN", cutoffRank: 1700, year: 2025 },

  // VNRV cutoffs
  { id: "c24", collegeId: "vnrv", collegeCode: "VNRV", branchCode: "CSE", category: "OC_GEN", cutoffRank: 1500, year: 2025 },
  { id: "c25", collegeId: "vnrv", collegeCode: "VNRV", branchCode: "CSE", category: "BC_A_GEN", cutoffRank: 3600, year: 2025 },
  { id: "c26", collegeId: "vnrv", collegeCode: "VNRV", branchCode: "ECE", category: "OC_GEN", cutoffRank: 3100, year: 2025 },

  // GVP cutoffs
  { id: "c27", collegeId: "gvp", collegeCode: "GVP", branchCode: "CSE", category: "OC_GEN", cutoffRank: 3800, year: 2025 },
  { id: "c28", collegeId: "gvp", collegeCode: "GVP", branchCode: "CSE", category: "BC_A_GEN", cutoffRank: 7200, year: 2025 },
  { id: "c29", collegeId: "gvp", collegeCode: "GVP", branchCode: "ECE", category: "OC_GEN", cutoffRank: 6500, year: 2025 },

  // SVUC cutoffs
  { id: "c30", collegeId: "svuc", collegeCode: "SVUC", branchCode: "CSE", category: "OC_GEN", cutoffRank: 2500, year: 2025 },
  { id: "c31", collegeId: "svuc", collegeCode: "SVUC", branchCode: "CSE", category: "BC_A_GEN", cutoffRank: 5900, year: 2025 },
  { id: "c32", collegeId: "svuc", collegeCode: "SVUC", branchCode: "ECE", category: "OC_GEN", cutoffRank: 4200, year: 2025 },

  // VRSEC cutoffs
  { id: "c33", collegeId: "vrsec", collegeCode: "VRSEC", branchCode: "CSE", category: "OC_GEN", cutoffRank: 4500, year: 2025 },
  { id: "c34", collegeId: "vrsec", collegeCode: "VRSEC", branchCode: "CSE", category: "BC_A_GEN", cutoffRank: 8500, year: 2025 },
  { id: "c35", collegeId: "vrsec", collegeCode: "VRSEC", branchCode: "ECE", category: "OC_GEN", cutoffRank: 7800, year: 2025 }
];

export const MOCK_BRANCHES: Branch[] = [
  {
    code: "CSE",
    name: "Computer Science & Engineering",
    description: "Deals with the design, implementation, and management of information systems of both software and hardware processes.",
    opportunities: ["Software Engineer", "Full Stack Developer", "Cloud Solutions Architect", "System Analyst"],
    skillsRequired: ["Data Structures & Algorithms", "Java/Python/C++ Coding", "DBMS & SQL", "Analytical Reasoning"],
    averageSalary: 8.5,
    futureDemand: "High",
    recruiters: ["Microsoft", "Google", "Amazon", "Infosys", "TCS", "Accenture"]
  },
  {
    code: "ECE",
    name: "Electronics & Communication Engineering",
    description: "Focuses on electronic devices, circuits, communication equipment like transmitter, receiver, and integrated circuits.",
    opportunities: ["Embedded Systems Developer", "VLSI Design Engineer", "Telecom Network Specialist", "Hardware Designer"],
    skillsRequired: ["Verilog / VHDL", "Analog & Digital Electronics", "IoT Architectures", "Microcontrollers"],
    averageSalary: 7.2,
    futureDemand: "High",
    recruiters: ["Intel", "Qualcomm", "Nvidia", "AMD", "Wipro", "TCS"]
  },
  {
    code: "INF",
    name: "Information Technology",
    description: "Focuses on using computers and telecommunications to store, retrieve, transmit, and manipulate data or information.",
    opportunities: ["DevOps Engineer", "Database Administrator", "Information Security Specialist", "Software QA Engineer"],
    skillsRequired: ["Network Security", "Cloud Computing (AWS/GCP)", "Python / JS scripting", "Linux Administration"],
    averageSalary: 7.8,
    futureDemand: "High",
    recruiters: ["Salesforce", "ServiceNow", "Capgemini", "Cognizant", "Oracle"]
  },
  {
    code: "EEE",
    name: "Electrical & Electronics Engineering",
    description: "Studies electrical power generation, transmission, distribution, and control, as well as electronic circuits and instrumentation.",
    opportunities: ["Power Grid Manager", "EV Design Architect", "Control Systems Engineer", "Electrical Safety Analyst"],
    skillsRequired: ["Power Electronics", "MATLAB", "Circuit Simulation", "Electrical Machinery"],
    averageSalary: 5.8,
    futureDemand: "Emerging",
    recruiters: ["Tata Power", "BHEL", "L&T", "Tesla", "Ather Energy", "PowerGrid"]
  },
  {
    code: "MECH",
    name: "Mechanical Engineering",
    description: "Deals with the design, analysis, manufacturing, and maintenance of mechanical systems and thermal power cycles.",
    opportunities: ["Automotive Engineer", "Robotics Specialist", "CAD/CAM Design Engineer", "Aeronautical Analyst"],
    skillsRequired: ["SolidWorks / AutoCAD", "Thermodynamics", "Finite Element Analysis (FEA)", "CNC Programming"],
    averageSalary: 5.2,
    futureDemand: "Medium",
    recruiters: ["Tata Motors", "Mahindra & Mahindra", "L&T", "Bosch", "ISRO", "DRDO"]
  }
];

export const MOCK_QUESTIONS: EAMCETQuestion[] = [
  // Mathematics
  {
    id: "m1",
    subject: "Mathematics",
    topic: "Calculus",
    questionText: "What is the limit: lim (x -> 0) [ (sin x) / x ] equal to?",
    options: ["0", "1", "Does not exist", "Infinity"],
    correctAnswer: 1,
    explanation: "This is a standard trigonometric limit. By L'Hôpital's Rule, taking derivatives of numerator and denominator with respect to x gives cos(x)/1. Evaluating at x = 0 gives cos(0) = 1.",
    difficulty: "Easy"
  },
  {
    id: "m2",
    subject: "Mathematics",
    topic: "Algebra",
    questionText: "If α and β are the roots of the quadratic equation x^2 - 5x + 6 = 0, find the value of α^2 + β^2.",
    options: ["13", "12", "25", "19"],
    correctAnswer: 0,
    explanation: "From the given quadratic equation, sum of roots (α + β) = 5 and product of roots (αβ) = 6. We know that α^2 + β^2 = (α + β)^2 - 2αβ = 5^2 - 2(6) = 25 - 12 = 13.",
    difficulty: "Medium"
  },
  {
    id: "m3",
    subject: "Mathematics",
    topic: "Vectors",
    questionText: "Find the angle between two vectors A = i + 2j - k and B = -i + j - 2k.",
    options: ["30°", "45°", "60°", "90°"],
    correctAnswer: 2,
    explanation: "Using dot product: A.B = (1)(-1) + (2)(1) + (-1)(-2) = -1 + 2 + 2 = 3. |A| = √(1^2 + 2^2 + (-1)^2) = √6, and |B| = √((-1)^2 + 1^2 + (-2)^2) = √6. cos(θ) = (A.B) / (|A||B|) = 3 / (√6 * √6) = 3/6 = 0.5. Hence, θ = cos^-1(0.5) = 60°.",
    difficulty: "Hard"
  },

  // Physics
  {
    id: "p1",
    subject: "Physics",
    topic: "Mechanics",
    questionText: "An object is thrown vertically upwards with a velocity of 20 m/s. Calculate the maximum height reached. (Take g = 10 m/s^2)",
    options: ["10m", "20m", "40m", "15m"],
    correctAnswer: 1,
    explanation: "Using the formula v^2 = u^2 - 2gh. At maximum height, final velocity v = 0. So, 0 = 20^2 - 2(10)h => 20h = 400 => h = 20 meters.",
    difficulty: "Easy"
  },
  {
    id: "p2",
    subject: "Physics",
    topic: "Optics",
    questionText: "Light travels from air into a glass medium of refractive index 1.5. If speed of light in air is 3 x 10^8 m/s, what is the speed in glass?",
    options: ["2.0 x 10^8 m/s", "1.5 x 10^8 m/s", "4.5 x 10^8 m/s", "2.5 x 10^8 m/s"],
    correctAnswer: 0,
    explanation: "Refractive index (n) = Speed of light in vacuum/air (c) / Speed of light in medium (v). Therefore, v = c / n = (3 x 10^8 m/s) / 1.5 = 2.0 x 10^8 m/s.",
    difficulty: "Medium"
  },
  {
    id: "p3",
    subject: "Physics",
    topic: "Modern Physics",
    questionText: "If the work function of a metal is 2.0 eV, what is the threshold frequency of light needed to eject photoelectric electrons? (h = 6.63 x 10^-34 J·s, 1 eV = 1.6 x 10^-19 J)",
    options: ["4.82 x 10^14 Hz", "5.12 x 10^14 Hz", "3.20 x 10^14 Hz", "6.40 x 10^14 Hz"],
    correctAnswer: 0,
    explanation: "Work function (Φ) = h * f0, where f0 is threshold frequency. Φ = 2.0 eV = 2 * 1.6 x 10^-19 J = 3.2 x 10^-19 J. f0 = Φ / h = (3.2 x 10^-19 J) / (6.63 x 10^-34 J·s) ≈ 4.82 x 10^14 Hz.",
    difficulty: "Hard"
  },

  // Chemistry
  {
    id: "c_q1",
    subject: "Chemistry",
    topic: "Organic",
    questionText: "Which of the following compounds is an aromatic hydrocarbon?",
    options: ["Cyclohexane", "Hexane", "Benzene", "Acetylene"],
    correctAnswer: 2,
    explanation: "Benzene (C6H6) is a planar, cyclic ring with conjugated double bonds containing (4n+2) pi-electrons (6 pi-electrons, where n=1), complying fully with Hückel's Rule of aromaticity.",
    difficulty: "Easy"
  },
  {
    id: "c_q2",
    subject: "Chemistry",
    topic: "Physical",
    questionText: "What is the pH of a 1.0 x 10^-3 M solution of strong monobasic acid HCl?",
    options: ["7", "3", "11", "4"],
    correctAnswer: 1,
    explanation: "HCl is a strong acid and dissociates completely. [H+] = 1.0 x 10^-3 M. pH = -log10[H+] = -log10(10^-3) = 3.",
    difficulty: "Medium"
  },
  {
    id: "c_q3",
    subject: "Chemistry",
    topic: "Inorganic",
    questionText: "According to VSEPR theory, what is the molecular shape of Sulfur Tetrafluoride (SF4)?",
    options: ["Tetrahedral", "Square Planar", "See-saw", "Trigonal Bipyramidal"],
    correctAnswer: 2,
    explanation: "Sulfur in SF4 has 6 valence electrons, plus 4 from fluorine bonds, giving 10 electrons (5 pairs). Hence, hybridization is sp3d (trigonal bipyramidal base). There are 4 bonding pairs and 1 lone pair, which sits in equatorial position to minimize repulsion, yielding a 'See-saw' shape.",
    difficulty: "Hard"
  }
];

export const MOCK_STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: "sm1",
    subject: "Mathematics",
    topic: "Calculus",
    title: "Limits, Continuity & Derivatives Quick Guide",
    content: "Calculus is the mathematical study of continuous change. Focus areas include finding limits, derivative formulas, and standard application of derivatives (maxima & minima). Ensure you memorize the standard trigonometry expansions and l'Hôpital's Rule.",
    formulas: [
      "d/dx(sin x) = cos x",
      "d/dx(e^x) = e^x",
      "lim (x->0) (tan x)/x = 1",
      "f'(x) = lim (h->0) [f(x+h) - f(x)] / h"
    ],
    keyPoints: [
      "L'Hopital's rule applies ONLY to 0/0 or inf/inf indeterminate forms.",
      "A function is continuous at a point if LHS limit = RHS limit = function value.",
      "Product Rule: (uv)' = u'v + uv'",
      "Chain Rule is vital for nested functions like sin(e^x)."
    ]
  },
  {
    id: "sm2",
    subject: "Physics",
    topic: "Mechanics",
    title: "Work, Energy & Power Concepts",
    content: "Mechanics accounts for 25%+ of physics questions. Focus deeply on Conservation of Linear Momentum, Collisions (elastic vs inelastic), and Work-Energy Theorem. Solving free-body diagrams is a superpower.",
    formulas: [
      "Work = F * d * cos(θ)",
      "Kinetic Energy = 0.5 * m * v^2",
      "Potential Energy (Gravity) = m * g * h",
      "Power = Work / Time = F * v"
    ],
    keyPoints: [
      "Work done is zero if force is perpendicular to displacement (e.g. centripetal force).",
      "Total energy is conserved in both elastic and inelastic collisions, but Kinetic Energy is conserved ONLY in elastic collisions.",
      "Conservative forces (gravity, electrostatic) are path-independent."
    ]
  },
  {
    id: "sm3",
    subject: "Chemistry",
    topic: "Physical",
    title: "Chemical Equilibrium & Kinetics",
    content: "Equilibrium questions are numerical and logical. Study Le Chatelier's Principle thoroughly to predict direction of shifting. For Kinetics, understand Zero, First, and Second-order rate laws and Half-life periods.",
    formulas: [
      "Kc = [Products] / [Reactants] at equilibrium",
      "Kp = Kc * (RT)^Δn",
      "Rate = k * [A]^n",
      "First order half-life: t1/2 = 0.693 / k"
    ],
    keyPoints: [
      "Catalysts speed up the rate of forward and backward reactions equally without changing Kc.",
      "Increasing temperature shifts equilibrium in endothermic direction.",
      "The order of a reaction is determined experimentally and can be fractional or zero."
    ]
  }
];

export const MOCK_PAPERS: PreviousPaper[] = [
  { id: "p2025", title: "AP EAPCET 2025 Solved Question Paper", year: 2025, pdfUrl: "#", downloads: 14500 },
  { id: "p2024", title: "TS EAMCET 2024 Shift-1 & Shift-2 Papers", year: 2024, pdfUrl: "#", downloads: 18200 },
  { id: "p2023", title: "AP EAPCET 2023 Comprehensive Paper", year: 2023, pdfUrl: "#", downloads: 11900 },
  { id: "p2022", title: "TS EAMCET 2022 All Sessions Master Paper", year: 2022, pdfUrl: "#", downloads: 9600 }
];

export const MOCK_COUNSELING_TIMELINE: CounselingEvent[] = [
  { id: "ce1", phase: "Phase 1", title: "Notification Release & Fee Payment", dateRange: "July 10 - July 15, 2026", status: "Upcoming", description: "Official notification release from APSCHE/TGCHE. Candidates must log in to pay counseling processing fees online." },
  { id: "ce2", phase: "Phase 1", title: "Certificate Verification", dateRange: "July 16 - July 20, 2026", status: "Upcoming", description: "Verification of candidate certificates at designated Help Line Centers (HLC) or online verification." },
  { id: "ce3", phase: "Phase 1", title: "Web Option Entry", dateRange: "July 21 - July 25, 2026", status: "Upcoming", description: "Crucial step. Candidates must select preferred list of colleges and branches in descending order of preference." },
  { id: "ce4", phase: "Phase 1", title: "Seat Allotment Results", dateRange: "July 28, 2026", status: "Upcoming", description: "Seat allotment announcement based on merit rank, category, local region, and selected web options." },
  { id: "ce5", phase: "Phase 1", title: "Self-Reporting & College Join", dateRange: "July 29 - August 2, 2026", status: "Upcoming", description: "Accepting allotted seat online (self-reporting) and reporting physically at college with original documents." }
];

export const MOCK_SCHOLARSHIPS: Scholarship[] = [
  {
    id: "s1",
    name: "AP Jagananna Vidya Deevena (Full Fee Reimb)",
    provider: "Andhra Pradesh State Government",
    eligibility: "Students admitted under convener quota with family annual income < ₹2.5 Lakhs.",
    amount: "100% Tuition fee reimbursement paid directly to college",
    applyLink: "https://jnanabhumi.ap.gov.in"
  },
  {
    id: "s2",
    name: "Telangana RTF (Post Matric Scholarship)",
    provider: "Telangana State Government",
    eligibility: "BC/EBC/Minority/SC/ST students admitted via TG EAMCET with eligible income limit.",
    amount: "Partial or full tuition fee exemption based on category",
    applyLink: "https://telanganaepass.cgg.gov.in"
  }
];

export const MOCK_STRATEGY_TIPS = [
  {
    id: "tip1",
    title: "Understanding EAMCET/EAPCET Subject Weightage",
    category: "Strategy",
    author: "N. Suresh (EAMCET 2025 Rank 42)",
    readTime: "5 mins",
    content: "Mathematics carries 80 marks, while Physics and Chemistry carry 40 marks each. Spending 50% of your daily study time on Maths is mathematically the best approach. Focus heavily on Coordinate Geometry and Calculus as they represent 35+ marks.",
    weightageData: [
      { name: "Mathematics", marks: 80, percentage: 50 },
      { name: "Physics", marks: 40, percentage: 25 },
      { name: "Chemistry", marks: 40, percentage: 25 }
    ]
  },
  {
    id: "tip2",
    title: "180 Questions in 180 Minutes: Speed Tactics",
    category: "Time Management",
    author: "Pranav Teja (JNTUH Topper)",
    readTime: "4 mins",
    content: "With exactly 1 minute per question and NO negative marking, you must avoid getting stuck. Solve Chemistry first (target: 40 questions in 25 mins), then Physics (40 questions in 45 mins), and finally spend 110 mins on Mathematics. Never leave any bubbles blank!",
    weightageData: [
      { name: "Chemistry First", minutes: 25 },
      { name: "Physics Second", minutes: 45 },
      { name: "Mathematics Last", minutes: 110 }
    ]
  },
  {
    id: "tip3",
    title: "Last 15 Days Mock Exam Checklist",
    category: "Preparation",
    author: "Ayesha Fatima (OU Topper)",
    readTime: "6 mins",
    content: "During the final sprint, write full-length mock tests at the exact exam time (9:00 AM to 12:00 PM or 3:00 PM to 6:00 PM) to align your body clock. Review every single wrong answer. Focus on formula sheets for Physics and organic reaction named-reactions.",
    weightageData: [
      { name: "Full Mock Test", hours: 3 },
      { name: "Analysis & Correction", hours: 2 },
      { name: "Formula Revision", hours: 1.5 }
    ]
  }
];
