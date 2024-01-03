const feliz = document.querySelector('#feliz')
const giraffe = document.querySelector('#giraffe')
const sutil = document.querySelector('#sutil')
const bolero = document.querySelector('#bolero')

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
        feliz.parentElement.classList.add('is-active')
        giraffe.parentElement.classList.remove('is-active')
        sutil.parentElement.classList.remove('is-active')
        bolero.parentElement.classList.remove('is-active')
    }
    if (lib == 'giraffe') {
        feliz.parentElement.classList.remove('is-active')
        giraffe.parentElement.classList.add('is-active')
        sutil.parentElement.classList.remove('is-active')
        bolero.parentElement.classList.remove('is-active')
    }
    if (lib == 'sutil') {
        feliz.parentElement.classList.remove('is-active')
        giraffe.parentElement.classList.remove('is-active')
        sutil.parentElement.classList.add('is-active')
        bolero.parentElement.classList.remove('is-active')
    }
    if (lib == 'bolero') {
        feliz.parentElement.classList.remove('is-active')
        giraffe.parentElement.classList.remove('is-active')
        sutil.parentElement.classList.remove('is-active')
        bolero.parentElement.classList.add('is-active')
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
}
