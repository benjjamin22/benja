const filter = document.getElementById('filter');
const result = document.getElementById('result');

const searchStates = async searchText => {
    const res = await fetch('http://localhost:3000/users/');
    const data = await res.json();


    let matches = data.filter(user => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return user.id.match(regex) || user.inName.match(regex);
    });
    console.log(matches);

    if (searchText.length === 0) {
        matches = [];
        result.innerHTML = '';
    }

    outputHtml(matches);

};

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(user => `
       
        <img src="${user.picturepath}">
        <div class="user_info" style="border-bottom: 2px solid #eee;">
        <h3>${user.inName}</h3> 
        <p>${user.inSchool}</p> 
        <p1 style="color:red; font-weight:bolder;">ID NO:${user.id}</p1><p1 style="color:BLACK;font-weight:bolder;margin-left:5%;">KIN:</P1><p1 style="color:green;font-weight:bolder;margin-left:0%;">${user.inparentno}</p1>
    
    <br>
    </div>`)
            .join('');
        result.innerHTML = html;
    }
};
filter.addEventListener('input', () => searchStates(filter.value));