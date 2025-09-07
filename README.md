# Kunal's Portfolio Website

A modern, interactive portfolio website built with React, TypeScript, and Vite. This project showcases my skills as a full-stack developer and AI engineer through an engaging user experience with animations, interactive elements, and a playable game.

## 🚀 Live Demo

[View Live Portfolio](https://your-portfolio-url.com) *(Update with your actual deployment URL)*

## ✨ Features

### 🎨 **Modern Design & Animations**
- **Typewriter Effect**: Dynamic text animation on the hero section
- **3D Card Flips**: Interactive project cards with hover animations
- **Smooth Transitions**: CSS animations and transitions throughout
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Modern dark color scheme with accent colors

### 🎮 **Interactive Elements**
- **Flappy Bug Game**: Fully functional HTML5 Canvas game with:
  - Dynamic difficulty scaling
  - Score tracking
  - Collision detection
  - Keyboard and mouse controls
  - Animated background grid
- **Skill Cards**: Hover-to-flip cards showcasing technical skills
- **Interactive Timeline**: Clickable timeline in the About section

### 📱 **Pages & Navigation**
- **Home**: Hero section with typewriter effect and game
- **Projects**: Interactive project showcase with 3D card flips
- **About**: Personal story, timeline, and social links
- **Contact**: Contact form and information
- **404**: Custom not found page

### 🛠 **Technical Stack**

#### **Frontend**
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **Lucide React** for icons

#### **3D & Graphics**
- **Three.js** for 3D graphics
- **@react-three/fiber** for React integration
- **@react-three/drei** for 3D utilities
- **HTML5 Canvas** for the game

#### **State Management & Data**
- **TanStack Query** for server state management
- **React Hook Form** for form handling
- **Zod** for validation

#### **Development Tools**
- **ESLint** for code linting
- **TypeScript** for type safety
- **PostCSS** for CSS processing
- **Autoprefixer** for CSS compatibility

## 🎯 **Projects Showcased**

1. **MediBud AI** - AI-powered healthcare platform with ML algorithms
2. **Zentigrity** - Comprehensive wellness and mindfulness application
3. **DermaScope** - Computer vision dermatology analysis tool
4. **Synapse** - AI-powered retail supply chain management platform
5. **Work In Progress** - IoT home automation platform
6. **Work In Progress** - Interactive data visualization dashboard

## 🎮 **The Flappy Bug Game**

A custom-built HTML5 Canvas game featuring:
- **Physics Engine**: Realistic gravity and jump mechanics
- **Progressive Difficulty**: Speed and gap adjustments based on score
- **Visual Effects**: Glowing pipes, animated background grid
- **Responsive Controls**: Both keyboard (SPACE) and mouse support
- **Score System**: Real-time scoring with difficulty indicators

## 🎨 **Design System**

### **Color Palette**
- **Primary**: Dark backgrounds with accent colors
- **Accent**: Bright green (#00FFAA) for highlights
- **Secondary Accent**: Complementary colors for variety
- **Text**: Multiple text levels for hierarchy

### **Typography**
- **Primary Font**: Space Mono (monospace)
- **Secondary**: Inter (sans-serif)
- **Display**: Orbitron (futuristic)

### **Components**
- Custom button styles with hover effects
- Card components with 3D transforms
- Animated backgrounds and overlays
- Responsive grid layouts

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### **Build for Production**

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 📁 **Project Structure**

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── HeroSection.tsx  # Main hero with typewriter effect
│   ├── SkillsSection.tsx # Skills showcase
│   ├── ProjectGrid.tsx  # Projects display
│   ├── FlappyBugGameFixed.tsx # Interactive game
│   └── ...
├── pages/               # Page components
│   ├── Index.tsx        # Home page
│   ├── Projects.tsx     # Projects page
│   ├── About.tsx        # About page
│   └── Contact.tsx      # Contact page
├── assets/              # Static assets
│   ├── icons/           # Technology icons
│   ├── projects/        # Project images
│   └── ...
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── main.tsx            # App entry point
```

## 🎨 **Customization**

### **Colors**
Update the color scheme in `src/index.css`:
```css
:root {
  --accent: 160 100% 50%;        /* Bright green */
  --accent-secondary: 200 100% 50%; /* Blue accent */
  --background: 0 0% 4%;         /* Dark background */
  /* ... more colors */
}
```

### **Content**
- **Projects**: Update `src/components/ProjectGrid.tsx`
- **Skills**: Modify `src/components/SkillsSection.tsx`
- **About**: Edit `src/pages/About.tsx`
- **Hero**: Customize `src/components/HeroSection.tsx`

### **Styling**
- **Tailwind Config**: `tailwind.config.ts`
- **Global Styles**: `src/index.css`
- **Component Styles**: Individual component files

## 🚀 **Deployment**

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push

### **Netlify**
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### **Other Platforms**
The project builds to static files and can be deployed to any static hosting service.

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 **About the Developer**

**Kunal Pratap Singh**
- Full-stack Developer & AI Engineer
- Specializing in React, Node.js, Python, and Machine Learning
- Based in Greater Noida, UP, India
- Open to collaboration and new opportunities

### **Connect With Me**
- [GitHub](https://github.com/kunal2504java)
- [LinkedIn](https://www.linkedin.com/in/kunal-pratap-singh-a37461249/)
- [Portfolio](https://your-portfolio-url.com)

## 🙏 **Acknowledgments**

- **shadcn/ui** for the beautiful component library
- **Radix UI** for accessible primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Three.js** for 3D graphics capabilities
- **Vite** for the lightning-fast build tool

---

**Built with ❤️ by Kunal Pratap Singh**

*"Code is poetry written in logic"*