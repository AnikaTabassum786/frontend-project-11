console.log('Index')

function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(response=>response.json())
    .then(data=>{
        displayCategories(data.categories)
    })
}

function loadVideos(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(response=>response.json())
    .then(data=>{
        displayVideos(data.videos)
    })
}

function displayCategories(categories){
    // console.log(categories)

    const categoryContainer = document.getElementById('category-container')
    for(let cat of categories){
        // console.log(cat)
    const categoryDiv = document.createElement('div')
    categoryDiv.innerHTML=`
    <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>`
    categoryContainer.appendChild(categoryDiv)
}
}
// {
//     "category_id": "1001",
//     "video_id": "aaal",
//     "thumbnail": "https://i.ibb.co/hdtZYbB/enchnting.jpg",
//     "title": "Enchanted Harmonies",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/jh1q2F3/shopia.jpg",
//             "profile_name": "Sophia Williams",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "7.6K",
//         "posted_date": "16450"
//     },
//     "description": "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience."
// }
const displayVideos=(videos)=>{
//  console.log(videos)
const videoContainer = document.getElementById('video-container')
videos.forEach(video=>{
     console.log(video)
    const videoDiv = document.createElement('div')
    videoDiv.innerHTML=`
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
                   <div><img class="w-6" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></div>
                </div>
                <div class="text-gray-500">${video.others.views}</div>
            </div>
           </div>
          
        </div>
    `

    videoContainer.appendChild(videoDiv)
})

}

loadCategories()
loadVideos()
