import { ReactNode } from "react";

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  status: 'active' | 'maintenance' | 'inactive';
  driver?: string;
  mileage: number;
}

export interface Driver {
  id: string;
  name: string;
  license: string;
  phone: string;
  status: 'active' | 'inactive';
  assignedVehicle?: string;
}

export interface Trip {
  id: string;
  vehicleId: string;
  driverId: string;
  origin: string;
  destination: string;
  status: 'active' | 'completed' | 'scheduled';
  startTime: string;
  distance: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: any;
}

export interface Task {
  id: string;
  description: string;
  completed: boolean;
  laborHours: number;
  notes?: string;
}

export interface UsedPart {
  id: string;
  partId: string;
  partName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface JobCard {
  vehicleInfo: ReactNode;
  dateIn: ReactNode;
  technicianAssigned: ReactNode;
  jobType: ReactNode;
  id: string;
  vehicleId: string;
  description: string;
  status: "open" | "in-progress" | "completed";
  createdAt: string;
  updatedAt?: string;
}

export interface Part {
  id: string;
  name: string;
  partNumber: string;
  category: string;
  quantity: number;
  minQuantity: number;
  supplier: string;
  unitPrice: number;
  location: string;
  lastOrdered: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
}

export interface PurchaseOrder {
  id: string;
  supplier: string;
  orderDate: string;
  expectedDelivery: string;
  status: 'pending' | 'approved' | 'received' | 'cancelled';
  items: PurchaseOrderItem[];
  total: number;
  notes?: string;
}

export interface PurchaseOrderItem {
  partId: string;
  partName: string;
  quantity: number;
  unitPrice: number;
}

export interface PartIssue {
  id: string;
  issueDate: string;
  issuedTo: string;
  jobCardId?: string;
  vehicleId?: string;
  items: PartIssueItem[];
  total: number;
  notes?: string;
}

export interface PartIssueItem {
  partId: string;
  partName: string;
  quantity: number;
  unitPrice: number;
}