
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
