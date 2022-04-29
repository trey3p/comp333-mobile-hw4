## Instructions on how to run our mobile app + backend

0. Download your pertaining mobile simulator programs: Xcode for iOS and Android Studio for Android
1. Download the zip from moodle, "hw4" : you will receive a folder with our backend "backend", and our frontend "my-ra-app"
2. Create virtual environment based on your OS's commands, activate it
3. Install django dependencies (pip3 install django, pip3 install djangorestframework django-cors-headers)
4. Install the rest of the dependencies by "pip3 install -r requirements.txt"
5. cd into "backend"
6. Start the backend with "python3 manage.py runserver"
7. Open a new terminal in hw4
8. Run the command "npm i" to install all dependencies, you may have to run "npm i --legacy-peer-deps" if promted to do so, in case of a "React Native Expo - Node.js version xxx is no longer supported" error message, you can run sudo npm install -g n and sudo n latest. -g
9. Do "npm install -g expo-cli"
10. If you are on macOS you can also do "brew install watchman"
11. cd into my-ra-app and run npm start
12. BOTH the backend and the frontend must be running

For iOS users:

13. Follow the instructions in the terminal to start the iOS simulator.
14. Everything should be up and running!

For Android users (instructions written for Windows):

15. Go to command prompt, and type in ipconfig
16. Find the IPV4 address, and copy this into your clipboard
17. Change all the fetches in hw4 > my-ra-app > components > Ratings.js from http://127.0.0.1:8000/ to your IPV4 address that you copied. Example:  fetch("http://127.0.0.1:8000/api/ratings/") >>  fetch("http://192.168.131.84:8000/api/ratings/") | The port of 8000 stays the same
18. In hw4 > backend > songRater > settings.py, add your copied IPV4 address to allowed hosts.
19. Ctrl + c on your running backend terminal, we will be running it again with a slightly different argument
20. Run your backend using py manage.py runserver 192.168.131.84:8000, and replace the ip you see with your ipv4 address
21. Ctrl + c on your running frontend terminal, we will be running it again
22. Run your frontend again using expo start --tunnel
23. Start Android studio, and follow instructions on how to start a virtual device, and get to the step where you have an android emulator up and running on your screen
24. In your frontend terminal, hit a to link your frontend to your Android emulator.
25. Everything should be up and running!





