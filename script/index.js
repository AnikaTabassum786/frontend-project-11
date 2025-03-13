console.log('Index')
const showLoader=()=>{
    document.getElementById('loader').classList.remove('hidden')
    document.getElementById('video-container').classList.add('hidden')
}

const hideLoader=()=>{
    document.getElementById('loader').classList.add('hidden')
    document.getElementById('video-container').classList.remove('hidden')
}
const removeActiveClass = () => {
    const activeButtons = document.getElementsByClassName('active');
    for (let btn of activeButtons) {
        btn.classList.remove('active')
    }
    console.log(activeButtons)
}

function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(response => response.json())
        .then(data => {
            displayCategories(data.categories)
        })
}

function loadVideos(searchText=" ") {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(response => response.json())
        .then(data => {
            removeActiveClass();
            document.getElementById('btn-all').classList.add('active')
            displayVideos(data.videos)
        })
}

const loadCategoryVideos = (id) => {
    showLoader()
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add('active')
            console.log(clickedButton)
            displayVideos(data.category)
        })
}

const loadVideoDetails=(videoID)=>{
 console.log(videoID)
const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`

fetch(url)
.then(response=>response.json())
.then(data=>{
    displayVideoDetails(data.video)
})
}

const displayVideoDetails=(video)=>{
    console.log(video)
    document.getElementById('video_details').showModal()
    const detailsContainer = document.getElementById('details-container')

    detailsContainer.innerHTML=`
    <h2>${video.title}</h2>
    
    `
}

function displayCategories(categories) {

    const categoryContainer = document.getElementById('category-container')
    for (let cat of categories) {
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML = `
        <button id = 'btn-${cat.category_id}' onclick=loadCategoryVideos(${cat.category_id}) 
        class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>`
        categoryContainer.appendChild(categoryDiv)
    }
}

const displayVideos = (videos) => {
    //  console.log(videos)
    const videoContainer = document.getElementById('video-container')

    if (videos.length == 0) {
        videoContainer.innerHTML = `
         <div class="col-span-full flex flex-col justify-center items-center py-20">
            <img class="w-[120px]" src="./assets/images/Icon.png" alt="">
            <div class="font-bold text-3xl text-center">Oops!! Sorry, There is no content here</div>
          </div>
        `
        hideLoader()
        return;
    }

    videoContainer.innerHTML = ''
    videos.forEach(video => {
        console.log(video)
        const videoDiv = document.createElement('div')
        videoDiv.innerHTML = `
  <div class="bg-base-100  ">
            <figure class="relative">
              <img class='w-full h-[150px] object-cover rounded-md'
                src=${video.thumbnail}
                alt="Shoes" />
                <span class="absolute bg-black text-white p-1 rounded-md bottom-2 right-2">3hrs 56 min ago</span>
            </figure>
          
           <div class="flex gap-5 py-2">
            <div class="avatar">
                <div class="w-10 h-10 rounded-full">
                  <img src=${video.authors[0].profile_picture} />
                </div>
              </div>
            <div class="flex flex-col gap-1">
                <div class="font-bold text-base w-full">${video.title}</div>
                <div class="flex gap-2 justify-start items-center">
                   <div class="text-gray-500">${video.authors[0].profile_name}</div>
                   <div>
                   <div class="text-gray-500">${video.authors[0].verified ===true ? `<img class="w-6" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">`:''}</div>
                   </div>
                </div>
                
            </div>
           </div>
          <button onClick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
        </div>
    `

        videoContainer.appendChild(videoDiv)
    })
    hideLoader()
}

document.getElementById('search-input').addEventListener('keyup',(e)=>{
    const input = e.target.value
     console.log(input)
     loadVideos(input)
})
loadCategories()

