/**
 * Projects shown in the Work section. Every figure is traced in the resume's SOURCES table
 * (internship workspace, resume_v5/README.md): dronecore's signed evidence matrix, the CADASTRALAI
 * README and the Depth Wizard (SIH_P2) README.
 */

export const CAPABILITIES = [
  'Autonomy and decisions',
  'State estimation',
  'Planning and control',
  'MAVLink, PX4, ArduPilot',
  'Validation and testing',
  'Computer vision',
  'Geospatial',
  'Backend and APIs',
] as const;

export type Capability = (typeof CAPABILITIES)[number];

export interface Project {
  id: 'dronecore' | 'onboard-nav' | 'cadastra' | 'depth';
  /** Shows a "Currently working on" badge on the row */
  inProgress?: boolean;
  n: string;
  title: string;
  tag: string;
  summary: string;
  role: string;
  tech: string[];
  metrics: string[];
  capabilities: Capability[];
  /** Case-study page; projects without one open in a dialog */
  href?: string;
  /** Preview image shown in the project row */
  thumb?: { src: string; alt: string; width: number; height: number };
  repo?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'dronecore',
    n: '01',
    title: 'Autonomous drone software: dronecore',
    tag: 'Personal project · simulation and SITL, not yet flown',
    summary:
      'Onboard autonomy and validation engine for multirotors. It grades how well the aircraft knows where it is, detects sensor, motor and battery faults, estimates wind, and chooses between returning, diverting or landing, recording why. The same navigator flies a 6-DOF simulation and real PX4 and ArduPilot firmware in software-in-the-loop.',
    role: 'Personal project, Nov 2026 – present',
    tech: ['Python', 'MAVLink v2', 'PX4', 'ArduPilot', 'NumPy', 'three.js'],
    metrics: ['48/48 SITL demo runs', '17/17 SITL safety cases', '1,782 tests'],
    capabilities: ['Autonomy and decisions', 'State estimation', 'Planning and control', 'MAVLink, PX4, ArduPilot', 'Validation and testing'],
    href: '/work/dronecore',
    thumb: {
      src: '/dronecore/demo-2-urban.png',
      alt: 'dronecore flying a simulated quadrotor over a mapped power line, avoiding an unmapped crane found by lidar',
      width: 1280,
      height: 720,
    },
  },
  {
    id: 'onboard-nav',
    n: '02',
    title: 'Onboard navigation: DC-Nav',
    tag: 'Personal project · extends dronecore · design and build in progress',
    inProgress: true,
    summary:
      'A GPS-denied onboard navigation stack for dronecore, built as ROS 2 Jazzy packages: visual-inertial fusion in a GTSAM factor graph, a rolling 3D obstacle map, place recognition for loop closure, satellite-tile geolocation to correct drift without GNSS, and an integrity supervisor that tells the flight controller how much to trust the estimate. It extends the stereo-inertial filter already in dronecore. Architecture is designed; implementation is under way and nothing has run on hardware yet.',
    role: 'Personal project, Nov 2026 – present',
    tech: ['ROS 2 Jazzy', 'C++', 'GTSAM', 'OpenCV', 'MAVLink', 'PX4 / ArduPilot'],
    metrics: ['9 ROS 2 packages designed', 'Current filter: 0.05–0.14 m ATE on EuRoC', 'Not yet flown'],
    capabilities: ['State estimation', 'Computer vision', 'MAVLink, PX4, ArduPilot', 'Autonomy and decisions'],
  },
  {
    id: 'cadastra',
    n: '03',
    title: 'CadastraAI',
    tag: 'Team ELAVI · Smart India Hackathon 2026, college round Rank 1',
    summary:
      'Turns drone orthoimagery into building footprints, roads, land use and parcel polygons, flags encroachments, and exports GIS files after review in a web workbench. I built the Flask backend and integrated the team’s models.',
    role: 'Backend and model integration (team of students)',
    tech: ['Python', 'PyTorch', 'Mask R-CNN', 'SegFormer', 'U-Net', 'Flask', 'Leaflet'],
    metrics: ['Building IoU 0.52 → 0.81', 'Land cover mIoU 0.67', '288 roofs · 266 parcels'],
    capabilities: ['Computer vision', 'Geospatial', 'Backend and APIs'],
    repo: 'https://github.com/Manan7289/CADASTRALAI',
  },
  {
    id: 'depth',
    n: '04',
    title: 'Depth Wizard',
    tag: 'Two-person team · Smart India Hackathon problem 26175',
    summary:
      'Predicts surface height from a single RGB satellite image by fine-tuning Depth Anything V2 on the GAMUS dataset, then shows it as navigable 3D terrain. Evaluated once on a held-out test split against LiDAR-derived heights and three baselines.',
    role: 'Team of two',
    tech: ['Python', 'PyTorch', 'Depth Anything V2', 'FastAPI', 'three.js'],
    metrics: ['1.41 m MAE', '3.10 m RMSE', 'r = 0.905'],
    capabilities: ['Computer vision', 'Geospatial', 'Validation and testing'],
  },
];
