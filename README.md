# Progressive Web Apps @cmda-minor-web · 20-21

### The GifTrends App

[Live App Demo](https://gif-trends.herokuapp.com/)

The GifTrends app is the best site to keep up with the latest 12 trending gifs on the internet. Each day through the Giphy platform, people exchange over a  [billion](https://www.forbes.com/sites/alexkonrad/2016/10/26/giphy-passes-100-million-users-reveals-gv-as-investor/?sh=77086d684d64) gifs with each other. These gifs cover a variety of topics, from pop culture to politics and sports. The GifTrends app allows u to have a quick overview of what is trending in real-time.

[![last.png](https://i.postimg.cc/MHyy4CS2/last.png)](https://postimg.cc/XBYGBDqQ)

## Table of contents

  + [The GifTrends App](#the-giftrends-app)
  * [Table of contents](#table-of-contents)
  * [Install](#install)
  * [Packages](#packages)
  * [API](#api)
  * [Features](#features)
    + [WEBP](#webp)
    + [No image reflow](#no-image-reflow)
    + [Critical CSS](#critical-css)
    + [Minifying](#minifying)
    + [Gzip Compression](#gzip-compression)
    + [Service worker](#service-worker)
  * [Revision checklist (See closed issues)](#revision-checklist--see-closed-issues-)
  * [Sources](#sources)
  * [License](#license)




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
 * api_key

The api_key you received when you created your developer account.

* limit

The limit is the amount of gifs u would like to receive at once.

* rating

With this parameter you can filter on the type of content you want to receive. For example parameter `G` gives you the most secure content on giphy. See [here](https://developers.giphy.com/docs/optional-settings/#rating) for the other content levels.


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
 
 ### No image reflow
 
Besides the source element, the previous code snippet contains some pieces of valuable CSS. The images being loaded from the Giphy API have inconsistent heights. This leads to image [reflow](https://www.voorhoede.nl/en/blog/say-no-to-image-reflow/) on the page. Basically because the image height changes, the browser has to re-render the page. This prevents JS from being processed and may cause parts of the page to suddenly shift while viewing. This al can be prevented by letting the browser know beforehand how much space the element will need. For example by giving the image element a fixed dimension. I believe implementing this technique contributed to a better [perceived performance](https://developer.mozilla.org/en-US/docs/Learn/Performance/Perceived_performance). Even when your images take a little bit longer to load, the user can already see some content (related text, image placeholder) on the page. The user may interact with frontend functionality a bit quicker.

| **pic 1** | **pic 2** | 
|:---------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------| 
| [![7-no-image-reflow-1.png](https://i.postimg.cc/mgCg9kJS/7-no-image-reflow-1.png)](https://postimg.cc/FYFv5r9f) | [![7-no-image-reflow-2.png](https://i.postimg.cc/g0bqywJc/7-no-image-reflow-2.png)](https://postimg.cc/dhnywVrg) | 

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

Last but not least, I implemented a caching strategy through the use of a service worker. Because the nature of my app evolves around trend and therefore the content would be continously updated, I had thinker on how I could apply caching usefully. I decided that I would not cache the dynamic images on the homepage but only the ones on the detail page (Which are of larger size). These images would also be used as functionality for the offline page (will explain later). Then I would also cache my static files such as css, js and some icon images.

**Detail page images**

In order to consitently know which files to cache I added the param: _forcache_ to detailpage images. If this image is already available in the cache serve it from cache, else store it in cache before serving it.

[![6-check-cache.png](https://i.postimg.cc/v8zYb3qt/6-check-cache.png)](https://postimg.cc/z3yZkS1y)


**Maintain cache**

To be mindful towards the user, I found it considerate to not overload the users cache. I therefore limited the cache storage to 4 images. If more is added older ones get replaced.

[![6-limit-Cache-Size.png](https://i.postimg.cc/9fqtZ4RJ/6-limit-Cache-Size.png)](https://postimg.cc/d7wyKV9y)

**The other requests**

The larger images on the detailpage are not the only resources where caching gains can be made. As I mentioned earlier there are some static assets that can be served from memory to the user. Below I check to see if a incoming request is already in a `staticCacheName` (a separate cache called history) if it is, serve from there else proced with normal request. If both scenarios don't work serve offline file from cache.

[![6-else-serve-cache-request-offline.png](https://i.postimg.cc/DZ1q8tJZ/6-else-serve-cache-request-offline.png)](https://postimg.cc/cg4Kzkcy)

**Offline page**

The offline file shown with three last visited images from the detailspage.

[![6-Offline-page-SW.png](https://i.postimg.cc/BQ7p8sLM/6-Offline-page-SW.png)](https://postimg.cc/rKWxbB9r)

**Lighthouse**

The service worker (SW) has positivly impacted the [critical rendering path](https://github.com/stanRepo/progressive-web-apps-2021) (the steps the browser goes through to convert HTML,CSS & JS into actual pixels on the screen), cached assets are almost instantly available and ready to work with.

 | **With SW** | **Without SW** | 
|:---------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------| 
| [![9-lighthouse-zonder-SW.png](https://i.postimg.cc/BbrgM6MB/9-lighthouse-zonder-SW.png)](https://postimg.cc/5QmLtxcX)| [![9-lighthouse-met-SW.png](https://i.postimg.cc/3R7Qb8b7/9-lighthouse-met-SW.png)](https://postimg.cc/Z9fQWSSD) | 


**Network tab**

Without SW on first view:<br>
 [![zonder-SW-network.png](https://i.postimg.cc/vmzwk1gh/zonder-SW-network.png)](https://postimg.cc/B8Xz1nCP)

With SW on repeat view:<br>
 [![met-sw-network.png](https://i.postimg.cc/Vk2JvVDp/met-sw-network.png)](https://postimg.cc/pmYW1qNJ)
 
 
 ## Revision checklist (See closed issues)

- [x] Fix broken gif on detail page (image doesn't show)
- [x] Fix webp to gif fallback  on detail page
- [x] Fix broken offline page
- [x] Remove old files (like 'index2copy.ejs') 
- [x] Refactor routes with modules
- [x] Make app installable 
- [x] Have a working version of the app online

 
 ## Sources
 - [Carbon source code images](https://carbon.now.sh/) 
 - [Defer no critical CSS](https://web.dev/defer-non-critical-css/)
 - [ExpressJS](https://expressjs.com/)
 - [First Contentful Paint](https://web.dev/first-contentful-paint/)
 - [Giphy endpoint trending](https://developers.giphy.com/docs/api/endpoint/#trending)
 - [Giphy API explorer](https://developers.giphy.com/explorer)
 - [EJS](https://ejs.co/)
 - [NPM](https://www.npmjs.com/)
 - [Perceived performance](https://developer.mozilla.org/en-US/docs/Learn/Performance/Perceived_performance)
 - [Picture element](https://www.voorhoede.nl/en/blog/why-our-website-is-faster-than-yours/#-picture-element)
 - [Postimage](https://postimages.org/)
 - [PWA Tutorial](https://www.youtube.com/watch?v=4XT23X0Fjfk&list=PL4cUxeGkcC9gTxqJBcDmoi5Q2pzDusSL7)
 - [No reflow](https://www.voorhoede.nl/en/blog/say-no-to-image-reflow/)
 - [WEBP](https://www.voorhoede.nl/en/blog/why-our-website-is-faster-than-yours/#webp)
 
 
## License

Creative Commons Attribution-ShareAlike 4.0 International Link 
