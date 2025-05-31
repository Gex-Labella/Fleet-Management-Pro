import { Vehicle, Driver, Trip } from '../models/types';

// Mock API with fake delays to simulate network requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Base URL for API (would be a real endpoint in production)
const BASE_URL = 'https://api.fleetpro.example';

const api = {
  // Vehicle endpoints
  vehicles: {
    getAll: async (): Promise<Vehicle[]> => {
      await delay(800);
      const vehicles = localStorage.getItem('vehicles');
      return vehicles ? JSON.parse(vehicles) : [];
    },
    getById: async (id: string): Promise<Vehicle | null> => {
      await delay(500);
      const vehicles = localStorage.getItem('vehicles');
      const allVehicles = vehicles ? JSON.parse(vehicles) : [];
      return allVehicles.find((v: Vehicle) => v.id === id) || null;
    },
    create: async (vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
      await delay(1000);
      const newVehicle = { ...vehicle, id: Date.now().toString() };
      const vehicles = localStorage.getItem('vehicles');
      const allVehicles = vehicles ? JSON.parse(vehicles) : [];
      localStorage.setItem('vehicles', JSON.stringify([...allVehicles, newVehicle]));
      return newVehicle;
    },
    update: async (id: string, updates: Partial<Vehicle>): Promise<Vehicle> => {
      await delay(1000);
      const vehicles = localStorage.getItem('vehicles');
      const allVehicles = vehicles ? JSON.parse(vehicles) : [];
      const updatedVehicles = allVehicles.map((v: Vehicle) => 
        v.id === id ? { ...v, ...updates } : v
      );
      localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
      return updatedVehicles.find((v: Vehicle) => v.id === id)!;
    },
    delete: async (id: string): Promise<void> => {
      await delay(1000);
      const vehicles = localStorage.getItem('vehicles');
      const allVehicles = vehicles ? JSON.parse(vehicles) : [];
      localStorage.setItem('vehicles', JSON.stringify(allVehicles.filter((v: Vehicle) => v.id !== id)));
    }
  },
  
  // Driver endpoints
  drivers: {
    getAll: async (): Promise<Driver[]> => {
      await delay(800);
      const drivers = localStorage.getItem('drivers');
      return drivers ? JSON.parse(drivers) : [];
    },
    getById: async (id: string): Promise<Driver | null> => {
      await delay(500);
      const drivers = localStorage.getItem('drivers');
      const allDrivers = drivers ? JSON.parse(drivers) : [];
      return allDrivers.find((d: Driver) => d.id === id) || null;
    },
    create: async (driver: Omit<Driver, 'id'>): Promise<Driver> => {
      await delay(1000);
      const newDriver = { ...driver, id: Date.now().toString() };
      const drivers = localStorage.getItem('drivers');
      const allDrivers = drivers ? JSON.parse(drivers) : [];
      localStorage.setItem('drivers', JSON.stringify([...allDrivers, newDriver]));
      return newDriver;
    },
    update: async (id: string, updates: Partial<Driver>): Promise<Driver> => {
      await delay(1000);
      const drivers = localStorage.getItem('drivers');
      const allDrivers = drivers ? JSON.parse(drivers) : [];
      const updatedDrivers = allDrivers.map((d: Driver) => 
        d.id === id ? { ...d, ...updates } : d
      );
      localStorage.setItem('drivers', JSON.stringify(updatedDrivers));
      return updatedDrivers.find((d: Driver) => d.id === id)!;
    },
    delete: async (id: string): Promise<void> => {
      await delay(1000);
      const drivers = localStorage.getItem('drivers');
      const allDrivers = drivers ? JSON.parse(drivers) : [];
      localStorage.setItem('drivers', JSON.stringify(allDrivers.filter((d: Driver) => d.id !== id)));
    }
  },

  // Trip endpoints
  trips: {
    getAll: async (): Promise<Trip[]> => {
      await delay(800);
      const trips = localStorage.getItem('trips');
      return trips ? JSON.parse(trips) : [];
    },
    getById: async (id: string): Promise<Trip | null> => {
      await delay(500);
      const trips = localStorage.getItem('trips');
      const allTrips = trips ? JSON.parse(trips) : [];
      return allTrips.find((t: Trip) => t.id === id) || null;
    },
    create: async (trip: Omit<Trip, 'id'>): Promise<Trip> => {
      await delay(1000);
      const newTrip = { ...trip, id: Date.now().toString() };
      const trips = localStorage.getItem('trips');
      const allTrips = trips ? JSON.parse(trips) : [];
      localStorage.setItem('trips', JSON.stringify([...allTrips, newTrip]));
      return newTrip;
    },
    update: async (id: string, updates: Partial<Trip>): Promise<Trip> => {
      await delay(1000);
      const trips = localStorage.getItem('trips');
      const allTrips = trips ? JSON.parse(trips) : [];
      const updatedTrips = allTrips.map((t: Trip) => 
        t.id === id ? { ...t, ...updates } : t
      );
      localStorage.setItem('trips', JSON.stringify(updatedTrips));
      return updatedTrips.find((t: Trip) => t.id === id)!;
    },
    delete: async (id: string): Promise<void> => {
      await delay(1000);
      const trips = localStorage.getItem('trips');
      const allTrips = trips ? JSON.parse(trips) : [];
      localStorage.setItem('trips', JSON.stringify(allTrips.filter((t: Trip) => t.id !== id)));
    }
  },

  // Reports endpoints
  reports: {
    getFleetUtilization: async (startDate: string, endDate: string): Promise<any> => {
      await delay(1500);
      // Mock implementation
      return {
        totalVehicles: 15,
        activeVehicles: 12,
        utilizationRate: 0.8,
        mileageData: [
          { date: '2024-01-01', mileage: 12500 },
          { date: '2024-01-08', mileage: 14200 },
          { date: '2024-01-15', mileage: 16800 },
        ]
      };
    },
    
    getFuelConsumption: async (startDate: string, endDate: string): Promise<any> => {
      await delay(1500);
      // Mock implementation
      return {
        totalConsumption: 2580,
        averageMpg: 8.2,
        costPerMile: 0.42,
        consumptionByVehicle: [
          { vehicleId: '1', consumption: 850 },
          { vehicleId: '2', consumption: 920 },
          { vehicleId: '3', consumption: 810 },
        ]
      };
    },
    
    getMaintenanceCosts: async (startDate: string, endDate: string): Promise<any> => {
      await delay(1500);
      // Mock implementation
      return {
        totalCost: 12500,
        preventativeCost: 4200,
        repairCost: 8300,
        costByVehicle: [
          { vehicleId: '1', cost: 3200 },
          { vehicleId: '2', cost: 5800 },
          { vehicleId: '3', cost: 3500 },
        ]
      };
    }
  }
};

export default api;