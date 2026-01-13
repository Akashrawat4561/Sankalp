// src/data/contractorsData.js
// Complete contractor profiles for Indore infrastructure projects

export const contractorsData = [
  {
    id: 1,
    name: "HCC - Tata Projects JV",
    fullName: "Hindustan Construction Company + Tata Projects Joint Venture",
    type: "Joint Venture",
    headquarters: "Mumbai, Maharashtra",
    established: 1926,
    specialization: ["Metro/Transit", "Tunneling", "Heavy Civil"],
    teamSize: "10,000+",
    annualTurnover: "₹15,000 Cr",
    certifications: ["ISO 9001:2015", "ISO 14001:2015", "OHSAS 18001"],
    contact: {
      email: "info@hccindia.com",
      phone: "+91-22-2575-1234"
    },
    pastProjects: [
      { name: "Delhi Metro Phase III", budget: 4500, status: "Completed", rating: 8.2 },
      { name: "Mumbai Metro Line 3", budget: 3200, status: "In Progress", rating: 7.8 },
      { name: "Kolkata East-West Metro", budget: 2800, status: "Completed", rating: 8.5 }
    ],
    stats: {
      totalProjects: 45,
      completedOnTime: 38,
      avgBudgetAdherence: 94,
      avgQualityScore: 8.5
    },
    publicRating: 8.2,
    totalReviews: 1250,
    image: "/images/contractors/hcc-tata.jpg"
  },
  {
    id: 2,
    name: "Ferro Concrete Construction",
    fullName: "Ferro Concrete Construction (India) Pvt. Ltd.",
    type: "Private Limited",
    headquarters: "Indore, Madhya Pradesh",
    established: 1985,
    specialization: ["Flyover/Bridge", "Roads", "Commercial Buildings"],
    teamSize: "500+",
    annualTurnover: "₹250 Cr",
    certifications: ["ISO 9001:2015"],
    contact: {
      email: "info@ferroconcrete.in",
      phone: "+91-731-255-6789"
    },
    pastProjects: [
      { name: "Vijay Nagar Flyover", budget: 35, status: "Completed", rating: 8.0 },
      { name: "MR-10 Extension", budget: 28, status: "Completed", rating: 7.5 },
      { name: "Scheme 78 Bridge", budget: 18, status: "Completed", rating: 8.8 }
    ],
    stats: {
      totalProjects: 28,
      completedOnTime: 25,
      avgBudgetAdherence: 96,
      avgQualityScore: 8.1
    },
    publicRating: 8.0,
    totalReviews: 342,
    image: "/images/contractors/ferro-concrete.jpg"
  },
  {
    id: 3,
    name: "Vijay Pratap Sharma",
    fullName: "Vijay Pratap Sharma Construction",
    type: "Proprietorship",
    headquarters: "Indore, Madhya Pradesh",
    established: 2005,
    specialization: ["Smart City", "Landscaping", "Public Spaces"],
    teamSize: "150+",
    annualTurnover: "₹50 Cr",
    certifications: ["ISO 9001:2015"],
    contact: {
      email: "vps.construction@gmail.com",
      phone: "+91-731-400-1234"
    },
    pastProjects: [
      { name: "Pipliyahana Park Upgrade", budget: 2.5, status: "Completed", rating: 9.0 },
      { name: "Scheme 54 Beautification", budget: 1.8, status: "Completed", rating: 8.5 }
    ],
    stats: {
      totalProjects: 15,
      completedOnTime: 14,
      avgBudgetAdherence: 102,
      avgQualityScore: 8.7
    },
    publicRating: 8.8,
    totalReviews: 89,
    image: "/images/contractors/vps-construction.jpg"
  },
  {
    id: 4,
    name: "Som Projects Pvt. Ltd.",
    fullName: "Som Projects Private Limited",
    type: "Private Limited",
    headquarters: "Bhopal, Madhya Pradesh",
    established: 1998,
    specialization: ["Roads", "Highways", "Infrastructure"],
    teamSize: "800+",
    annualTurnover: "₹400 Cr",
    certifications: ["ISO 9001:2015", "ISO 14001:2015"],
    contact: {
      email: "info@somprojects.com",
      phone: "+91-755-266-7890"
    },
    pastProjects: [
      { name: "Bhopal Ring Road", budget: 85, status: "Completed", rating: 7.8 },
      { name: "Ujjain Bypass", budget: 62, status: "Completed", rating: 8.2 },
      { name: "Dewas Road Expansion", budget: 45, status: "Completed", rating: 8.0 }
    ],
    stats: {
      totalProjects: 32,
      completedOnTime: 28,
      avgBudgetAdherence: 95,
      avgQualityScore: 8.0
    },
    publicRating: 7.9,
    totalReviews: 278,
    image: "/images/contractors/som-projects.jpg"
  },
  {
    id: 5,
    name: "Manish Tainguriya",
    fullName: "Manish Tainguriya Construction",
    type: "Proprietorship",
    headquarters: "Indore, Madhya Pradesh",
    established: 2010,
    specialization: ["Municipal/Sanitation", "Civil Works"],
    teamSize: "100+",
    annualTurnover: "₹25 Cr",
    certifications: ["IMC Registered"],
    contact: {
      email: "manish.tainguriya@gmail.com",
      phone: "+91-731-456-7890"
    },
    pastProjects: [
      { name: "MR-9 Waste Collection Center", budget: 0.85, status: "Completed", rating: 8.5 },
      { name: "Scheme 140 Drainage", budget: 1.2, status: "Completed", rating: 8.0 }
    ],
    stats: {
      totalProjects: 12,
      completedOnTime: 11,
      avgBudgetAdherence: 98,
      avgQualityScore: 8.2
    },
    publicRating: 8.3,
    totalReviews: 56,
    image: "/images/contractors/manish-tainguriya.jpg"
  },
  {
    id: 6,
    name: "Monte Carlo Limited",
    fullName: "Monte Carlo Limited (Ahmedabad)",
    type: "Public Limited",
    headquarters: "Ahmedabad, Gujarat",
    established: 1995,
    specialization: ["Railway/Transit", "Commercial", "Industrial"],
    teamSize: "3,000+",
    annualTurnover: "₹2,500 Cr",
    certifications: ["ISO 9001:2015", "ISO 14001:2015", "OHSAS 18001"],
    contact: {
      email: "info@montecarloltd.com",
      phone: "+91-79-2656-7890"
    },
    pastProjects: [
      { name: "Ahmedabad Railway Station", budget: 320, status: "Completed", rating: 8.0 },
      { name: "Surat Diamond Bourse", budget: 450, status: "Completed", rating: 8.5 },
      { name: "Vadodara Junction Upgrade", budget: 180, status: "In Progress", rating: 7.8 }
    ],
    stats: {
      totalProjects: 55,
      completedOnTime: 48,
      avgBudgetAdherence: 93,
      avgQualityScore: 8.1
    },
    publicRating: 8.1,
    totalReviews: 890,
    image: "/images/contractors/monte-carlo.jpg"
  },
  {
    id: 7,
    name: "Knospe & Co. LLP",
    fullName: "Knospe & Co. LLP (Ranchi)",
    type: "LLP",
    headquarters: "Ranchi, Jharkhand",
    established: 2008,
    specialization: ["Heritage", "Conservation", "Archaeological"],
    teamSize: "200+",
    annualTurnover: "₹80 Cr",
    certifications: ["ASI Approved", "INTACH Certified"],
    contact: {
      email: "heritage@knospe.in",
      phone: "+91-651-234-5678"
    },
    pastProjects: [
      { name: "Jagannath Temple Restoration", budget: 25, status: "Completed", rating: 9.2 },
      { name: "Pareshnath Jain Temple", budget: 18, status: "Completed", rating: 9.0 },
      { name: "Netarhat Palace Conservation", budget: 8, status: "Completed", rating: 8.8 }
    ],
    stats: {
      totalProjects: 18,
      completedOnTime: 15,
      avgBudgetAdherence: 97,
      avgQualityScore: 9.0
    },
    publicRating: 9.0,
    totalReviews: 145,
    image: "/images/contractors/knospe.jpg"
  },
  {
    id: 8,
    name: "Landmark Corporation Pvt. Ltd.",
    fullName: "Landmark Corporation Private Limited",
    type: "Private Limited",
    headquarters: "Indore, Madhya Pradesh",
    established: 2002,
    specialization: ["Smart City", "Roads", "Urban Infrastructure"],
    teamSize: "600+",
    annualTurnover: "₹350 Cr",
    certifications: ["ISO 9001:2015", "ISO 14001:2015"],
    contact: {
      email: "info@landmarkcorp.in",
      phone: "+91-731-299-8765"
    },
    pastProjects: [
      { name: "ABD Phase III Roads", budget: 45, status: "Completed", rating: 8.3 },
      { name: "Scheme 78 Smart Infrastructure", budget: 32, status: "Completed", rating: 8.0 },
      { name: "MG Road Smart Upgrade", budget: 28, status: "Completed", rating: 8.5 }
    ],
    stats: {
      totalProjects: 25,
      completedOnTime: 22,
      avgBudgetAdherence: 94,
      avgQualityScore: 8.3
    },
    publicRating: 8.2,
    totalReviews: 198,
    image: "/images/contractors/landmark-corp.jpg"
  },
  {
    id: 9,
    name: "Rajputana Construction Pvt. Ltd.",
    fullName: "Rajputana Construction Private Limited",
    type: "Private Limited",
    headquarters: "Jaipur, Rajasthan",
    established: 1992,
    specialization: ["Heritage", "Stone Work", "Traditional Architecture"],
    teamSize: "400+",
    annualTurnover: "₹150 Cr",
    certifications: ["ASI Approved", "ISO 9001:2015"],
    contact: {
      email: "info@rajputanaconstruction.com",
      phone: "+91-141-278-9012"
    },
    pastProjects: [
      { name: "Amber Fort Restoration", budget: 35, status: "Completed", rating: 9.5 },
      { name: "Nahargarh Fort Conservation", budget: 22, status: "Completed", rating: 9.2 },
      { name: "City Palace Jaipur Phase II", budget: 48, status: "In Progress", rating: 8.8 }
    ],
    stats: {
      totalProjects: 22,
      completedOnTime: 19,
      avgBudgetAdherence: 96,
      avgQualityScore: 9.1
    },
    publicRating: 9.1,
    totalReviews: 312,
    image: "/images/contractors/rajputana.jpg"
  },
  {
    id: 10,
    name: "M/s Aakar Construction",
    fullName: "M/s Aakar Construction",
    type: "Proprietorship",
    headquarters: "Indore, Madhya Pradesh",
    established: 2012,
    specialization: ["Municipal/Sanitation", "STP", "Water Treatment"],
    teamSize: "120+",
    annualTurnover: "₹40 Cr",
    certifications: ["ISO 9001:2015", "IMC Registered"],
    contact: {
      email: "aakar.construction@gmail.com",
      phone: "+91-731-456-1234"
    },
    pastProjects: [
      { name: "Kabitkhedi STP Upgrade", budget: 8, status: "Completed", rating: 8.0 },
      { name: "Rau Water Treatment Plant", budget: 12, status: "Completed", rating: 8.2 }
    ],
    stats: {
      totalProjects: 10,
      completedOnTime: 9,
      avgBudgetAdherence: 97,
      avgQualityScore: 8.1
    },
    publicRating: 8.0,
    totalReviews: 67,
    image: "/images/contractors/aakar.jpg"
  }
];

export default contractorsData;
