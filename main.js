const loadtools= async(datalimit)=>{
 
    const url='https://openapi.programming-hero.com/api/ai/tools'
    const res= await fetch(url);
    const data= await res.json();
    displaytools(data.data.tools,datalimit)

}





const displaytools=(tools,datalimit)=>{
    console.log(tools)
    const aicontainer= document.getElementById('Ai-container')
    aicontainer.innerHTML=''

    const show=document.getElementById('show-more')

    if(datalimit<6)
    {
    tools=tools.slice(0,6);
    show.classList.remove('d-none')
    }
    
    else{
      show.classList.add('d-none')
    }

   


tools.forEach(tool=>{
   
    let feature= [];
   
    for(let i=0; i<3;i++){
      let m= tool.features[i]
      feature.push(m)
    
    }
    
    const aidiv= document.createElement('div')
    aidiv.classList.add('col')
    aidiv.innerHTML=`<div class="card">
    <img src="${tool.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Features</h5>
      <ol type="1">
      <li>${feature[0]}</li>
      <li>${feature[1]}</li>
      <li>${feature[2]}</li>
      </ol>
      <hr>
      <h5 class="card-title">${tool.name}</h5>
      <p class="card-text">${tool.description}</p>
      
      <i id="icon" class="fa-solid fa-calendar-days"></i>
      <p class="fa fa-calendar">${tool.published_in}</p><br>
      <button type="button" onclick="details('${tool.id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Details
</button>
    </div>
  </div>`

  aicontainer.appendChild(aidiv)

  
}
)

}



const details= async id=>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res= await fetch(url);
    const data= await res.json();
    displaydetails(data.data)
}

const displaydetails=ai=>{
console.log(ai)

const aidetails=document.getElementById('ai-details')

console.log(ai.features[1].feature_name) 



aidetails.innerHTML=`

  <div id="modal" class="d-flex g-5">
  
  <div class="red mb-6">
      <div class="card-body">
        <h5 class="card-title">${ai.tool_name}</h5>
        <p id="description" class="card-text">${ai.description}</p>
        <h4>Features</h4>
        <ol>
        <li>${ai.features[1].feature_name}</li>
        <li>${ai.features[2].feature_name}</li>
        <li>${ai.features[3].feature_name}</li>
        </ol>

      </div>
    </div>

    <div class="mb-6 ms-2">
    <div class="img-container">
    <img src="${ai.image_link[0]}" class="img-fluid rounded-start" alt="...">
    <p id="accuracy">Accuracy:${ai.accuracy.score*100}</p>
    </div>
    <h4>Hi! How are you doing today</h4> 
    <p>I am fine!How can I assist you?</p>

    <div class="d-flex flex-column-reverse">
            <div id="pay1">${ai.pricing[0].plan}:<span>${ai.pricing[0].price}</span></div>
            <div id="pay2">${ai.pricing[1].plan}:<span>${ai.pricing[1].price}</span></div>
            <div id="pay3">${ai.pricing[2].plan}:<span>${ai.pricing[2].price}</span></div>
        </div>
  </div>
  </div>


`


}


function  show(){
    document.getElementById('show-btn')
    loadtools(6)
    }

loadtools(5)
