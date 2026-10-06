import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;

  // 🔥 PROPRIÉTÉS QUI MANQUAIENT
  successMessage = '';
  errorMessage = '';
  isSending = false;   // <<==== voici la propriété qui manquait !!

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.contactForm.invalid) {
      this.errorMessage = 'Merci de vérifier les informations du formulaire.';
      return;
    }

    // ⏳ on passe en mode "envoi"
    this.isSending = true;

    const formValues = this.contactForm.value;

    const templateParams = {
      from_name: formValues.name,
      company: formValues.company,
      reply_to: formValues.email,
      phone: formValues.phone,
      subject: formValues.subject,
      message: formValues.message,
    };

    emailjs
      .send(
        appConfig.emailJs.serviceId,
        appConfig.emailJs.templateId,
        templateParams,
        appConfig.emailJs.publicKey
      )
      .then((response: EmailJSResponseStatus) => {
        this.successMessage = 'Votre message a été envoyé avec succès !';
        this.contactForm.reset();
        this.submitted = false;
        this.isSending = false;  // 🟢 on arrête le mode "chargement"
      })
      .catch((error) => {
        this.errorMessage = 'Une erreur est survenue. Merci de réessayer plus tard.';
        this.isSending = false;  // 🛑 arrêter l’indicateur même en cas d’erreur
      });
  }
}
