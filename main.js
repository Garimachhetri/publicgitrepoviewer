

    let currentPage = 1;
    let totalReps = 1;

    var pageSize;
    function renderData(data) {
        
      const container = $('#jo');
      container.empty();

      data.forEach(repo => {

        var g = '<div class="col-sm-6 mb-3 mb-sm-0"><div class="card p-3 mb-5 rounded-0 border-3" style="height:80%" > <h2 class="card-title" style="color:#408bce">' + repo.name + '<br><br></h2><p class="card-text text-muted">'

        if(repo.description==null)
        {
          g += " "
        }
        else
        {
          g+= repo.description
        }

                    g += '</p><p class="lead">'

                    g += '<div class="row text-wrap">'
                    for(var i=0;i<repo.topics.length;i++)
                    {
                        g += '<div class="col-sm-3 p-2 text-wrap " style="width:inherit"><div class="card rounded-0 border-0 text-wrap col-auto" style="background-color:#408bce;color:#ffffff;padding:3px"> <p class="card-text p1">&nbsp;'  + repo.topics[i] + '&nbsp;</p></div></div>'
                    }
                    g +='</div></p></div></div>'

        container.append(g);
      });
    }

    function renderPaginationInfo() {
      var tp=Math.ceil(totalReps / pageSize);
      const paginationInfo = $('#pagination-info');
      paginationInfo.text(`Page ${currentPage} of ${tp}`);
    }

    function handlePagination() {

              document.querySelector(
                  "#joder").style.visibility = "visible";
                  console.log("1");              
    var value = localStorage.getItem('ON');
        var fs = document.getElementById("typeNumber").value;
        console.log(fs)
      pageSize = fs;
      const username = localStorage.getItem('ON');
      const apiUrl = `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${pageSize}`;
        
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          document.querySelector(
            "#joder").style.visibility = "hidden";
            console.log("2");
          return response.json();
          
        })
        .then(data => {
            totalPages = Math.ceil(totalReps / pageSize);
          renderData(data);
          renderPaginationInfo();
          if (currentPage === totalPages) {
            $('#next-button').prop('disabled', true);
          } else {
            $('#next-button').prop('disabled', false);}
            let result = currentPage === 1;
            if (result) {
                $('#prev-button').prop('disabled', true);
              } else {
                $('#prev-button').prop('disabled', false);}
          
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
            handlePagination();
          }
    }

    function prevPage() {
      if (currentPage > 1) {
        currentPage--;
        handlePagination();
      }
    }

    $(document).ready(function () {
        var value = localStorage.getItem('ON');

        fetch("https://api.github.com/users/"+value)
        .then((result) => result.json())
        .then((data) => {
        document.getElementById("pf").innerHTML=`
    
    
        <div class="card mb-3 border-0" style="max-width: 540px;">
      <div class="row gx-5">
        <div class="col-6 col-md-5 p-4 rounded-circle">
        <div style="width: 200px; height: 200px; overflow: hidden; border-radius: 50%; border: 4px solid #f0f0f0; box-sizing: border-box;">
          <img src="${data.avatar_url}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; border: 10px solid #ffffff; box-sizing: border-box;" class="img-fluid" alt="...">
        </div>
        <br>
        <p style="white-space: nowrap;overflow: hidden;display: block; text-overflow: ellipsis"><img class="clip-icon" src="e.png" alt="Paperclip" width="20" height="20"><a target="_blank" href="https://www.github.com/${value}" style="color: black;text-decoration: none;font-size: 12px;font-weight: bold"> ${data.url}</a></p>
        </div>
        <div class="col-sm-6 col-md-7 p-4">
          <div class="card-body">
            <h5 class="card-title"><strong>${data.name}</strong></h5><br>
            <p class="card-text">
            ${data.bio !== null ? data.bio : ''}
            </p>
    
            <p class="card-text">
            <img class="clip-icon" src="f.svg" alt="Paperclip" width="20" height="20">
            ${data.location !== null ? data.location : ''}
            </p>
    
    
            <p class="card-text" style="white-space: nowrap;overflow: hidden;display: block; text-overflow: ellipsis">
            ${data.twitter_username
              ? `<img class="clip-icon" src="e.png" alt="Paperclip" width="20" height="20"><a target="_blank" href="https://www.twitter.com/${data.twitter_username}" style="color: black; text-decoration: none; font-size: 12px; font-weight: bold"> Twitter: https://twitter.com/${data.twitter_username}</a>`
              : ''}
          </p>
          
         
         
            </div>
        </div>
      </div>
    </div>
        `
        totalReps=data.public_repos;
        })
      
      handlePagination();
      $('#prev-button').on('click', prevPage);
      $('#next-button').on('click', nextPage);
      $('#entries').on('click', handlePagination);
      
    });
