let data=JSON.parse(localStorage.getItem('video'));
let iframe=document.getElementById('iframe');
let url=`https://www.youtube.com/embed/${data.videoId}`
iframe.src=url;
console.log(url)

let home=()=>{
    window.location.href="../hypertext/index.html"
}