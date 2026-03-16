export const mockData = {
  sectors: [
    { id: 1, name: "Sector 1", time: "28.456", delta: "-0.123", speedTrap: "312 km/h", status: "PURPLE" },
    { id: 2, name: "Sector 2", time: "35.789", delta: "-0.045", speedTrap: "289 km/h", status: "GREEN" },
    { id: 3, name: "Sector 3", time: "25.123", delta: "+0.100", speedTrap: "305 km/h", status: "YELLOW" },
  ],
  tyrePace: [
    { lap: "L1", soft: 85, medium: 87, hard: 89 },
    { lap: "L5", soft: 86, medium: 87.5, hard: 89.2 },
    { lap: "L10", soft: 88, medium: 88.5, hard: 89.5 },
    { lap: "L15", soft: 92, medium: 90, hard: 90.5 },
    { lap: "L20", soft: 98, medium: 91.5, hard: 91 },
    { lap: "L30", soft: null, medium: 94, hard: 92 },
    { lap: "L40", soft: null, medium: 98, hard: 93.5 },
    { lap: "L50", soft: null, medium: null, hard: 95 },
  ],
  tyreLife: 64,
  stintLaps: 14,
  icePower: 50,
  elecPower: 50,
  aeroState: "Z-MODE", // "Z-MODE" | "X-MODE"
};
