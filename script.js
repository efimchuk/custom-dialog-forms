document.getElementById('alert').onclick = async function (event){
    await Alert('ALERT');

    console.log('ALERT');
}

document.getElementById('confirm').onclick = async function (event){
    let result = await Confirm('CONFIRM');

    console.log(`CONFIRM result=${result}`);
}

document.getElementById('prompt').onclick = async function (event){
    let result = await Prompt('Prompt');

    console.log(`PROMPT value=${result}`);
}
