const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Database seeder configuration file for SkillCraft platform.

// Import models for seeding
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
    
    // Always ensure Admin user exists in DB
    let admin = await User.findOne({ email: 'admin@skillcraft.com' });
    if (!admin) {
      await User.create({
        name: 'Administrator',
        email: 'admin@skillcraft.com',
        password: 'admin123',
        role: 'admin',
        profileImage: 'default.jpg'
      });
      console.log('🛡️ Default Admin user recreated/ensured in database.');
    }

    // Only seed database if there are no courses in the DB to prevent losing user data on nodemon restart
    const courseCount = await Course.countDocuments({});
    if (courseCount === 0) {
      console.log('🌱 Database is empty. Seeding initial data...');
      await seedDatabase();
    } else {
      console.log('💾 Database already has seeded data. Skipping seeder to preserve updates...');
    }
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Helper function to find or create an instructor (fixed to pass plain-text password for Mongoose pre-save hook)
const getOrCreateInstructor = async (name, email) => {
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      name,
      email,
      password: 'password123',
      role: 'instructor',
      profileImage: 'default.jpg'
    });
  }
  return user;
};

// Helper to find or create a category
const getOrCreateCategory = async (name, description) => {
  let cat = await Category.findOne({ name });
  if (!cat) {
    cat = await Category.create({ name, description });
  }
  return cat;
};

const seedDatabase = async () => {
  try {
    // Clear old seeded users (instructors & admins) so they recreate with single-hashed passwords
    await User.deleteMany({ role: { $in: ['instructor', 'admin'] } });
    console.log('🧹 Cleared old instructors and admin users to fix double-hashing...');

    // 1. Seed Instructors with Indian names
    const inst1 = await getOrCreateInstructor('Ankit Prasad', 'ankit@skillcraft.com');
    const inst2 = await getOrCreateInstructor('Feyaz Kumar', 'feyaz@skillcraft.com');
    const inst3 = await getOrCreateInstructor('Himanshu Kumar', 'himanshu@skillcraft.com');
    const inst4 = await getOrCreateInstructor('Deepak Shroti', 'deepak@skillcraft.com');

    console.log('✅ Instructors successfully seeded.');

    // Seed default Admin user (fixed to pass plain-text password)
    let admin = await User.findOne({ email: 'admin@skillcraft.com' });
    if (!admin) {
      await User.create({
        name: 'Administrator',
        email: 'admin@skillcraft.com',
        password: 'admin123',
        role: 'admin',
        profileImage: 'default.jpg'
      });
      console.log('🛡️ Admin user successfully seeded.');
    }

    // 2. Clear old categories, courses, modules, lessons, enrollments, and progress for clean re-seeding
    const Enrollment = require('../models/Enrollment');
    const Progress = require('../models/Progress');
    
    await Category.deleteMany({});
    await Course.deleteMany({});
    await Module.deleteMany({});
    await Lesson.deleteMany({});
    await Enrollment.deleteMany({});
    await Progress.deleteMany({});
    console.log('🗑️ Cleared old courses, categories, enrollments, and progress for clean re-seeding...');

    // 3. Seed exactly 5 Logical Categories to group the 21 courses cleanly
    const catDev = await getOrCreateCategory('Web & App Development', 'Master programming, frontend, backend and mobile application bootcamps.');
    const catData = await getOrCreateCategory('Data Science & AI', 'Databases, statistics, data analytics and machine learning neural networks.');
    const catCloud = await getOrCreateCategory('Cloud & DevOps', 'Deploy applications on AWS/GCP, admin Linux systems and networking.');
    const catCreative = await getOrCreateCategory('Design & Creative Media', 'Master UI/UX layouts in Figma, video editing and CAD designs.');
    const catBusiness = await getOrCreateCategory('Business & IT Security', 'Enterprise ERP SAP databases, SEO marketing and ethical hacking.');

    console.log('✅ 5 Main Categories successfully seeded.');

    // 4. Mapped 21 courses to the 5 broad categories
    const coursesData = [
      {
        title: 'Communication Skills for Banking Professionals',
        description: 'Master professional communication, customer relationship management, banking vocabulary, presentation techniques, and active listening skills in modern financial services.',
        price: 1999,
        category: catBusiness._id,
        instructor: inst1._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Corporate Banking Pitching', 'Module 2: Client Handling & Conflict Resolution', 'Module 3: Non-Verbal Professional Communication']
      },
      {
        title: 'Mastering Programming Languages (Python, C++, Java)',
        description: 'Go from scratch to building software in Python, C++, and Java. Master variables, memory models, object-oriented concepts, and concurrency.',
        price: 2499,
        category: catDev._id,
        instructor: inst1._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Python Core Foundations', 'Module 2: C++ OOP & Pointers', 'Module 3: Java Enterprise Edition']
      },
      {
        title: 'Full-Stack Web Development Bootcamp',
        description: 'Design dynamic web architectures. Learn HTML5, CSS3, modern JavaScript, React dashboards, Node.js, Express REST APIs, and database pipelines.',
        price: 2999,
        category: catDev._id,
        instructor: inst1._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Semantic HTML5 & CSS Layouts', 'Module 2: React.js SPA Engineering', 'Module 3: Express Backend & DB Connect']
      },
      {
        title: 'Mobile App Development (Flutter & React Native)',
        description: 'Build native iOS and Android apps from a single codebase. Learn widgets, layout architectures, state management patterns, and app store deployment.',
        price: 3999,
        category: catDev._id,
        instructor: inst2._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Dart & Flutter Layouts', 'Module 2: React Native Architectures', 'Module 3: Store Builds & Publishing']
      },
      {
        title: 'Databases Engineering: SQL, PostgreSQL & MongoDB',
        description: 'Design robust database structures. Write high-performance SQL queries, index structures, handle database transactions, and model NoSQL document structures.',
        price: 2799,
        category: catData._id,
        instructor: inst3._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: SQL Schemas & SELECT Queries', 'Module 2: Advanced Joins & Indexes', 'Module 3: MongoDB Document Modeling']
      },
      {
        title: 'Data Analytics Bootcamp with Excel & Tableau',
        description: 'Convert raw information into insightful business indicators. Learn advanced formulas, pivot tables, DAX modeling, SQL filters, and data story visualizations.',
        price: 3499,
        category: catData._id,
        instructor: inst3._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Excel Formulas & Pivot Tables', 'Module 2: SQL Aggregations for Analysts', 'Module 3: Interactive Dashboards in Tableau']
      },
      {
        title: 'Complete Data Science Program',
        description: 'Explore statistical modeling, machine learning algorithms, Pandas wrangling, array manipulation, and neural networks using Python.',
        price: 4999,
        category: catData._id,
        instructor: inst2._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Numerical Calculations with NumPy', 'Module 2: Data Cleaning with Pandas', 'Module 3: Statistical Modeling & Plotting']
      },
      {
        title: 'Artificial Intelligence & Machine Learning Bootcamp',
        description: 'Train regression models, decision trees, random forests, and configure deep learning neural network layers using TensorFlow and PyTorch.',
        price: 5999,
        category: catData._id,
        instructor: inst4._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Supervised Model Formations', 'Module 2: Deep Learning Neural Networks', 'Module 3: NLP & Generative AI Tools']
      },
      {
        title: 'Cloud Computing Solutions (AWS, Azure & GCP)',
        description: 'Architect secure, highly available cloud infrastructures. Configure virtual compute nodes, load balancers, serverless microservices, and storage layers.',
        price: 4499,
        category: catCloud._id,
        instructor: inst4._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Amazon Web Services (AWS)', 'Module 2: Microsoft Azure Deployments', 'Module 3: Google Cloud (GCP) Operations']
      },
      {
        title: 'DevOps Lifecycle & CI/CD Pipelines',
        description: 'Automate software delivery pipelines. Learn Docker containerization, Kubernetes cluster orchestration, Git Gitops actions, and configuration management.',
        price: 3299,
        category: catCloud._id,
        instructor: inst1._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Containerization with Docker', 'Module 2: Orchestration via Kubernetes', 'Module 3: Automated Jenkins & CI Pipelines']
      },
      {
        title: 'Cybersecurity & Ethical Hacking Bootcamp',
        description: 'Understand system security. Perform vulnerability assessments, penetration testing, network monitoring, firewall policies, and secure encryption methods.',
        price: 3799,
        category: catBusiness._id,
        instructor: inst2._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Network Auditing & Linux OS', 'Module 2: Hacking Methodologies', 'Module 3: Firewalls & Secure Cryptography']
      },
      {
        title: 'Computer Networking Essentials',
        description: 'Learn the core architecture of networks. Master TCP/IP routing tables, subnet configuration protocols, firewalls, switches, and load balancing.',
        price: 2199,
        category: catCloud._id,
        instructor: inst3._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: OSI Architecture & TCP/IP Model', 'Module 2: Subnet Design & Routing Protocols', 'Module 3: DNS Services & Firewall Auditing']
      },
      {
        title: 'Operating Systems & Linux Administration',
        description: 'Understand low level operating system design. Master bash scripting, system service policies, file system trees, and process scheduling behaviors.',
        price: 2499,
        category: catCloud._id,
        instructor: inst4._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Kernel Architecture Basics', 'Module 2: Bash Shell Scripting Core', 'Module 3: Sysadmin Services & User Security']
      },
      {
        title: 'Software Testing & Quality Assurance (Manual + Automation)',
        description: 'Deploy bug-free systems. Learn manual bug tracking, write test cases, automate browser tests using Selenium and Cypress, and run regression flows.',
        price: 2599,
        category: catDev._id,
        instructor: inst1._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Testing Fundamentals & Manual QA', 'Module 2: Automated Tests with Selenium', 'Module 3: Integration Checks & API Assertions']
      },
      {
        title: 'UI/UX Design Masterclass with Figma',
        description: 'Design modern web interfaces. Understand wireframing, layout spacing rules, typography combinations, components design, and dynamic vector prototyping.',
        price: 2899,
        category: catCreative._id,
        instructor: inst2._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Spacing, Grid & Typo Basics', 'Module 2: Interactive Wireframing', 'Module 3: Component States & Prototyping']
      },
      {
        title: 'Version Control with Git & GitHub',
        description: 'Collaborate like a professional. Master commit logs, branching flows, merge conflict resolutions, git rebase, pull requests, and dev actions.',
        price: 1499,
        category: catDev._id,
        instructor: inst3._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Basic Commit Workflow', 'Module 2: Branching, Merging & Conflicts', 'Module 3: Pull Requests & Git Actions']
      },
      {
        title: 'Enterprise ERP Systems & SAP Administration',
        description: 'Manage enterprise business data pipelines. Learn SAP ERP transaction models, supply chain integrations, financial accounting records, and reports.',
        price: 4999,
        category: catBusiness._id,
        instructor: inst4._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: ERP Structures & SAP Interface', 'Module 2: Database Operations & Ledgers', 'Module 3: Supply Chain & Analytics Audits']
      },
      {
        title: 'Digital Marketing Strategy & SEO Mastery',
        description: 'Accelerate web traffic growth. Build search engine optimization plans, track Google Analytics indicators, write PPC campaigns, and generate leads.',
        price: 2299,
        category: catBusiness._id,
        instructor: inst1._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=800&q=80',
        moduleTitles: ['Module 1: SEO Rules & Keyword Audits', 'Module 2: PPC Ads & Copywriting Essentials', 'Module 3: Web Analytics & CTR Optimization']
      },
      {
        title: 'Graphic Design Principles & Adobe Illustrator',
        description: 'Master vector designs. Create marketing templates, design vector icons, combine color theories, and build print designs using Illustrator.',
        price: 2699,
        category: catCreative._id,
        instructor: inst2._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
        moduleTitles: ['Module 1: Typography Rules & Composition', 'Module 2: Vector Art in Adobe Illustrator', 'Module 3: Print Visuals & Packaging Layouts']
      },
      {
        title: 'Creative Video Editing with Premiere Pro',
        description: 'Edit cinematic videos. Combine sound layouts, create custom transition effects, configure audio frequencies, and render high quality productions.',
        price: 3199,
        category: catCreative._id,
        instructor: inst3._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Timeline Setup & Trimming Cut', 'Module 2: Audio Tweaks & Custom Transitions', 'Module 3: Color Grading & Production Renders']
      },
      {
        title: 'CAD & Engineering Design with AutoCAD',
        description: 'Draft structural layouts. Render 2D blueprints, model 3D components, configure layers, add dimensions, and design architecture diagrams.',
        price: 3899,
        category: catCreative._id,
        instructor: inst4._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Geometric Constraints & Tooling', 'Module 2: Layer Organization & Blueprinting', 'Module 3: 3D Object Rendering & Material Specs']
      },
      {
        title: 'Project Management Tools: Jira, Agile & Trello',
        description: 'Organize agile workflows. Set up Jira boards, plan sprint milestones, write user stories, track task completions, and evaluate project velocity.',
        price: 2399,
        category: catBusiness._id,
        instructor: inst1._id,
        thumbnailUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop',
        moduleTitles: ['Module 1: Agile Processes & Sprint Scopes', 'Module 2: Task Boards & Jira Configurations', 'Module 3: Sprint Velocity Reports & Milestones']
      }
    ];

    // Seed courses programmatically
    for (let cData of coursesData) {
      const course = await Course.create({
        title: cData.title,
        description: cData.description,
        price: cData.price,
        category: cData.category,
        instructor: cData.instructor,
        thumbnailUrl: cData.thumbnailUrl,
        isPublished: true
      });

      // Create 3 modules for this course
      for (let mIdx = 0; mIdx < cData.moduleTitles.length; mIdx++) {
        const mod = await Module.create({
          title: cData.moduleTitles[mIdx],
          course: course._id,
          order: mIdx + 1
        });

        // Seed 5 lessons inside this module (Total 15 lessons per course)
        const baseOrder = mIdx * 5 + 1;
        const lessonsData = [
          { title: `Lesson ${baseOrder}: Core Concepts & Introduction`, duration: 650, isFree: mIdx === 0 },
          { title: `Lesson ${baseOrder + 1}: Syntax, Mechanics & Setup`, duration: 820, isFree: false },
          { title: `Lesson ${baseOrder + 2}: Handling Objects, APIs & Files`, duration: 990, isFree: false },
          { title: `Lesson ${baseOrder + 3}: Practical Implementation Case Study`, duration: 1120, isFree: false },
          { title: `Lesson ${baseOrder + 4}: Summary review & Optimization checks`, duration: 750, isFree: false }
        ];

        for (let lIdx = 0; lIdx < lessonsData.length; lIdx++) {
          await Lesson.create({
             title: lessonsData[lIdx].title,
             module: mod._id,
             videoUrl: 'https://res.cloudinary.com/demo/video/upload/v1614777592/sample.mp4',
             durationInSeconds: lessonsData[lIdx].duration,
             order: baseOrder + lIdx,
             isFreePreview: lessonsData[lIdx].isFree
          });
        }
      }
    }

    console.log('✅ 21 Courses mapped to 5 main categories successfully seeded.');
  } catch (err) {
    console.error('❌ Seeding Error:', err.message);
  }
};

module.exports = connectDB;
