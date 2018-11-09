
import './css/style.css';
import print from './print.js';


if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

if (module.hot) {
module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');

    })
}
