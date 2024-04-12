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
* ...
* ...

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
├── airquality.html          # Show detailed information about air quality based on user's city
├── events.html              # Display data from database
├── form.html
├── index.html               # landing HTML file, this is what users see when you come to url
├── location.html
├── login.html
├── main.html
├── new_nav_playground.html
├── profile.html
├── README.md
├── recommendations.html
├── tailwind.config.js
├── template.html
└── weather.html            # Display weather in 4 days

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /AirHealthLogo.png                # Acknowledge source
    /background_profile.jpg
    /cloud.png
    /CO.png
    /default.png
    /dioxide.png
    /events-background-img.jpg
    /locations-background-img.jpg
    /O3.png
    /PM10.png
    /pm25.png
    /profile icon.jpg
    /rain.png
    /recommendations.jpeg   # Background image for recommendation.html
    /sign-up-background-img.jpg
    /SO2.png
    /sun.png
    /sunny.jpg              # Background image for airquality.html
    /weather-background-img.jpg
├── scripts                  # Folder for scripts
    /airquality.js           # JS to fetch air quality api from Google, read user information for city's location from firebase database and display the information to airquality.html
    /authentication.js
    /events.js               # Read firebase database about event information
    /firebaseAPI_TEAM99.js
    /form.js
    /location.js             # JS to fetch air quality api and geocoding api from Google, write and read user information to new collection called 'favorite' and display the information to location.html
    /main.js
    /recommendation.js       # JS to fetch air quality api from Google to get recommendation based on air quality, read user information for user group from firebase database and display the information to recommendation.html
    /script.js
    /skeleton.js
    /weather.js
├── styles                   # Folder for styles
    /reset.css                # 
    /style.css
├── text
    /nav_after_login.html
    /nav/before_pogin.html


