function showCaptcha(target) {
    var handle;
    handle = setInterval(function() {
        if (target.value && target.checkValidity()) {
            document.getElementsByClassName('g-recaptcha')[0].classList.remove('hidden');
            clearInterval(handle);
         }
    }, 100);
    target.addEventListener('blur', function() {
        clearInterval(handle);
    })
    
}

function showSubmit(token) {
    document.getElementsByClassName('submit')[0].classList.remove('hidden');
}

function handleSubscribe(form) {
    email = form['subscriber'].value;
    captcha = form['g-recaptcha-response'].value;

    fetch('https://zeuf87ob7l.execute-api.us-east-1.amazonaws.com/default/ccgd_add_subscriber', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subscriber: email,
            response: captcha
        })
    }).then(resp => {
        return resp.json();
    }).then(data=> {
        document.getElementById('subscriber-email').classList.add('hidden');
        document.getElementsByClassName('g-recaptcha')[0].classList.add('hidden');
        document.getElementsByClassName('submit')[0].classList.add('hidden');
        if (data['success']) {
            document.getElementById('success').classList.remove('hidden');
        } else {
            document.getElementById('failure').classList.remove('hidden');
        }
        console.log(data);
    })
}