//run script if enter is pressed in input box
let input = document.getElementById("searchTerm")
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        search(0);
    }
});
let color = '';
let q = ''; //api query string
let pageNum = 0;   //page counter
let prevBtn = document.querySelector('#prev');
let nextBtn = document.querySelector('#next');
//clear button status
nextBtn.disabled = true;
prevBtn.disabled = true;

async function search(button) {
    //clear page
    let parent = document.querySelector('#pictures')
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    //read button parameter to manage pages and uppdate query   
    if (button === 1) {
        pageNum -= 1;
    }
    else if (button === 2) {
        pageNum += 1
    }
    else {
        pageNum = 1;
    }
    
    if (button === 0) {
        q = '';
        let inputQ = document.querySelector('#searchTerm');
        q += ' ' + inputQ.value;
        c1 = document.getElementById('colors');
        color = c1[c1.options.selectedIndex].value

    }
    //send and receive request
    let params = new URLSearchParams({
        key: '25578056-62bc3da3830a7bfd7a3d93ef8',
        q: q,
        page: pageNum,
        per_page: '10',
        colors: color
    });

    let response = await fetch('https://pixabay.com/api/?' + params);
    let json = await response.json();
    //display no results
    if (json.totalHits === 0) {
        document.querySelector('#noResults').innerHTML = 'No matching pictures! Try somthing else.'
    }
    else {
        //reset no serch result line
        document.querySelector('#noResults').innerHTML = ' ';
        //loop through api data, create and append
        for (let i = 0; i < json.hits.length; i++) {
            let imgURL = json.hits[i].webformatURL;
            let li = document.createElement('li')
            let img = document.createElement('img');
            let p1 = document.createElement('p');
            let p2 = document.createElement('p');
            //set img and p text
            img.src = imgURL;
            p1.textContent = 'Photo by: ' + json.hits[i].user;
            p2.textContent = 'Tags: ' + json.hits[i].tags;
            //append list, img, user and tag to ul
            document.querySelector('#pictures').appendChild(li);
            li.append(img);
            li.append(p1);
            li.append(p2);
        }

    }
    //count pages
    let pages = Math.ceil(json.totalHits / 10);

    //print current page and total number of pages
    document.querySelector('#pages').innerHTML = 'Page ' + pageNum + '/' + pages
    //set nav button status depending on pages
    if (pageNum === pages) {
        nextBtn.disabled = true;
        prevBtn.disabled = false;
    }
    else if (pageNum === 1) {
        prevBtn.disabled = true;
        nextBtn.disabled = false;
    }
    else {
        nextBtn.disabled = false;
        prevBtn.disabled = false;
    }
    if (json.total <= 10) {
        nextBtn.disabled = true;
        prevBtn.disabled = true;
    }

    let btnAmount = document.querySelectorAll('button')
    //remove nav from bottom of page 
    if (btnAmount.length > 3) {
        var select = document.querySelector('body');
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);

    }
    //add updated nav buttons to bottom of page

    let getBtn2 = document.querySelector('#prev')
    let getBtn1 = document.querySelector('#next')

    let prevBottomBtn = getBtn2.cloneNode(true)
    let nextBottomBtn = getBtn1.cloneNode(true)

    document.querySelector('body:last-child').append(prevBottomBtn);
    document.querySelector('body:last-child').append(nextBottomBtn);






}


