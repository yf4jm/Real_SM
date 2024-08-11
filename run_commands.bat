@echo off
echo Starting npm and Django servers...
start cmd /k "cd Frontend && npm run dev"
start cmd /k "python Backend/manage.py runserver"