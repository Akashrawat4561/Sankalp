// src/data/projectsData.js
// Complete dataset for 10 Indore infrastructure projects

export const projectsData = [
  {
    id: 1,
    name: "Indore Metro Underground (Phase 1)",
    type: "Metro/Transit",
    status: "In Progress",
    progress: 45,
    contractor: {
      id: 1,
      name: "HCC - Tata Projects JV",
      fullName: "Hindustan Construction Company + Tata Projects Joint Venture"
    },
    tenderId: "Package IN-05R",
    biddingProcess: "Open E-Tender",
    location: {
      city: "Indore",
      state: "Madhya Pradesh",
      coordinates: { lat: 22.7196, lng: 75.8577 }
    },
    budget: {
      estimated: 2400,
      awarded: 2191,
      actual: 2191,
      currency: "Cr"
    },
    timeline: {
      startDate: "2023-06-15",
      expectedEnd: "2027-06-15",
      plannedDuration: 48, // months
      currentDelay: 4 // months
    },
    description: "This is the only underground section of the Indore Metro. The contract involves building tunnels using TBMs (Tunnel Boring Machines) for the first phase of metro connectivity.",
    highlights: [
      "Only underground section of Indore Metro",
      "Uses advanced TBM technology",
      "Will serve 3 lakh daily passengers"
    ],
    image: "/images/projects/metro-underground.jpg"
  },
  {
    id: 2,
    name: "Bhanwarkuan Flyover",
    type: "Flyover/Bridge",
    status: "Completed",
    progress: 100,
    contractor: {
      id: 2,
      name: "Ferro Concrete Construction",
      fullName: "Ferro Concrete Construction (India) Pvt. Ltd."
    },
    tenderId: "IDA/FLY/2022/001",
    biddingProcess: "Open E-Tender (L1)",
    location: {
      city: "Indore",
      state: "Madhya Pradesh",
      coordinates: { lat: 22.7533, lng: 75.8937 }
    },
    budget: {
      estimated: 52,
      awarded: 47.23,
      actual: 47.23,
      currency: "Cr"
    },
    timeline: {
      startDate: "2022-03-01",
      expectedEnd: "2024-03-01",
      plannedDuration: 24,
      currentDelay: 0
    },
    description: "A standard urban infrastructure flyover project handled by the Indore Development Authority (IDA). The contractor qualified technically and offered the lowest price (L1) to win the bid.",
    highlights: [
      "Reduces traffic congestion by 60%",
      "Open E-Tender with L1 selection",
      "Completed on time"
    ],
    image: "/images/projects/bhanwarkuan-flyover.jpg"
  },
  {
    id: 3,
    name: "Riverfront Development",
    type: "Smart City",
    status: "Completed",
    progress: 100,
    contractor: {
      id: 3,
      name: "Vijay Pratap Sharma",
      fullName: "Vijay Pratap Sharma Construction"
    },
    tenderId: "ISCDL/RF/2021/045",
    biddingProcess: "Open E-Tender",
    location: {
      city: "Indore",
      state: "Madhya Pradesh",
      coordinates: { lat: 22.7241, lng: 75.8560 }
    },
    budget: {
      estimated: 4.00,
      awarded: 3.57,
      actual: 2.99,
      currency: "Cr"
    },
    timeline: {
      startDate: "2021-08-15",
      expectedEnd: "2023-02-15",
      plannedDuration: 18,
      currentDelay: 0
    },
    description: "A Smart City initiative showcasing transparency in cost savings. The project came in significantly under budget while meeting all quality specifications.",
    highlights: [
      "Came in 25% under budget",
      "Beautification of Khan River",
      "Public recreational space created"
    ],
    image: "/images/projects/riverfront.jpg"
  },
  {
    id: 4,
    name: "Raj Mohalla Road Improvement",
    type: "Roads",
    status: "Completed",
    progress: 100,
    contractor: {
      id: 4,
      name: "Som Projects Pvt. Ltd.",
      fullName: "Som Projects Private Limited"
    },
    tenderId: "IMC/ROAD/2022/078",
    biddingProcess: "Open E-Tender",
    location: {
      city: "Indore",
      state: "Madhya Pradesh",
      coordinates: { lat: 22.7175, lng: 75.8544 }
    },
    budget: {
      estimated: 11.50,
      awarded: 10.44,
      actual: 10.44,
      currency: "Cr"
    },
    timeline: {
      startDate: "2022-01-10",
      expectedEnd: "2023-07-10",
      plannedDuration: 18,
      currentDelay: 0
    },
    description: "Road improvement project representing the most common type of public work. Includes resurfacing, drainage, and pedestrian pathways.",
    highlights: [
      "9% under estimated budget",
      "Improved drainage system",
      "100% completion on schedule"
    ],
    image: "/images/projects/raj-mohalla-road.jpg"
  },
  {
    id: 5,
    name: "Garbage Transfer Station",
    type: "Municipal/Sanitation",
    status: "Completed",
    progress: 100,
    contractor: {
      id: 5,
      name: "Manish Tainguriya",
      fullName: "Manish Tainguriya Construction"
    },
    tenderId: "IMC/SAN/2022/034",
    biddingProcess: "Open E-Tender",
    location: {
      city: "Indore",
      state: "Madhya Pradesh",
      coordinates: { lat: 22.6856, lng: 75.8398 }
    },
    budget: {
      estimated: 1.45,
      awarded: 1.12,
      actual: 1.12,
      currency: "Cr"
    },
    timeline: {
      startDate: "2022-06-01",
      expectedEnd: "2023-06-01",
      plannedDuration: 12,
      currentDelay: 0
    },
    description: "Municipal sanitation project crucial for Indore (India's Cleanest City). The contractor bid 22% lower than the government estimate to win.",
    highlights: [
      "22% below estimated cost",
      "Supports Swachh Bharat mission",
      "Handles 500 tons/day capacity"
    ],
    image: "/images/projects/garbage-station.jpg"
  },
  {
    id: 6,
    name: "Indore Railway Station Redevelopment",
    type: "Railway/Transit",
    status: "In Progress",
    progress: 35,
    contractor: {
      id: 6,
      name: "Monte Carlo Limited",
      fullName: "Monte Carlo Limited (Ahmedabad)"
    },
    tenderId: "RLDA/WR/2023/IN-01",
    biddingProcess: "Open E-Tender",
    location: {
      city: "Indore",
      state: "Madhya Pradesh",
      coordinates: { lat: 22.7196, lng: 75.8020 }
    },
    budget: {
      estimated: 479,
      awarded: 443.52,
      actual: 443.52,
      currency: "Cr"
    },
    timeline: {
      startDate: "2024-01-15",
      expectedEnd: "2027-01-15",
      plannedDuration: 36,
      currentDelay: 2
    },
    description: "Major railway station redevelopment project by RLDA/Western Railway. Will provide airport-like amenities including skywalks and a modern concourse.",
    highlights: [
      "7% below estimated cost",
      "Airport-like amenities planned",
      "Skywalks and modern concourse"
    ],
    image: "/images/projects/railway-station.jpg"
  },
  {
    id: 7,
    name: "Rajwada Palace Conservation",
    type: "Heritage",
    status: "In Progress",
    progress: 85,
    contractor: {
      id: 7,
      name: "Knospe & Co. LLP",
      fullName: "Knospe & Co. LLP (Ranchi)"
    },
    tenderId: "ISCDL/HER/2022/012",
    biddingProcess: "Item Rate Tender",
    location: {
      city: "Indore",
      state: "Madhya Pradesh",
      coordinates: { lat: 22.7179, lng: 75.8567 }
    },
    budget: {
      estimated: 18.50,
      awarded: 17.22,
      actual: 17.22,
      currency: "Cr"
    },
    timeline: {
      startDate: "2022-09-01",
      expectedEnd: "2025-03-01",
      plannedDuration: 30,
      currentDelay: 3
    },
    description: "Heritage conservation project using Item Rate tendering for quality assurance. Contractor is paid for specific restoration tasks like lime plastering and wood carving.",
    highlights: [
      "Item Rate tendering for quality",
      "Specialists in heritage conservation",
      "Preserving 200+ year old structure"
    ],
    image: "/images/projects/rajwada-palace.jpg"
  },
  {
    id: 8,
    name: "ABD Area Smart Roads (Phase V)",
    type: "Smart City",
    status: "In Progress",
    progress: 74,
    contractor: {
      id: 8,
      name: "Landmark Corporation Pvt. Ltd.",
      fullName: "Landmark Corporation Private Limited"
    },
    tenderId: "ISCDL/ABD/2023/005V",
    biddingProcess: "Open E-Tender",
    location: {
      city: "Indore",
      state: "Madhya Pradesh",
      coordinates: { lat: 22.7504, lng: 75.8957 }
    },
    budget: {
      estimated: 65,
      awarded: 60.59,
      actual: 60.59,
      currency: "Cr"
    },
    timeline: {
      startDate: "2023-04-01",
      expectedEnd: "2025-04-01",
      plannedDuration: 24,
      currentDelay: 1
    },
    description: "Smart Road project with underground utility ducts for electrical, optical fiber, and storm water. Prevents future road digging for cable repairs.",
    highlights: [
      "Underground utility integration",
      "Prevents future road digging",
      "Smart traffic management"
    ],
    image: "/images/projects/smart-roads.jpg"
  },
  {
    id: 9,
    name: "Gopal Mandir Heritage Conservation",
    type: "Heritage",
    status: "In Progress",
    progress: 60,
    contractor: {
      id: 9,
      name: "Rajputana Construction Pvt. Ltd.",
      fullName: "Rajputana Construction Private Limited"
    },
    tenderId: "ISCDL/HER/2023/008",
    biddingProcess: "Item Rate Tender",
    location: {
      city: "Indore",
      state: "Madhya Pradesh",
      coordinates: { lat: 22.7183, lng: 75.8558 }
    },
    budget: {
      estimated: 15.00,
      awarded: 14.03,
      actual: 14.03,
      currency: "Cr"
    },
    timeline: {
      startDate: "2023-06-01",
      expectedEnd: "2025-12-01",
      plannedDuration: 30,
      currentDelay: 2
    },
    description: "Heritage conservation of Gopal Mandir with intricate wood and stone restoration. High cost justified by detailed craftsmanship required.",
    highlights: [
      "Intricate wood and stone work",
      "Heritage conservation specialists",
      "Cultural preservation investment"
    ],
    image: "/images/projects/gopal-mandir.jpg"
  },
  {
    id: 10,
    name: "Sludge Irradiation Plant (Kabitkhedi)",
    type: "Municipal/Sanitation",
    status: "In Progress",
    progress: 55,
    contractor: {
      id: 10,
      name: "M/s Aakar Construction",
      fullName: "M/s Aakar Construction"
    },
    tenderId: "IMC/STP/2023/011",
    biddingProcess: "Open E-Tender",
    location: {
      city: "Indore",
      state: "Madhya Pradesh",
      coordinates: { lat: 22.6520, lng: 75.8123 }
    },
    budget: {
      estimated: 12.00,
      awarded: 10.78,
      actual: 10.78,
      currency: "Cr"
    },
    timeline: {
      startDate: "2023-08-01",
      expectedEnd: "2025-08-01",
      plannedDuration: 24,
      currentDelay: 0
    },
    description: "High-tech sanitation project using irradiation technology for sludge treatment. Validates Swachh Bharat investment in scientific waste treatment.",
    highlights: [
      "Scientific waste treatment",
      "10% below estimated cost",
      "Validates Swachh Bharat mission"
    ],
    image: "/images/projects/sludge-plant.jpg"
  }
];

// Project type categories for filtering
export const projectTypes = [
  "All Types",
  "Metro/Transit",
  "Railway/Transit",
  "Flyover/Bridge",
  "Roads",
  "Smart City",
  "Heritage",
  "Municipal/Sanitation"
];

// Status options for filtering
export const statusOptions = [
  "All Status",
  "Completed",
  "In Progress",
  "Delayed",
  "High Risk"
];

export default projectsData;
