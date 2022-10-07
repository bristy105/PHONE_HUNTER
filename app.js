const loadphone=async(searchText,dataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res= await fetch(url)
    const data=await res.json();
    // console.log(data.data);
    displayPhones(data.data,dataLimit);

}


const displayPhones=(phones,dataLimit)=>{
    const phoneContainer=document.getElementById('phone-container');
    phoneContainer.innerHTML=``;
    // display 20 phones only
    const showAll=document.getElementById('show-all');
    if(phones.length>10 && dataLimit){
      
      phones=phones.slice(0,10);
      
      
      showAll.classList.remove('d-none');
    }
    else{
      showAll.classList.add('d-none')
    }

    // no-phpnes
    const noPhones=document.getElementById('no-phone-msg');
   
    if(phones.length===0){
      noPhones.classList.remove('d-none');
    }
    else{
      noPhones.classList.add('d-none');}
     phones.forEach(phone => {
      // console.log(phone);
        
       const phoneDiv= document.createElement('div');
       phoneDiv.classList.add('col');
      
        phoneDiv.innerHTML=`
        <div class="card">
          <img src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">Brand: ${phone.brand}</h5>
              <p class="card-text">Phone Name: ${phone.phone_name} </p>
              <div class="card" style="width: 18rem;">
              <button onclick='loadPhoneDetails("${phone.slug}")'  href="" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetail">Show-Details</button> 

            
          </div>
        </div>
      `;

      phoneContainer.appendChild(phoneDiv);
     });

 
    // stop loader
toggleSpinner(false);}

const loadPhoneDetails=async id=>{
  const url =`https://openapi.programming-hero.com/api/phone/${id}`
  const res =await fetch(url)
  const data= await res.json()
  displayPhoneDetail(data.data);


 }

 const displayPhoneDetail=phone=>{
  const modal=document.getElementById('phoneDetailModal');
  const modalTitle=document.getElementById('phone-details');
 
  modalTitle.innerHTML=`<p>Release Date: ${phone.releaseDate?phone.releaseDate:'No release found'} </p>
  <p>Bluetooth: ${phone.others.Bluetooth?phone.others.Bluetooth:'No such information '}</p>
  `

  // console.log(phone.name)
  modal.innerText=phone.name;


 }
     
    //  handle search button click
document.getElementById('btn-search').addEventListener('click',function(){

proceedSearch(10)

  // console.log(searchText,'is found')

 });

//  search input field enter key handler
document.getElementById('search-field').addEventListener('keypress',function(enter){
  if(enter.key==='Enter'){
    proceedSearch(10);
  }
});

 const toggleSpinner= isLoading=>{
  const spinner= document.getElementById('loader');
  if(isLoading){
    spinner.classList.remove('d-none');

  }

  else{
    spinner.classList.add('d-none');
  }
 }

const proceedSearch=(dataLimit)=>{

  toggleSpinner(true);
  const searchField=document.getElementById('search-field');
  const searchText=searchField.value;
  loadphone(searchText,dataLimit);
}

//  load show all

document.getElementById('btn-show-all').addEventListener('click',function(){
proceedSearch();
})