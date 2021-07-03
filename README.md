# Progressive Web Apps @cmda-minor-web · 20-21

### The GifTrends App

[Live App Demo](https://gif-trends.herokuapp.com/)

The GifTrends app is the best site to keep up with the latest 12 trending gifs on the internet. Each day through the Giphy platform, people exchange over a  [billion](https://www.forbes.com/sites/alexkonrad/2016/10/26/giphy-passes-100-million-users-reveals-gv-as-investor/?sh=77086d684d64) gifs with each other. These gifs cover a variety of topics, from pop culture to politics and sports. The GifTrends app allows u to have a quick overview of what is trending in real-time.

[![last.png](https://i.postimg.cc/MHyy4CS2/last.png)](https://postimg.cc/XBYGBDqQ)

## Table of Contents


- [Install](#Install)
- [NPM](#NPM)
- [API](#API)
- [OPTIMIZATIONS](#OPTIMIZATIONS)
- [SOURCES](#SOURCES)
- [License](#License)




## Install

### 1. Clone this Repo

    git clone https://github.com/randy554/progressive-web-apps-1920.git
    
### 2. Navigate to the root of the app

    cd progressive-web-apps-1920

### 3. Install the necessary packages from package.json 
    npm install

### 4. Start server

    npm run start

### 5. View site

    http://localhost:3001/
    

## NPM

Dit project maakt gebruik van de volgende packages:

- Express
- EJS
- Node-fetch
- NPM run all
- Gulp
- Gulp autoprefixer
- Gulp clean css
- Gulp concat
- Gulp minify
- Compression
    
    
 ## API 
 
 Ik maak gebruik van de [Giphy public API](https://developers.giphy.com/docs/api/endpoint#trending). Van deze API maak ik specifiek gebruik van de `Trending` gedeelte. Deze geeft in realtime de laatste trending gifjes aan. 
 
`https://api.giphy.com/v1/gifs/trending?api_key=tuMYha0ArdAhO9rqn9aM9erHww61XGns&limit=10&rating=g`
 
 [![image.png](https://i.postimg.cc/0296WJc0/image.png)](https://postimg.cc/Cd6LddyR)
 
 ## OPTIMIZATIONS
 
 [![image.png](https://i.postimg.cc/fbPP7SSF/image.png)](https://postimg.cc/xkKgnCRy)
 
 ## SOURCES
 
 - [PWA Tutorial]( https://www.youtube.com/watch?v=4XT23X0Fjfk&list=PL4cUxeGkcC9gTxqJBcDmoi5Q2pzDusSL7)
 
 
## License

Creative Commons Attribution-ShareAlike 4.0 International Link 
