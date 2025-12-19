# 🎬 GIF Finder App

A modern web application for searching and discovering GIFs using the Giphy API. Built with Angular 21 and featuring a clean, purple-themed UI.

![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=flat&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass)

## ✨ Features

- 🔍 **Search GIFs** - Search millions of GIFs by keyword with instant results
- 🔥 **Trending GIFs** - Browse trending GIFs on the home page
- ❤️ **Favorites** - Save your favorite GIFs with localStorage persistence
- 📋 **Detailed View** - View GIF details including author, date, size, and rating
- 📎 **Copy Link** - Copy GIF URL to clipboard with one click
- ⬇️ **Download** - Download GIFs directly to your device
- ♾️ **Infinite Scroll** - Seamlessly load more GIFs as you scroll
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Beautiful UI** - Clean purple-themed interface with smooth animations
- 🔔 **Toast Notifications** - User-friendly feedback for all actions

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
│   │   ├── models/              # TypeScript interfaces (Gif, GiphyResponse)
│   │   └── services/            # Business services
│   │       ├── giphy.service.ts      # Giphy API integration
│   │       ├── favorites.service.ts  # Favorites management
│   │       └── toast.service.ts      # Toast notifications
│   ├── features/                # Feature modules
│   │   ├── search/              # Search & trending GIFs with infinite scroll
│   │   ├── favorites/           # Favorites page
│   │   └── gif-details/         # GIF details page
│   ├── shared/                  # Shared resources
│   │   ├── base/                # Base classes
│   │   │   └── gif-actions.base.ts   # Shared GIF actions logic
│   │   ├── components/          # Reusable UI components
│   │   │   ├── loading/              # Loading spinner
│   │   │   ├── error-message/        # Error display
│   │   │   ├── empty-state/          # Empty state
│   │   │   ├── toast/                # Toast notifications
│   │   │   └── confirm-dialog/       # Confirmation dialog
│   │   └── utils/               # Utility functions
│   │       ├── gif.utils.ts          # GIF-related utilities
│   │       └── error-handler.utils.ts # Error handling
│   └── app.*                    # Root component & routing
├── environments/                # Environment configuration
│   └── environment.ts           # API keys & URLs
└── styles/                      # Global styles
    ├── _variables.scss          # SCSS variables (colors, spacing, etc.)
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
- **Angular Material** - Icons and Dialog components
- **Custom Purple Theme** - Consistent design system with gradients

### API & Storage
- **Giphy API** - GIF search and retrieval
- **HttpClient** - HTTP requests with fetch API
- **localStorage** - Client-side favorites persistence

## ⚡ Performance Optimizations

This project implements several Angular best practices for optimal performance:

- ✅ **OnPush Change Detection** - Reduces change detection cycles
- ✅ **TrackBy Functions** - Optimizes list rendering
- ✅ **Signals** - Fine-grained reactivity (Angular 21)
- ✅ **Lazy Loading** - Code splitting for faster initial load
- ✅ **Infinite Scroll** - Load more content on demand
- ✅ **Base Classes** - DRY principle, eliminates code duplication
- ✅ **SCSS Variables & Mixins** - Reduces CSS duplication
- ✅ **Memory Leak Prevention** - Proper subscription management

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
- **Core** - Shared business logic, services, models, and constants
- **Features** - Self-contained feature modules (search, favorites, gif-details)
- **Shared** - Reusable components, base classes, and utilities

### Clean Code Principles
- **DRY** - No code duplication, shared base classes and utilities
- **SOLID** - Single responsibility, dependency injection with `inject()`
- **Type Safety** - Full TypeScript coverage with strict mode
- **Reactive** - Signals and observables for state management
- **Inheritance** - Base classes for shared component logic

### Modern Angular Patterns
- Standalone components (no NgModules)
- Signal-based state management
- `inject()` function for dependency injection
- OnPush change detection strategy
- Computed signals for derived state
- @HostListener for scroll events

### State Management
- **Signals** - Reactive state with fine-grained updates
- **Services** - Centralized business logic (Giphy, Favorites, Toast)
- **localStorage** - Persistent favorites across sessions
- **RxJS** - Asynchronous data streams

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Key Components

### Pages
- **SearchComponent** - Main page with search, trending GIFs, and infinite scroll
- **FavoritesComponent** - Saved favorites with clear all functionality
- **GifDetailsComponent** - Detailed GIF information and actions

### Shared Components
- **LoadingComponent** - Reusable loading spinner
- **ErrorMessageComponent** - Error display with retry functionality
- **EmptyStateComponent** - Empty state with custom messages
- **ToastComponent** - Toast notifications for user feedback
- **ConfirmDialogComponent** - Material Dialog for confirmations

### Services
- **GiphyService** - Giphy API integration (search, trending, details)
- **FavoritesService** - Favorites management with localStorage
- **ToastService** - Toast notification system

## 🙏 Acknowledgments

- [Giphy API](https://developers.giphy.com/) - GIF data provider
- [Angular](https://angular.dev/) - Framework
- [Angular Material](https://material.angular.io/) - Icons and Dialog

---
