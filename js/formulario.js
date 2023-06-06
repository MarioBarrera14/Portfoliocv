// Obtiene el elemento del formulario con el id 'contact-form'
const form = document.getElementById('contact-form');

// Obtiene el botón con el id 'button'
const btn = document.getElementById('button');

// Agrega un evento de escucha al botón cuando se hace clic
btn.addEventListener('click', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente

  // Verifica si los campos del formulario están vacíos
  if (form.elements.nombre.value === '' || form.elements.apellido.value === '' || form.elements.email.value === '' || form.elements.message.value === '') {
    // Muestra una alerta indicando que se deben completar todos los campos
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Olvidaste cargar los datos!'
    });
    return;
  }

  // Muestra una alerta con el mensaje "Aguarde"
  Swal.fire({
    title: 'Se está enviando su mensaje',
    html: '<div class="loader"></div>',
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  // Envía el mensaje utilizando el servicio de emailjs
  emailjs.send('service_98oll1f', 'template_k0skitd', {
      name: form.elements.nombre.value,
      apellido: form.elements.apellido.value,
      email: form.elements.email.value,
      message: form.elements.message.value,
      phone: form.elements.phone.value
    }, 'hMI_U7zQJHGxxJjp_')
    .then(function(response) {
      // Se ejecuta si el mensaje se envió correctamente
      console.log('El mensaje se envió correctamente', response);
      btn.value = 'Send Email'; // Restaura el valor del botón

      // Restablece los valores de los campos del formulario a una cadena vacía
      form.elements.nombre.value = '';
      form.elements.apellido.value = '';
      form.elements.email.value = '';
      form.elements.message.value = '';
      form.elements.phone.value = '';

      // Muestra el toast con el mensaje de éxito
      Swal.fire(
        'Su mensaje se envió con éxito!',
        'Presione OK para continuar.',
        'success'
      );
    })
    .catch(function(error) {
      // Se ejecuta si ocurrió un error al enviar el mensaje
      console.error('Error al enviar el mensaje', error);
      btn.value = 'Send Email'; // Restaura el valor del botón
      alert(JSON.stringify(error)); // Muestra una alerta con el error
    });
});
