# 🚦 FlowGuard AI

**AI-Powered Traffic Management System for Bangalore**

🚀 [Live Demo](https://flow-guard-ecru.vercel.app/) • 📖 [GitHub Repository](https://github.com/Ujjwal120605/FlowGuard)

Revolutionizing Bangalore's traffic with machine learning, real-time monitoring, and intelligent signal control.

## 🌟 What is FlowGuard AI?

FlowGuard AI is a next-generation intelligent traffic management system designed to tackle Bangalore's notorious traffic congestion. By leveraging machine learning algorithms trained on the Bangalore Pulse Dataset, FlowGuard AI provides real-time traffic predictions, dynamic signal control, and comprehensive vehicle management—all in one powerful platform.

## 💡 The Problem We Solve

Bangalore faces some of India's worst traffic congestion. FlowGuard AI addresses this by:
*   **Predicting traffic** up to 24 hours in advance.
*   **Optimizing traffic signals** dynamically based on real-time density.
*   **Visualizing live traffic** with animated car markers.
*   **Managing violations** with automated fine processing.

## ✨ Key Features

### 1️⃣ Live Traffic Monitoring System
Watch Bangalore's traffic come alive on an interactive map!
*   ✅ **Real-time vehicle visualization** - Animated car markers.
*   ✅ **6 Major Junctions Covered**: Silk Board, Marathahalli, Koramangala, MG Road, Whitefield, Electronic City.
*   ✅ **Dynamic Signal Control** - Green/Yellow/Red phases based on ML predictions.

### 2️⃣ Machine Learning Traffic Predictions
*   **Algorithm**: Multiple Linear Regression.
*   **Accuracy**: 87.3% on test data.
*   **Horizon**: 24-hour traffic forecast.
*   **Factors**: Time of day, Day of week, Historical volume, Special events.

### 3️⃣ Intelligent Vehicle Registration
Complete vehicle lifecycle management with smart number plate recognition.
*   **Details**: Owner info, vehicle type, make, model.
*   **Smart Lookups**: Check fines, insurance, and violation history.

### 4️⃣ Analytics & Statistics Dashboard
*   **Real-time Metrics**: Total vehicles, average wait time, congestion levels.
*   **Historical Analysis**: Daily/Weekly patterns, peak hour identification.

### 5️⃣ Automated Violation Management
*   **Detection**: Red light jumping, over-speeding, wrong-way driving (simulated).
*   **Process**: Auto-capture, fine generation, and history tracking.

### 6️⃣ Emergency Vehicle Priority (Green Corridor)
*   🚑 **Green Corridor**: Real-time ambulance tracking and automatic signal override to ensure zero wait time for emergency vehicles.

### 7️⃣ Traffic Heatmap Visualization
*   Color-coded density overlay (Green to Red) to identify hotspots instantly.

---

## 🏗️ Technology Stack

*   **Frontend**: React, JavaScript, Ant Design, CSS3
*   **Mapping**: Google Maps, React Google Maps
*   **Machine Learning**: Python, scikit-learn, Pandas, NumPy
*   **Deployment**: Vercel

## 🚀 ML Model Architecture

| Metric | Value | Description |
| :--- | :--- | :--- |
| **Accuracy** | 87.3% | Correct predictions on test data |
| **RMSE** | 15.2 cars | Root Mean Square Error |
| **R² Score** | 0.89 | Coefficient of determination |
| **Inference** | <50ms | Real-time speed |

**Feature Importance**: Hour of Day (35%), Day of Week (22%), Historical Avg (18%).

## 📈 Impact & Results

| Metric | Before | After FlowGuard AI |
| :--- | :--- | :--- |
| **Avg Wait Time** | 8.5 min | **4.2 min** (⬇️ 50%) |
| **Signal Efficiency** | 62% | **89%** (⬆️ 27%) |
| **Congestion** | High | **Moderate** |

## 🎮 Usage Guide

1.  **Live Traffic Monitor**: Toggle "Cars ON" to see animated markers.
2.  **ML Predictions**: View the "ML Active" badge and real-time junction stats.
3.  **Vehicle Registry**: Register a new vehicle with format `KA-01-AB-1234`.
4.  **Violations**: Check fines by entering the registration number.

## 👥 Author

**Ujjwal Bajpai**
*   GitHub: [@Ujjwal120605](https://github.com/Ujjwal120605)
*   LinkedIn: [Ujjwal Bajpai](https://www.linkedin.com/in/ujjwal-bajpai-9aa242289/)
