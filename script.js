var form = document.getElementById("myForm")


form.addEventListener('submit',function(e){

    e.preventDefault()

    var search = document.getElementById("search").value

    var originalName = search.split(' ').join('')
    localStorage.setItem('ON', originalName);
    fetch("https://api.github.com/users/"+originalName)
    .then((result) => result.json())
    .then((data) => {
        if(data.name != null)
        {   
            window.location.href = 'res.html';
        }
        else{
            alert("User doesn't exist")
        }
    })
    

})