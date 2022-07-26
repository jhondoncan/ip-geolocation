const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '043200c9d2msh3ecd508957f6ffbp1356f5jsn1aebcafe9d12',
        'X-RapidAPI-Host': 'ip-geolocation-and-threat-detection.p.rapidapi.com'
    }
};

const fetchIpInfo = ip => {
    return fetch(`https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`, OPTIONS)
        .then(res => res.json())
        .catch(err => console.log(err));
}

const $ = selector => document.querySelector(selector);
const $form = $('#form')
const $input = $('#input')
const $submit = $('#submit')
const $results = $('#results')
const $myIp = $('#myIp')

const patronIp = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm);

$form.addEventListener('submit', async event => {
    event.preventDefault();
    $input.removeAttribute('aria-invalid')
    const { value } = $input;

    if (!value.search(patronIp) == 0) {
        $input.setAttribute('aria-invalid', 'true');
        Swal.fire({
            title: "",
            text: "Has introducido un valor que no parece ser una dirección IP válida",
            icon: "error",
            confirmButtonColor: "#19B3E6",
            confirmButtonText: "Aceptar",
        });

    } else {
        $input.setAttribute('aria-invalid', 'false');
    }

    $submit.setAttribute('disabled', '');
    $submit.setAttribute('aria-busy', 'true')

    const ipInfo = await fetchIpInfo(value)

    if (ipInfo) {
        $results.innerHTML = JSON.stringify(ipInfo, null, 2)
    }

    $submit.removeAttribute('disabled')
    $submit.removeAttribute('aria-busy')

})



