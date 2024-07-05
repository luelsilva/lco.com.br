document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    let formData = new FormData(event.target);
    let formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    let json = JSON.stringify(formObject);
    console.log(json); // Aqui você pode fazer o que quiser com o JSON, como enviá-lo via AJAX

    // Exemplo de como enviar via AJAX (fetch API):
    // fetch('/your-endpoint', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: json
    // }).then(response => {
    //     return response.json();
    // }).then(data => {
    //     console.log(data);
    // }).catch(error => {
    //     console.error('Error:', error);
    // });
});
