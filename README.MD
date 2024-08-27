# BUG TRACKER

Welcome to my bugtracker project, this can be used for bug tracking but can also be used as a ticketing tool.

## Overview

- User authentication and authorization
- 3 types of users: developers, seniors & admins
- Fully funcitonal sign up and login features
- User roles
- Create and join projects
- Submit and track tickets
- Seniors and and admins can assign/reassign tickets
- Seniors and admins can start new projects and add/remove users from projects
- Users can only view tickets for projects that they are assigned to

### Requirements

- Python
- Node.js

### How to install

Clone this repositry, create and run a virtual environment using:

1. python -m venv myenv
2. cd ./Scripts
3. activate.ps1
4. exit the env file and go to root /final-bugtracker
5. install requirements.txt
6. pip install -r requirements.txt
7. cd into backend and run `python manage.py runserver`
8. Open a new terminal and cd into the frontend folder
9. run npm install to install all the node packages
10. run `npm run dev`

# Guide

## Signup and login

To sign up go into the signup page, enter your username, email & password, the username will be used to login. The default user will be a developer

### To register a senior/admin

To register a senior/admin you will need to navigate to Django's default port (`http://localhost:8000/admin/`), and from there you can login using

1. username:admin
2. password:admin
   from there you can create a new user and give it the senior/admin userRole.

# Tickets

## Creating a ticket

To there are several ways to submit a ticket, you can:

1. Go to the homepage and click submit a ticket there
2. Click on report a bug as soon as you login
   Fill out the form and click submit. This will submit the ticket

You can only submit and view tickets if you are part of that project.

## Claiming & Closing a ticket

If a ticket is open & there are no users assigned to that ticket, any user can claim that ticket.
Once a ticket is assigned to that user, only they can close that ticket, unless a senior reassigns the user for that ticket.
When a user closes a ticket, they get the ticket points tallied to that months points & their total points.

## Assigning ticket points, users & editing tickets.

Anyone can submit a ticket, seniors and admins have the ability to not only edit the ticket, they can assign certain points to the ticket, and reassign the user that is already handling the ticket.

# Projects

## Joining a project

If you want to join a project you can navigate to the projects page, (ps. you can search for projects too.) click on the project that you want to view, and from there you can click on the join project button.
Each project's page will contain the tickets assigned to that project.

## Editing a project details

Seniors & admins can edit the project details status.

## Removing user from project

As a senior / admin you have the right to remove users from a given project. Once a user is removed from a project they can no longer view the tickets for that project.

# Main page

In the main page you can view all the tickets for the projects that you are assigned to. From there you can also submit & view tickets. You can also search for tickets.

# Account page

In the account page you can view all the tickets that you are assigned to. You can also see how many points you've earned that month & how many points you've earned since you've joined.
