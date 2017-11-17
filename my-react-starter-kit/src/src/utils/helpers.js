import toastr from 'toastr'

const calcTime = dateIsoFormat => {
  let diff = new Date() - (new Date(dateIsoFormat))
  diff = Math.floor(diff / 60000)
  if (diff < 1) return 'less than a minute'
  if (diff < 60) return diff + ' minute' + pluralize(diff)
  diff = Math.floor(diff / 60)
  if (diff < 24) return diff + ' hour' + pluralize(diff)
  diff = Math.floor(diff / 24)
  if (diff < 30) return diff + ' day' + pluralize(diff)
  diff = Math.floor(diff / 30)
  if (diff < 12) return diff + ' month' + pluralize(diff)
  diff = Math.floor(diff / 12)
  return diff + ' year' + pluralize(diff)

  function pluralize (value) {
    return value !== 1 ? 's' : ''
  }
}

const escapeHTML = () => {
  return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const displayError = res => {
  if (typeof res === 'string') {
    toastr.error(res)
  } else if (typeof res.message !== 'undefined') {
    let errors = []
    if (typeof res.errors !== 'undefined' && Object.keys(res.errors).length > 0) {
      for (let error in res.errors) {
        console.log('error: ' + error, res.errors[error])
        errors.push(res.errors[error])
      }
    }
    toastr.error(typeof errors[0] !== 'undefined' ? errors[0] : res.message)
  }
}

const displaySuccess = message => toastr.success(message.toString())

export { calcTime, escapeHTML, displayError, displaySuccess }
