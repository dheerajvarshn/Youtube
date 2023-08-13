let api_key = "AIzaSyDAhuIa9t3NTZaTOWXmJDxCHL6fy2fxcrQ";
video_url = "https://www.googleapis.com/youtube/v3/videos?";
channel_url = "https://www.googleapis.com/youtube/v3/channels?";
playlist_url = "https://www.googleapis.com/youtube/v3/playlists?";
search_url="https://www.googleapis.com/youtube/v3/search?"

let container = document.getElementById("container");
fetch(
  video_url +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 20,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    container.innerHTML=""
    data.items.forEach((el) => {
      channellist(el);
    });
  })
  .catch((err) => {
    console.log(err);
  });

let channellist = (video_data) => {
  fetch(
    channel_url +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      video_data.channelIcon = data.items[0].snippet.thumbnails.default.url;
      displaydata(video_data);
    });
};
let displaydata = (data) => {
  let container = document.getElementById("container");

  let img = document.createElement("img");
  img.setAttribute("class", "thumbnail-image");
  img.src = data.snippet.thumbnails.high.url;

  let channelicon = document.createElement("img");
  channelicon.setAttribute("class", "channel-icon");
  channelicon.src = data.channelIcon;

  let title = document.createElement("p");
  title.setAttribute("class", "title");
  title.innerText = data.snippet.title;

  let channeltitle = document.createElement("p");
  channeltitle.setAttribute("class", "channeltitle");
  channeltitle.innerText = data.snippet.channelTitle;

  let div = document.createElement("div");
  div.append(img, channelicon, title, channeltitle);

  container.append(div);

  div.addEventListener('click',()=>{
    localStorage.setItem('video',JSON.stringify(data.id))
    window.location.href="../hypertext/video.html"
  })

};

$(document).ready(()=>{
    $("form").submit((e)=>{
        e.preventDefault();
        let search=$('#search').val();
        searchdata(search)
    })
})
let searchdata=(search)=>{
    fetch(search_url+new URLSearchParams({
        part:'snippet',
        key:api_key,
        type:'thumbnail',
        maxResults:20,
        q:search
    }))
    .then((res)=>{
        return res.json();
    }).then((res)=>{
        console.log(res)
        container.innerHTML=""
        res.items.forEach(el=>{
            channellist(el)
        })
    })
}
let video=()=>{
  let item=document.getElementById('video').innerText
  searchdata(item)
}
let channel=()=>{
  let item=document.getElementById('channel').innerText
  searchdata(item)
}
let movie=()=>{
  let item=document.getElementById('movie').innerText
  searchdata(item)
}

