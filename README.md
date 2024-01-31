<p align="center">
    <img src="https://raw.githubusercontent.com/Aulero99/small_grid/453667cbe78886d5a1186b2eae901eed03a15e25/src/assets/img/logo.svg" alt="Suspendors Logo" width="200" height="200">
</p>

<h3 align="center">Suspendors</h3>

<p align="center">
    Lightweight framework with easily integrated callbacks and easily configurable breakpoint logic that doesn't break between screen sizes.
</p>

## Suspendors 1.X

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
</p>

<p>
Then you need to import the javascript to the root of your project:

`import { suspendors } from 'suspendors';`
</p>

<p>
After that suspendors is ready to work, so you now need to register the functions you want to run within the framework by either registering them with the corresponding function. As of now Suspendors offers the following checks:

- .sm
- .md
- .lg
- .xl
- .xxl
- .under*
- .over
- .portrait
- .landscape

*By default Suspendors is configured to behave like bootstrap using the same breakpoints as of bootstrap 5.3 and the under check will never happen as the under and over logic happens when you go beyond the defined breakpoints with the default behavior using the sm breakpoint to initiate code when under the sm breakpoint and the over breakpoint to initiate code to when over the xxl breakpoint. However, you can change this behavior by changing the min-width or max-width variables in the two files in the `var` folder to behave as you would like which will in turn change the behavior of Suspendors to use code when over the breakpoints accordingly. 

To registers the code you want to run with each breakpoint simple send the functions you would like to run like so:

`suspendors.sm(function)`

or as function with a parameter:

`suspendors.sm(function.bind(null, 'param'))`

*NOTE - the registered functions will always run in the exact order of registering them

You can also do this for a requisite Event by adding an event listener for each of these as well by listening for a `clip` as well:

`window.addEventListener("clip_sm", (e) => {function}, false)`



</p>

