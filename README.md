# 🔲 QR Ecosystem — Advanced Smart QR Code Platform

![QR Ecosystem Banner](https://img.shields.io/badge/QR%20Ecosystem-Smart%20QR%20Platform-indigo?style=for-the-badge&logo=qrcode)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-06B6D4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🌐 Live Demo

👉 **[https://qr-ecosystem.base44.app](https://qr-ecosystem.base44.app)**

---

## 📸 Screenshots

| Auth Page | Dashboard | Create QR |
|-----------|-----------|-----------|
| Login with Google, GitHub & Email | Stats, QR grid & quick actions | Step-by-step QR builder |

---

## ✨ Features

- 🔐 **Authentication** — Sign up / Sign in with Email & Password, Google, GitHub
- 🔲 **QR Code Generator** — Create QR codes for URL, WiFi, Email, SMS, Text
- 🎨 **Custom Design** — Choose foreground & background colors with contrast checker
- 📥 **Download PNG** — Download your QR code as a high-quality PNG image
- 📊 **Analytics** — Track total scans and QR code performance with charts
- 📋 **My QR Codes** — View, search, filter and delete your saved QR codes
- 📣 **Campaigns** — Coming soon page with email waitlist
- ⚙️ **Settings** — Update profile and change password
- 📱 **Mobile Responsive** — Works perfectly on all screen sizes
- ⚡ **Fast & Lightweight** — Built with Vite for blazing fast performance

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **React Router v6** | Client-side routing |
| **qrcode.react** | QR code generation & rendering |
| **Recharts** | Analytics charts |
| **Lucide React** | Beautiful icons |
| **React Hot Toast** | Toast notifications |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YourUsername/qr-ecosystem.git

# 2. Navigate into the project
cd qr-ecosystem

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser 🎉

---

## 📦 Build for Production

```bash
# Build the app
npm run build

# Preview the production build
npm run preview
```

---

## 🌐 Deploy to Vercel

### Option 1 — One Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YourUsername/qr-ecosystem)

### Option 2 — Manual Deploy
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your `qr-ecosystem` repository
4. Click **Deploy**

---

## 📁 Project Structure

```
qr-ecosystem/
├── public/
├── src/
│   ├── components/
│   │   └── layout/
│   │       └── Layout.jsx        # Sidebar + Navbar layout
│   ├── pages/
│   │   ├── Auth.jsx              # Login & Signup page
│   │   ├── Dashboard.jsx         # Main dashboard
│   │   ├── CreateQR.jsx          # QR code builder
│   │   ├── MyQRCodes.jsx         # All saved QR codes
│   │   ├── Analytics.jsx         # Scan analytics & charts
│   │   ├── Campaigns.jsx         # Coming soon page
│   │   └── Settings.jsx          # Profile & password settings
│   ├── App.jsx                   # Root component & routing
│   ├── main.jsx                  # App entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── vercel.json                   # Vercel SPA routing config
```

---

## 🔲 QR Code Types Supported

| Type | Description |
|------|-------------|
| 🔗 **URL** | Link to any website |
| 📶 **WiFi** | Auto-connect to WiFi network |
| 📧 **Email** | Open email compose window |
| 💬 **SMS** | Send pre-filled SMS message |
| 📝 **Text** | Display plain text |

---

## 📱 Mobile Scanning Tips

- ✅ Use **dark color on white background** for best scan results
- ✅ Keep **error correction level at H** (highest — 30%)
- ✅ Minimum QR size should be **200x200px**
- ✅ Ensure **enough quiet zone** (white border) around QR
- ⚠️ Avoid low contrast colors — app shows warning automatically

---

## 🗺️ Roadmap

- [x] QR Code generation (URL, WiFi, Email, SMS, Text)
- [x] Custom color design with contrast checker
- [x] Download as PNG
- [x] Scan count tracking
- [x] Analytics with charts
- [x] Authentication (Email, Google, GitHub)
- [ ] Real-time scan tracking with redirect URLs
- [ ] QR code with logo in center
- [ ] Dynamic QR codes (update URL without reprinting)
- [ ] Bulk QR code generation via CSV
- [ ] Campaign management
- [ ] Team collaboration
- [ ] Custom domain for short URLs
- [ ] Dark mode

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Supriya**
- GitHub: [@YourUsername](https://github.com/YourUsername)
- Live App: [qr-ecosystem.base44.app](https://qr-ecosystem.base44.app)

---

## ⭐ Show Your Support

If you like this project, please give it a **⭐ star** on GitHub — it means a lot!

[![GitHub stars](https://img.shields.io/github/stars/YourUsername/qr-ecosystem?style=social)](https://github.com/YourUsername/qr-ecosystem)

---

*Built with ❤️ using React + Vite + Tailwind CSS*
