var Manage = new Tool('Manage')
Manage.set('color', 'rgba(171, 193, 199, 1)')
Manage.set('description', 'Update your email address and logout.')

Manage.on('open', function () {
  $('#ManageEmail').val(Cookie.email)
})

Manage.save = function () {
  var email = $('#ManageEmail').val()
  
  if (!Manage.validateEmail(email))
    return Flasher.error('Invalid Email')
  
  if (email === Cookie.email)
    return Launcher.open('Home')
  
  $.post('/nudgepad.updateEmail', {email : email}, function () {
    nudgepad.warnBeforeReload = false
    document.location = '/nudgepad?tool=Home'
  })
}

Manage.validateEmail = function (email) { 
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}

