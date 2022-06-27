/* Importation des fichiers js de bootstrap*/
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';


  
/* Compteur page d'accueil:
 * Années d'expérience, Clients heureux, Projets terminés, Coachs professionnels
 */ 
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
    counter.innerText ="0";
  
    function updateCounter() {
        const target = +counter.getAttribute("data-target"); //le signe plus(+)convertit target en nombre
        // console.log(typeof target, target);
        const c = +counter.innerText;
        const increment = Math.ceil(target / 200);
        // console.log(increment);
        if (c < target) {
            counter.innerText = `${c + increment}`;
            setTimeout(updateCounter, 1);
        }   
        else{
            counter.innerText = target;
            if (counter.classList.contains("plus")) {
                counter.innerText = "+" + `${c + increment}`;
            }
        }
    };
    updateCounter();
});



/**
 *  Validation de tous les formulaires
 */
 
 const forms = document.querySelectorAll("form");

 forms.forEach(form => {
     form.addEventListener("submit", function (e) {
         // Message général(couleur rouge ou verte selon qu'il ya erreur ou pas lors de la soumission du formulaire)
         const responseMessage = form.querySelector(".form__response-message");
 
         // Différentes erreurs qu'on peut avoir pour chaque input 
         let error;
         
         // Validation input text (nom)
         const regexText = /^[a-zA-Z-\s]+$/;       
         const inputText = form.querySelector("[type = text]");
         const inputTextError = form.querySelector(".form__error-messageText");
         // Si input text existe et que sa valeur ne correspond pas aux conditions de regexText
         if (inputText && regexText.test(inputText.value) == false) {
             error = "Ce champs accepte que les lettres majuscules, minuscules et tiret.";
             inputTextError.textContent = error;
             inputTextError.style.color = "red"
             inputText.setAttribute("aria-invalid", "true");
             inputText.focus();
         }
         // Si input text existe et que sa valeur correspond aux conditions de regexText
         // NB: On ne peut pas mettre "else" à la place de ce "if" parce que les autres
         // formulaires  qui n'ont pas de champs "text" auront une erreur.
         if (inputText && regexText.test(inputText.value) == true) {
             inputTextError.textContent = "";  
             inputText.removeAttribute("aria-invalid");
         }
         // Validation input email
         const regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
         const inputEmail = form.querySelector("[type = email]");
         const inputEmailError =  form.querySelector(".form__error-messageEmail");
         if (inputEmail && regexEmail.test(inputEmail.value) == false) {
             error = "Adresse email incorrect";
             inputEmailError.textContent = error;
             inputEmailError.style.color = "red";
             inputEmail.setAttribute("aria-invalid", "true");
             inputEmail.focus();
         }
         if (inputEmail && regexEmail.test(inputEmail.value) == true) {
             inputEmailError.textContent = "";   
             inputEmail.removeAttribute("aria-invalid");
         }
 
         // Validation input telephone
         const regexTel = /^\(?\+?([0-9]{1,4})?\)?[-\. ]?(\d{10})$/;
         const inputTel = form.querySelector("[type = tel]");
         const inputTelError = form.querySelector(".form__error-messageTel");
         if (inputTel  && regexTel.test(inputTel.value) == false) {
             error = "Numéro de téléphone incorrect";
             inputTelError.textContent = error;
             inputTelError.style.color = "red";
             inputTel.setAttribute("aria-invalid", "true");
             inputTel.focus();
         }
         if (inputTel && regexTel.test(inputTel.value) == true) {
             inputTelError.textContent = "";    
             inputTel.removeAttribute("aria-invalid");      
         }
        
         responseMessage.style.padding = "5px";
         // S'il y'a erreur lors de la soumission du formulaire
         if (error) {    
             if (form.dataset.id === "1") {
               responseMessage.textContent ="Un ou plusieurs champs contiennent une erreur. Veuillez vérifier et essayer à nouveau.";
               responseMessage.style.border = "2px solid red"; 
             }                                     
             e.preventDefault();
             return false;
         }
         // S'il n'y a pas d'erreur lors de la soumission du formulaire
         else{
             // Les formulaires ayant les champs: text, email, téléphone ect..
             responseMessage.style.border = "2px solid green";
              if (form.dataset.id === "1") {
                 responseMessage.textContent = "Votre message a été envoyé avec succès";
             }
             // formulaire avec un seul champs email(formulaire de souscription newsletter)
             else  {
                 responseMessage.textContent = "Votre souscription a bien été envoyé"; 
             }
             form.reset();
             e.preventDefault();          
         }
     });   
 });
 



    
