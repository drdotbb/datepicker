# 💕 DatePicker - Beautiful Date Booking App

A modern, beautiful date picker app that syncs with Google Calendar and allows users to book dates with you. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- 📅 **Real-time Calendar Sync** - Integrates with Google Calendar API
- 🎨 **Beautiful UI/UX** - Modern, responsive design with smooth animations
- 💡 **Smart Date Suggestions** - Pre-curated date ideas for different occasions
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⚡ **Fast & Lightweight** - Optimized for performance
- 🔒 **Secure Booking** - Form validation and error handling

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd datepicker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your Google Calendar API credentials in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Google Calendar Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Calendar API
4. Create a service account and download the JSON key
5. Add the service account email to your Google Calendar with "Make changes to events" permission
6. Copy the credentials to your `.env.local` file

## 📦 Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy!

## 🎨 Customization

- **Colors**: Modify the gradient colors in `tailwind.config.js`
- **Date Suggestions**: Edit the suggestions in `src/components/DateSuggestions.tsx`
- **Calendar Logic**: Customize availability logic in `src/lib/google-calendar.ts`

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Calendar**: Google Calendar API
- **Deployment**: Vercel

## 📄 License

MIT License - feel free to use this project for your own date booking needs!

---

Made with 💕 for creating beautiful memories