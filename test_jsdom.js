const express = require('express');
const { JSDOM } = require('jsdom');
const app = express();
app.use(express.static('.'));

const server = app.listen(8080, async () => {
    console.log('Server started');
    try {
        const dom = await JSDOM.fromURL('http://localhost:8080/', {
            runScripts: 'dangerously',
            resources: 'usable'
        });

        dom.window.addEventListener('error', (e) => {
            console.log('PAGE ERROR:', e.message, e.filename, e.lineno);
        });

        // VirtualConsole for console.log inside the DOM
        dom.virtualConsole.on("error", (err) => {
            console.log('VIRTUAL CONSOLE ERROR:', err);
        });
        dom.virtualConsole.on("log", (msg) => {
            console.log('DOM LOG:', msg);
        });


        dom.window.addEventListener('load', () => {
            console.log('LOADED');
            setTimeout(() => {
                try {
                    const btn = dom.window.document.querySelector('#nav-compra');
                    if(btn) {
                        btn.click();
                        console.log('Click 1 simulated: Nav compra');
                    } else {
                        console.log('Nav compra not found');
                    }
                } catch(e) {
                    console.log('Click 1 failed', e);
                }

                setTimeout(() => {
                    try {
                        const items = dom.window.document.querySelectorAll('.shopping-item');
                        if (items.length > 0) {
                            items[0].click();
                            console.log('Click 2 simulated: shopping item clicked');
                        } else {
                            console.log('No shopping items found!');
                        }
                    } catch(e) {
                        console.log('Click 2 failed', e);
                    }
                    server.close();
                    process.exit(0);
                }, 500);
            }, 500);
        });
    } catch(e) {
        console.error('JSDOM error', e);
        server.close();
        process.exit(1);
    }
});
