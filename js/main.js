$(document).ready(function(){

    $('#serachUser').on('keyup',function(e){
       let username = e.target.value;

       $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
                client_id:'fbe0afcfc46e79ec8698',
                client_secret:'a8747ef9df177a836eb669ac827cc8ed78a776a8'

                // client_id:'d9308aacf8b204d361fb',
                // client_secret:'62551cc02cee983fff0bac41baf170eb5a312c1c'
            }

       }).done(function(user){
           $.ajax({
            url:'https://api.github.com/users/'+username+'/repos',
            data:{
                client_id:'fbe0afcfc46e79ec8698',
                client_secret:'a8747ef9df177a836eb669ac827cc8ed78a776a8',
                sort:'created:asc',
                per_page:5

            }

           }).done(function(repos){
                $.each(repos,function(index,repo){
              $('#repos').append(`

                <div class="well">
                    <div class="row">
                       <div class="col-md-7">
                        <strong>${repo.name}</strong>
                       </div>
                   </div>
              </div>

           `);
              });
                console.log(repos);
           });
        $('#profile').html(`
        
        <div class="card">
        <div class="card-header">
         <h3 >${user.name}</h3>
        </div>
        <div class="card-body">
        <div class="row">
            <div class="col-md-3" style="width:100%;">
                <img class="thumbnail avatar" style="width:100%;" src="${user.avatar_url}">
                <a traget="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
            </div>
            <div class="col-md-9">
            <span class="btn btn-outline-primary">Public Repos: ${user.public_repos}</span>
            <span class="btn btn-outline-secondary">Public Gists: ${user.public_gists}</span>
            <span class="btn btn-outline-success">Followers: ${user.followers}</span>
            <span class="btn btn-outline-danger">Following: ${user.following}</span>
            <p class="lead mt-3">${user.bio}</p>
            
            </div>
        
        </div>
        </div>
      </div>
      <h1>Latest Repos</h1>
      <div id="repos"></div> 
        
        `);
       });
    });

});