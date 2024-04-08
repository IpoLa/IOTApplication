React Native & Redux IoT Project for Smart Home Control
Contributor : Akram MEZAACHE

This project is a React Native application built with Redux that allows users to connect with an ESP32 device and control various aspects of a smart home, such as lights, temperature, and security systems.
Features

    Connects with ESP32 microcontroller via Wi-Fi for IoT communication.
    Provides intuitive user interface for controlling smart home devices.
    Implements Redux for state management to ensure efficient data flow.
    Supports real-time updates and notifications for device status changes.

Installation

    Clone the repository to your local machine:

    bash

git clone https://github.com/IpoLa/IOTApplication

Navigate to the project directory:

bash

cd react-native-iot-project

Install dependencies:

bash

npm install

Connect your Android or iOS device to your development environment.

Run the project on your device:

bash

    npm run android   # For Android
    npm run ios       # For iOS

Usage

    Launch the application on your device.
    Connect to the Wi-Fi network associated with your ESP32 device.
    Navigate through the app to access different smart home controls.
    Interact with the controls to command your smart home devices.
    Receive real-time feedback and notifications on device status changes.

Configuration

    To configure the connection with your ESP32 device, modify the config.js file in the project directory and enter the appropriate Wi-Fi credentials and device IP address.

Dependencies

    React Native
    Redux
    Redux Thunk
    React Navigation
    Axios
    Other dependencies can be found in the package.json file.

Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug fixes, feel free to open an issue or submit a pull request.
License

This project is licensed under the MIT License.
Acknowledgements

    This project was inspired by the growing demand for IoT solutions in smart home automation.
