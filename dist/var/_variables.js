export const vars = {
    "guttter":1.5,
    "minmax":"max-width",
    sm:576,
    md:768,
    lg:992,
    xl:1200,
    xxl:1400,
    dev:false
}

class Variables{
    devMode(){
        console.log('setting dev mode to true')
        vars.dev = true
    }
}
export const variables = new Variables()