// =====================================================================
// All site content lives here. Edit this file; no HTML changes needed.
//
// TIMELINE entry fields:
//   year     - label on the timeline spine
//   title    - robot / project name
//   context  - where (school, competition, company, lab)
//   role     - what YOU did (be explicit about your own contribution)
//   text     - 1-3 sentences: what you built and the outcome
//   tags     - domains covered (shows breadth across the robot stack)
//   media    - optional list of images/videos (.mp4/.webm autoplay, muted, loop)
//   award    - optional badge text
//   links    - optional [{ label, url }]
//   marker   - true = a section divider (e.g. a school), not a card
//
// Search for "TODO" to find everything that still needs your input.
// =====================================================================

const SCHOLAR_URL = "https://scholar.google.com/citations?user=AX2fgtsAAAAJ&hl=en";

const SITE = {
  name: "Sachit Mahajan",
  tagline:
    "Roboticist building intelligent autonomous systems that understand, navigate, and operate reliably in the real world.",
  // Three quick facts under the buttons.
  highlights: [
    { value: "Thousands", label: "of robots running my features on SLAM" },
    { value: "CVPR · ICRA", label: "2025 papers on 3D Gaussian Splatting" },
    { value: "6+ years", label: "across SLAM, spatial perception, and autonomous robots" },
  ],
  keywords: ["SLAM", "Spatial Perception", "Embodied AI", "Sensor Fusion", "World Models", "3D Vision", "Visual Navigation"],
  // TODO: refine into your one-line proposed endeavor
  about:
    "I work on how robots see, remember, and move through the real world. That has meant building SLAM that shipped to thousands of homes, and now the Spatial AI and scene representations that general-purpose robots will need next.",
  links: [
    { label: "Resume (2026)", url: "assets/resume.pdf" }, // TODO: add the PDF
    { label: "Google Scholar", url: SCHOLAR_URL },
    { label: "GitHub", url: "https://github.com/SachitM" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sachitmahajan" },
    { label: "Email", url: "mailto:sachitmahajan.sm@gmail.com" },
  ],
};

// Shown as a static "Skills" section. One row per group; items are joined with commas.
const SKILLS = [
  {
    group: "Visual SLAM",
    items: [
      "Visual and visual-inertial odometry (VIO)", "Visual SLAM", "Structure from motion (SfM, COLMAP)",
      "Learned SLAM and feed-forward 3D reconstruction (DUSt3R, MASt3R, VGGT, Depth Anything 3)", "Visual place recognition (VPR)", "Object-based and lifelong localization", "Multi-view geometry",
    ],
  },
  {
    group: "LiDAR SLAM",
    items: [
      "LiDAR and LiDAR-inertial odometry (LOAM, LIO)", "Scan matching and point-cloud registration (ICP, GICP, NDT)",
      "NDT mapping", "2D LiDAR SLAM", "Motion distortion correction (deskewing)", "LiDAR place recognition",
    ],
  },
  {
    group: "State estimation and optimization",
    items: [
      "Pose graph optimization", "Nonlinear optimization (Ceres, GTSAM)", "Extended Kalman Filters (EKF)",
      "Robust outlier rejection and loop-closure validation", "Sensor fusion",
    ],
  },
  {
    group: "Mapping and scene understanding",
    items: [
      "3D Gaussian Splatting", "Occupancy and voxel maps (occupancy grids, TSDF)", "Point-cloud maps", "Mesh reconstruction",
      "Spatio-temporal scene graphs", "Change detection", "Room segmentation and semantic labeling", "Semantic segmentation",
      "Dense stereo depth", "Dynamic-object filtering",
    ],
  },
  {
    group: "Calibration and alignment",
    items: ["Hand-eye calibration", "Camera Calibration", "Camera-LiDAR Calibration",  "Lever-arm calibration", "Umeyama alignment", "Trajectory evaluation (ATE, RPE)"],
  },

  {
    group: "Learning for robotics",
    items: [
      "Residual reinforcement learning (PPO)", "Visual navigation transformers", "Imitation learning (ACT policy, LeRobot)",
    ],
  },
  {
    group: "Evaluation and infrastructure",
    items: [
      "Benchmarking and metrics pipelines", "Statistical hypothesis testing", "LLM-as-a-judge evaluation",
      "Deterministic replay and root-cause analysis", "Long-term autonomy simulation", "Golden-set selection",
      "Sim-to-real evaluation",
    ],
  },
  {
    group: "Embedded and safety systems",
    items: [
      "RTOS firmware", "Safety and emergency handling", "Power management and cell balancing",
      "Sensor and motor-driver interfacing", "UART, SPI, I2C, CAN, Ethernet",
    ],
  },
  {
    group: "Programming",
    items: ["C++", "Python", "C", "Embedded C", "MATLAB"],
  },
  {
    group: "Software and frameworks",
    items: [
      "PyTorch", "ROS / ROS2", "PCL", "Open3D", "Eigen", "OpenCV", "Gazebo", "Isaac Sim / Isaac Lab", "RTOS", "Git", "Docker",
    ],
  },
];

const TIMELINE = [
  {
    year: "High School",
    title: "Obstacle-Clearing Robotic Car",
    // context: "School",
    // TODO: one line on the sensors and mechanism
    text:
      "My first robot, designed, built, and soldered entirely on my own: a small wheeled car that is meant to clear an obstacle course.This  led me to co-found my school's robotics club, Robodexterous.",
    tags: ["Embedded", "Mechanical design", "Sensing"],
    media: ["assets/img/dps1.jpeg"],
  },
  {
    year: "High School",
    title: "Pick-and-Place Robot",
    // context: "School · Robotics competition",
    text:
      "A wheeled mobile manipulator with an arm that I designed, built, and programmed on my own for a school robotics competition. It picked up objects and placed them on the course, and finished 3rd place.",
    tags: ["Manipulation", "Embedded", "Mechanical design"],
    // award: "3rd Place",
    media: ["assets/img/dps2.jpeg"],
  },
  { marker: true, year: "2013 – 2017", title: "VIT University · B.Tech, Electronics & Communication Engineering" },
  {
    year: "2016",
    title: "RoverX · Mars Rover",
    context: "VIT / Creation Labs · European Rover Challenge, Poland",
    text:
      "Our team built a Martian rover analogue with a robotic arm to complete tasks at a designated site at the European Rover Challenge 2016 in Poland. As Lead of the Electrical Department, I was in charge of all electrical interconnections, image processing, and programming the sensors and motor drivers on an Arduino, Raspberry Pi, and BeagleBone Black stack, and I guided a team of 5 juniors. I devised an onboard algorithm that detects landmarks to estimate the rover's location, and worked on the arm's inverse kinematics. The team ranked 12th in the world and 1st in Asia.",
    tags: ["Field robotics", "Embedded", "Computer vision", "Kinematics", "Teleoperation"],
    // award: "12th World · 1st in Asia",
    media: [
      "assets/img/rover2.jpeg",
      "assets/img/rover1.jpeg",
      "assets/img/rover3.jpeg",
    ],
  },
  {
    year: "2017",
    title: "MedBuddy · Medical Assistant Robot",
    context: "VIT · Bachelor's thesis",
    text:
      "Many patients must carry medical equipment everywhere, which hinders daily life and slows recovery. For my bachelor's thesis I designed and built MedBuddy, a robot that carries that weight for them. It follows the patient autonomously using a unique color-coded marker, avoids obstacles, supports balance by monitoring their orientation and acting on a 'fall index', and doubles as an IoT medicine-reminder system. The work was published at IEEE RTEICT 2017.",
    tags: ["Healthcare robotics", "Embedded", "Computer vision", "IoT", "Research"],
    media: ["assets/img/medbuddy1.jpeg", "assets/img/medbuddy2.jpeg"],
    links: [{ label: "IEEE Paper", url: "https://ieeexplore.ieee.org/document/8256723" }],
  },
  { marker: true, year: "2017 – 2019", title: "GreyOrange · R&D Embedded Engineer" },
  {
    year: "2017 – 2019",
    title: "Butler Warehouse AMR",
    context: "GreyOrange · R&D Embedded Engineer, Safety System team",
    text:
      "I wrote real-time firmware for GreyOrange's warehouse autonomous mobile robots, focused on safety, power, and diagnostics. That included a robust obstacle-detection safety field with a varying field of view (also used to aid localization and navigation), emergency handling, continuous health monitoring of subsystems over Ethernet, UART, SPI, I2C and CAN, and a power system with active cell balancing that increased operational uptime by over 50%. I received the company's Rising Star Award.",
    tags: ["Embedded", "RTOS", "Safety", "Power systems", "Warehouse automation"],
    // award: "Rising Star Award",
    media: ["assets/img/gor1.jpeg", "assets/img/gor2.jpeg"],
  },
  { marker: true, year: "2019 – 2021", title: "Carnegie Mellon University · M.S. Robotic Systems Development" },
  {
    year: "2020",
    title: "SALSA · Semantic Assisted Lifelong SLAM",
    // context: "CMU 16-833 Robot Localization & Mapping · With Ayush Jhalani and Heethesh Vhavle",
    // TODO: add which parts of the pipeline you built
    text:
      "A learning-augmented SLAM system for changing indoor environments. Mask R-CNN scores each object by how likely it is to be dynamic or repeatable, and those scores drive the ORB-SLAM2 front end, the optimization cost, and the loop-closure vocabulary. High-confidence structural anchors let the robot localize with fewer observations. On the TUM-RGBD walking_static sequence, trajectory error fell from 0.403 m (ORB-SLAM2) to 0.0059 m.",
    tags: ["SLAM", "Semantic perception", "Deep learning", "Lifelong mapping"],
    media: [
      "assets/img/salsa-tracking.png",
      "assets/img/salsa-results.png",
      "assets/img/salsa-scoremaps.jpg",
    ],
    links: [
      { label: "Report (PDF)", url: "https://github.com/heethesh/SALSA-Semantic-Assisted-SLAM/blob/master/docs/report.pdf" },
      { label: "Code on GitHub", url: "https://github.com/heethesh/SALSA-Semantic-Assisted-SLAM" },
      { label: "TUM-RGBD video", url: "https://youtu.be/0TvNcxreGtI" },
      { label: "OpenLORIS video", url: "https://youtu.be/9ku1nIotTUw" },
    ],
  },
  {
    year: "2020",
    title: "ALIGN · Autonomous Payload Handling Vehicle",
    context: "CMU MRSD capstone · with PIX Moving",
    // TODO (optional): add the outcome, e.g. the final demo result
    text:
      "For our capstone, I developed the localization, navigation, precision-docking, and safety behaviors of an autonomous vehicle that works with modular payload pods in geo-fenced environments. The vehicle localizes itself, navigates to a pod, docks with it precisely, and picks it up or drops it off, coordinated by a state machine with an operator UI.",
    tags: ["Autonomous driving", "LiDAR", "Localization", "Navigation", "Safety"],
    media: ["assets/img/align1.png", "assets/img/align2.png", "assets/img/align3.png", "assets/img/align4.jpeg"],
    links: [{ label: "CMU MRSD project page", url: "https://mrsdprojects.ri.cmu.edu/2020teamj/" }],
  },
  {
    year: "2021",
    title: "Handling Mirrors in Indoor LiDAR Mapping",
    context: "CMU",
    // TODO: year, team, and your part
    text:
      "Mirrors look like open doorways to a robot, so it maps a phantom room and may plan a path 'through' the mirror. We detect candidate mirrors, then confirm them from a better vantage point by attaching a fiducial marker to the sensor rig and using its self-reflection to estimate the mirror plane. A novel coarse-to-fine region-growing method finds the mirror's boundary and extent so it can be tracked, and the point cloud is corrected by filling the mirror plane and re-projecting the reflected points. We demonstrated it on a custom camera-LiDAR rig, and the pipeline works with most visual and depth sensors.",
    tags: ["LiDAR", "Mapping", "Computer vision", "Sensor fusion"],
    media: ["assets/img/mirror1.png", "assets/img/mirror2.png"],
    links: [
      { label: "Paper (PDF)", url: "https://github.com/SachitM/Mirror-Mirror-on-the-Wall-Detecting-Mirrors-and-Correcting-Point-Clouds/blob/main/Mirror%20Project%20Paper.pdf" },
      { label: "Code on GitHub", url: "https://github.com/SachitM/Mirror-Mirror-on-the-Wall-Detecting-Mirrors-and-Correcting-Point-Clouds" },
    ],
  },
  {
    year: "2021",
    title: "Structure-Aware Object SLAM",
    context: "CMU",
    // TODO: year, team, and your part
    text:
      "A new object representation for the SLAM front end. Each frame's objects and planes are detected, and every object is described by its pose relative to the planes. This lets the system tell when an object has moved and drop it from odometry, and flag repeated, symmetric, or poorly estimated objects. With those filtered out, even a single object can be enough for scene recognition and loop closure.",
    tags: ["SLAM", "Object SLAM", "Dynamic environments", "Perception"],
    media: ["assets/img/objectslam.png"],
    links: [
      { label: "Paper (PDF)", url: "https://github.com/SachitM/Structure-Aware-Object-Representation-for-Object-SLAM/blob/main/Structure_Aware_Object%20SLAM.pdf" },
      { label: "Code on GitHub", url: "https://github.com/SachitM/Structure-Aware-Object-Representation-for-Object-SLAM" },
    ],
  },
  { marker: true, year: "2021 – Present", title: "Amazon · Software Development Engineer (I → II → III)" },
  {
    year: "2021 – 2025",
    title: "Astro Home Robot",
    context: "Amazon · Consumer Robotics (CoRo) · Software Development Engineer I/II",
    text:
      "Part of the team that developed and shipped the SLAM module for Amazon's consumer home robot, deployed to thousands of customers. I designed a robust pose graph optimization system that rejects outliers to correct odometry drift, and built benchmarking tools and a long-term autonomy simulation framework to validate behavior over extended time.",
    tags: ["SLAM", "Pose graph optimization", "Consumer robotics", "Simulation", "Evaluation"],
    media: ["assets/img/astro.jpeg"],
    links: [{ label: "The Science Behind Amazon Astro (video)", url: "https://www.youtube.com/watch?v=YiHE5y1L2Bk" }],
  },
  {
    year: "Present",
    title: "Gaussian Splatting Digital Twins of Real Homes",
    context: "Amazon · Fauna Robotics · Software Development Engineer III",
    // TODO: confirm with Amazon what can be public; add media only after checking for people and private details
    text:
      "I built a pipeline that turns multi-camera scans of real homes into 3D Gaussian Splatting digital twins, used as ground truth for training and evaluating robot perception. The splat acts as a renderer, giving novel views with known poses and dense depth, and as a semantic store, with labels voted across views onto each Gaussian so they can be rendered from any pose. All ground truth with Metric scale, and new videos in the scene are registered into the same frame with visual place recognition and 3D vision foundation model.",
    tags: ["3D Gaussian Splatting", "COLMAP", "Visual place recognition", "Depth", "Ground truth", "Semantic mapping"],
    // Figure from the published Continuous Semantic Splatting paper (ICRA 2025): rendered image and semantic labels
    media: ["assets/img/semantic-splat.png"],
  },
  {
    year: "Present",
    title: "General-Purpose Humanoid Robots",
    context: "Amazon · Fauna Robotics · Software Development Engineer II/III",
    // TODO: confirm what can be said publicly before adding product names or details
    text:
      "I work on spatial perception and embodied AI for general-purpose humanoid robots, developing scene representations that give them 3D spatial, temporal, and semantic understanding of homes for long-term autonomy. Helped design the spatio-temporal scene graph architecture and schema that span live sensing, task memory, and long-term memory. Developed a hybrid geometric and learned room segmentation and labeling for the scene graph, and I also drive the data and ground-truth strategy for evaluating it.",
    tags: ["Spatial AI", "Scene graphs", "3D reconstruction", "Embodied AI"],
    media: ["assets/img/fauna.jpeg"],
  },
];

const REVIEWER_FOR = "IEEE RA-L, IROS, ICRA, Humanoids, AAAI, CoRL";

// Add `url` to a paper to link its title (e.g. arXiv or the CVF/IEEE page).
const PUBLICATIONS = [
  {
    title: "POp-GS: Next Best View in 3D-Gaussian Splatting with P-Optimality",
    venue: "CVPR 2025",
    authors:
      "Joey Wilson, Marcelino Almeida, Sachit Mahajan, Martin Labrie, Maani Ghaffari, Omid Alizadeh, Min Sun, Cheng-Hao Kuo, Arnie Sen",
    url: "https://arxiv.org/pdf/2503.07819",
  },
  {
    title: "Modeling Uncertainty in 3D Gaussian Splatting through Continuous Semantic Splatting",
    venue: "ICRA 2025",
    authors:
      "Joey Wilson, Marcelino Almeida, Min Sun, Sachit Mahajan, Maani Ghaffari, Parker Ewen, Omid Alizadeh, Cheng-Hao Kuo, Arnie Sen",
    url: "https://arxiv.org/pdf/2411.02547",
  },
  {
    title: "Design of a Medical Assistant Robot",
    venue: "IEEE RTEICT 2017",
    authors: "Sachit Mahajan, C. M. Vidhyapathi",
    url: "https://ieeexplore.ieee.org/document/8256723",
  },
];
