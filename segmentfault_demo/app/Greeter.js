import config from './config.json';
function greet() {
    var greet = document.createElement('div');
    greet.textContent = config.greetText;
    return greet;
};
export default greet