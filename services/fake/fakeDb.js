//fause DB


const categories =[
    {
        id:1,
        name:"Administratif",
        icon:"📃"
    },
    {
         id:2,
        name:"Dessin",
        icon:"🖍️"
    },
]
    

const tasks =[
    {   
        id:1,
        name:"Faire ses impôts",
        before:"2026-06-1",
        by:"Mark",
        to:"Denisa",
        category:"1",
        isDone:false

    },
    {
        id:2,
        name:"Faire une aquarelle de paysage à la mer ",
        before:"2026-01-31",
        by:"Denisa",
        to:"Eren",
        category:"2",
        isDone:false

    },
]


//*pour exportes deux choses,faut exporter un objet avec ces deux éléments
module.exports = { categories,tasks};