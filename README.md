# 🚀 AlphaFusion

**AI-Powered Multi-Model Forecasting & Autonomous Trading Platform**

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)  
[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python&logoColor=white)](https://www.python.org/)  
[![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js&logoColor=white)](https://nodejs.org/)  
[![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js&logoColor=white)](https://nextjs.org/)  

**AlphaFusion** is a **full-stack trading platform** for **stocks and cryptocurrencies**, combining **AI/ML models, technical indicators, and trading strategies** to deliver **high-confidence forecasts** and execute trades automatically.

---

## 🔥 Features

### 📊 Forecasting Engine
- ✅ Multi-model predictions: **LSTM, XGBoost, Prophet, SARIMAX, EMA, Ensemble**  
- ✅ Supports **technical indicators**: EMA, MACD, RSI14, Bollinger Bands, ATR14, OBV, Returns, VWAP, Z-Score, Volume Spike  
- ✅ Advanced **trading strategies**: Fibonacci Levels, Bullish/Bearish Engulfing, Pin Bar, Market Regimes, Scalping/Swing Detection, Price Action, Pullbacks, Mean Reversion, Breakouts  
- ✅ Ensemble merging for **perfect forecast signals**  

### 🤖 Autonomous Trading Bot
- ⚡ Auto-execution based on forecasts  
- 🛡 Configurable **risk management**: stop-loss, take-profit, and position sizing  
- 📈 Works with **stocks & crypto markets**  
- 🔄 Extensible to new models and trading strategies  

### 🌐 Web Interface
- Built with **Next.js** for a **responsive and modern dashboard**  
- Visualize forecasts, charts, signals, and executed trades in real-time  
- Interactive dashboards with **strategy and performance metrics**  

### 🏗 Backend Architecture
- **Python:** AI/ML forecasting, feature engineering, signal processing  
- **Node.js:** REST APIs, trading execution, data aggregation  
- Modular and scalable architecture  

---

## ⚙️ Tech Stack
- **Frontend:** Next.js, React, TailwindCSS  
- **Backend:** Python 3.x, Node.js, Express  
- **ML/AI:** TensorFlow/Keras, XGBoost, Prophet, Statsmodels  
- **Data:** yfinance, pandas, numpy  
- **Deployment:** Docker-ready, API endpoints for brokers & exchanges  

---

## 🏛 Architecture Overview

Frontend (Next.js)  
       │  
       ▼  
Backend API (Node.js)  
       │  
       ├─> AI Forecasting Service (Python)  
       │       ├─ 🧠 LSTM  
       │       ├─ 📊 XGBoost  
       │       ├─ 🔮 Prophet  
       │       ├─ 📈 SARIMAX  
       │       └─ EMA & Ensemble  
       │  
       └─> Trading Bot  
               ├─ 💹 Market Execution  
               ├─ 🛡 Risk Management  
               └─ 📌 Strategy Integration  
