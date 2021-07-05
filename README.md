# Progressive Web Apps @cmda-minor-web · 20-21

### The GifTrends App

[Live App Demo](https://gif-trends.herokuapp.com/)

The GifTrends app is the best site to keep up with the latest 12 trending gifs on the internet. Each day through the Giphy platform, people exchange over a  [billion](https://www.forbes.com/sites/alexkonrad/2016/10/26/giphy-passes-100-million-users-reveals-gv-as-investor/?sh=77086d684d64) gifs with each other. These gifs cover a variety of topics, from pop culture to politics and sports. The GifTrends app allows u to have a quick overview of what is trending in real-time.

[![last.png](https://i.postimg.cc/MHyy4CS2/last.png)](https://postimg.cc/XBYGBDqQ)

## Table of contents


- [Install](#Install)
- [NPM](#NPM)
- [API](#API)
- [OPTIMIZATIONS](#OPTIMIZATIONS)
- [SOURCES](#SOURCES)
- [License](#License)




## Install

### 1. Clone this repo

    git clone https://github.com/randy554/progressive-web-apps-1920.git
    
### 2. Navigate to the root of the app

    cd progressive-web-apps-1920

### 3. Install the necessary packages from package.json 
    npm install

### 4. Start server in terminal

    npm run start

### 5. View site

    http://localhost:3001/
    

## Packages

This project makes use of the following packages:

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
 
 In order to get gifs I make use of the [GIPHY API](https://developers.giphy.com/docs/api/#quick-start-guide). After creating a free developer account, you will receive a KEY to get started. The Giphy API provides several endpoints for different purposes. For this project I'm making use of the [Trending endpoint](https://developers.giphy.com/docs/api/endpoint#trending). This endpoint returns a extensive list of the latest trending gifs. 
 
 ```Javascript
`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${AMOUNT}&rating=g`
 ```
**Response data:**

 [![Giphy-API.png](https://i.postimg.cc/htzkjqrp/Giphy-API.png)](https://postimg.cc/sMz66qbh)
 
 
 ## Features
 
 With this project, there were a couple of things I implemented to increase the speed of the app or at least create the perception of it. Here are some of the key things:
 
 ### WEBP
 
While going through the Giphy API docs, I discovered that the API supported a range of image formats. One of the image formats was WEBP, from the Browser technologies course I had learned that this image format was smaller in file size (compared to JPG & PNG). I [assumed](https://www.voorhoede.nl/en/blog/why-our-website-is-faster-than-yours/#webp) using this format would significantly lower the site loading time.
 
 
 [![image.png](https://i.postimg.cc/fbPP7SSF/image.png)](https://postimg.cc/xkKgnCRy)
 <em>https://developers.giphy.com/docs/optional-settings/#rendition-guide</em>.
 


This adjustment led to a scalable performance gain. See the screenshots from the inspector below:
 
 
| **gif** | **webp** | 
|:---------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------| 
| [![1-Network-test-with-gif.png](https://i.postimg.cc/Bbc9XFsH/1-Network-test-with-gif.png)](https://postimg.cc/QKtnzHFd) | [![1-Network-test-with-webp.png](https://i.postimg.cc/K8XSjXq2/1-Network-test-with-webp.png)](https://postimg.cc/F7xnC6XW) | 
| **Load time:** 1.37s - **Resources:** 8.9 MB. | **Load time:** 941ms - **Resources:** 6.3 MB. | 


Because the **webp** format isn't supported in every browser. I made use of the [picture element](https://www.voorhoede.nl/en/blog/why-our-website-is-faster-than-yours/#-picture-element). The picture element in combination with the `source` allows u to add a fallback resource in case a format isn't supported:

[![picture-Element.png](https://i.postimg.cc/XvqbhYF3/picture-Element.png)](https://postimg.cc/DS9H4FBY)
 

 ### Critical CSS
 
 To optimize the _[First Contentful Paint](https://web.dev/first-contentful-paint/)_ (the time it takes the browser to display text or image once a user visits a page) of my app, I chose to make use of the _Critical CSS_ method. With Critical CSS as the term might already suggest, u tell the browser which part of your CSS is more critical and should have a priority when loading the resources. You can decide which part of your app CSS is more critical by using the coverage tool in the inspector (see image below). The critical CSS mostly focuses on the content above the fold on the page. Other parts of your CSS code can be [deferred](https://web.dev/defer-non-critical-css/). This combination should lower your First Contentful Paint (FCP) time & help with the **Perceived performance** of your site. Although my site at the moment doesn't really consist of long-form content, I believe it's a good development practice to keep and implementation is quite straightforward.
 
 **Coverage tool:**
 
 | **Before** | **After** | 
|:---------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------| 
| [![2-Coverage-tool-what-is-critical-CSS.png](https://i.postimg.cc/cJBZ73S4/2-Coverage-tool-what-is-critical-CSS.png)](https://postimg.cc/bGrKpsrK) |  [![image.png](https://i.postimg.cc/3wC09knx/image.png)](https://postimg.cc/CZ5KxL33) | 
| The red lines in the index.css file indicate the non critical CSS parts of the file. The green part represent the critical CSS part. | After removing the non critical CSS parts in the file, u can see in the `Usage visualization` tab that green stroke is gone. | 
 
 
 **My critical CSS in header:**
 [![critical-CSS.png](https://i.postimg.cc/TYmsW3NP/critical-CSS.png)](https://postimg.cc/4mfPDsgC)
 
  **Deferring non critical CSS:**
 [![defer-Critical-CSS.png](https://i.postimg.cc/yN8Ky9wP/defer-Critical-CSS.png)](https://postimg.cc/sMqbVBfQ)
 
As the critical css part can be placed straight into a `style` tag in your document's head section. The above screenshot shows how you can defer less critical CSS. The `preload` value allows the stylesheet to be asynchronously requested. The `onload` value is to start the CSS processing after the file finishes loading.
 
 ### Minifying
 
Another way I tried to improve the speed of the site was by reducing the file sizes. Specifically my CSS & JS production code. If the size of the files can be reduced, then the client will have fewer bytes to download and hence increasing the speed of the site. I manage to reduce my file size with a task runner called [Gulp](https://gulpjs.com/). This is a tool built on Node.js that helps with automating repetitive tasks. I made use of the following gulp-plugins to primarily reduce file sizes:
 
 [![CSS-gulp.png](https://i.postimg.cc/cJ5q1gz9/CSS-gulp.png)](https://postimg.cc/TymNCwfg)
 In order to maintain some manageability with my code, I segmented most of my CSS code. In order to minify all my CSS for production, I had to **concat/merge** all my files into one. I achieved this by implementing the `gulp-concat` plugin. The `gulp-clean-css` plugin minify's the new **index.css** file and then ```gulp.dest("./public/css") ``` stores the file at the new destination.
 
 [![JS-gulp.png](https://i.postimg.cc/N00qw7d2/JS-gulp.png)](https://postimg.cc/87xnRWQT)
 At the moment I don't have multiple JS files that I see fit to merge into one, but I included the concat function as a reminder for future development. To minify my JS file I used the `gulp-uglify` plugin. This basically does the same thing for JS files as the clean CSS plugin does for CSS.
 
 | **Before minifying** | **After minifying** | 
|:---------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------| 
| [![5-Network-without-minifying.png](https://i.postimg.cc/FHHfXZdd/5-Network-without-minifying.png)](https://postimg.cc/JGS7bjQM) | [![5-Network-with-minifying.png](https://i.postimg.cc/k4m6zdx9/5-Network-with-minifying.png)](https://postimg.cc/Nydj2SJP) | 

Although the contents of the concerned files are relatively small, the effects are noticeable. This is a solution that will also scale well as the project grows.

 ### Gzip Compression
 
 With the help of the compression plugin, I added Gzip compression to my middleware. This plugin at its core is quite straightforward to implement. Just `import compression from "compression";` the plugin and add it to your middleware `app.use(compression());` as high as possible. An interesting option I read from the docs is the level option. This option allows u to specify a numerical value (between the numbers -1 to 9) indicating how much compression u would like to apply. The caveat is a higher level of compression takes more time. I opted for the default level, which is 6. The compression unfortunately had no noticeable impact on my relatively small app. 
 
### Service worker

**Offline page**


[![6-check-cache.png](https://i.postimg.cc/v8zYb3qt/6-check-cache.png)](https://postimg.cc/z3yZkS1y)


[![6-limit-Cache-Size.png](https://i.postimg.cc/9fqtZ4RJ/6-limit-Cache-Size.png)](https://postimg.cc/d7wyKV9y)


[![6-else-serve-cache-request-offline.png](https://i.postimg.cc/DZ1q8tJZ/6-else-serve-cache-request-offline.png)](https://postimg.cc/cg4Kzkcy)


[![6-Offline-page-SW.png](https://i.postimg.cc/BQ7p8sLM/6-Offline-page-SW.png)](https://postimg.cc/rKWxbB9r)


 
 ## Sources
 - [Carbon source code images](https://carbon.now.sh/) 
 - [Defer no critical CSS](https://web.dev/defer-non-critical-css/)
 - [ExpressJS](https://expressjs.com/)
 - [First Contentful Paint](https://web.dev/first-contentful-paint/)
 - [Giphy endpoint trending](https://developers.giphy.com/docs/api/endpoint/#trending)
 - [Giphy API explorer](https://developers.giphy.com/explorer)
 - [EJS](https://ejs.co/)
 - [NPM](https://www.npmjs.com/)
 - [Picture element](https://www.voorhoede.nl/en/blog/why-our-website-is-faster-than-yours/#-picture-element)
 - [Postimage](https://postimages.org/)
 - [PWA Tutorial](https://www.youtube.com/watch?v=4XT23X0Fjfk&list=PL4cUxeGkcC9gTxqJBcDmoi5Q2pzDusSL7)
 - [WEBP](https://www.voorhoede.nl/en/blog/why-our-website-is-faster-than-yours/#webp)
 
 
## License

Creative Commons Attribution-ShareAlike 4.0 International Link 
