# Project Title

## 1. Project Description
Our team DTC09 is developing an AirHealth app to help people who care about their health, get up-to-date information on air quality with a single app that is personalized to their needs.

## 2. Names of Contributors
List team members and/or short bio's here... 
* My name is Seogin and I'm so happy with you guys.
* My name is David(SungJin) Suh and I'm glad to see you all.
* My name is Annyn, and I has bird.

	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Google Air Quality API
* Open Weather Map API
* Tailwind CSS (Out main frontend library)
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project. How do others start using your code or application?
Here are the steps ...
* Live serve index.html
* Sign up in the login.html page
* Free to look around our app!

## 5. Known Bugs and Limitations
Here are some known bugs:
* When users click submit button on profile page, it is sometimes not changed
* Background image is not shown if the contents is longer then the height
* Pollutants are not shown in main page if the pollutants are less than 3

## 6. Features for Future
What we'd like to build in the future:
* Add map to show how good or bad the air
* Add information the pollutant level is how bad for specific user group
* Make our own api for air quality instead of Google
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── airquality.html          # Air quality view html file, displayed detailed information about air quality based on user's city
├── events.html              # Event html file, displayed data from database
├── form.html                # The new version of profile page
├── index.html               # landing HTML file, this is what users see when you come to url
├── location.html            # Location html file, displyed air quality based on city where users search
├── login.html               # Login html file, the log-in page
├── main.html                # Main html file, this is what users see after log-in
├── new_nav_playground.html  # Nav bar playground html file, for testing nav bar
├── profile.html             # The old version of profile page
├── README.md                # Documentation for the project
├── recommendations.html     # Recommendation html file, displyed recommendations based on user group
├── tailwind.config.js       # In order to use tailwind
├── template.html            # Template html file, for creating new html file
└── weather.html             # Weather html file, displayed weather in 4 days

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /AirHealthLogo.png                # Acknowledge source
    /background_profile.jpg   # Background image for profile page
    /cloud.png               # Image file to show cloudy weather
    /CO.png                    # Image file for CO
    /default.png               # Image file to display default 
    /dioxide.png               # Image file for dioxide
    /events-background-img.jpg  # Background image for event page
    /locations-background-img.jpg   # Background image for location page
    /O3.png                     # Image file for O3
    /PM10.png                   # Image file for PM10
    /pm25.png                   # Image file for PM25
    /profile icon.jpg           # Image file for profile icon
    /rain.png                   # Image file for rain
    /recommendations.jpeg   # Background image for recommendation.html
    /sign-up-background-img.jpg # Background image for index.html
    /SO2.png                # Image file for SO2
    /sun.png                # Image file for sun
    /sunny.jpg              # Background image for airquality.html
    /weather-background-img.jpg # Background image for weather.html
├── scripts                  # Folder for scripts
    /airquality.js           # JS to fetch air quality api from Google, read user information for city's location from firebase database and display the information to airquality.html
    /authentication.js       # JavaScript file to authenticate users 
    /events.js               # Read firebase database about event information
    /firebaseAPI_TEAM99.js   # The firebase API key with other information
    /form.js                 # JS file to read and write users information from users input
    /location.js             # JS to fetch air quality api and geocoding api from Google, write and read user information to new collection called 'favorite' and display the information to location.html
    /main.js                 # JS file to fetch APIs to get air quality information and weather information and displyed with city and user name
    /recommendation.js       # JS to fetch air quality api from Google to get recommendation based on air quality, read user information for user group from firebase database and display the information to recommendation.html
    /script.js               # JS file to log-out
    /skeleton.js             # JS file to load templates such as nav_after_login.html and nav_before_login.html
    /weather.js              # JS file to fetch weather API and displayed weather
├── styles                   # Folder for styles
    /reset.css               # CSS file to reset all style to change
    /style.css               # CSS file to manage background images and basic style in html
├── text
    /nav_after_login.html    # navbar on top of screen including hamburger menu that will appear on every page for an authenticated user
    /nav/before_pogin.html   # navbar on top of screen displayed to unauthenticated user


