const feliz = document.querySelector('#feliz')
const giraffe = document.querySelector('#giraffe')
const sutil = document.querySelector('#sutil')
const bolero = document.querySelector('#bolero')
const websharper = document.querySelector('#websharper')
const falco = document.querySelector('#falco')

export function get_key() {
    let defaultlib = localStorage.getItem('html2fslib') ?? 'feliz'
    return defaultlib
}

export function persist_key(lib) {
    localStorage.setItem('html2fslib', lib)
    return
}

export function changeLib(lib) {
    if (lib == 'feliz') {
        feliz.classList.add('btn-primary')
        giraffe.classList.remove('btn-primary')
        sutil.classList.remove('btn-primary')
        bolero.classList.remove('btn-primary')
        websharper.classList.remove('btn-primary')
        falco.classList.remove('btn-primary')
    }
    if (lib == 'giraffe') {
        feliz.classList.remove('btn-primary')
        giraffe.classList.add('btn-primary')
        sutil.classList.remove('btn-primary')
        bolero.classList.remove('btn-primary')
        websharper.classList.remove('btn-primary')
        falco.classList.remove('btn-primary')
    }
    if (lib == 'sutil') {
        feliz.classList.remove('btn-primary')
        giraffe.classList.remove('btn-primary')
        sutil.classList.add('btn-primary')
        bolero.classList.remove('btn-primary')
        websharper.classList.remove('btn-primary')
        falco.classList.remove('btn-primary')
    }
    if (lib == 'bolero') {
        feliz.classList.remove('btn-primary')
        giraffe.classList.remove('btn-primary')
        sutil.classList.remove('btn-primary')
        bolero.classList.add('btn-primary')
        websharper.classList.remove('btn-primary')
        falco.classList.remove('btn-primary')
    }
    if (lib == 'websharper') {
        feliz.classList.remove('btn-primary')
        giraffe.classList.remove('btn-primary')
        sutil.classList.remove('btn-primary')
        bolero.classList.remove('btn-primary')
        websharper.classList.add('btn-primary')
        falco.classList.remove('btn-primary')
    }
    if (lib == 'falco') {
        feliz.classList.remove('btn-primary')
        giraffe.classList.remove('btn-primary')
        sutil.classList.remove('btn-primary')
        bolero.classList.remove('btn-primary')
        websharper.classList.remove('btn-primary')
        falco.classList.add('btn-primary')
    }

    persist_key(lib)
    return
}

export function startup() {
    changeLib(get_key())

    feliz.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        changeLib('feliz')
    })

    giraffe.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        changeLib('giraffe')
    })

    sutil.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        changeLib('sutil')
    })

    bolero.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        changeLib('bolero')
    })

    websharper.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        changeLib('websharper')
    })

    falco.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        changeLib('falco')
    })
}
