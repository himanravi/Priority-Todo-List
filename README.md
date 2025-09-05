Priority Todo List
A simple, yet effective client-side to-do list application designed to help you organize tasks based on priority. The application runs entirely in your browser, using localStorage to persist your tasks.

Features
Task Management: Add, edit, and delete tasks with ease.
Priority Levels: Assign High, Medium, or Low priority to each task.
Task Filtering: Filter your to-do list to view all tasks or only those with a specific priority.
Persistent Storage: Your tasks are saved in your browser's local storage, so they'll be there when you return.
Theme Toggle: Switch between a light and dark mode for comfortable viewing.
Responsive Design: A clean and responsive UI built with Bootstrap that works on all screen sizes.
Architecture Overview
This project uses a simple client-server architecture:

Backend: A minimal Flask server is used to serve the static HTML, CSS, and JavaScript files to the browser. It does not handle any application logic or data storage.
Frontend: The entire application logic is handled on the client-side by vanilla JavaScript. It manages task state, user interactions, and rendering.
Data Storage: All task data is stored in the browser's localStorage. This means your to-do list is specific to the browser and device you are using.
Tech Stack
Frontend:
HTML5
CSS3
Vanilla JavaScript
Bootstrap 5
Backend:
Python
Flask
Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Python 3.x installed on your system.
pip (Python package installer)
Installation
Clone the repository:

git clone https://github.com/your-username/Priority-Todo-List.git
cd Priority-Todo-List
Create and activate a virtual environment (recommended):

# For Windows
python -m venv .venv
.venv\Scripts\activate

# For macOS/Linux
python3 -m venv .venv
source .venv/bin/activate
Install the necessary Python packages:

pip install Flask
Run the application:

python TaskTrackerPro/app.py
Open your browser: Navigate to http://127.0.0.1:5000 to view and use the application.

