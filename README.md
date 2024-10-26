Fruityvice App
--------------

A React TypeScript application that displays and organizes fruit data from the Fruityvice API. Users can view fruits in both list and table views, group them by different categories, and add them to a virtual fruit jar.

Features
--------

-   Data Visualization: View fruits in both list and table formats.
-   Grouping Options: Group fruits by family, order, or genus.
-   Interactive UI: Add individual fruits or entire groups to a fruit jar. Hover/click over the pie chart to view individual fruits with their calories highlighted.
-   Responsive Design: Works seamlessly across desktop and mobile devices.
-   Collapsible Groups: Easily manages large datasets with collapsible sections.
-   Error Handling: Comprehensive error handling with user-friendly messages has been employed.

Live Demo
---------

[View the live application](https://fruityvice-app.vercel.app)

Technologies Used
-----------------

-   React 18
-   TypeScript
-   Tailwind CSS
-   React Select
-   Axios
-   Vercel (deployment)

Prerequisites
-------------

-   Node.js (v14 or higher)
-   npm or yarn

Installation
------------

1.  Clone the repository:

bash

`git clone https://github.com/your-username/fruityvice-app.git cd fruityvice-app `

2.  Install dependencies:

bash

`npm  install  `

3.  Start the development server:

bash

`npm start `

The application will be available at `http://localhost:3000`

Building for Production
-----------------------

bash

`npm run build `

Deployment
----------

The application is configured for deployment on Vercel. Simply push to the main branch or connect your GitHub repository to Vercel for automatic deployments.


Key Features Implementation
---------------------------

Grouping Functionality
----------------------

-   Select from different grouping options (None, Family, Order, Genus).
-   Collapsible groups for better organization.
-   Add entire groups to the fruit jar.

Views
-----

-   List View: Compact, easy-to-read format.
-   Table View: Detailed information with columns.
-   Responsive design adapts to screen size.

Fruit Jar
---------

-   Add individual fruits or groups of fruits.
-   Visual representation of selected fruits and their calories in a pie chart.
-   Persistent state during session.
-   Hover/Click over pie chart for fruit name and calories.

Error Handling
--------------

The application includes comprehensive error handling for:

-   API failures
-   Network issues
-   Invalid data
-   Loading states

Browser Support
---------------

-   Chrome (latest)
-   Firefox (latest)
-   Safari (latest)
-   Edge (latest)

License
-------

This project is licensed under the MIT License - see the LICENSE file for details.