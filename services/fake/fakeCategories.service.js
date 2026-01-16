
const {categories}=require("./fakeDb")

const fakeCategoryService= {
    find :()=>{
        return categories

    },
findById :(id)=>{
    const searchedCategory =categories.find(category =>category.id === id)
    
    
    
    //*ici c'est plus explicative
    //let searchedCategory
    //for(let category of categories){
    // if(categories.id===id){
    //    searchedCategory=category}}*/

    return searchedCategory
},

create: (category)=>{

    const idMax= Math.max(...categories.map(category=>category.id));
    const newId= idMax+1

    category.id=newId
    categories.push(category)
//on peut tout faire en une seule ligne: category.id=Math.max(...categories.map(category=>category.id))+1
     return category
},
nameAlerdyExist : (name)=>{
    //some, renvoie un booleen pour verifier si ca existe oui ou non true ou false un peu comme filter
    const existing =categories.some(category=>category.name===name);
    return existing;
    
}   


}



module.exports=fakeCategoryService

//CRUD? Nos tâche on peut: 
//C=>CREATE
//R=>READ
//U=>UPDATE
//D=>DELETE 