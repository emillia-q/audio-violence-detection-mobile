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
> ⚠️ _This engineering-thesis proof of concept does not replace professional emergency services._

## 🧩 Engineering thesis project

Domestic violence often happens behind closed doors, where traditional emergency calls are impossible. This engineering thesis project aims to provide a **discreet, automated safety net**.

Instead of relying only on manual intervention, the system uses **TinyML on an IoT device** to detect signs of violence in real time. When a critical event is classified, the **backend securely routes an alert** to trusted contacts. This mobile app gives protected users and their trusted network a place to manage devices, relationships, alerts, and notifications.

---

This repository contains the **React Native application** in a four-component system:

| Repository                                                                               | Role                                                             |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [React Native application](https://github.com/emillia-q/audio-violence-detection-mobile) | Mobile experience for protected and trusted users                |
| [Backend API](https://github.com/emillia-q/audio-violence-detection-backend)             | Authentication, device lifecycle, alerts, and user relationships |
| [IoT hardware](https://github.com/emillia-q/audio-violence-detection-hardware)           | Edge device that runs the model and sends alerts                 |
| [TinyML model](https://github.com/emillia-q/audio-violence-detection-tinyml)             | On-device audio violence classification                          |

## 🎬 Demo

### Video preview

Preview of the application in use from the users perspective.

<div align="center">
  <video src="https://github.com/user-attachments/assets/ba57972f-3cfa-43a6-bb9f-39862ee69104"></video>
</div>

### Adding a device with a QR code

Users can add a device by scanning its QR code in the app.

<div align="center">
  <img src="assets/demo/qr-scan.jpg" alt="Scanning a QR code to add a device" width="320">
</div>

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

## 👩‍💻 Author

Built by [Emilia Kura](https://github.com/emillia-q) as part of an engineering thesis.
