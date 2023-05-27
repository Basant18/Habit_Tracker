# Habit_Tracker

# Technology Stack
Express
EJS
SCSS
HTML
NodeJS

#About
This is a habit tracker app where I user can add his/her habits and see past 6 days habit and change the status of habit to done, undone or reject for the day.

#Basic-Feature
1. Home Page has all the habits you can add/delete the habit.
2. Habit Tracker here you can track your habit for past 7 days and change the status.

#Directory-Structure
Habit_tracker
    |-----assets
    |       |--- css
    |       |     |-- header.css
    |       |     |-- home.css
    |       |     └-- layout.css
    |       |     |-- tasks.css    
    |       |--- sass
    |             |-- header.scss
    |             |-- home.scss
    |             └-- layout.scss
    |             |-- tasks.scss
    |------ config
    |         └--- mongoose.js
    |------ controllers
    |         └--- home_controllers.js
    |------ models
    |         └--- habit.js
    |------ routes
    |         └--- index.js
    |         |---- home.js 
    |------ views
    |         |--- _header.ejs
    |         |--- home.ejs
    |         └--- layout.ejs
    |         \--- tasks.ejs  
    |------ .gitignore
    |------ app.js
    |------ package.json
    |------ package-lock.json
    └------ README.md
