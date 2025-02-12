function includeHTML() {
    let elements = document.querySelectorAll('[data-include-html]');
    elements.forEach(el => {
        let file = el.getAttribute('data-include-html');
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error('Failed to load');
                return response.text();
            })
            .then(data => {
                el.innerHTML = data;
                el.removeAttribute('data-include-html');
                includeHTML(); 
            })
            .catch(error => console.error(error));
    });
}

document.addEventListener('DOMContentLoaded', includeHTML);
