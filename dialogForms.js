function closeAllDialogs(event){
    document.getElementById('dialogBackground').style.display = 'none';
    document.getElementById('dialog').style.display = 'none';
    
    // for (const dialog of document.getElementsByClassName('dialog')) {
    //     dialog.style.display = 'none';
    // }
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
let dialog = {
    message : '',
    type : 0 // 0 - alert, 1 - confirm. 2 - prompt
}

function setDialogDiv(){
    let dialogDiv = document.getElementById('dialog');
    let messageDiv = dialogDiv.getElementsByTagName('p')[0];
    let okButton = dialogDiv.getElementsByClassName('okButton')[0];
    let cancelButton = dialogDiv.getElementsByClassName('cancelButton')[0];
    let valueInput = dialogDiv.getElementsByTagName('input')[0];
    
    dialogDiv.style.display = 'inline-block';
    dialogDiv.style.backgroundColor = 'white';
    dialogDiv.style.textAlign = 'center';
    dialogDiv.style.padding = '10px';
    dialogDiv.style.marginTop = '20px';
    dialogDiv.style.borderRadius = '3px';
    dialogDiv.style.minWidth = '150px';
    dialogDiv.style.fontFamily = 'Arial';

    messageDiv.innerText = dialog.message;
    messageDiv.style.display = 'block';
    
    okButton.style.display = 'block';
    okButton.style.padding = '10px;';
    okButton.style.float = 'right';
    okButton.style.borderLeft = '10px solid rgba(0,0,0,0)';
    okButton.style.borderRight = '10px solid rgba(0,0,0,0)';
    okButton.style.borderTop = '5px solid rgba(0,0,0,0)';
    okButton.style.borderBottom = '5px solid rgba(0,0,0,0)';
    okButton.style.borderRadius = '3px';
    okButton.style.fontFamily = 'Arial';
    okButton.style.fontSize = 15;

    if(dialog.type > 0){
        cancelButton.style.display = 'block';
        cancelButton.style.padding = '10px;';
        cancelButton.style.float = 'left';
        cancelButton.style.borderLeft = '10px solid rgba(0,0,0,0)';
        cancelButton.style.borderRight = '10px solid rgba(0,0,0,0)';
        cancelButton.style.borderTop = '5px solid rgba(0,0,0,0)';
        cancelButton.style.borderBottom = '5px solid rgba(0,0,0,0)';
        cancelButton.style.borderRadius = '3px';
        cancelButton.style.fontFamily = 'Arial';
        cancelButton.style.fontSize = 15;

        dialog.cancelButton = cancelButton;
    } else {
        cancelButton.style.display = 'none';
    }

    if(dialog.type > 1){
        valueInput.style.display = 'block';
        valueInput.style.padding = '5px';
        valueInput.focus();

        dialog.valueInput = valueInput;
    } else {
        valueInput.style.display = 'none';
    }

    dialog.div = dialogDiv;
    dialog.message = messageDiv;
    dialog.okButton = okButton; 

    return dialog;
}

function executor(resolve, reject){
    try{
        document.getElementById('dialogBackground').style.display = 'block';
        
        let dialog = setDialogDiv();

        function cancelButtonClickHandler(event){
            closeAllDialogs(event);
            resolve(dialog.type == '1' ? false : null);
            window.removeEventListener('keydown', globalKeyDown);
            return;
        }

        function okButtonClickHandler(event){
            closeAllDialogs(event);
            resolve(dialog.type == 2 ? dialog.valueInput.value : true);
            window.removeEventListener('keydown', globalKeyDown);
            return;
        }

        dialog.okButton.onclick = okButtonClickHandler;
        if(dialog.type > 0)
            dialog.cancelButton.onclick = cancelButtonClickHandler;

        function globalKeyDown(event) {
            if(event.keyCode === 13){
                okButtonClickHandler(event);
            }

            if(event.keyCode === 27){
                cancelButtonClickHandler(event);
            }
        }

        window.addEventListener('keydown', globalKeyDown);
    } catch (error){
        reject(error);
    }
} 

let Alert = (message) => {
    dialog.type = 0;
    dialog.message = message;

    return new Promise(executor);
}

let Confirm = (message) => {
    dialog.type = 1;
    dialog.message = message;

    return new Promise(executor);
}

let Prompt = (message) => {
    dialog.type = 2;
    dialog.message = message;

    return new Promise(executor);
}

window.alert = Alert;
window.prompt = Prompt;
window.confirm = Confirm;