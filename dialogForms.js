function closeAllDialogs(event){
    document.getElementById('dialogBackground').style.display = 'none';
    for (const dialog of document.getElementsByClassName('dialog')) {
        dialog.style.display = 'none';
    }
}

// async function Alert_(message){
//     document.getElementById('dialogBackground').style.display = 'block';
//     document.getElementById('alertdiv').style.display = 'inline-block';

//     window.addEventListener('keypress', function (event) {
//         if(event.keyCode === 13){
//             closeAllDialogs(event);
//         }
//     }, {once: true})

// }


let Alert = (message) => {
    let executor = function(resolve, reject){
        try{
            document.getElementById('dialogBackground').style.display = 'block';
            document.getElementById('alertdiv').style.display = 'inline-block';
            document.getElementById('alertdiv').getElementsByTagName('p')[0].innerText = message;

            function globalKeyDown(event) {
                if(event.keyCode === 13){
                    closeAllDialogs(event);
                    resolve(document.getElementById('promptdiv').getElementsByTagName('input')[0].value);
                    window.removeEventListener('keydown', globalKeyDown);
                    return;
                }

                if(event.keyCode === 27){
                    closeAllDialogs(event);
                    resolve(null);
                    window.removeEventListener('keydown', globalKeyDown);
                    return;
                }
            }
            
            window.addEventListener('keydown', globalKeyDown);
        } catch(error){
            reject(error);
        }
    }

    return new Promise(executor);
}

let Confirm = (message) => {
    let executor = function(resolve, reject){
        try{
            document.getElementById('dialogBackground').style.display = 'block';
            document.getElementById('confirmdiv').style.display = 'inline-block';
            document.getElementById('confirmdiv').getElementsByTagName('p')[0].innerText = message;

            function globalKeyDown(event) {
                if(event.keyCode === 13){
                    closeAllDialogs(event);
                    resolve(document.getElementById('promptdiv').getElementsByTagName('input')[0].value);
                    window.removeEventListener('keydown', globalKeyDown);
                    return;
                }

                if(event.keyCode === 27){
                    closeAllDialogs(event);
                    resolve(null);
                    window.removeEventListener('keydown', globalKeyDown);
                    return;
                }
            }
            
            window.addEventListener('keydown', globalKeyDown);
        } catch(error){
            reject(error);
        }
    }

    return new Promise(executor);
}

let Prompt = (message) => {
    let executor = function(resolve, reject){
        try{
            document.getElementById('dialogBackground').style.display = 'block';
            document.getElementById('promptdiv').style.display = 'inline-block';
            document.getElementById('promptdiv').getElementsByTagName('p')[0].innerText = message;
            document.getElementById('promptdiv').getElementsByTagName('input')[0].focus();

            function globalKeyDown(event) {
                if(event.keyCode === 13){
                    closeAllDialogs(event);
                    resolve(document.getElementById('promptdiv').getElementsByTagName('input')[0].value);
                    window.removeEventListener('keydown', globalKeyDown);
                    return;
                }

                if(event.keyCode === 27){
                    closeAllDialogs(event);
                    resolve(null);
                    window.removeEventListener('keydown', globalKeyDown);
                    return;
                }
            }
            
            window.addEventListener('keydown', globalKeyDown);
        } catch(error){
            reject(error);
        }
    }

    return new Promise(executor);
}