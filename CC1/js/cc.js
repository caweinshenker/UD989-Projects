
var Cat = function(){
    Cat.numInstances = (Cat.numInstances || 0) + 1;
}


Cat.prototype.count = 0;
Cat.prototype.src = "http://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg";
Cat.prototype.addCat = function(){
    var div = document.createElement("div");
    var countNode = document.createElement("p");
    var imgNode = document.createElement("img");
    imgNode.classList.add("cat");
    imgNode.src = this.src;
    countNode.classList.add("counter");
    countNode.innerHTML = "0";
    document.body.appendChild(div);
    div.appendChild(imgNode);
    //imgNode.appendChild(countNode);
}

$(document).ready(function(){
    var cats = [new Cat()];
    var catCount = 1;
    for (var i = 0; i < catCount; i++){
        cats[i].addCat();
    }
});
