<p align="center">
    <img src="https://raw.githubusercontent.com/Aulero99/small_grid/453667cbe78886d5a1186b2eae901eed03a15e25/src/assets/img/logo.svg" alt="Suspendors Logo" width="200" height="200">
</p>

<h1 align="center">Suspendors</h1>

<p align="left">
    Lightweight framework with easily integrated callbacks and easily configurable breakpoint logic that doesn't break scrolling between screen sizes and different devices.
</p>

## Suspendors 1.5

<p>
    The goal of this project was to eliminate common framework issues that anyone who has worked in a framework has inevitably encountered. Issues such as scroll locking or jumping are eliminated when using the integrated cvh and cvw functions and work nearly identically as vh and vw but across practically all devices not just the newer ones. Needing to integrate different logic such as different tools between desktop and mobile platforms are now easily implemented by registering the startup functions with Suspendors and letting it handle the thinking. It is also easy to track orientation with suspendors by utilizing the native support and functions can be registered to trigger with an orientation flip as needed.   
</p>

## Installation
<p>
To install Suspendors there are currently 2 options:

- Clone the repo: `https://github.com/Aulero99/suspendors.git`
- Install with [npm](https://www.npmjs.com/): `npm install suspendors`
</p>

<p>
After installation you need to import the grid to the root of your project's scss stylesheet:

`@import "suspendors";`

This will give your project access to the scss grid of suspendors and all the goodness that comes with that (see 'Using the Grid' below).
</p>

<p>
Then you need to import the javascript to the root of your project (see 'Using the Javascript Events' below):

`import { suspendors } from 'suspendors';`

then import each suspendors module as needed (coming soon)
</p>

## Using the Grid

<p>
Using the Suspendors grid is nearly identical to using the Bootstrap grid system with the similar syntax. By default Suspendors behaves similarly to bootstrap with the following breakpoints:

- sm: 576px;
- md: 768px;
- lg: 992px;
- xl: 1200px;
- xxl: 1400px;

and the styles kick in below those points with a default taking priority in over the xxl breakpoint. You can change this behavior by changing the min/max-width parameter in the `_variables.scss` file, you can also modify the breakpoints as well within that same file, however make sure those values match those within the `Variables.json` file in order to ensure proper operation of the framework.

The parent of the grid is `.container` with each section of the grid requiring a `.row`, after that you can implement a grid by using `.col-bp-x` or `col-fill` style ranging from with `bp` being replaced by the corresponding breakpoint and `x` being replaced with 1-12 and col-fill will just fill in the available x-space available.

All classes included are:

### Grid

- `.container` The parent of the 'grid' with width set to 100%
    * `.container-x` as of 1.5.1 with max width of the corresponding breakpoint
    * `container-solid` as of 1.5.1 with max-width set to next lowest breakpoint
    * `container-shift` as of 1.5.1 switches behavior from solid to standard at given breakpoint
- `.row` each row of the grid
    * `.flex-col` applied to a `.row` will change the flex-direction to column from its default row, which has its uses
    * `.gx-bp-x`,`.gy-bp-x`, & `g-bp-x` will adjust spacing between rows and containers as of 1.5.1
    * `.cols-bp-x` as of 1.5.1 sets all `.col` elements within to behave like `.col-bp-x` classes
- `.col-bp-x` designates a column in the row
    * `x` between 1-12
- `.col-fill` fills the available space in the row
    * ex: a row with a col-3 and a col-fill will have the col-fill act like a col-9, and if that col-3 becomes a col-6 after a bp the col-fill will then act as a col-6
- `.vol-bp-x` as of 1.5.1 sets the volume of an object (height based on the current screen size)
    * `x` between 1-12

### Gutters
    NOTE - gutters can only be applied to rows to space objects inside them
- `g-bp-x` Adjusts x and y gutters
- `gx-bp-x` Adjusts x gutter
- `gy-bp-x` Adjusts y gutter
    * Modifiers for `x` are 0-5

### Padding
- `.p-bp-x` Padding All
- `.pt-bp-x` Padding Top
- `.pb-bp-x` Padding Bottom
- `.ps-bp-x` Padding Start
- `.pe-bp-x` Padding End
- `.px-bp-x` Padding X
- `.py-bp-x` Padding Y
    * Modifiers for `x` are 0-5

### Margin 
- `.m-bp-x` Padding All
- `.mt-bp-x` Padding Top
- `.mb-bp-x` Padding Bottom
- `.ms-bp-x` Padding Start
- `.me-bp-x` Padding End
- `.mx-bp-x` Padding X
- `.my-bp-x` Padding Y
    * Modifiers for `x` are 0-5

### Flexbox

- `.flex-bp-row` Implements display flex with flex-row
- `.flex-bp-col` Implements display flex with flex-col
- `.grow-bp-1` Implements flex-grow: 1;
- `.align-bp-x` Sets flex alignment
    * Modifiers for `x`:
    *  `-start`
    * `-end`
    * `-center`
    * `-between`
    * `-around`
    * `-even`
- `.justify-bp-x` Sets flex justify
    * Modifiers for `x`:
    *  `-start`
    * `-end`
    * `-center`
    * `-between`
    * `-around`
    * `-even`
- `.grow-bp-1` sets the flex grow to 1

### Utility Classes

- `.fill-bp` sets height and width to 100% and grow to 1
- `.fill-bp-x` sets width to 100%
- `.fill-bp-y` sets height to 100%
- `.d-bp-none` sets element to display none
- `.d-bp-flex` sets element to display flex
- `.d-bp-block` sets element to display block
- `.e-bp-x`/`.elevation-bp-x` adds a box shadow to the element

### Other Implementations

In addition to the utility and grid classes, Suspendors also comes with some custom units to be used in custom styles. These units are what the grid uses for its own styles and are activated by the `suspendors.setup()` function, and when used properly will stop the locking and jumping issues from standard vh and vw units. 
    
    NOTE - If suspendors.setup() does not run either because dom never finished loading or was never called, these units default to vh/vw units respectively and scroll locking and jumping will continue to occur.

- `vol(x)` works exactly like `.vol-x`
- `col(x)` works exactly like `.col-x`
    * Both `vol(x)` & `col(x)` only work with values 1-12, any other values are liable to break the grid system.
    * Neither `vol(x)` & `col(x)` implement breakpoint logic
- `height(x)` works exactly like `lvh` but across everything using absolute pixel values and logic to fix scroll locking and jumping
- `width(x)` works exactly like `lvw` but uses absolute pixel values
- `pad(x)` works exactly like `.p-x`
- `mar(x)` works exactly like `.m-x`

</p> 

## Using the Javascript Events

<p>

If you are looking to utilize the Events of Suspendors, you have 2 options, either to set up an event listener, or use the `registrar` module (currently in beta) to register the functions you want to call at each breakpoint. 

The event names you can listen to are as follows:

- `tie_sm`
- `tie_md`
- `tie_lg`
- `tie_xl`
- `tie_xxl`
- `tie_over`*
- `tie_under`*
- `tie_portrait`
- `tie_landscape`

<br/>

    * NOTE - that the tie_over and tie_under events are dependant on the mode of suspendors set by the minmax variable. By default minmax is set to max-width, which sets the behavior of the grid to use max-width to determine its breakpoints and apply the -bp classes when BELOW the breakpoint. This means that tie_sm will apply when the screen is a 0-sm and tie_over will apply when screen is at xxl-infinity. As a comparison, bootstrap uses min-width to determine its breakpoints, which applies a -bp class when ABOVE the breakpoint, which would make the tie_under apply when the screen is between 0-sm, sm apply when screen is sm-md  and so on. You can configure this behavior by setting the minmax variable to the chosen value. 

To set up an event listener use standard javascript event listener syntax like this:


`window.addEventListener("tie_sm", (e) => {function}, false)`

</p>

<p>

Once you have your event listeners set up you can either have your project wait to call them, or at any point check with suspendors to call the events using the following:

- `suspendors.triggerAll()`
- `suspendors.triggerOrientation()`
- `suspendors.triggerScreen()`


You can also get the environment with some callback functions that will return the breakpoint or orientation accordingly:

- `suspendors.returnScreen()`
- `suspendors.returnOrientation()`
</p>

## Modules
Coming Soon

## Changelog

- 1.2 - Implemented callbacks for Javascript Events
- 1.3 - changed callbacks to be triggered at breakpoints instead of at every screen size change. 
    * 1.3.2:
        * Added `.flex-col` support to rows
        * Added `setupSizerOnly()` as a function to bypass `setup()` if you only the grid to function and didn't want the callbacks to trigger.
- 1.4 - changed listeners from `clip_` to `tie_` for future features
    * 1.4.1
        * Fixed bug with functions not being called after load
        * Added auto start for event broadcasters
        * Added in manual triggers for event broadcasters
        * Added return functions that return the breakpoint and orientation state
    * 1.4.2
        * Cleaned up code, fixed mistake on var file still having dev enabled
    * 1.4.3
        * added `cvh-X` and `cvw-X` utility classes
    * 1.4.4
        * fixed bug where styles would not dynamically apply and override the previous breakpoint
    * 1.4.5
        * changed default background color to 000 to make rotations on mobile look better
        * fixed bug where iphone would not update vh appropriately
        * renamed custom scss units to `tie_` to better match the naming convention of the javascript names
        * renamed the `cvh-X` & `cvw-X` utility classes to `vh-X` and `vw-X` for better naming conventions
        * added tie_p & tie_m as units based on gutter variable that can be used in custom styles with values identical to p-x and m-x utility classes
        * changed the padding calcs from 1/6 to 1/5 to eliminate padding/margin jump on p-4 to p-5
    * 1.4.6
        * changed variables from json file to js file for expandability in the future
- 1.5 - Module support added
    * 1.5.1
        * fixed glitch with `:root` elements making duplicates from `@import`
        * changed `gutter` to `spacer` for better naming conventions
        * fixed glitch with event listeners not removing themselves properly
        * fixed glitch where `minmax` variable being set to 'min-width' would not change behavior to match bootstraps
        * fixed oversight where return functions would return incorrectly or nothing
        * added gutter logic,`.g-bp-x` styles for `.row` classes
            * all gutter classes are responsive to screen size like all other sizes
        * added the `.cols-x` class to rows to make all child `.col` elements into appropriate col-x classes
        * changed `.vh` class to `.vol` for more pleasing syntax
            * expanded the `.vol` class to use same conventions of `.col` with a 1-12 convention instead of a percent conversion
        * added `container-bp`,`container-solid`, and `container-shift`
        * removed `.vw` class as it conflicted with the `.col` classes and is irrelevant with `.fill` for the most part
        * changed sass functions to different names for better readability
            * `tie_` removed from all classes, now only used in javascript events
            * `vh` now called `vol` or `height` for better neaming conventions
            * `tie_p` now called `pad`
