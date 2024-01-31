<p align="center">
    <img src="https://raw.githubusercontent.com/Aulero99/small_grid/453667cbe78886d5a1186b2eae901eed03a15e25/src/assets/img/logo.svg" alt="Suspendors Logo" width="200" height="200">
</p>

<h1 align="center">Suspendors</h1>

<p align="left">
    Lightweight framework with easily integrated callbacks and easily configurable breakpoint logic that doesn't break scrolling between screen sizes and different devices.
</p>

## Suspendors 1.X

<p>
    The goal of this project was to eliminate common framework issues that anyone who has worked in a framework has inevitably encountered. Issues such as scroll locking or jumping are eliminated when using the integrated cvh and cvw functions and work nearly identically as vh and vw but across practically all devices not just the newer ones. Needing to integrate different logic such as different tools between desktop and mobile platforms are now easily implemented by registering the startup functions with Suspendors and letting it handle the thinking. It is also easy to track orientation with suspendors by utilizing the native support and functions can be registered to trigger with an orientation flip as needed.   
</p>

### Changelog

- 1.2 - Implemented callbacks for Javascript Events
- 1.3 - changed callbacks to be triggered at breakpoints instead of at every screen size change. 

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

and run the `suspendors.setup()` function within that file
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

The parent of the grid is `.container` with each section of the grid requiring a `.row`, after that you can implement a grid by using `.col-bp-x` style ranging from with `bp` being replaced by the corresponding breakpoint and `x` being replaced with 1-12.

Utility classes included are:

### Padding
- `.p-bp-x` Padding All
- `.pt-bp-x` Padding Top
- `.pb-bp-x` Padding Bottom
- `.ps-bp-x` Padding Start
- `.pe-bp-x` Padding End
- `.px-bp-x` Padding X
- `.py-bp-x` Padding Y
    * Modifiers for `x` are 1-5

### Margin 
- `.m-bp-x` Padding All
- `.mt-bp-x` Padding Top
- `.mb-bp-x` Padding Bottom
- `.ms-bp-x` Padding Start
- `.me-bp-x` Padding End
- `.mx-bp-x` Padding X
- `.my-bp-x` Padding Y
    * Modifiers for `x` are 1-5

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

### Misc Utility Classes

- `.fill-bp` sets height and width to 100% and grow to 1
- `.fill-bp-x` sets width to 100%
- `.fill-bp-y` sets height to 100%
- `.d-bp-none` sets element to display none
- `.d-bp-flex` sets element to display flex
- `.d-bp-block` sets element to display block

### Other Implementations

In addition to the utility and grid classes, Suspendors also comes with 2 custom units to be used in custom styles called cvh() and cvw() which stand for calculated view height and width respectively. These units are what the grid uses for its own styles and are activated by the `suspendors.setup()` function, and when used properly will stop the locking and jumping issues from standard vh and vw units. 
    
    NOTE - If suspendors.setup() is not called cvh and cvw will default to vh and vw units respectively.

- `cvh(x)` works exactly like lvh but across everything
    * This custom unit fixes the scroll jumps & locks from the vh unit
- `cvw(x)` works exactly like lvw but across everything

</p> 

## Using the Javascript Events

<p>

If you are looking to utilize the Events of Suspendors, you now need to register the functions you want to run within the framework `before` you start the service by either registering them with the corresponding function or implementing a event listener. As of now Suspendors offers the following checks (all configurable in the var folder):

- .sm
- .md
- .lg
- .xl
- .xxl
- .under*
- .over
- .portrait
- .landscape

By default Suspendors is configured to behave like bootstrap using the same breakpoints as of bootstrap 5.3 and the under check will never happen as the under and over logic happens when you go beyond the defined breakpoints with the default behavior using the sm breakpoint to initiate code when under the sm breakpoint and the over breakpoint to initiate code to when over the xxl breakpoint. However, you can change this behavior by changing the min-width or max-width variables in the two files in the `var` folder to behave as you would like which will in turn change the behavior of Suspendors to use code when over the breakpoints accordingly. 

To registers the code you want to run with each breakpoint simple send the functions you would like to run like so:

`suspendors.sm(function)`

or as function with a parameter:

`suspendors.sm(function.bind(null, 'param'))`

    NOTE - the registered functions will always run in the exact order of registering them

You can also do this for a requisite Event by adding an event listener for each of these as well by listening for a `clip_` Event as well:

`window.addEventListener("clip_sm", (e) => {function}, false)`
</p>

<p>
After all your code is registered, and all your listeners are set up with Suspendors, then and only then should you start the service by calling the function:

`suspendors.setup()`

you can also call for an update or a single check trigger at any time to check for each of the event flags by calling:

`suspendors.trigger()`

& that's it! Easy, simple and useful.
</p>
