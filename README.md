# Abhishek G L — Interactive 3D WebGL Portfolio & Sandbox

> **A high-performance personal portfolio featuring a 3D WebGL Boid Swarm, cursor repulsion physics, interactive 3D model viewport, and flagship AI engineering showcases.**

[![Live Demo](https://img.shields.io/badge/demo-live%20site-brightgreen.svg)](https://abhishekgl08.github.io/interactive-3d-portfolio/)
[![Three.js](https://img.shields.io/badge/graphics-Three.js%20r128-black.svg)](https://threejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## ✨ Features

- **Micro-Boid Swarm Simulation (WebGL)**: Real-time particle lattice that fluidly parts and accelerates around the user's cursor using vector repulsion and flocking alignment forces.
- **Custom Dual-Ring Cursor Halo**: Smooth lerped cursor follower with magnetic element snap.
- **Interactive 3D Model Sandbox**: Three.js viewport with OrbitControls, directional studio lighting, and smooth auto-rotation.
- **Dynamic Telemetry & Audio AI Showcase**: Interactive UI cards highlighting real-world production engineering in Agentic GraphRAG, MCP Server protocols, and Whisper/LLM audio evaluation.
- **Zero-Dependency Static Runtime**: Built entirely with clean vanilla JavaScript, WebGL (Three.js), and CSS3 hardware-accelerated transforms. Zero build-step or bundler required.

---

## 🚀 Quick Start / Local Preview

Because this is a pure modern static WebGL web application, you can run it locally with any simple HTTP server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (npx)
npx serve .
```

Open your browser to:
```text
http://localhost:8000
```

---

## 🌐 Deploy to GitHub Pages (1-Click)

To make this portfolio live for recruiters:
1. Go to this repository on GitHub: `https://github.com/Abhishekgl08/interactive-3d-portfolio`
2. Click **Settings** ➔ **Pages** (under Code and automation).
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Within 60 seconds, your portfolio will be live at:
   **`https://abhishekgl08.github.io/interactive-3d-portfolio/`**

---

## 📂 Project Structure

```text
interactive-3d-portfolio/
├── index.html          # Semantic HTML5 architecture & UI telemetry
├── styles.css          # Cyber-minimalist dark theme & responsive layouts
├── webgl-engine.js     # Three.js boid swarm, vector repulsion, and 3D viewport
├── app.js              # Interactive UI state, tabs, and sound telemetry
├── assets/             # 3D models, renders, and profile photography
└── prepare_assets.py   # Automated asset optimizer script
```

---

## 👨‍💻 Author

**Abhishek G L**  
*AI Engineer @ Cyient*  
*Specialized in Agentic GraphRAG, MCP Architectures, and Autonomous AI Pipelines.*
