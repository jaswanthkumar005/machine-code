// script.js
const data = [
    {
        name: "Documents",
        type: "folder",
        children: [
            { name: "Resume.docx", type: "file" },
            { name: "CoverLetter.pdf", type: "file" },
            {
                name: "Documents",
                type: "folder",
                children: [
                    { name: "Resume.docx", type: "file" },
                    { name: "CoverLetter.pdf", type: "file" }
                ]
            }
        ]
    },
    {
        name: "Photos",
        type: "folder",
        children: [
            { name: "Vacation.jpg", type: "file" },
            { name: "Birthday.png", type: "file" }
        ]
    }
];

import { obj12 } from './test.js';

console.log(obj12);


document.addEventListener("DOMContentLoaded", function () {
    console.log(obj12,"obj12");
    
    const fileTree = document.getElementById('file-tree');
    fileTree.addEventListener("click",function(e){
        const {type} = e.target.dataset;
       
        if(type == "folder"){
            e.target.classList.toggle("collapsed");
        }
    });

    // Example file/folder structure
    
      function createTree(data){
        let ul = document.createElement("ul");
        data.forEach((item) => {
            let li = document.createElement("li");
            li.className = item.type;
            li.textContent=item.name;
            if(item.type == "folder"){
                li.classList.add("folder");
                li.setAttribute("data-type","folder")
               const nestedList =  createTree(item.children || []);
               li.appendChild(nestedList);
            //    li.addEventListener("click",function(e){
            //       li.classList.toggle("collapsed");
            //    })

            }
            ul.appendChild(li)
        });

        return ul;
      }
    // Initialize the tree view
    fileTree.appendChild(createTree(data));
    //createEvent();
});

function createEvent(){
    Array.from(document.getElementsByClassName("folder")).forEach(item => {
        item.addEventListener('click', function (e) {
           
          
            e.stopPropagation(); // Prevent click event from bubbling up
            item.classList.toggle('collapsed');
        });
    })
}


