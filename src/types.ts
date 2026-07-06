export interface Tender {
  id: string;
  referenceNo: string;
  title: string;
  category: "Transmission" | "Substation" | "Telecom & IT" | "Civil Works" | "Services";
  publishedDate: string;
  submissionDeadline: string;
  valueCr: number; // Value in Crores INR
  documentUrl: string;
  status: "Open" | "Evaluation" | "Awarded" | "Closed";
  circle: string;
}

export interface Project {
  id: string;
  name: string;
  voltageLevel: "400 kV" | "220 kV" | "132 kV";
  circle: string;
  capacityMVA?: number;
  lineLengthCkm?: number;
  status: "In Progress" | "Completed" | "Proposed" | "Commissioned";
  costCr: number;
  completionTargetDate: string;
  physicalProgressPercent: number;
  highlights: string[];
}

export interface Notice {
  id: string;
  title: string;
  publishDate: string;
  category: "Circular" | "Office Order" | "Notification" | "Press Release";
  docSize: string;
  isNew: boolean;
  department: string;
}

export interface BoardMember {
  id: string;
  name: string;
  designation: string;
  role: string;
  cadre: string;
  imageUrl: string;
  profileSummary: string;
}

export interface OfficeDirectory {
  id: string;
  circleName: string;
  designation: string;
  officerName: string;
  contactNo: string;
  email: string;
  address: string;
}

export interface DepartmentSummary {
  id: string;
  name: string;
  description: string;
  keyResponsibilities: string[];
  currentInitiatives: string[];
  headOfDepartment: string;
}
