const loadAllPhones = async(status,brandName)=> {
    console.log('3 seconds gone')
    document.getElementById('spinner').classList.add('hidden'); 

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName?brandName:"iphone"}`);
    const data = await response.json();
    displayAllPhones(data.data, status);
        };


function displayAllPhones(phones,status) {
    document.getElementById('card-container').innerHTML = "";
    const cardContainer = document.getElementById('card-container');

    if (phones.length === 0) {
        cardContainer.innerHTML = `<p class="text-red-500 text-5xl text-center font-bold">No phones found!Please try again later</p>`;
        cardContainer.classList.remove("grid")
        return;
    }
    cardContainer.classList.add("grid")
    const phonesToShow = status ? phones : phones.slice(0, 6);
    phones.forEach(phone => {
        const { phone_name, slug, image, brand } = phone;
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="border p-2 rounded text-center">
                <div class="flex justify-center mb-4 py-2">
                    <img src="${image}" alt="">
                </div>
                <div class="space-y-4 py-2">
                    <h1 class="font-bold">${brand}</h1>
                    <p class="text-gray-400">${phone_name}</p>
                    <h2 class="font-bold">${slug}</h2>
                    <button onclick="showDetails('${slug}')" class="btn bg-blue-400 text-white font-bold">Show details</button>
                </div>
            </div>
        `;
        cardContainer.appendChild(div);
    });
}

function handleSearch() {
    document.getElementById('spinner').classList.remove('hidden'); 
    const inputValue = document.getElementById('inputField').value;   

    setTimeout(() => {
        loadAllPhones(false,inputValue);
    }, 3000); 
    
}

// show all button is here 
    const showAll=()=>{
        // console.log('hello')
        loadAllPhones(true)
    }

// modal section is here 
const showDetails=async(slugs)=>{
    // console.log(slug)
   
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
    const data = await response.json();
    console.log(data.data)
    const {image,brand,name,slug}=data.data;
    const modalContainer = document.getElementById('show-modal');
    
    modalContainer.innerHTML=`
        <dialog id="my_modal_1" class="modal">
                    <div class="modal-box">
                        <div class = 'flex justify-center'>
                            <img src="${image}" alt="">
                        </div>
                        <div class='text-center'>
                            <h3 class="text-lg font-bold">${brand}</h3>
                            <p class="py-4">${name}</p>
                            <p class="py-4">${slug}</p>
                            <div class="modal-action flex justify-center">
                            <form method="dialog">
                                <button class="btn">Close</button>
                            </form>
                            </div>
                        </div>
                    </div>
        </dialog>

        
    
    `
   
    my_modal_1.showModal();
}



loadAllPhones();
