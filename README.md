# Next.js SaaS Template

A modern, production-ready SaaS template built with Next.js 15, featuring full-stack capabilities, real-time data synchronization, and AI integration. Perfect for rapidly prototyping and launching SaaS applications.

## ✨ Features

- **⚡ Next.js 15** - Latest App Router with React Server Components
- **🔄 Real-time Data** - Convex for real-time database and backend functions
- **🤖 AI Integration** - OpenAI API integration ready
- **🎨 Modern UI** - Tailwind CSS for responsive, beautiful designs
- **📱 Icon System** - React Icons for comprehensive icon coverage
- **🔒 Type Safety** - TypeScript throughout with Zod validation
- **🧪 Testing Ready** - Vitest setup for unit and integration testing
- **📱 Responsive Design** - Mobile-first approach with modern UX patterns

## 🛠️ Tech Stack

| Technology       | Purpose                      | Documentation                                                                    |
| ---------------- | ---------------------------- | -------------------------------------------------------------------------------- |
| **Next.js**      | Full-stack React framework   | [📖 Docs](https://nextjs.org/docs)                                               |
| **React**        | Frontend library             | [📖 Docs](https://react.dev/reference/react)                                     |
| **TypeScript**   | Type safety and better DX    | [📖 Docs](https://www.typescriptlang.org/docs/handbook/intro.html)               |
| **Convex**       | Real-time backend & database | [📖 Docs](https://docs.convex.dev/quickstart/nextjs)                             |
| **Tailwind CSS** | Utility-first CSS framework  | [🌐 Website](https://tailwindcss.com/) • [📖 Docs](https://tailwindcss.com/docs) |
| **OpenAI**       | AI/LLM integration           | [📖 Docs](https://platform.openai.com/docs/api-reference/introduction)           |
| **React Icons**  | Icon library                 | [📖 Docs](https://react-icons.github.io/react-icons/)                            |
| **Zod**          | Schema validation            | [📖 Docs](https://zod.dev/)                                                      |
| **Vitest**       | Testing framework            | [📖 Docs](https://vitest.dev/guide/)                                             |

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** package manager

### Installation

1. **Clone the template**

   ```bash
   git clone https://github.com/yourusername/nextjs-saas-template.git
   cd nextjs-saas-template
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Convex**

   ```bash
   npx convex dev
   ```

4. **Configure environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your API keys and configuration:

   ```env
   CONVEX_DEPLOYMENT=your-convex-deployment-url
   NEXT_PUBLIC_CONVEX_URL=your-convex-url
   OPENAI_API_KEY=your-openai-api-key
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── components/        # Reusable React components
│   ├── controllers/       # Business logic controllers
│   ├── repository/        # Data access layer
│   └── services/          # External service integrations
├── convex/                # Convex backend functions
└── public/                # Static assets
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests with Vitest
```

## 🌐 Deployment

This template is optimized for deployment on **Vercel**, but works with any Node.js hosting platform.

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on every push to main branch

### Environment Variables

Make sure to set these in your production environment:

- `CONVEX_DEPLOYMENT` - Your Convex deployment URL
- `NEXT_PUBLIC_CONVEX_URL` - Your public Convex URL
- `OPENAI_API_KEY` - Your OpenAI API key

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Convex](https://convex.dev) for the excellent real-time backend
- [Vercel](https://vercel.com) for seamless Next.js deployment
- [OpenAI](https://openai.com) for powerful AI capabilities
- All the amazing open-source contributors

---

**⭐ Star this repository if you find it helpful!**
