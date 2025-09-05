import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Hobby Finder - Discover Your Perfect Hobby",
  description: "Find your ideal hobby through our personality diagnosis and connect with communities of enthusiasts",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
body {
  margin: 0;
  font-family: sans-serif;
  background: #fdfbf4;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 上部 */


.logo {
  position: absolute;
  top: 20px;   /* ← さらに上に寄せる */
  left: 40px;  /* 左寄せ */
  
  font-family: 'Fredoka One', cursive;
  font-size: 2.9rem;   /* 控えめサイズ */
  font-weight: 400;
  color: #236483;
  letter-spacing: 3px;

  /* くっきりした影 */
  text-shadow:
    3px 3px 6px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.top-area {
  position: relative;
  width: 100%;
  height: 200px; /* オレンジの波全体 */
  overflow: hidden;
}


.wave-top {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
}




/* メインコンテンツ */
.content {
  flex: 1;
}

/* 下部 */
.bottom-area {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.wave-bottom {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 160px;
}

.icons {
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: white;
  font-size: 32px;
  align-items: center;
  
}

.icons i {
  cursor: pointer;
  transition: transform 0.2s;
}

.icons i:hover {
  transform: scale(1.2);
}

/* 📱 スマホ対応 */
@media (max-width: 768px) {
  .logo {
    font-size: 2rem;
  }

  .icons {
    font-size: 24px;
    bottom: 12px;
  }
}

.custom-icon {
  width: 40px;
  height: 40px;
}
.custom-icon svg {
  width: 100%;
  height: 100%;
  transform: scale(1.4); 
  margin-top: 10px; /* 1.0 = 等倍、1.2 = 1.2倍 */
}
.fa-search{
  font-size: 36px;   /* 大きさ調整 */
  margin-top: 8px;  /* 下げたい分だけ追加 */
   color: white;
}


.fa-cog{
 font-size: 32px;   
 margin-top: 14px; 
 color: white;
}

/* 共通：フォーカスやホバーで拡大 */
.icon-btn:hover,
.icon-btn:focus {
  transform: scale(1.3);
  transition: transform 0.2s;
  outline: none; /* デフォルトの青い枠を消す */
}

/* 中のSVGやFontAwesomeアイコンも拡大 */
.icon-btn:hover svg,
.icon-btn:focus svg,
.icon-btn:hover i,
.icon-btn:focus i {
  transform: scale(1.3);
  transition: transform 0.2s;
}


body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
           
            color: #3b5066;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }

        .container {
            width: 100%;
            max-width: 400px;
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .button-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 500px; /* ボタン間の間隔を少し広げる */
    margin-top: 50px;
}

/* メインボタン */
.main-button {
    width: 45%; /* コンテナ幅に対する比率を維持 */
    max-width: 500px; /* ボタンの最大幅を広げる */
    padding: 20px 20px; /* 上下のパディングを大きくして高さを出す */
    background-color: #f7e0c4;
    border: none;
    border-radius: 50% 50% 50% 50% / 65% 65% 35% 35%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 影をより強調する */
    text-align: center;
    transition: transform 0.2s;
    cursor: pointer;
    box-sizing: border-box;
}
        .main-button:hover {
            transform: translateY(-5px);
        }

        .button-text {
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 15px 0;
            color: #3b5066;
        }

        .button-icon {
            font-size: 32px;
            color: #3b5066;
        }

        /* 画面上部のロゴと波形部分のCSS（省略） */


        
        /* 画面下部のナビゲーションバーのCSS（省略） */
        .bottom-nav {
            width: 100%;
            height: 80px;
            background-color: #3b5066;
            border-top-left-radius: 50% 50%;
            border-top-right-radius: 50% 50%;
            position: absolute;
            bottom: 0;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        .nav-icon {
            font-size: 28px;
            color: white;
        }
