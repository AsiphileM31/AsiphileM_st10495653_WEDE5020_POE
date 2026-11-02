/*=========================================================================
ANN'S BAKERY - FORMS.JS
Client-side validation, error messages, AJAX submission
=========================================================================*/

//----------- VALIDATION HELPERS -------------
const validators = {
    required: function (value) {
        return value.trim() !== '' ? null: 'This field is required .'
    },
     email: function (value) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(value) ? null : 'Please enter a valid email adrress.';
     },
     phone : function (value) {
        //South African phone  0XX XXX XXXX (10 digits, spaces otpional)
        const re = /^0\d{2}\s?\d{3}\s?\d{4}$/;
        return re.test (value.replace(/\s/g, '').replace (/^(\d{3})(\d{3})(\d{4}))$/, '$1 $2 $3')) ||
            /^0\d{9}$/.test(value.replace(/\s/g, ''))
            ? null 
            : 'Valid SA phone number must be enter (e.g 082 453 8977).';
     },
     minLength : function (value,min) {
        return value.trim ().length >= min ? null : 'Please enter at leasr ${min} characters.';

     },
     dateFuture : function (value) {
        const seleceted = new Date (value);
        const today = new Date ();
        today.setHours(0,0,0,0);
        return seleceted >= today ? null: 'Kindly choose day of your choice for the future date.';

     }
};

//-------------- DISPLAY ERROR ---------------
function showError(input,message) {
    const existing = input.parentElement.querySelector('.error-message');
    if (existing) existing.remove();

    input.classList.add('input-eror');
    const error = document.createElement('p');
    error.className = 'error-message';
    error.textContent = message;
    error.setAttribute('role', 'alert');
    input.parentElement.appendChild(error);
}

function clearError(input) {
    input.classList.remove('input-error');
    const existing = input.parentElement.querySelector('.error-message');
    if (existing) existing.remove();
}


//------------------ VALIDATE ORDER FORM -----------
function validateOrderform(form) {
    let isValid = true;
    const fields = [
      {id: 'FullName', rules: [validators.required,(v) => validators.minLength (v,2)] },
      {id: 'email', rules: [validators.required, validators.email] },
      {id: 'phone', rules: [validators.required, validators.phone] },
      {id: 'pickUpDate', rules: [validators.required, validators.datefuture] }
    ];

    fields.forEach(function (field) {
        const input = document.getElementById(field.id);
        if(!input) return;
        clearError (input);
        for(let rule of field.rules) {
            const error = rule(input.value);
        if (error) {
            showError(input, error);
            isValid = false;
            break;
          }
        }
    });


//Check at least one product selected
const productBoxes = form.querySelectorAll('input[name "productScone"]:checked, input[name="productCake"]:checked');
const productError = document.getElementById('productError');
if (productBoxes.length === 0) {
    if (!productError) {
        const msg = document.createElement('p');
        msg.id = 'productError';
        msg.className = 'error-message';
        msg.textContent = 'please select at least one product.';
        form.querySelector('fieldset:nth-of-type(2)').appendChild(msg);
    }

    isValid = false;
}else if(productError) {
    productError.remove();
}

return isValid;
}

//------------------ VALIDATE CONTACT FORM -----------------------
function validateContactForm(form) {
    let isValid = true;
    const fields = [
        {id: 'contactName', rules:[validators.required, (v) => validators.minLength] },
        {id: 'contactEmail', rules: [validators.required, validators.email]},
        {id: 'message', rules: [validators.required, (v) => validators.minLength(v, 10)] }
    ];

    fields.forEach(function (field) {
        const input = document.getElementById(field.id);
        if (! input) return;
        clearError(input);

        for (let rule of field.rules) {
            const error = rule(input.value);
            if (error) {
                showError(input, error);
                isValid = false;
                break;
            }
        }
    });
    return isValid;
}

//-------------------- STIMULATED AJAX SUBMISSION -------------------
function submitFormAJX(form, successMessage) {
    const submitBtn = form.querySelector('input[type="submit"], button[type="submit"]');
    const originalText = submitBtn ? submitBtn.value || submitBtn.textContent : '';
    if (submitBtn) {
        submitBtn.disabled = true;
        if (submitBtn.value) submitBtn.value = 'Sending...';
        else submitBtn.textContent = 'Sending...';
    }

    //Build form data
    const formData = new FormData(form);
    
    //Simulated AJAX (no real sever in this project
    // In production: fetch ('https://your-sever-.com/api/order', {method: 'POST', body: formData})
    setTimeout(function() {

    // show success message
    const success = document.createElement('div');
    success. className = 'form-success';
    success.setAttribute('role', 'status');
    success.innerHTML = '<strong> Thank you! </strong> ${successMessage}';

    //Remove any existing success message
    const old = form.querySelector('.form-success')
        if (old) old.remove();

        form.prepend(success);
        form.reset();

        if (submitBtn) {
            submitBtn.disabled = false;
            if (submitBtn.value) submitBtn.value = originalText;
            else submitBtn.textContent = originalText;
        }

        //Scroll to success message
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });

        //Remove success message after 8 seconds
        setTimeout(function (){ success.remove (); }, 8000);
    }, 1200);
}

// ------------- ATTACH TO FORMS ---------------------
document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.getElementById('orderForm') || document.querySelector('form[action="#"]');

    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validateOrderForm(orderForm)) {
                const firstError = orderForm.querySelector('.input-error');
                if (firstError) firstError.focus();
                return;
            }

            const nameField = document.getElementById('FullName') || document.getElementById('fullName');
            const name = nameField ? nameField.value : '';
            const productInputs = orderForm.querySelectorAll('input[name="productScone"]:checked, input[name="productCake"]:checked');
            const products = Array.from(productInputs).map(function (cb) { return cb.value; }).join(', ');
            const pickupField = document.getElementById('pickUpDate') || document.getElementById('pickupDate');
            const pickup = pickupField ? pickupField.value : '';

            submitFormAJX(
                orderForm,
                `Your order for <strong>${products}</strong> has been received, ${name}. Ann will confirm availability and pickup for <strong>${pickup}</strong> by your email or phone. Estimated cost depends on quantity - Ann will confirm final pricing.`
            );
        });
    }

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validateContactForm(contactForm)) {
                const firstError = contactForm.querySelector('.input-error');
                if (firstError) firstError.focus();
                return;
            }

            const name = document.getElementById('contactName') ? document.getElementById('contactName').value : '';
            const email = document.getElementById('contactEmail') ? document.getElementById('contactEmail').value : '';
            const phone = document.getElementById('contactPhone') ? document.getElementById('contactPhone').value : '';
            const subject = document.getElementById('subject') ? document.getElementById('subject').value : 'Website enquiry';
            const message = document.getElementById('message') ? document.getElementById('message').value : '';

            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%APhone: ${phone}%0D%0A%0D%0A${message}`;
            const mailto = `mailto:info@annsbakery.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            submitFormAJX(
                contactForm,
                'Your message has been prepared. Your email app will open so you can send it to Ann.'
            );

            setTimeout(function () {
                window.location.href = mailto;
            }, 800);
        });
    }
});