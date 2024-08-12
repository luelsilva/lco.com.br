
// onClick do elemento loadBtn
document.getElementById('loadBtn').addEventListener('click', function () {
  document.getElementById('fileInput').click();
});

// onChange do elemento fileInput
document.getElementById('fileInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        const form = document.getElementById('myForm');
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
              input.value = data[key];
            }
          }
        }
      } catch (error) {
        alert('Erro ao processar o arquivo JSON: ' + error.message);
      }
    };
    reader.readAsText(file);
  }
});