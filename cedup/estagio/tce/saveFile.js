
import { getFormDataAsJson, saveJsonToFile } from './util';

document.getElementById('saveBtn').addEventListener('click', function () {

    const form = document.getElementById('myForm');
    const formData = getFormDataAsJson(form);
    const fileName = 'Cedup-TCE-' + formData['nomeEstagiario'];

    saveJsonToFile(formData, fileName);

});
