# SC Laufenburg Website

Official website for the Schachclub (Chess Club) Laufenburg e.V., a chess community in Laufenburg, Baden, Germany.

## 🌐 Project Info

**Live URL**: https://sc-laufenburg.de/

**Repository**: https://github.com/myronsi/schachclub-laufenburg

**Maintainer**: Myron Ilchenko

**Contact**: myron.ilchenko@gmail.com

## ✨ Features

This modern, responsive website includes:

- **Home Page** - Club overview and latest news
- **About Section** - Club history, venue information, board members, and membership fees
- **Youth Program** - Information about youth chess training
- **Teams** - Overview of club teams and competitions
- **Tournaments** - Tournament information and results
- **Membership** - How to become a member, fees, and application forms
- **Archive** - Chronicle of club history and photo gallery
- **Documents** - Downloadable PDFs (club charter, history, application forms)
- **Contact** - Contact form and club information
- **Impressum & Datenschutz** - Legal information and privacy policy

## 🚀 Getting Started

Follow these steps to set up the project locally:

```sh
# Step 1: Clone the repository using the project's Git URL
git clone https://github.com/myronsi/schachclub-laufenburg.git

# Step 2: Navigate to the project directory
cd schachclub-laufenburg

# Step 3: Install the necessary dependencies
npm install --legacy-peer-deps

# Step 4: Start the development server with auto-reloading and instant preview
npm run dev

# Step 5: Build for production
npm run build

# Step 6: Preview the production build locally
npm run preview
```

## 🛠️ Technologies

This project is built with modern web technologies:

- **Vite** - Lightning-fast build tool and dev server
- **React 18** - UI library for building component-based interfaces
- **TypeScript** - Type-safe JavaScript
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library built on Radix UI
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Form validation and handling
- **Zod** - Schema validation

## 📦 Project Structure

```
schachclub-laufenburg/
├── public/              # Static assets (images, documents, photos)
│   ├── docs/           # PDF documents (charter, application forms)
│   └── photos/         # Club photos and gallery images
├── src/
│   ├── components/     # React components
│   │   ├── about/     # About section components
│   │   ├── archive/   # Archive and document components
│   │   ├── arrays/    # Data arrays (media images, etc.)
│   │   └── ui/        # shadcn/ui components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   │   ├── archive/   # Archive pages
│   │   └── tournaments/ # Tournament pages
│   └── main.tsx       # Application entry point
├── README.md
├── package.json
└── vite.config.ts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server (default port: 5173)
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🌍 Deployment

The website is deployed and accessible at https://sc-laufenburg.de/

To build for production:

```sh
npm run build
```

The production-ready files will be in the `dist/` directory.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to the SC Laufenburg website:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some your features'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and passes linting.

## 📝 License

This project is maintained by SC Laufenburg e.V.

Copyright © 2025 SC Laufenburg e.V. All rights reserved.

## 📧 Contact

For questions about the website or the chess club:

- **Website**: https://sc-laufenburg.de/
- **Email**: 1.Vorsitzender@sc-laufenburg.de
- **Developer**: myron.ilchenko@gmail.com

---

*Made with ♟️ for the SC Laufenburg chess community*
