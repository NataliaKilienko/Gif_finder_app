# 🎬 GIF Finder App

A modern web application for searching and discovering GIFs using the Giphy API. Built with Angular 21 and featuring a clean, purple-themed UI.

![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=flat&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass)

## ✨ Features

- 🔍 **Search GIFs** - Search millions of GIFs by keyword
- 🔥 **Trending GIFs** - Browse trending GIFs on the home page
- 📋 **Detailed View** - View GIF details including author, date, size, and rating
- 📎 **Copy Link** - Copy GIF URL to clipboard with one click
- ⬇️ **Download** - Download GIFs directly to your device
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Beautiful UI** - Clean purple-themed interface with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd gif-finder-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open your browser**
Navigate to `http://localhost:4200/`

The app is ready to use! No additional configuration needed - it includes a working Giphy API key.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/                    # Core business logic
│   │   ├── constants/           # Configuration constants
│   │   ├── models/              # TypeScript interfaces
│   │   └── services/            # API services
│   ├── features/                # Feature modules
│   │   ├── search/              # Search & trending GIFs
│   │   └── gif-details/         # GIF details page
│   ├── shared/                  # Shared resources
│   │   ├── components/          # Reusable UI components
│   │   └── utils/               # Utility functions
│   └── app.*                    # Root component & routing
├── environments/                # Environment configuration
│   └── environment.ts           # API keys & URLs
└── styles/                      # Global styles
    ├── _variables.scss          # SCSS variables
    └── _mixins.scss             # SCSS mixins
```

## 🛠️ Tech Stack

### Core
- **Angular 21** - Latest Angular with standalone components
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming
- **Angular Router** - Client-side routing

### Styling
- **SCSS** - Advanced CSS with variables and mixins
- **Angular Material Icons** - Icon library
- **Custom Purple Theme** - Consistent design system

### API
- **Giphy API** - GIF search and retrieval
- **HttpClient** - HTTP requests with fetch API

## ⚡ Performance Optimizations

This project implements several Angular best practices for optimal performance:

- ✅ **OnPush Change Detection** - Reduces change detection cycles
- ✅ **TrackBy Functions** - Optimizes list rendering
- ✅ **Signals** - Fine-grained reactivity (Angular 21)
- ✅ **Lazy Loading** - Code splitting for faster initial load
- ✅ **SCSS Variables & Mixins** - Reduces CSS duplication

## 📦 Build

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, optimized for production deployment.

## 🧪 Testing

Run unit tests:
```bash
npm test
```

Run end-to-end tests:
```bash
npm run e2e
```

## 📝 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Lint code

## 🎨 Architecture Highlights

### Feature-Based Structure
The app follows a feature-based architecture with clear separation of concerns:
- **Core** - Shared business logic and services
- **Features** - Self-contained feature modules
- **Shared** - Reusable components and utilities

### Clean Code Principles
- **DRY** - No code duplication, shared utilities
- **SOLID** - Single responsibility, dependency injection
- **Type Safety** - Full TypeScript coverage
- **Reactive** - Signals and observables for state management

### Modern Angular Patterns
- Standalone components (no NgModules)
- Signal-based state management
- Input/Output signals for component communication
- OnPush change detection strategy

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Giphy API](https://developers.giphy.com/) - GIF data provider
- [Angular](https://angular.dev/) - Framework
- [Angular Material](https://material.angular.io/) - Icons

---
