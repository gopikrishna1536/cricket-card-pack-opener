# Cricket Card Pack Opener

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-1.6-FCC72B?style=for-the-badge&logo=vitest&logoColor=black)](https://vitest.dev/)

An interactive web simulation game replicating digital sports card pack openings with realistic probability odds, animated card flip reveals, rarity tiers, and local player inventory management.

---

## 🎮 Gameplay Features

- **Tiered Card Packs:**
  - **Bronze Pack ($100):** Budget pack optimized for roster building.
  - **Silver Pack ($250):** Balanced pack with boosted Rare and Epic probability.
  - **Gold Pack ($500):** Premium high-stakes pack with 20% Legend drop probability.
- **RNG Probability Distribution:**
  | Pack Tier | Common | Rare | Epic | Legend |
  |---|---|---|---|---|
  | **Bronze** | 60% | 30% | 9% | 1% |
  | **Silver** | 40% | 40% | 15% | 5% |
  | **Gold** | 20% | 30% | 30% | 20% |
- **Card Reveal UX:** Animated multi-card unpack sequence with distinct visual glows for high-rarity items.
- **Roster & Inventory:** Tracks collected players, career batting averages, bowling economy, and strike rates.
- **Automated Test Coverage:** Unit tested with Vitest ensuring mathematical odds distributions and pack composition integrity.

---

## 📂 Project Structure

```
cricket-card-pack-opener/
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI for tests and build
├── src/
│   ├── components/
│   │   ├── Inventory.tsx           # Collected player card showcase
│   │   ├── PackCard.tsx            # Pack store presentation
│   │   ├── PackOpening.tsx         # Animated flip reveal view
│   │   ├── PackSelector.tsx        # Pack selection interface
│   │   └── PlayerCard.tsx          # Card component with stats & tier styling
│   ├── data/
│   │   ├── packs.ts                # Pack configurations & pricing
│   │   └── players.ts              # Player database with stats & tiers
│   ├── utils/
│   │   ├── packGenerator.ts        # Random pack generation algorithm
│   │   ├── packLogic.ts            # Odds calculation & player selection
│   │   └── packLogic.test.ts       # Vitest unit test suite
│   ├── App.tsx                     # Main game state container
│   ├── index.css                   # Tailwind styling
│   ├── main.tsx                    # React DOM entrypoint
│   └── types.ts                    # TypeScript data definitions
├── index.html                      # HTML root
├── package.json                    # Project metadata & scripts
├── tailwind.config.js              # Tailwind design tokens
├── tsconfig.json                   # TypeScript compiler configuration
└── vite.config.ts                  # Vite build bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gopikrishna1536/cricket-card-pack-opener.git
   cd cricket-card-pack-opener
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run automated test suite:**
   ```bash
   npm test
   ```

4. **Launch development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📄 License
MIT License.
