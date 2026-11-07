
// var currentSearch = "";
// user data
var contactForm = document.getElementById("contactForm");
var avatarInput = document.getElementById("avatarInput");
var avatarPreview = document.getElementById("avatarPreview");
var avatarPath = document.getElementById("avatarPath"); 
var fullNameInput = document.getElementById("fullname");
var phoneNumberInput = document.getElementById("phonenum");
var emailAddressInput = document.getElementById("email");
var yourAddressInput = document.getElementById("address");
var contactGroupInput = document.getElementById("contactGroup");
var contactNotesInput = document.getElementById("contactNotes");
var contactFavoriteInput = document.getElementById("favoriteCheck"); 
var contactEmergencyInput = document.getElementById("emergencyCheck");
var searchInput = document.getElementById("search");
var totalContacts =document.getElementById("totalContacts");
var totalContactsSpan =document.getElementById("totalContactsSpan");
var bigFavItem = document.getElementById("bigFavItem");
var bigEmerItem= document.getElementById("bigEmerItem");
var favContact = document.getElementById("favContact");
var emerContact = document.getElementById("emerContact");
var favoriteBtn = document.getElementById("efavBtn");
var emergancyBtn= document.getElementById("emerBtn");
// =======
// vallidation 
var emailError= document.getElementById("emailError");
var nameError= document.getElementById("nameError");
var phoneError= document.getElementById("phoneError");



// 34an el storeage 
var contactList = JSON.parse(localStorage.getItem("contactList") || "[]");
var currentEditIndex = null;

displyContact(contactList);

function addContact(){
var contact = {
    userName : fullNameInput.value ,
    phoneNumber : phoneNumberInput.value,
    userEmail : emailAddressInput.value,
    userAddress : yourAddressInput.value,
    userGroup : contactGroupInput.value,
    userNotes : contactNotesInput.value,
    userFav : contactFavoriteInput.checked,
    userEmergancy : contactEmergencyInput.checked,
    userImage : "images/" + avatarPath.value,
}

  contactList.push(contact);
displyContact(contactList);
localStorage.setItem("contactList", JSON.stringify(contactList) );
 clearAll();
    document.getElementById("submitModalBtn").classList.remove("d-none");
    document.getElementById("editModalBtn").classList.add("d-none");
}
// show the new contact
function displyContact(contacts){
if (contacts.length === 0) {

    document.getElementById("rowData").innerHTML = `
        <div class="empty-state text-center py-5">
            <div class="empty-icon mx-auto mb-3 d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-address-book"></i>
            </div>
            <h5 class="empty-title mb-1">No contacts found</h5>
            <p class="empty-subtitle text-muted">Click "Add Contact" to get started</p>
        </div>
    `;  
  return;
}

var cartona ="";
for (var i = 0; i < contacts.length; i++) {
  var contact = contacts[i];

var hasImage = (contact.userImage && contact.userImage !== "images/");

  var avatarContent = hasImage 
    ? `<img src="${contact.userImage}" alt="${contact.userName}" class="w-100 h-100 object-fit-cover rounded-circle">`
    : `<span class="fw-bold fs-4 text-white">${cutName(contact.userName)}</span>`;
    var avatarBgClass = hasImage ? "rounded-circle overflow-hidden flex-shrink-0" : "avatar-pink rounded-circle overflow-hidden d-flex align-items-center justify-content-center flex-shrink-0";
 
    cartona += `
   <div class="col-12 col-md-6">
    <div class="card contact-card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
      
      <!-- Top Body Content -->
      <div class="card-body p-4 pb-3">
        <!-- Avatar, Name & Phone -->
        <div class="d-flex align-items-center gap-3 mb-3">
          
          <div class="${avatarBgClass}" style="width: 55px; height: 55px; background-color: #ec4899;">
            ${avatarContent}
          </div>

          <div>
            <h5 class="fw-bold mb-1 contact-name">${contact.userName}</h5>
            <div class="d-flex align-items-center gap-2 phone-box px-2 py-1 rounded-2">
              <span class="icon-phone-blue">
                <i class="fa-solid fa-phone fs-6"></i>
              </span>
              <span class="contact-text text-secondary fw-medium fs-7">${contact.phoneNumber}</span>
            </div>
          </div>
        </div>

        <!-- Email 1 -->
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="icon-badge badge-purple rounded-2">
            <i class="fa-solid fa-envelope"></i>
          </span>
          <span class="contact-text text-secondary fs-7">${contact.userEmail}</span>
        </div>

        <!-- Location / Address -->
        <div class="d-flex align-items-center gap-2 mb-3">
          <span class="icon-badge badge-green rounded-2">
            <i class="fa-solid fa-location-dot"></i>
          </span>
          <span class="contact-text text-secondary fs-7">${contact.userAddress}</span>
        </div>

        <!-- Tag Badge -->
        <div>
          <span class="badge tag-friends rounded-2 px-3 py-2 fw-medium fs-7">${contact.userGroup}</span>
        </div>
      </div>

      <!-- Bottom Action Footer -->
      <div class="card-footer-actions px-4 py-3 d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-action-box btn-call" title="Call">
            <i class="fa-solid fa-phone"></i>
          </button>
          <button class="btn btn-action-box btn-email" title="Send Email">
            <i class="fa-solid fa-envelope"></i>
          </button>
        </div>

        <div class="d-flex align-items-center gap-2">
          <button onclick="toggleFav(${contact.oldIndex ?? i})"
             class="btn btn-action-icon btn-star" title="Favorite">
            <i class="${contact.userFav ? 'fa-solid text-warning' : 'fa-regular'} fa-star"></i>
           </button>

          <button onclick="toggleEmergancy(${contact.oldIndex ?? i})"
             class="btn btn-action-icon btn-heart" title="Emergency">
            <i class="${contact.userEmergancy ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'}"></i>
          </button>

          <button onclick="setDataToInput(${contacts.length < contactList.length ? contact.oldIndex : i})"
             class="btn btn-action-icon btn-edit" title="Edit">
            <i class="fa-solid fa-pen"></i>
          </button>

          <button onclick="deleteContact(${contacts.length < contactList.length ? contact.oldIndex : i})"
             class="btn btn-action-icon btn-delete" title="Delete">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>

    </div>
  </div>
  `;
}

document.getElementById("rowData").innerHTML = cartona;
updateContactCount();
updateFavSidebar();
updateEmersidebar();
}

// clear the form after adding 
function clearAll(){
    fullNameInput.value = null;
    phoneNumberInput.value = null;
    contactNotesInput.value = null;
    contactGroupInput.value = null;
    yourAddressInput.value = null;
    emailAddressInput.value = null;
    contactEmergencyInput.checked = false;
    contactFavoriteInput.checked = false;
    avatarPreview.innerHTML=`
      <i class="fa-solid fa-user fs-2"></i>
    `;
    avatarPath.value= null;
    fullNameInput.classList.remove("is-valid", "is-invalid");
    phoneNumberInput.classList.remove("is-valid", "is-invalid");
    emailAddressInput.classList.remove("is-valid", "is-invalid");
    nameError.classList.add("d-none");
    phoneError.classList.add("d-none");
    emailError.classList.add("d-none");
}

// search about contact 
function searchContact(input){

var searchValue = searchInput.value;
//  === refactor ll code ===
  var filterContactList = [];

for (var i = 0; i < contactList.length; i++) {
  if (
    contactList [i].userName.toLowerCase().includes(searchValue.toLowerCase()) ||
    contactList [i].userEmail.toLowerCase().includes(searchValue.toLowerCase())
) {
  contactList[i].oldIndex = i;
filterContactList.push(contactList [i]);
}}
displyContact(filterContactList);
}
// when u click in button delete
function deleteContact(index){


Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DC2626",
  cancelButtonColor: "#6B7280",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed){
      contactList.splice(index, 1);
  localStorage.setItem("contactList", JSON.stringify(contactList) );
displyContact(contactList);
  }
    
});
}

// when we edit data
function setDataToInput(index) {
    currentEditIndex = index;

    fullNameInput.value = contactList[index].userName;
    phoneNumberInput.value = contactList[index].phoneNumber;
    emailAddressInput.value = contactList[index].userEmail;
    yourAddressInput.value = contactList[index].userAddress;
    contactGroupInput.value = contactList[index].userGroup;
    contactNotesInput.value = contactList[index].userNotes;
    contactFavoriteInput.checked = contactList[index].userFav;
    contactEmergencyInput.checked = contactList[index].userEmergancy;

    document.getElementById("submitModalBtn").classList.add("d-none");
    document.getElementById("editModalBtn").classList.remove("d-none");

    var myModal = new bootstrap.Modal(
        document.getElementById("addContactModal")
    );

    myModal.show();
}


function editContact() {

    contactList[currentEditIndex].userName = fullNameInput.value;
    contactList[currentEditIndex].phoneNumber = phoneNumberInput.value;
    contactList[currentEditIndex].userEmail = emailAddressInput.value;
    contactList[currentEditIndex].userAddress = yourAddressInput.value;
    contactList[currentEditIndex].userGroup = contactGroupInput.value;
    contactList[currentEditIndex].userNotes = contactNotesInput.value;
    contactList[currentEditIndex].userFav = contactFavoriteInput.checked;
    contactList[currentEditIndex].userEmergancy = contactEmergencyInput.checked;

    localStorage.setItem("contactList", JSON.stringify(contactList));

    displyContact(contactList);

    clearAll();

    currentEditIndex = null;

    document.getElementById("submitModalBtn").classList.remove("d-none");
    document.getElementById("editModalBtn").classList.add("d-none");

    var myModal = bootstrap.Modal.getInstance(
        document.getElementById("addContactModal")
    );

    myModal.hide();
}

// el total count  in header
function updateContactCount(){
  totalContacts.innerHTML = contactList.length;
  totalContactsSpan.innerHTML = contactList.length;
}

// fav
function updateFavSidebar(){
  bigFavItem.innerHTML="";
  var favCount = 0 ;
  var hasFav= false;
for (var i = 0; i < contactList.length; i++) {
  var contact = contactList[i];
  if (contact.userFav) {
    favCount ++;
    hasFav = true;

    var hasImage = (contact.userImage && contact.userImage !== "images/");
    var avatarHTML = hasImage 
      ? `<img src="${contact.userImage}" alt="Avatar" class="mini-avatar rounded-3 w-100 h-100 object-fit-cover">`
      : `<span class="fw-bold text-white small">${cutName(contact.userName)}</span>`;
    var bgClass = hasImage ? "mini-avatar rounded-3 overflow-hidden" : "mini-avatar rounded-3 avatar-pink d-flex align-items-center justify-content-center overflow-hidden";

    var contactHtml =`
         <div class="mini-favorite-item w-100 p-2 rounded-3 d-flex align-items-center justify-content-between mb-2">
        <div class="d-flex align-items-center gap-3">
          <div class="${bgClass}" style="width: 40px; height: 40px; background-color: ${hasImage ? 'transparent' : '#ec4899'};">
            ${avatarHTML}
          </div>
          <div>
            <h6 class="fw-bold mb-0 text-dark small">${contact.userName}</h6>
            <small class="text-muted">${contact.phoneNumber}</small>
          </div>
        </div>
        <a href="tel:${contact.phoneNumber}"
           class="btn btn-mini-call btn-mini-call-green"
           title="Call">
           <i class="fa-solid fa-phone"></i>
        </a>
      </div>
    `;
    bigFavItem.innerHTML += contactHtml;
  } 
}
    favContact.innerHTML = favCount;
if (!hasFav) {
  bigFavItem.innerHTML = `
   <div class="col-12">
            <div id="emptyStateFav" class="empty-state">
                <p class="text-muted mb-0 text-center">No favorites yet</p>
            </div>
        </div>
  `;
}
}

// Emergency
function updateEmersidebar() {
    bigEmerItem.innerHTML = "";

    var emergancyCount = 0;
    var hasEmergancy = false;

    for (var i = 0; i < contactList.length; i++) {
        var contact = contactList[i];

        if (contact.userEmergancy) {
            emergancyCount++;
            hasEmergancy = true;

            var hasImage = (contact.userImage && contact.userImage !== "images/");
            var avatarHTML = hasImage 
              ? `<img src="${contact.userImage}" alt="Avatar" class="mini-avatar rounded-3 w-100 h-100 object-fit-cover">`
              : `<span class="fw-bold text-white small">${cutName(contact.userName)}</span>`;
            var bgClass = hasImage ? "mini-avatar rounded-3 overflow-hidden" : "mini-avatar rounded-3 avatar-pink d-flex align-items-center justify-content-center overflow-hidden";

            var contactHtml = `
                <div class="mini-emergency-item w-100 p-2 rounded-3 d-flex align-items-center justify-content-between mb-2">
                    <div class="d-flex align-items-center gap-3">
                        <div class="${bgClass}" style="width: 40px; height: 40px; background-color: ${hasImage ? 'transparent' : '#ec4899'};">
                            ${avatarHTML}
                        </div>

                        <div>
                            <h6 class="fw-bold mb-0 text-dark small">
                                ${contact.userName}
                            </h6>
                            <small class="text-muted">
                                ${contact.phoneNumber}
                            </small>
                        </div>
                    </div>

                    <a href="tel:${contact.phoneNumber}"
                       class="btn btn-mini-call btn-mini-call-pink"
                       title="Call Emergency">
                        <i class="fa-solid fa-phone"></i>
                    </a>
                </div>
            `;

            bigEmerItem.innerHTML += contactHtml;
        }
    }

    emerContact.innerHTML = emergancyCount;

    if (!hasEmergancy) {
        bigEmerItem.innerHTML = `
            <div class="col-12">
                <div id="emptyStateEmer" class="empty-state">
                    <p class="text-muted mb-0 text-center">
                        No emergency contacts yet
                    </p>
                </div>
            </div>
        `;
    }
}

function toggleFav(index){
contactList[index].userFav = !contactList[index].userFav;
localStorage.setItem("contactList", JSON.stringify(contactList) );

displyContact(contactList);
updateFavSidebar();
}

function toggleEmergancy(index){
contactList[index].userEmergancy = !contactList[index].userEmergancy;
localStorage.setItem("contactList", JSON.stringify(contactList) );
displyContact(contactList);
updateEmersidebar();
}



avatarInput.addEventListener("change", function () {
    var file = avatarInput.files[0];

    console.log(file);

    avatarPath.value = file.name;

    avatarPreview.innerHTML = `
        <img src="images/${file.name}" alt="Avatar preview"
          class="w-100 h-100 object-fit-cover rounded-circle">
    `;
});


// lama yekon mafii4 image  n put awel 2 char mn kol el name
function cutName(name) {
    if (!name) return "";
    return name
        .trim()
        .split(" ")
        .map(w => w[0] ? w[0].toUpperCase() : "")
        .slice(0, 2)
        .join("");
}

// vallidation
function showInvalid(input, error){
  if(!error) return;
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
 if(error) error.classList.remove("d-none");
}

function clearInvalid(input, error){
    if(!error) return;
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
   if(error) error.classList.add("d-none");

}

// name

fullNameInput.addEventListener('input' , function(){
  var value =fullNameInput.value.trim();
var nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{3,30}$/;
if (!value|| !nameRegex.test(value)) {
  showInvalid(fullNameInput,nameError);
  
}else{
  clearInvalid(fullNameInput,nameError)
}
})

// phone

phoneNumberInput.addEventListener('input' , function(){
  var value =phoneNumberInput.value.trim();
var phoneRegex = /^01[0125][0-9]{8}$/;
  if (!value|| !phoneRegex.test(value)) {
  showInvalid(phoneNumberInput,phoneError);
  
}else{
  clearInvalid(phoneNumberInput,phoneError)
}
})

// email 

emailAddressInput.addEventListener('input' , function(){
  var value =emailAddressInput.value.trim();
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (!value|| !emailRegex.test(value)) {
  showInvalid(emailAddressInput,emailError);
  
}else{
  clearInvalid(emailAddressInput,emailError)
}
})


