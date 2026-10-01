# Audio Violence Detection

<p align="center">
  <a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native 0.81"></a>
  <a href="https://expo.dev/"><img src="https://img.shields.io/badge/Expo_SDK-54-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo SDK 54"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5.9"></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white" alt="React 19"></a>
</p>

> [!IMPORTANT]
> **React Native mobile application** for managing a personal safety network. The app connects protected users, trusted contacts, and devices that can report potential danger.
>
> ⚠️ *This engineering-thesis proof of concept does not replace professional emergency services.*

## 🧩 Engineering thesis project

Domestic violence often happens behind closed doors, where traditional emergency calls are impossible. This engineering thesis project aims to provide a **discreet, automated safety net**.

Instead of relying only on manual intervention, the system uses **TinyML on an IoT device** to detect signs of violence in real time. When a critical event is classified, the **backend securely routes an alert** to trusted contacts. This mobile app gives protected users and their trusted network a place to manage devices, relationships, alerts, and notifications.

---

This repository contains the **React Native application** in a four-component system:

| Repository | Role |
| --- | --- |
| [Backend API](https://github.com/emillia-q/audio-violence-detection-backend) | Authentication, device lifecycle, alerts, and user relationships |
| [TinyML model](https://github.com/emillia-q/audio-violence-detection-tinyml) | On-device audio violence classification |
| [IoT hardware](https://github.com/emillia-q/audio-violence-detection-hardware) | Edge device that runs the model and sends alerts |
| [React Native application](https://github.com/emillia-q/audio-violence-detection-mobile) | Mobile experience for protected and trusted users |

## 🎬 Demo

<!-- Add the app walkthrough video at assets/demo/mobile-demo.mp4, then link it here. -->

## ✨ Key features

- 🔐 **Authentication:** registration and login with validated forms; session tokens are stored using Expo SecureStore.
- 👥 **Two user experiences:** switch between protected-user and trusted-user dashboards, including swipe navigation.
- 📟 **Device management:** pair a device, view its details, update its name, and disconnect it.
- 🤝 **Trusted network:** add and manage trusted contacts, or view the people you protect.
- 🚨 **Alerts and notifications:** review event history, manage read status, and refresh dashboard data.
- 🌐 **API integration:** authenticated REST requests, session cleanup on expired credentials, and connection/server error feedback.

## 🛠️ Tech stack

- **Core:** React Native, React 19, TypeScript, Expo SDK 54
- **Navigation:** Expo Router with file-based routing
- **Networking:** Axios for REST API communication
- **Forms:** React Hook Form and Zod for form state and validation
- **Secure storage:** Expo SecureStore for token persistence
- **Gestures:** React Native Pager View for swipeable dashboard modes

## 🚀 Getting started

- Install Node.js and the project dependencies with `npm install`.
- Set `EXPO_PUBLIC_API_URL` to the address of a running backend API. For a physical device, use a host address reachable from that device rather than `localhost`.
- Start Expo with `npm start`, then open the app in an Android or iOS development environment.
- Use `npm run android` or `npm run ios` to run the native development build.

## 👩‍💻 Author

Built by [Emilia Kura](https://github.com/emillia-q) as part of an engineering thesis.
