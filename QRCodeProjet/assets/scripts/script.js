function confirmBeforeDelete(idItem, chemin) {
    var txt;
    var r = confirm("Attention, supprimer cet élément entrainera la suppression des éléments associés.");
    if (r == true) {
        deleteItem(idItem, chemin)
    }
}

function deleteItem(idItem, chemin) {
    $.ajax({
        url: "http://localhost:8080/"+chemin+idItem,
        type: 'delete',
    });
}

function modifyItem(idItem, chemin) {
    $.ajax({
        url: "http://localhost:8080/"+chemin+idItem,
        data: $("#form").serialize(),
        type: 'put',
    });
}

function CachePromo() {
    var x = document.getElementById("role").value;
    if(x=="ENSEIGNANT" || x=="ADMINISTRATION")
    {
        document.getElementById("promovisible").style.visibility = "hidden";
    }
}