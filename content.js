/**
 * Palette Swap
 * Make your browsing experience more colorful!
 * Swaps sites' palettes for ones pulled from colourlovers.org at random.
 * Rose Valle (revalle@github)
 * Initial template by Paolo Pedercini
 */

var topNPalettes = 1000;
/**
 * getRandomPaletteURL()
 * Returns the url to access a random color palette from colourlovers.com's top N.
 */
function getRandomPaletteURL() {
    var baseUrl = "http://www.colourlovers.com/api/palettes/top";
    baseUrl += ("?numResults=1&resultOffset=" + Math.floor(Math.random() * topNPalettes));
    console.log("Url: " + baseUrl);
    return baseUrl;
}

/**
 * getRandomPalette()
 * Returns a random palette from colourlovers.com.
 * 
 * returns: array of strings representing hex colors
 */
function getPalette() {
    var colors = [];
    try {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", getRandomPaletteURL(), false);
    xhr.send();
    var xmlDoc = xhr.responseXML;
    if(xmlDoc !== null) {
        var hexColors = xmlDoc.getElementsByTagName("hex");
        var num = hexColors.length;
        for(i = 0; i < hexColors.length; i++) {
            colors[i] = hexColors.item(i).innerHTML;
        }
        // Print palette name.
        paletteName = xmlDoc.getElementsByTagName("title").item(0).innerHTML;
        paletteName = paletteName.replace("<![CDATA[", "").replace("]]>", "");
        console.log("You are now using the palette " + paletteName + "!");
    } 
    } catch(err) {
        for(i = 0; i < 5; i++) {
            colors[i] = Math.floor(Math.random() * 16777216).toString(16)
            console.log("#" + colors[i]);
        }
    }
    
    return colors;
}

/**
 * setSitePalette(palette)
 * Sets the current page's palette to palette.
 * 
 * palette: An array of strings representing hex colors.
 * returns: nothing.
 */
function setSitePalette(palette) {
    // Set background.
    //document.body.style.background = "#" + testPalette[0];
    
    // Set link color.
    /*var links = document.getElementsByTagName('link');
    for(i=0; i<links.length; i++) {
        links[i].style.color = "#" + testPalette[2];
    }*/
    color0 = testPalette[0];
    color1 = testPalette[1];
    color2 = testPalette[2];
    color3 = testPalette[3];
    color4 = testPalette[4];
    var stylesheet = document.createElement('style');
    
    // Always recolor these properties, even if the site doesn't bother specifying them.
    stylesheet.innerHTML = "body { background-color: #" + color0 + " }";
    stylesheet.innerHTML += "a { color: #" + color2 + " }";
    
    // Recolor properties specific to the site's stylesheets.
    console.log("Stylesheets: " + document.styleSheets.length);
    for(var style = 0; style < document.styleSheets.length; style++) {
        var classes = document.styleSheets[style].rules || document.styleSheets[0].cssRules;
        if(classes != null) {
        for(var c = 0; c < classes.length; c++) {
            var currentRule = classes[c].style; // CSSStyleDeclaration
            if(currentRule) {
            // Properties to check for: color background-color bgcolor
            if(currentRule.getPropertyValue('color') !== null) {
                valString = currentRule.getPropertyValue('color');
                //console.log("Element " + classes[c].selectorText + " has color " + valString + ".");
                // Select the new color to use.
                newColor = "#" + testPalette[Math.floor(Math.random() * 5)];
                stylesheet.innerHTML += classes[c].selectorText + " { color: " + newColor + "}";
            }
            if(currentRule.getPropertyValue('background-color') !== null) {
                valString = currentRule.getPropertyValue('background-color');
                // Select the new color to use.
                newColor = "#" + testPalette[Math.floor(Math.random() * 5)];
                stylesheet.innerHTML += classes[c].selectorText + " { background-color: " + newColor + "}";
            }
            if(currentRule.getPropertyValue('bgcolor') !== null) {
                valString = currentRule.getPropertyValue('bgcolor');
                console.log("Element " + classes[c].selectorText + " has bgcolor " + valString + ".");
                // Select the new color to use.
                newColor = "#" + testPalette[Math.floor(Math.random() * 5)];
                stylesheet.innerHTML += classes[c].selectorText + " { bgcolor: " + newColor + "}";
            }
            }
        }
        } else {
            console.log("No stylesheet info?");
        }
    }
    document.body.appendChild(stylesheet);
}

var testPalette = getPalette();
console.log(testPalette);
setSitePalette(testPalette);
